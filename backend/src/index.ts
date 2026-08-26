import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware global
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Logger de requêtes simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route de Santé / Info API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Burkina Nature & Culture API Central',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Router principal /api
app.use('/api', apiRouter);

// Gestionnaire d'erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: `Route non trouvée: ${req.method} ${req.url}` });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur API Burkina Nature & Culture en écoute sur http://localhost:${PORT}`);
});
