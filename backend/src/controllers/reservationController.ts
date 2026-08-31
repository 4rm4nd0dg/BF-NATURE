import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { processMobileMoneyPayment, generateTicketQRCodeDataUrl } from '../services/mobileMoney.js';
import { TypeBillet, StatutPaiement } from '@prisma/client';

const reservationSchema = z.object({
  site_id: z.string().uuid(),
  utilisateur_id: z.string().uuid().optional(),
  date_visite: z.string(),
  type_billet: z.nativeEnum(TypeBillet),
  quantite: z.number().int().min(1).max(50),
  provider_paiement: z.enum(['orange_money', 'moov_money', 'wave', 'coris_money', 'card']),
  telephone_paiement: z.string().optional(),
  card_number: z.string().optional(),
  card_expiry: z.string().optional(),
  card_cvc: z.string().optional(),
});

type ReservationInput = z.infer<typeof reservationSchema>;

export async function createReservation(req: Request, res: Response) {
  try {
    const validatedData: ReservationInput = reservationSchema.parse(req.body);

    const site = await prisma.site.findUnique({
      where: { id: validatedData.site_id },
    });

    if (!site) {
      return res.status(404).json({ error: 'Site touristique introuvable.' });
    }

    // Extraction du tarif selon le type de billet
    const tarifsObj = site.tarifs as Record<string, number>;
    const prixUnitaire = tarifsObj[validatedData.type_billet] || 1500;
    const montantTotal = prixUnitaire * validatedData.quantite;

    // Traitement du paiement via le service multi-opérateurs
    const paymentResult = await processMobileMoneyPayment({
      provider: validatedData.provider_paiement,
      phoneNumber: validatedData.telephone_paiement,
      cardNumber: validatedData.card_number,
      cardExpiry: validatedData.card_expiry,
      cardCvc: validatedData.card_cvc,
      amount: montantTotal,
    });

    if (!paymentResult.success) {
      return res.status(400).json({ error: 'Le paiement a été refusé par l\'opérateur.' });
    }

    const tempId = `RES_${Date.now()}`;
    const qrCodeUrl = await generateTicketQRCodeDataUrl(
      tempId,
      site.nom,
      validatedData.quantite,
      new Date(validatedData.date_visite).toLocaleDateString('fr-FR')
    );

    const reservation = await prisma.reservationBillet.create({
      data: {
        site_id: site.id,
        utilisateur_id: validatedData.utilisateur_id || null,
        date_visite: new Date(validatedData.date_visite),
        type_billet: validatedData.type_billet,
        quantite: validatedData.quantite,
        montant_total: montantTotal,
        statut_paiement: StatutPaiement.paye,
        qr_code: qrCodeUrl,
      },
      include: {
        site: {
          select: { nom: true, slug: true, region: true }
        }
      }
    });

    return res.status(201).json({
      message: 'Réservation et paiement enregistrés avec succès.',
      reservation,
      paymentResult,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données de réservation invalides', details: error.errors });
    }
    console.error('Erreur createReservation:', error);
    return res.status(500).json({ error: 'Erreur lors de la création de la réservation.' });
  }
}

export async function getReservationById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const reservation = await prisma.reservationBillet.findUnique({
      where: { id },
      include: {
        site: true,
        utilisateur: {
          select: { id: true, nom: true, email: true }
        }
      },
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Réservation introuvable.' });
    }

    return res.json(reservation);
  } catch (error) {
    console.error('Erreur getReservationById:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération de la réservation.' });
  }
}
