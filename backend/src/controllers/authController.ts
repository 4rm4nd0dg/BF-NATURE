import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { RoleUtilisateur } from '@prisma/client';

const registerSchema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  mot_de_passe: z.string().min(6),
  role: z.nativeEnum(RoleUtilisateur).optional().default(RoleUtilisateur.visiteur),
});

type RegisterInput = z.infer<typeof registerSchema>;

export async function register(req: Request, res: Response) {
  try {
    const validated: RegisterInput = registerSchema.parse(req.body);

    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Un compte avec cet e-mail existe déjà.' });
    }

    const mot_de_passe_hash = await hashPassword(validated.mot_de_passe);

    const user = await prisma.utilisateur.create({
      data: {
        nom: validated.nom,
        email: validated.email,
        telephone: validated.telephone || null,
        mot_de_passe_hash,
        role: validated.role,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(201).json({
      message: 'Compte créé avec succès.',
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données d\'inscription invalides', details: error.errors });
    }
    console.error('Erreur register:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  mot_de_passe: z.string().min(1),
});

type LoginInput = z.infer<typeof loginSchema>;

export async function login(req: Request, res: Response) {
  try {
    const validated: LoginInput = loginSchema.parse(req.body);

    const user = await prisma.utilisateur.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects (email ou mot de passe).' });
    }

    const isValidPassword = await comparePassword(validated.mot_de_passe, user.mot_de_passe_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects (email ou mot de passe).' });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      message: 'Connexion réussie.',
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Données de connexion invalides.' });
    }
    console.error('Erreur login:', error);
    return res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
}
