import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { TypeContenu, CategorieEspece } from '@prisma/client';

const contenuSchema = z.object({
  site_id: z.string().uuid().optional(),
  titre: z.string().min(3),
  contenu: z.string().min(10),
  type: z.nativeEnum(TypeContenu).optional().default(TypeContenu.article),
});

type ContenuInput = z.infer<typeof contenuSchema>;

export async function createContenuSensibilisation(req: Request, res: Response) {
  try {
    const validated: ContenuInput = contenuSchema.parse(req.body);

    const contenu = await prisma.contenuSensibilisation.create({
      data: {
        site_id: validated.site_id || null,
        titre: validated.titre,
        contenu: validated.contenu,
        type: validated.type,
      },
    });

    return res.status(201).json({
      message: 'Contenu de sensibilisation créé avec succès.',
      contenu,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données de contenu invalides', details: error.errors });
    }
    console.error('Erreur createContenuSensibilisation:', error);
    return res.status(500).json({ error: 'Erreur lors de la création du contenu.' });
  }
}

export async function getContenusSensibilisation(req: Request, res: Response) {
  try {
    const contenus = await prisma.contenuSensibilisation.findMany({
      orderBy: { publie_le: 'desc' },
      include: {
        site: {
          select: { nom: true, slug: true }
        }
      }
    });
    return res.json(contenus);
  } catch (error) {
    console.error('Erreur getContenusSensibilisation:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des contenus.' });
  }
}

export async function getAdminReservations(req: Request, res: Response) {
  try {
    const reservations = await prisma.reservationBillet.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        site: { select: { nom: true, slug: true } },
        utilisateur: { select: { nom: true, email: true, telephone: true } }
      }
    });
    return res.json(reservations);
  } catch (error) {
    console.error('Erreur getAdminReservations:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des réservations.' });
  }
}

export async function getAdminLocations(req: Request, res: Response) {
  try {
    const locations = await prisma.demandeLocation.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        espace: { select: { nom: true, tarif_horaire: true } }
      }
    });
    return res.json(locations);
  } catch (error) {
    console.error('Erreur getAdminLocations:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des demandes de location.' });
  }
}

const especeSchema = z.object({
  site_id: z.string().uuid(),
  categorie: z.nativeEnum(CategorieEspece),
  nom_commun: z.string().min(2),
  nom_scientifique: z.string().min(2),
  description: z.string().min(5),
  photo_url: z.string().url().or(z.string().min(1)),
});

type EspeceInput = z.infer<typeof especeSchema>;

export async function createEspece(req: Request, res: Response) {
  try {
    const validated: EspeceInput = especeSchema.parse(req.body);
    const espece = await prisma.espece.create({
      data: validated,
    });
    return res.status(201).json({ message: 'Espèce créée avec succès.', espece });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données d\'espèce invalides', details: error.errors });
    }
    console.error('Erreur createEspece:', error);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'espèce.' });
  }
}

export async function deleteEspece(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.espece.delete({ where: { id } });
    return res.json({ message: 'Espèce supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur deleteEspece:', error);
    return res.status(500).json({ error: 'Erreur lors de la suppression de l\'espèce.' });
  }
}
