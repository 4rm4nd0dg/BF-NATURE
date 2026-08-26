import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { StatutDemandeLocation } from '@prisma/client';

const locationSchema = z.object({
  espace_id: z.string().uuid(),
  utilisateur_id: z.string().uuid().optional(),
  nom_demandeur: z.string().min(2),
  email_demandeur: z.string().email(),
  telephone_demandeur: z.string().min(8),
  date_evenement: z.string(),
  heure_debut: z.string(),
  heure_fin: z.string(),
  type_evenement: z.string().min(2),
  nombre_personnes: z.number().int().positive(),
});

type LocationInput = z.infer<typeof locationSchema>;

function calculateHours(startStr: string, endStr: string): number {
  const [sH, sM] = startStr.split(':').map(Number);
  const [eH, eM] = endStr.split(':').map(Number);
  
  const startMinutes = sH * 60 + (sM || 0);
  const endMinutes = eH * 60 + (eM || 0);
  
  const diffMinutes = endMinutes - startMinutes;
  return Math.max(1, Math.ceil(diffMinutes / 60));
}

export async function createDemandeLocation(req: Request, res: Response) {
  try {
    const validatedData: LocationInput = locationSchema.parse(req.body);

    const espace = await prisma.espaceLocation.findUnique({
      where: { id: validatedData.espace_id },
    });

    if (!espace) {
      return res.status(404).json({ error: 'Espace de location introuvable.' });
    }

    const dureeHeures = calculateHours(validatedData.heure_debut, validatedData.heure_fin);
    const montantDevis = dureeHeures * espace.tarif_horaire;

    const demande = await prisma.demandeLocation.create({
      data: {
        espace_id: espace.id,
        utilisateur_id: validatedData.utilisateur_id || null,
        nom_demandeur: validatedData.nom_demandeur,
        email_demandeur: validatedData.email_demandeur,
        telephone_demandeur: validatedData.telephone_demandeur,
        date_evenement: new Date(validatedData.date_evenement),
        heure_debut: validatedData.heure_debut,
        heure_fin: validatedData.heure_fin,
        type_evenement: validatedData.type_evenement,
        nombre_personnes: validatedData.nombre_personnes,
        montant_devis: montantDevis,
        statut: StatutDemandeLocation.en_attente,
      },
      include: {
        espace: {
          select: { nom: true, capacite: true, tarif_horaire: true }
        }
      }
    });

    return res.status(201).json({
      message: 'Demande de location enregistrée. Devis calculé automatiquement.',
      demande,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données de location invalides', details: error.errors });
    }
    console.error('Erreur createDemandeLocation:', error);
    return res.status(500).json({ error: 'Erreur lors de la réservation de l\'espace.' });
  }
}

const updateStatusSchema = z.object({
  statut: z.nativeEnum(StatutDemandeLocation),
});

export async function updateDemandeLocationStatus(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { statut } = updateStatusSchema.parse(req.body);

    const updated = await prisma.demandeLocation.update({
      where: { id },
      data: { statut },
      include: { espace: true }
    });

    return res.json({
      message: `Statut de la demande de location mis à jour : ${statut}`,
      demande: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Statut invalide.' });
    }
    console.error('Erreur updateDemandeLocationStatus:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour de la demande.' });
  }
}
