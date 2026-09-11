import { Router } from 'express';
import { getAllSites, getSiteBySlug, getSiteEspeces, getSiteEspaces } from '../controllers/siteController.js';
import { createReservation, getReservationById } from '../controllers/reservationController.js';
import {
  createDemandeLocation,
  getDemandeLocationById,
  updateDemandeLocationStatus,
  payLocationDemande
} from '../controllers/locationController.js';
import { register, login } from '../controllers/authController.js';
import {
  createContenuSensibilisation,
  getContenusSensibilisation,
  getAdminReservations,
  getAdminLocations,
  createEspece,
  deleteEspece
} from '../controllers/adminController.js';
import { handlePaymentWebhook } from '../controllers/webhookController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { authLimiter } from '../index.js';

const router = Router();

// Routes publiques Sites
router.get('/sites', getAllSites);
router.get('/sites/:slug', getSiteBySlug);
router.get('/sites/:slug/especes', getSiteEspeces);
router.get('/sites/:slug/espaces', getSiteEspaces);

// Routes publiques Réservations de billets
router.post('/reservations', createReservation);
router.get('/reservations/:id', getReservationById);

// Routes Location d'espaces
router.post('/locations', createDemandeLocation);
router.get('/locations/:id', getDemandeLocationById);
router.patch('/locations/:id', updateDemandeLocationStatus);
router.post('/locations/:id/pay', payLocationDemande);

// Routes Authentification sécurisées avec limitation de débit (Anti Brute-Force)
router.post('/auth/register', authLimiter, register);
router.post('/auth/login', authLimiter, login);

// Webhook de paiement sécurisé avec signature HMAC SHA-256
router.post('/webhooks/payment', handlePaymentWebhook);

// Routes publiques Contenus de sensibilisation
router.get('/contenus', getContenusSensibilisation);

// Routes Admin Protégées (Rôles : gestionnaire, super_admin avec vérification serveur)
router.post('/admin/contenus', requireAuth, requireRole('gestionnaire', 'super_admin'), createContenuSensibilisation);
router.get('/admin/reservations', requireAuth, requireRole('gestionnaire', 'super_admin'), getAdminReservations);
router.get('/admin/locations', requireAuth, requireRole('gestionnaire', 'super_admin'), getAdminLocations);
router.post('/admin/especes', requireAuth, requireRole('gestionnaire', 'super_admin'), createEspece);
router.delete('/admin/especes/:id', requireAuth, requireRole('gestionnaire', 'super_admin'), deleteEspece);

export default router;
