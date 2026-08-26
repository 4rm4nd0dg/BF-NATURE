import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export async function getAllSites(req: Request, res: Response) {
  try {
    const sites = await prisma.site.findMany({
      include: {
        _count: {
          select: { especes: true, espaces_location: true }
        }
      },
      orderBy: { created_at: 'desc' },
    });
    return res.json(sites);
  } catch (error) {
    console.error('Erreur getAllSites:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des sites.' });
  }
}

export async function getSiteBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  try {
    const site = await prisma.site.findUnique({
      where: { slug },
      include: {
        especes: true,
        espaces_location: true,
        personnel: true,
        contenus_sensibilisation: {
          take: 3,
          orderBy: { publie_le: 'desc' }
        }
      },
    });

    if (!site) {
      return res.status(404).json({ error: 'Site introuvable.' });
    }

    return res.json(site);
  } catch (error) {
    console.error('Erreur getSiteBySlug:', error);
    return res.status(500).json({ error: 'Erreur lors de la recherche du site.' });
  }
}

export async function getSiteEspeces(req: Request, res: Response) {
  const { slug } = req.params;
  try {
    const site = await prisma.site.findUnique({
      where: { slug },
      select: { id: true, nom: true }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site introuvable.' });
    }

    const especes = await prisma.espece.findMany({
      where: { site_id: site.id },
      orderBy: { nom_commun: 'asc' }
    });

    return res.json(especes);
  } catch (error) {
    console.error('Erreur getSiteEspeces:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des espèces.' });
  }
}

export async function getSiteEspaces(req: Request, res: Response) {
  const { slug } = req.params;
  try {
    const site = await prisma.site.findUnique({
      where: { slug },
      select: { id: true, nom: true }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site introuvable.' });
    }

    const espaces = await prisma.espaceLocation.findMany({
      where: { site_id: site.id },
      orderBy: { tarif_horaire: 'asc' }
    });

    return res.json(espaces);
  } catch (error) {
    console.error('Erreur getSiteEspaces:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des espaces.' });
  }
}
