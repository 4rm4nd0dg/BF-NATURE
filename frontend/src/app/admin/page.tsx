'use client';

import React, { useState, useEffect } from 'react';
import {
  fetchAdminLocations,
  fetchAdminReservations,
  updateLocationStatusApi,
  DemandeLocation,
  Reservation,
} from '../../lib/api';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Building,
  Ticket,
  Users,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Lock,
  Check,
  X,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'locations' | 'reservations' | 'stats'>('locations');
  const [locationFilter, setLocationFilter] = useState<'all' | 'en_attente' | 'validee' | 'refusee'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data fallback for Admin Dashboard
  const [locations, setLocations] = useState<DemandeLocation[]>([
    {
      id: 'LOC-2026-101',
      espace_id: 'e100-salle-750',
      nom_demandeur: 'Ministère des Eaux et Forêts',
      email_demandeur: 'contact@environnement.gov.bf',
      telephone_demandeur: '70221144',
      date_evenement: '2026-09-12',
      heure_debut: '08:00',
      heure_fin: '16:00',
      type_evenement: 'Conférence Nationale Climat & Forêt',
      nombre_personnes: 600,
      statut: 'en_attente',
      montant_devis: 400000,
      created_at: new Date().toISOString(),
      espace: { nom: 'Salle Polyvalente de 750 places (Chantier 2026)' },
    },
    {
      id: 'LOC-2026-102',
      espace_id: 'e101-canopee',
      nom_demandeur: 'Association Écologique Ouaga Nature',
      email_demandeur: 'info@ouaganature.org',
      telephone_demandeur: '76554433',
      date_evenement: '2026-09-20',
      heure_debut: '15:00',
      heure_fin: '22:00',
      type_evenement: 'Gala de Levée de Fonds Biodiversité',
      nombre_personnes: 350,
      statut: 'en_attente',
      montant_devis: 245000,
      created_at: new Date().toISOString(),
      espace: { nom: 'Espace Événementiel Canopée' },
    },
    {
      id: 'LOC-2026-099',
      espace_id: 'e102-amphi',
      nom_demandeur: 'Université Joseph Ki-Zerbo',
      email_demandeur: 'botanique@ujkz.bf',
      telephone_demandeur: '78009988',
      date_evenement: '2026-09-08',
      heure_debut: '09:00',
      heure_fin: '13:00',
      type_evenement: 'Symposium Écologie Sahélienne',
      nombre_personnes: 200,
      statut: 'validee',
      montant_devis: 100000,
      created_at: new Date().toISOString(),
      espace: { nom: 'Amphithéâtre du Jardin Botanique' },
    },
    {
      id: 'LOC-2026-095',
      espace_id: 'e103-paillote',
      nom_demandeur: 'Club des Amis de la Nature',
      email_demandeur: 'club.nature@gmail.com',
      telephone_demandeur: '71112233',
      date_evenement: '2026-09-02',
      heure_debut: '11:00',
      heure_fin: '17:00',
      type_evenement: 'Anniversaire & Pique-nique',
      nombre_personnes: 80,
      statut: 'refusee',
      montant_devis: 90000,
      created_at: new Date().toISOString(),
      espace: { nom: 'Paillote & Chapiteau des Fêtes' },
    },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'RES-882194',
      site_id: '1',
      date_visite: '2026-09-05',
      type_billet: 'individuel',
      quantite: 4,
      montant_total: 6000,
      statut_paiement: 'paye',
      qr_code: 'data:image/svg+xml;utf8,<svg></svg>',
      created_at: new Date().toISOString(),
      site: { nom: 'Parc Urbain Bangr-Weoogo' },
    },
    {
      id: 'RES-771023',
      site_id: '1',
      date_visite: '2026-09-06',
      type_billet: 'groupe',
      quantite: 12,
      montant_total: 12000,
      statut_paiement: 'paye',
      qr_code: 'data:image/svg+xml;utf8,<svg></svg>',
      created_at: new Date().toISOString(),
      site: { nom: 'Parc Urbain Bangr-Weoogo' },
    },
  ]);

  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  // Handle Admin Approval / Refusal
  const handleUpdateStatus = async (id: string, newStatut: 'validee' | 'refusee') => {
    try {
      await updateLocationStatusApi(id, newStatut);
    } catch (err) {
      console.warn('Mise à jour en mémoire locale de l\'administration');
    }

    setLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, statut: newStatut } : loc))
    );

    const statusText = newStatut === 'validee' ? 'APPROUVÉE (Paiement Débloqué)' : 'REFUSÉE';
    setActionSuccessMessage(`Demande ${id} mise à jour avec succès : ${statusText}`);
    setTimeout(() => setActionSuccessMessage(''), 4000);
  };

  const filteredLocations = locations.filter((loc) => {
    const matchesFilter = locationFilter === 'all' || loc.statut === locationFilter;
    const matchesQuery =
      searchQuery === '' ||
      loc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.nom_demandeur || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.espace?.nom || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const pendingCount = locations.filter((l) => l.statut === 'en_attente').length;
  const approvedCount = locations.filter((l) => l.statut === 'validee').length;
  const totalDevisPending = locations
    .filter((l) => l.statut === 'en_attente')
    .reduce((acc, l) => acc + l.montant_devis, 0);

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Admin Header */}
        <div className="bg-canopy-deep text-white p-8 rounded-3xl mb-8 border border-leaf/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf bg-white/10 px-3 py-1 rounded-full mb-2 border border-leaf/30">
              <Shield className="w-4 h-4 text-leaf" /> Espace Administration &amp; Contrôle
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">
              Gestion de l'Administration du Parc
            </h1>
            <p className="text-xs sm:text-sm text-[#CFDAC7] mt-2">
              Validation administrative des locations d'espaces, contrôle des billets et supervision des transactions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-[#CFDAC7] uppercase block font-semibold">Demandes en Attente</span>
              <span className="font-serif font-bold text-xl text-amber-400">{pendingCount} dossier(s)</span>
            </div>
          </div>
        </div>

        {actionSuccessMessage && (
          <div className="mb-6 bg-emerald-50 text-emerald-900 border border-emerald-300 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-[#E9E1CC] pb-4">
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'locations'
                ? 'bg-canopy text-white shadow-md'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand/60'
            }`}
          >
            <Building className="w-4 h-4" /> Demandes de Location d'Espaces ({locations.length})
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold ml-1">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'reservations'
                ? 'bg-canopy text-white shadow-md'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand/60'
            }`}
          >
            <Ticket className="w-4 h-4" /> Réservations de Billets
          </button>
        </div>

        {/* TAB 1: DEMANDES DE LOCATION */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-card p-5 rounded-3xl border border-[#E9E1CC] shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-ink-soft mr-2">Filtrer par Statut :</span>
                <button
                  onClick={() => setLocationFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    locationFilter === 'all' ? 'bg-canopy text-white' : 'bg-harmattan text-ink-soft border border-[#E9E1CC]'
                  }`}
                >
                  Tous ({locations.length})
                </button>
                <button
                  onClick={() => setLocationFilter('en_attente')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    locationFilter === 'en_attente' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  🟡 En Attente ({pendingCount})
                </button>
                <button
                  onClick={() => setLocationFilter('validee')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    locationFilter === 'validee' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  🟢 Approuvées ({approvedCount})
                </button>
                <button
                  onClick={() => setLocationFilter('refusee')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    locationFilter === 'refusee' ? 'bg-red-700 text-white' : 'bg-red-50 text-red-900 border border-red-200'
                  }`}
                >
                  🔴 Refusées ({locations.filter((l) => l.statut === 'refusee').length})
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dossier / nom..."
                  className="w-full pl-9 pr-4 py-2 bg-harmattan border border-[#E9E1CC] rounded-full text-xs text-ink focus:outline-none focus:border-canopy"
                />
              </div>
            </div>

            {/* Table des Demandes de Location */}
            <div className="bg-card rounded-3xl overflow-hidden border border-[#E9E1CC] shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-ink">
                  <thead className="bg-sand border-b border-[#E9E1CC] text-[11px] uppercase font-semibold text-canopy tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Dossier / Réf</th>
                      <th className="py-4 px-6">Demandeur &amp; Contact</th>
                      <th className="py-4 px-6">Espace &amp; Événement</th>
                      <th className="py-4 px-6">Date &amp; Horaire</th>
                      <th className="py-4 px-6">Devis Estimé</th>
                      <th className="py-4 px-6">Statut Admin</th>
                      <th className="py-4 px-6 text-right">Décision Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1CC]">
                    {filteredLocations.map((loc) => (
                      <tr key={loc.id} className="hover:bg-sand/30 transition">
                        <td className="py-4 px-6 font-mono font-bold text-canopy">
                          {loc.id}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-ink">{loc.nom_demandeur}</div>
                          <div className="text-[11px] text-ink-soft">{loc.telephone_demandeur}</div>
                          <div className="text-[10px] text-ink-soft">{loc.email_demandeur}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-canopy-deep">{loc.espace?.nom || 'Espace Bangr-Weoogo'}</div>
                          <div className="text-[11px] text-ink-soft">{loc.type_evenement} ({loc.nombre_personnes} pers)</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-ink">{loc.date_evenement}</div>
                          <div className="text-[11px] text-ink-soft">{loc.heure_debut} – {loc.heure_fin}</div>
                        </td>
                        <td className="py-4 px-6 font-serif font-bold text-baobab text-sm">
                          {loc.montant_devis.toLocaleString()} FCFA
                        </td>
                        <td className="py-4 px-6">
                          {loc.statut === 'en_attente' && (
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-semibold text-[10px]">
                              <Clock className="w-3 h-3 text-amber-700 animate-spin" /> En Attente
                            </span>
                          )}
                          {loc.statut === 'validee' && (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full font-semibold text-[10px]">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Approuvée
                            </span>
                          )}
                          {loc.statut === 'refusee' && (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-900 border border-red-300 px-3 py-1 rounded-full font-semibold text-[10px]">
                              <XCircle className="w-3 h-3 text-red-700" /> Refusée
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {loc.statut !== 'validee' && (
                              <button
                                onClick={() => handleUpdateStatus(loc.id, 'validee')}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl font-semibold text-[11px] flex items-center gap-1 shadow-sm transition"
                                title="Approuver la demande et débloquer le paiement du client"
                              >
                                <Check className="w-3.5 h-3.5" /> Approuver
                              </button>
                            )}
                            {loc.statut !== 'refusee' && (
                              <button
                                onClick={() => handleUpdateStatus(loc.id, 'refusee')}
                                className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded-xl font-semibold text-[11px] flex items-center gap-1 shadow-sm transition"
                                title="Refuser la demande de location"
                              >
                                <X className="w-3.5 h-3.5" /> Refuser
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESERVATIONS DE BILLETS */}
        {activeTab === 'reservations' && (
          <div className="bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-md">
            <h3 className="font-serif text-xl font-medium text-canopy mb-4">
              Dernières Réservations de Billets Électroniques
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-ink">
                <thead className="bg-sand border-b border-[#E9E1CC] text-[11px] uppercase font-semibold text-canopy">
                  <tr>
                    <th className="py-3 px-4">N° Billet</th>
                    <th className="py-3 px-4">Date de Visite</th>
                    <th className="py-3 px-4">Catégorie</th>
                    <th className="py-3 px-4">Quantité</th>
                    <th className="py-3 px-4">Montant Réglé</th>
                    <th className="py-3 px-4">Statut Paiement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E1CC]">
                  {reservations.map((res) => (
                    <tr key={res.id}>
                      <td className="py-3.5 px-4 font-mono font-bold text-canopy">{res.id}</td>
                      <td className="py-3.5 px-4 font-medium">{res.date_visite}</td>
                      <td className="py-3.5 px-4 capitalize font-semibold">{res.type_billet}</td>
                      <td className="py-3.5 px-4">{res.quantite} pers</td>
                      <td className="py-3.5 px-4 font-serif font-bold text-baobab">{res.montant_total.toLocaleString()} FCFA</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-leaf/20 text-leaf px-2.5 py-1 rounded-full font-semibold text-[10px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Payé via Mobile Money
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
