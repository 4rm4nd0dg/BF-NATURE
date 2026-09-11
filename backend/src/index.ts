import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 1. En-têtes de sécurité HTTP (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === 'production',
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. Configuration CORS sécurisée (Limiter aux origines de l'application)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origine non autorisée par la politique CORS'));
      }
    },
    credentials: true,
  })
);

// 3. Limitation du débit global (Rate limiting)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max 200 requêtes par IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard.' },
});
app.use(globalLimiter);

// 4. Rate Limiter strict pour les routes d'authentification (Anti-Brute Force Login)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 essais de connexion par 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Nombre maximal de tentatives de connexion dépassé. Veuillez réessayer dans 15 minutes.' },
});

// 5. Restriction de la taille maximale des payloads d'upload (5MB max)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 6. Logger HTTP propre
app.use((req, res, next) => {
  if (NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Route de Santé / Info API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Burkina Nature & Culture API Central',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Router principal /api
app.use('/api', apiRouter);

// Gestionnaire 404 API
app.use((req, res) => {
  res.status(404).json({ error: `Route non trouvée : ${req.method} ${req.originalUrl}` });
});

// 7. Middleware central de gestion des erreurs (Masque les stack traces en production)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur API non capturée :', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Une erreur interne du serveur est survenue.';

  res.status(statusCode).json({
    error: message,
    ...(NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur API Burkina Nature & Culture sécurisé en écoute sur http://localhost:${PORT}`);
});
