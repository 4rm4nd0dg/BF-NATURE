'use client';

import React, { useState, useEffect } from 'react';
import {
  loginApi,
  fetchAdminReservations,
  fetchAdminLocations,
  updateLocationStatusApi,
  createContenuAdminApi,
  createEspeceAdminApi,
  deleteEspeceAdminApi,
  fetchSiteEspeces,
  fetchSites,
  Reservation,
  DemandeLocation,
  Espece,
  Site
} from '../lib/api';
import {
  Shield,
  Lock,
  LogOut,
  Ticket,
  Building,
  TreePine,
  PlusCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Trash2,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Formulaire de connexion
  const [email, setEmail] = useState('admin@bangrweoogo.bf');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Navigation Onglets
  const [activeTab, setActiveTab] = useState<'reservations' | 'locations' | 'especes' | 'contenu'>('reservations');

  // Données du Dashboard
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [locations, setLocations] = useState<DemandeLocation[]>([]);
  const [especes, setEspeces] = useState<Espece[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Recherche / Filtres
  const [searchTerm, setSearchTerm] = useState('');

  // Formulaire : Ajouter espèce
  const [newEspece, setNewEspece] = useState({
    categorie: 'animal' as 'animal' | 'plante',
    nom_commun: '',
    nom_scientifique: '',
    description: '',
    photo_url: '',
  });
  const [especeSubmitting, setEspeceSubmitting] = useState(false);

  // Formulaire : Publier contenu
  const [newContenu, setNewContenu] = useState({
    titre: '',
    contenu: '',
    type: 'article' as 'article' | 'quiz' | 'actualite',
  });
  const [contenuSubmitting, setContenuSubmitting] = useState(false);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Récupérer le token au montage
  useEffect(() => {
    const savedToken = localStorage.getItem('bf_admin_token');
    const savedUser = localStorage.getItem('bf_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser({ email: 'admin@bangrweoogo.bf', nom: 'Administrateur Central' });
      }
    }
  }, []);

  // Charger les données lorsque l'onglet ou le token change
  useEffect(() => {
    if (!token) return;
    loadDashboardData();
  }, [token, activeTab]);

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      if (activeTab === 'reservations') {
        const resData = await fetchAdminReservations(token!);
        setReservations(resData);
      } else if (activeTab === 'locations') {
        const locData = await fetchAdminLocations(token!);
        setLocations(locData);
      } else if (activeTab === 'especes') {
        const espData = await fetchSiteEspeces('bangr-weoogo');
        setEspeces(espData);
      }
      const sitesData = await fetchSites();
      setSites(sitesData);
    } catch (err: any) {
      console.warn('Utilisation données fallback dashboard:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const data = await loginApi(email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('bf_admin_token', data.token);
      localStorage.setItem('bf_admin_user', JSON.stringify(data.user));
      showNotification('Connexion réussie au portail d\'administration');
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setLoginError("Le serveur backend (Port 4000) n'est pas démarré. Veuillez lancer 'cd backend && npm run dev' dans un deuxième terminal.");
      } else {
        setLoginError(err.message || 'Identifiants invalides');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bf_admin_token');
    localStorage.removeItem('bf_admin_user');
  };

  const handleUpdateLocationStatus = async (id: string, statut: 'validee' | 'refusee') => {
    try {
      await updateLocationStatusApi(id, statut);
      showNotification(`Demande #${id.substring(0, 6)} passée à: ${statut}`);
      loadDashboardData();
    } catch (err: any) {
      showNotification(err.message || 'Erreur de mise à jour', 'error');
    }
  };

  const handleCreateEspece = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEspece.nom_commun || !newEspece.nom_scientifique) {
      showNotification('Veuillez remplir au moins les noms de l\'espèce', 'error');
      return;
    }

    setEspeceSubmitting(true);
    try {
      // Trouver l'id de Bangr Weoogo ou utiliser le 1er site
      const site = sites.find(s => s.slug === 'bangr-weoogo') || sites[0];
      const payload = {
        ...newEspece,
        site_id: site?.id || 'site-bangr-weoogo',
      };
      await createEspeceAdminApi(token!, payload);
      showNotification(`Espèce "${newEspece.nom_commun}" ajoutée avec succès !`);
      setNewEspece({
        categorie: 'animal',
        nom_commun: '',
        nom_scientifique: '',
        description: '',
        photo_url: '',
      });
      loadDashboardData();
    } catch (err: any) {
      showNotification(err.message || 'Erreur lors de l\'ajout', 'error');
    } finally {
      setEspeceSubmitting(false);
    }
  };

  const handleDeleteEspece = async (id: string, nom: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'espèce "${nom}" ?`)) return;
    try {
      await deleteEspeceAdminApi(token!, id);
      showNotification(`Espèce "${nom}" supprimée`);
      loadDashboardData();
    } catch (err: any) {
      showNotification(err.message || 'Erreur de suppression', 'error');
    }
  };

  const handleCreateContenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContenu.titre || !newContenu.contenu) {
      showNotification('Le titre et le contenu sont requis', 'error');
      return;
    }

    setContenuSubmitting(true);
    try {
      const site = sites.find(s => s.slug === 'bangr-weoogo') || sites[0];
      await createContenuAdminApi(token!, {
        ...newContenu,
        site_id: site?.id,
      });
      showNotification(`Contenu "${newContenu.titre}" publié avec succès !`);
      setNewContenu({ titre: '', contenu: '', type: 'article' });
    } catch (err: any) {
      showNotification(err.message || 'Erreur de publication', 'error');
    } finally {
      setContenuSubmitting(false);
    }
  };

  // Calculs Statistiques
  const totalRevenus = reservations.reduce((acc, curr) => acc + (curr.montant_total || 0), 0);
  const totalReservations = reservations.length;
  const locationsEnAttente = locations.filter(l => l.statut === 'en_attente').length;

  // --- ÉCRAN DE CONNEXION ADMIN (Si non authentifié) ---
  if (!token) {
    return (
      <div className="min-h-screen bg-canopy-deep text-harmattan flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Motif Décoratif Arrière-Plan */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FA65C_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 w-full max-w-md bg-canopy/90 backdrop-blur-xl border border-leaf/20 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-leaf/20 text-leaf rounded-2xl flex items-center justify-center mx-auto mb-4 border border-leaf/30 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-harmattan">Portail Administration</h1>
            <p className="text-sm text-leaf/80 mt-1">Burkina Nature & Culture — Administration Centrale</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 text-red-200 rounded-2xl text-sm flex items-center gap-3">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-sand/80 mb-2">
                Adresse Email Administrateur
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-canopy-deep/80 border border-leaf/30 rounded-2xl text-harmattan focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-all placeholder:text-sand/30"
                placeholder="admin@bangrweoogo.bf"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-sand/80 mb-2">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-canopy-deep/80 border border-leaf/30 rounded-2xl text-harmattan focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf transition-all placeholder:text-sand/30"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-leaf hover:bg-leaf/90 text-canopy-deep font-bold rounded-2xl transition-all shadow-lg hover:shadow-leaf/20 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authentification en cours...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Se Connecter au Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-leaf/10 text-center">
            <p className="text-xs text-sand/50">
              Accès strictement réservé au personnel autorisé de la Direction des Parcs Nationaux du Burkina Faso.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ADMIN (Si authentifié) ---
  return (
    <div className="min-h-screen bg-harmattan flex flex-col">
      {/* Notifications Flottantes */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-sm font-medium transition-all animate-bounce ${
            notification.type === 'success'
              ? 'bg-canopy text-harmattan border-leaf/40'
              : 'bg-red-900 text-white border-red-500'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-leaf" /> : <XCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Barre Supérieure & En-tête Admin */}
      <header className="bg-canopy text-harmattan shadow-md border-b border-leaf/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-leaf/20 text-leaf rounded-xl flex items-center justify-center border border-leaf/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-serif tracking-tight">Burkina Nature Admin</h1>
                <span className="text-[10px] uppercase font-bold bg-leaf/30 text-leaf px-2 py-0.5 rounded-full border border-leaf/40">
                  Projet Autonome
                </span>
              </div>
              <p className="text-xs text-sand/70">Panneau de contrôle et gestion opérationnelle</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-sand/80 hover:text-harmattan flex items-center gap-1 bg-canopy-deep/60 px-3 py-1.5 rounded-xl border border-leaf/20 transition-all"
            >
              <span>Voir Site Public (Port 3000)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-6 w-px bg-leaf/20 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-harmattan">{user?.nom || 'Administrateur Central'}</p>
                <p className="text-[10px] text-sand/60">{user?.email || email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 rounded-xl border border-red-500/20 transition-all"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Cartes KPI / Statistiques Rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-card p-6 rounded-3xl border border-sand shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Réservations Billets</p>
              <h3 className="text-2xl font-bold text-canopy mt-1 font-serif">{totalReservations}</h3>
              <p className="text-xs text-leaf font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Mises à jour en direct
              </p>
            </div>
            <div className="w-12 h-12 bg-canopy/10 text-canopy rounded-2xl flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-sand shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Revenus Générés</p>
              <h3 className="text-2xl font-bold text-canopy mt-1 font-serif">{totalRevenus.toLocaleString()} FCFA</h3>
              <p className="text-xs text-baobab font-medium mt-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Paiements Mobile Money
              </p>
            </div>
            <div className="w-12 h-12 bg-baobab/10 text-baobab rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-sand shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Locations en Attente</p>
              <h3 className="text-2xl font-bold text-canopy mt-1 font-serif">{locationsEnAttente}</h3>
              <p className="text-xs text-amber-600 font-medium mt-1">À valider ou refuser</p>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-3xl border border-sand shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider">Espèces Référencées</p>
              <h3 className="text-2xl font-bold text-canopy mt-1 font-serif">{especes.length}</h3>
              <p className="text-xs text-leaf font-medium mt-1">Parc Bangr-Weoogo</p>
            </div>
            <div className="w-12 h-12 bg-leaf/10 text-leaf rounded-2xl flex items-center justify-center">
              <TreePine className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Barre de Navigation des Onglets */}
        <div className="bg-card p-2 rounded-2xl border border-sand flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'reservations'
                  ? 'bg-canopy text-harmattan shadow-md'
                  : 'text-ink-soft hover:bg-harmattan hover:text-canopy'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Réservations ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'locations'
                  ? 'bg-canopy text-harmattan shadow-md'
                  : 'text-ink-soft hover:bg-harmattan hover:text-canopy'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Demandes d'Espaces ({locations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('especes')}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'especes'
                  ? 'bg-canopy text-harmattan shadow-md'
                  : 'text-ink-soft hover:bg-harmattan hover:text-canopy'
              }`}
            >
              <TreePine className="w-4 h-4" />
              <span>Faune & Flore ({especes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contenu')}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === 'contenu'
                  ? 'bg-canopy text-harmattan shadow-md'
                  : 'text-ink-soft hover:bg-harmattan hover:text-canopy'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Publier Contenu</span>
            </button>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={loadingData}
            className="p-3 text-ink-soft hover:text-canopy hover:bg-harmattan rounded-xl transition-all border border-transparent hover:border-sand flex items-center gap-2 text-xs font-semibold"
            title="Rafraîchir les données"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
        </div>

        {/* CONTENU DE L'ONGLET SÉLECTIONNÉ */}
        <div className="space-y-6">
          
          {/* 1. ONGLET RÉSERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="bg-card rounded-3xl border border-sand shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
                <div>
                  <h2 className="text-xl font-bold font-serif text-canopy">Gestion des Billets & Visites</h2>
                  <p className="text-sm text-ink-soft">Historique des billets émis et statut des paiements</p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                  <input
                    type="text"
                    placeholder="Filtrer par type ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf"
                  />
                </div>
              </div>

              {reservations.length === 0 ? (
                <div className="text-center py-12 text-ink-soft space-y-3">
                  <Ticket className="w-12 h-12 mx-auto text-sand" />
                  <p className="text-base font-medium">Aucune réservation enregistrée pour le moment.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-sand text-xs font-semibold text-ink-soft uppercase tracking-wider bg-harmattan/50">
                        <th className="py-3 px-4">ID Réservation</th>
                        <th className="py-3 px-4">Date Visite</th>
                        <th className="py-3 px-4">Type Billet</th>
                        <th className="py-3 px-4">Quantité</th>
                        <th className="py-3 px-4">Montant Total</th>
                        <th className="py-3 px-4">Statut Paiement</th>
                        <th className="py-3 px-4">QR Code Billet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/50 text-sm">
                      {reservations
                        .filter(r => r.type_billet.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.includes(searchTerm))
                        .map((r) => (
                          <tr key={r.id} className="hover:bg-harmattan/30 transition-all">
                            <td className="py-4 px-4 font-mono text-xs font-bold text-canopy">{r.id.substring(0, 8)}...</td>
                            <td className="py-4 px-4 font-medium">{new Date(r.date_visite).toLocaleDateString('fr-FR')}</td>
                            <td className="py-4 px-4 capitalize font-semibold text-ink">{r.type_billet.replace('_', ' ')}</td>
                            <td className="py-4 px-4 font-bold">{r.quantite}</td>
                            <td className="py-4 px-4 font-bold text-canopy">{r.montant_total.toLocaleString()} FCFA</td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle className="w-3.5 h-3.5" /> Payé
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-mono text-xs text-ink-soft bg-sand/40 px-2 py-1 rounded border border-sand">
                                {r.qr_code ? r.qr_code.substring(0, 14) + '...' : 'VAL-BN-' + r.id.substring(0, 4)}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 2. ONGLET DEMANDES DE LOCATION */}
          {activeTab === 'locations' && (
            <div className="bg-card rounded-3xl border border-sand shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
                <div>
                  <h2 className="text-xl font-bold font-serif text-canopy">Demandes de Privatisation & Location</h2>
                  <p className="text-sm text-ink-soft">Validez ou refusez les demandes d'évènements sur les sites</p>
                </div>
              </div>

              {locations.length === 0 ? (
                <div className="text-center py-12 text-ink-soft space-y-3">
                  <Building className="w-12 h-12 mx-auto text-sand" />
                  <p className="text-base font-medium">Aucune demande de location en cours.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-sand text-xs font-semibold text-ink-soft uppercase tracking-wider bg-harmattan/50">
                        <th className="py-3 px-4">Demandeur</th>
                        <th className="py-3 px-4">Type Événement</th>
                        <th className="py-3 px-4">Date & Horaires</th>
                        <th className="py-3 px-4">Personnes</th>
                        <th className="py-3 px-4">Devis Estimé</th>
                        <th className="py-3 px-4">Statut Actuel</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/50 text-sm">
                      {locations.map((loc) => (
                        <tr key={loc.id} className="hover:bg-harmattan/30 transition-all">
                          <td className="py-4 px-4">
                            <p className="font-semibold text-canopy">{loc.nom_demandeur || 'Organisateur'}</p>
                            <p className="text-xs text-ink-soft">{loc.email_demandeur} • {loc.telephone_demandeur}</p>
                          </td>
                          <td className="py-4 px-4 font-medium capitalize">{loc.type_evenement}</td>
                          <td className="py-4 px-4 font-medium">
                            {new Date(loc.date_evenement).toLocaleDateString('fr-FR')}
                            <span className="block text-xs text-ink-soft">{loc.heure_debut} - {loc.heure_fin}</span>
                          </td>
                          <td className="py-4 px-4 font-bold">{loc.nombre_personnes} pers.</td>
                          <td className="py-4 px-4 font-bold text-baobab">
                            {loc.montant_devis ? `${loc.montant_devis.toLocaleString()} FCFA` : 'N/A'}
                          </td>
                          <td className="py-4 px-4">
                            {loc.statut === 'validee' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle className="w-3.5 h-3.5" /> Validée
                              </span>
                            )}
                            {loc.statut === 'refusee' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                                <XCircle className="w-3.5 h-3.5" /> Refusée
                              </span>
                            )}
                            {loc.statut === 'en_attente' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                En attente
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleUpdateLocationStatus(loc.id, 'validee')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Valider
                              </button>
                              <button
                                onClick={() => handleUpdateLocationStatus(loc.id, 'refusee')}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Refuser
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 3. ONGLET FAUNE & FLORE */}
          {activeTab === 'especes' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire Ajout Espèce */}
              <div className="bg-card rounded-3xl border border-sand shadow-sm p-6 lg:col-span-1 space-y-5 h-fit">
                <div className="flex items-center gap-3 pb-3 border-b border-sand">
                  <div className="p-2 bg-leaf/10 text-leaf rounded-xl">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold font-serif text-canopy">Ajouter une Espèce</h3>
                    <p className="text-xs text-ink-soft">Enregistrer un nouvel animal ou une plante</p>
                  </div>
                </div>

                <form onSubmit={handleCreateEspece} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Catégorie</label>
                    <select
                      value={newEspece.categorie}
                      onChange={(e) => setNewEspece({ ...newEspece, categorie: e.target.value as any })}
                      className="w-full p-3 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf font-medium"
                    >
                      <option value="animal">Animal (Faune)</option>
                      <option value="plante">Plante / Arbre (Flore)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Nom Commun *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Crocodylus niloticus (Crocodile)"
                      value={newEspece.nom_commun}
                      onChange={(e) => setNewEspece({ ...newEspece, nom_commun: e.target.value })}
                      className="w-full p-3 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Nom Scientifique *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Adansonia digitata"
                      value={newEspece.nom_scientifique}
                      onChange={(e) => setNewEspece({ ...newEspece, nom_scientifique: e.target.value })}
                      className="w-full p-3 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf font-serif italic"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">URL de la Photo</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newEspece.photo_url}
                      onChange={(e) => setNewEspece({ ...newEspece, photo_url: e.target.value })}
                      className="w-full p-3 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Description & Habitat</label>
                    <textarea
                      rows={3}
                      placeholder="Présentation et statut de protection de l'espèce..."
                      value={newEspece.description}
                      onChange={(e) => setNewEspece({ ...newEspece, description: e.target.value })}
                      className="w-full p-3 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={especeSubmitting}
                    className="w-full py-3.5 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    {especeSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        Publier l'espèce
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Liste des Espèces */}
              <div className="bg-card rounded-3xl border border-sand shadow-sm p-6 lg:col-span-2 space-y-6">
                <div className="pb-4 border-b border-sand">
                  <h2 className="text-xl font-bold font-serif text-canopy">Catalogue des Espèces Protégées</h2>
                  <p className="text-sm text-ink-soft">Espèces du parc Bangr Weoogo et des réserves naturelles</p>
                </div>

                {especes.length === 0 ? (
                  <div className="text-center py-12 text-ink-soft space-y-3">
                    <TreePine className="w-12 h-12 mx-auto text-sand" />
                    <p className="text-base font-medium">Aucune espèce enregistrée.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {especes.map((esp) => (
                      <div key={esp.id} className="p-4 bg-harmattan/50 border border-sand rounded-2xl flex flex-col justify-between hover:border-leaf/40 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${esp.categorie === 'animal' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {esp.categorie === 'animal' ? 'Faune' : 'Flore'}
                            </span>
                            <h4 className="font-bold text-canopy mt-2 text-base">{esp.nom_commun}</h4>
                            <p className="text-xs font-serif italic text-baobab">{esp.nom_scientifique}</p>
                          </div>

                          <button
                            onClick={() => handleDeleteEspece(esp.id, esp.nom_commun)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {esp.description && (
                          <p className="text-xs text-ink-soft mt-3 line-clamp-2">{esp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. ONGLET PUBLIER CONTENU */}
          {activeTab === 'contenu' && (
            <div className="max-w-2xl mx-auto bg-card rounded-3xl border border-sand shadow-sm p-8 space-y-6">
              <div className="pb-4 border-b border-sand">
                <h2 className="text-xl font-bold font-serif text-canopy">Publication de Contenus & Sensibilisation</h2>
                <p className="text-sm text-ink-soft">Diffusion d'articles pédagogiques et d'actualités écologiques</p>
              </div>

              <form onSubmit={handleCreateContenu} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">Type de Publication</label>
                  <select
                    value={newContenu.type}
                    onChange={(e) => setNewContenu({ ...newContenu, type: e.target.value as any })}
                    className="w-full p-3.5 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf font-medium"
                  >
                    <option value="article">Article Pédagogique (Faune & Flore)</option>
                    <option value="actualite">Actualité du Parc</option>
                    <option value="quiz">Quiz / Contenu Intéractif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">Titre de la Publication *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: La Préservation du Poumon Vert de Ouagadougou"
                    value={newContenu.titre}
                    onChange={(e) => setNewContenu({ ...newContenu, titre: e.target.value })}
                    className="w-full p-3.5 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf font-semibold text-canopy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">Contenu de l'Article *</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Rédigez le texte détaillé de sensibilisation..."
                    value={newContenu.contenu}
                    onChange={(e) => setNewContenu({ ...newContenu, contenu: e.target.value })}
                    className="w-full p-3.5 bg-harmattan border border-sand rounded-xl text-sm focus:outline-none focus:border-leaf"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contenuSubmitting}
                  className="w-full py-4 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {contenuSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Publication en cours...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Publier l'Article Officiel
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
