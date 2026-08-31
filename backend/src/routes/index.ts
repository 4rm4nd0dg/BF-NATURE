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
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

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

// Routes Authentification
router.post('/auth/register', register);
router.post('/auth/login', login);

// Routes publiques Contenus de sensibilisation
router.get('/contenus', getContenusSensibilisation);

// Routes Admin Protégées (Rôles : gestionnaire, super_admin)
router.post('/admin/contenus', requireAuth, requireRole('gestionnaire', 'super_admin'), createContenuSensibilisation);
router.get('/admin/reservations', requireAuth, requireRole('gestionnaire', 'super_admin'), getAdminReservations);
router.get('/admin/locations', requireAuth, requireRole('gestionnaire', 'super_admin'), getAdminLocations);
router.post('/admin/especes', requireAuth, requireRole('gestionnaire', 'super_admin'), createEspece);
router.delete('/admin/especes/:id', requireAuth, requireRole('gestionnaire', 'super_admin'), deleteEspece);

export default router;
