import rateLimit from 'express-rate-limit';

// Rate Limiter strict pour les routes d'authentification (Anti-Brute Force Login)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 essais de connexion par 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Nombre maximal de tentatives de connexion dépassé. Veuillez réessayer dans 15 minutes.' },
});