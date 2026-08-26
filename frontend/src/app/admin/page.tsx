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
  Reservation,
  DemandeLocation,
  Espece
} from '../../lib/api';
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
  FileText
} from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Login form
  const [email, setEmail] = useState('admin@bangrweoogo.bf');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'reservations' | 'locations' | 'especes' | 'contenu'>('reservations');

  // Dashboard Data
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [locations, setLocations] = useState<DemandeLocation[]>([]);
  const [especes, setEspeces] = useState<Espece[]>([]);

  // Form State: Ajouter espèce
  const [newEspece, setNewEspece] = useState({
    categorie: 'animal',
    nom_commun: '',
    nom_scientifique: '',
    description: '',
    photo_url: '',
  });

  // Form State: Publier contenu
  const [newContenu, setNewContenu] = useState({
    titre: '',
    contenu: '',
    type: 'article',
  });

  const [message, setMessage] = useState('');

  // Check saved token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('bf_admin_token');
    const savedUser = localStorage.getItem('bf_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch admin dashboard data on token or tab change
  useEffect(() => {
    if (!token) return;
    loadDashboardData();
  }, [token, activeTab]);

  const loadDashboardData = async () => {
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
    } catch (err: any) {
      console.warn('Utilisation données fallback dashboard:', err);
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
    } catch (err: any) {
      setLoginError(err.message || 'Identifiants de gestionnaire incorrects.');
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

  const handleLocationStatusChange = async (id: string, statut: string) => {
    try {
      await updateLocationStatusApi(id, statut);
      setMessage(`Statut mis à jour : ${statut}`);
      loadDashboardData();
    } catch (err: any) {
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  const handleAddEspece = async (e: React.FormEvent) => {
    e.preventDefault();
    const siteId = 'c0a80101-0000-0000-0000-000000000001';
    try {
      await createEspeceAdminApi(token!, {
        site_id: siteId,
        ...newEspece,
      });
      setMessage('Nouvelle espèce ajoutée avec succès !');
      setNewEspece({ categorie: 'animal', nom_commun: '', nom_scientifique: '', description: '', photo_url: '' });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la création');
    }
  };

  const handleDeleteEspece = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette espèce ?')) return;
    try {
      await deleteEspeceAdminApi(token!, id);
      setMessage('Espèce supprimée.');
      loadDashboardData();
    } catch (err: any) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleAddContenu = async (e: React.FormEvent) => {
    e.preventDefault();
    const siteId = 'c0a80101-0000-0000-0000-000000000001';
    try {
      await createContenuAdminApi(token!, {
        site_id: siteId,
        ...newContenu,
      });
      setMessage('Contenu de sensibilisation publié !');
      setNewContenu({ titre: '', contenu: '', type: 'article' });
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la publication');
    }
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="py-20 bg-harmattan min-h-screen flex items-center justify-center px-6">
        <div className="bg-card max-w-md w-full rounded-3xl p-8 border border-[#E9E1CC] shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-canopy/10 text-canopy rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-canopy-deep">
              Espace Gestionnaire
            </h1>
            <p className="text-xs text-ink-soft mt-1">
              Portail d'administration du Parc Urbain Bangr-Weoogo
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-2xl mb-4 border border-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1">
                Adresse Email Gestionnaire
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs font-medium text-ink focus:outline-none focus:border-canopy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs font-medium text-ink focus:outline-none focus:border-canopy"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-canopy hover:bg-canopy-deep text-white py-3.5 rounded-full font-medium text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 mt-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Connexion en cours...
                </>
              ) : (
                'Se connecter au Back-Office'
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-ink-soft mt-6 bg-sand p-3 rounded-xl">
            💡 Identifiants de démo : <br />
            <strong>admin@bangrweoogo.bf</strong> / <strong>AdminPassword123!</strong>
          </p>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="py-10 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Dashboard Header */}
        <div className="bg-canopy-deep text-harmattan rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-1">
              <Shield className="w-4 h-4" /> Back-Office Administration
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-medium">
              Tableau de Bord Gestionnaire
            </h1>
            <p className="text-xs text-[#C9D3C0] mt-0.5">
              Connecté en tant que <strong className="text-white">{user?.nom || 'Gestionnaire'}</strong> ({user?.role})
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>

        {message && (
          <div className="bg-leaf/20 text-canopy border border-leaf/40 text-xs p-3.5 rounded-2xl mb-6 flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="font-bold">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 border-b border-[#E9E1CC]">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft hover:bg-sand'
            }`}
          >
            <Ticket className="w-4 h-4" /> Réservations Billets
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'locations'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft hover:bg-sand'
            }`}
          >
            <Building className="w-4 h-4" /> Demandes de Location
          </button>

          <button
            onClick={() => setActiveTab('especes')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'especes'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft hover:bg-sand'
            }`}
          >
            <TreePine className="w-4 h-4" /> Faune &amp; Flore (Espèces)
          </button>

          <button
            onClick={() => setActiveTab('contenu')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'contenu'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft hover:bg-sand'
            }`}
          >
            <FileText className="w-4 h-4" /> Publier Contenu
          </button>
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-sm">
            <h2 className="font-serif text-xl font-medium text-canopy mb-4">
              Suivi des Réservations de Billets
            </h2>
            {reservations.length === 0 ? (
              <p className="text-xs text-ink-soft py-8 text-center">
                Aucune réservation enregistrée pour le moment.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E9E1CC] text-ink-soft">
                      <th className="pb-3">Réf / Date Visite</th>
                      <th className="pb-3">Type Billet</th>
                      <th className="pb-3">Quantité</th>
                      <th className="pb-3">Montant</th>
                      <th className="pb-3">Statut Paiement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1CC]">
                    {reservations.map((r) => (
                      <tr key={r.id} className="hover:bg-harmattan/50">
                        <td className="py-3 font-mono font-medium text-canopy">
                          {r.id.substring(0, 8)}...
                          <span className="block text-[10px] text-ink-soft font-sans">
                            {new Date(r.date_visite).toLocaleDateString('fr-FR')}
                          </span>
                        </td>
                        <td className="py-3 font-medium uppercase text-ink">{r.type_billet}</td>
                        <td className="py-3 font-semibold">{r.quantite} pers</td>
                        <td className="py-3 font-semibold text-baobab">
                          {r.montant_total.toLocaleString()} FCFA
                        </td>
                        <td className="py-3">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-leaf/20 text-leaf text-[10px] font-semibold">
                            {r.statut_paiement}
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

        {/* TAB 2: DEMANDES DE LOCATION */}
        {activeTab === 'locations' && (
          <div className="bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-sm">
            <h2 className="font-serif text-xl font-medium text-canopy mb-4">
              Gestion des Demandes de Location d'Espaces
            </h2>
            {locations.length === 0 ? (
              <p className="text-xs text-ink-soft py-8 text-center">
                Aucune demande de location enregistrée.
              </p>
            ) : (
              <div className="space-y-4">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-5 rounded-2xl bg-harmattan border border-[#E9E1CC] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif font-semibold text-base text-canopy">
                          {loc.espace?.nom || 'Espace du parc'}
                        </h3>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                            loc.statut === 'validee'
                              ? 'bg-leaf/20 text-leaf'
                              : loc.statut === 'refusee'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-baobab/15 text-baobab'
                          }`}
                        >
                          {loc.statut}
                        </span>
                      </div>

                      <p className="text-xs text-ink-soft">
                        Demandeur : <strong>{loc.nom_demandeur}</strong> ({loc.telephone_demandeur}) — Date :{' '}
                        {new Date(loc.date_evenement).toLocaleDateString('fr-FR')} ({loc.heure_debut} à {loc.heure_fin})
                      </p>

                      <div className="text-xs font-semibold text-baobab mt-1">
                        Devis : {loc.montant_devis.toLocaleString()} FCFA ({loc.nombre_personnes} personnes)
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLocationStatusChange(loc.id, 'validee')}
                        className="bg-leaf text-white px-3.5 py-1.5 rounded-full text-xs font-medium hover:bg-canopy transition flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Valider
                      </button>
                      <button
                        onClick={() => handleLocationStatusChange(loc.id, 'refusee')}
                        className="bg-red-500 text-white px-3.5 py-1.5 rounded-full text-xs font-medium hover:bg-red-700 transition flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ESPECES */}
        {activeTab === 'especes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-sm">
              <h2 className="font-serif text-xl font-medium text-canopy mb-4">
                Liste des Espèces Répertoriées ({especes.length})
              </h2>
              <div className="space-y-3">
                {especes.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-2xl bg-harmattan border border-[#E9E1CC] flex justify-between items-center"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-leaf block">
                        {e.categorie}
                      </span>
                      <h4 className="font-serif font-medium text-ink text-base">
                        {e.nom_commun}{' '}
                        <span className="text-xs italic text-ink-soft font-normal">
                          ({e.nom_scientifique})
                        </span>
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDeleteEspece(e.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Ajouter Espèce */}
            <div className="lg:col-span-5 bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-sm">
              <h2 className="font-serif text-xl font-medium text-canopy mb-4">
                Ajouter une Nouvelle Espèce
              </h2>
              <form onSubmit={handleAddEspece} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">Catégorie</label>
                  <select
                    value={newEspece.categorie}
                    onChange={(e) => setNewEspece({ ...newEspece, categorie: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  >
                    <option value="animal">Animal / Faune</option>
                    <option value="plante">Plante / Flore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">Nom commun</label>
                  <input
                    type="text"
                    value={newEspece.nom_commun}
                    onChange={(e) => setNewEspece({ ...newEspece, nom_commun: e.target.value })}
                    placeholder="Ex: Hérisson du désert"
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">Nom scientifique</label>
                  <input
                    type="text"
                    value={newEspece.nom_scientifique}
                    onChange={(e) => setNewEspece({ ...newEspece, nom_scientifique: e.target.value })}
                    placeholder="Ex: Paraechinus aethiopicus"
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newEspece.description}
                    onChange={(e) => setNewEspece({ ...newEspece, description: e.target.value })}
                    placeholder="Description de l'espèce..."
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">URL de la photo</label>
                  <input
                    type="text"
                    value={newEspece.photo_url}
                    onChange={(e) => setNewEspece({ ...newEspece, photo_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-canopy text-white py-3 rounded-full font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-canopy-deep transition"
                >
                  <PlusCircle className="w-4 h-4" /> Enregistrer l'espèce
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLIER CONTENU */}
        {activeTab === 'contenu' && (
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-sm">
            <h2 className="font-serif text-xl font-medium text-canopy mb-4">
              Publier un Article ou Quiz de Sensibilisation
            </h2>

            <form onSubmit={handleAddContenu} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">Type de contenu</label>
                <select
                  value={newContenu.type}
                  onChange={(e) => setNewContenu({ ...newContenu, type: e.target.value })}
                  className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                >
                  <option value="article">Article Écologique</option>
                  <option value="quiz">Quiz Interactif</option>
                  <option value="actualite">Actualité du Parc</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">Titre du contenu</label>
                <input
                  type="text"
                  value={newContenu.titre}
                  onChange={(e) => setNewContenu({ ...newContenu, titre: e.target.value })}
                  placeholder="Ex: Protection du marigot pendant la saison sèche"
                  required
                  className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1">Contenu texte</label>
                <textarea
                  rows={6}
                  value={newContenu.contenu}
                  onChange={(e) => setNewContenu({ ...newContenu, contenu: e.target.value })}
                  placeholder="Rédigez l'article..."
                  required
                  className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-baobab text-white py-3.5 rounded-full font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#966226] transition shadow-md"
              >
                <FileText className="w-4 h-4" /> Publier sur le site
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
