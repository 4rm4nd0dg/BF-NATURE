'use client';

import React, { useState, useEffect } from 'react';
import { fetchSiteEspaces, createDemandeLocationApi, fetchDemandeLocationByIdApi, payDemandeLocationApi, EspaceLocation, DemandeLocation } from '../../lib/api';
import { PaymentModal, PaymentDetails, PaymentProviderLogos } from '../../components/PaymentModal';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Calendar, Clock, Users, Building, Calculator, CheckCircle2, Send, ArrowRight, ShieldAlert, Lock, Search, AlertCircle, FileText, CheckCircle, XCircle, Download, Printer, CreditCard, Sparkles } from 'lucide-react';

export default function LocationEspacesPage() {
  const [espaces, setEspaces] = useState<EspaceLocation[]>([]);
  const [selectedEspace, setSelectedEspace] = useState<EspaceLocation | null>(null);

  // Form State
  const [nomDemandeur, setNomDemandeur] = useState('');
  const [emailDemandeur, setEmailDemandeur] = useState('');
  const [phoneDemandeur, setPhoneDemandeur] = useState('70001122');
  const [dateEvenement, setDateEvenement] = useState('2026-09-15');
  const [heureDebut, setHeureDebut] = useState('09:00');
  const [heureFin, setHeureFin] = useState('14:00');
  const [typeEvenement, setTypeEvenement] = useState('Séminaire / Réunion');
  const [nombrePersonnes, setNombrePersonnes] = useState(50);

  const [loading, setLoading] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState<DemandeLocation | null>(null);

  // Suivi de dossier state
  const [searchRef, setSearchRef] = useState('');
  const [searchedDemande, setSearchedDemande] = useState<DemandeLocation | null>(null);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Payment Modal & Receipt State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentTargetDemande, setPaymentTargetDemande] = useState<DemandeLocation | null>(null);
  const [paidDemandes, setPaidDemandes] = useState<Record<string, { transactionId: string; provider: string }>>({});
  const [showReceiptModal, setShowReceiptModal] = useState<DemandeLocation | null>(null);

  useEffect(() => {
    async function loadEspaces() {
      try {
        const list = await fetchSiteEspaces('bangr-weoogo');
        if (list && list.length > 0) {
          setEspaces(list);
          setSelectedEspace(list[0]);
          return;
        }
      } catch (err) {
        console.warn('Utilisation des espaces du Parc Urbain');
      }

      const fallback: EspaceLocation[] = [
        {
          id: 'e100-salle-750',
          site_id: '1',
          nom: 'Salle Polyvalente de 750 places (Nouveau 2026)',
          capacite: 750,
          description: 'Salle polyvalente couverte et climatisée avec régie audiovisuelle, scène et loges pour congrès et banquets.',
          tarif_horaire: 50000,
        },
        {
          id: 'e101-canopee',
          site_id: '1',
          nom: 'Espace Événementiel Canopée (Plein air)',
          capacite: 500,
          description: 'Espace boisé d\'exception sous la canopée des Fromagers avec accès électricité et blocs sanitaires dédiés.',
          tarif_horaire: 35000,
        },
        {
          id: 'e102-amphi',
          site_id: '1',
          nom: 'Amphithéâtre du Jardin Botanique',
          capacite: 300,
          description: 'Théâtre de verdure circulaire pour représentations théâtrales, conférences de presse et spectacles acoustiques.',
          tarif_horaire: 25000,
        },
        {
          id: 'e103-paillote',
          site_id: '1',
          nom: 'Paillote & Chapiteau des Fêtes',
          capacite: 150,
          description: 'Aire aménagée avec grande paillote traditionnelle pour anniversaires, déjeuners d\'entreprise et cérémonies privées.',
          tarif_horaire: 15000,
        },
      ];
      setEspaces(fallback);
      setSelectedEspace(fallback[0]);
    }
    loadEspaces();
  }, []);

  const calculateHours = (start: string, end: string) => {
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const diff = (eH * 60 + (eM || 0)) - (sH * 60 + (sM || 0));
    return Math.max(1, Math.ceil(diff / 60));
  };

  const durationHours = calculateHours(heureDebut, heureFin);
  const estimatedQuote = selectedEspace ? durationHours * selectedEspace.tarif_horaire : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEspace) return;

    setLoading(true);
    try {
      const res = await createDemandeLocationApi({
        espace_id: selectedEspace.id,
        nom_demandeur: nomDemandeur,
        email_demandeur: emailDemandeur,
        telephone_demandeur: phoneDemandeur,
        date_evenement: dateEvenement,
        heure_debut: heureDebut,
        heure_fin: heureFin,
        type_evenement: typeEvenement,
        nombre_personnes: nombrePersonnes,
      });

      setSubmissionCompleted(res.demande);
      setSearchedDemande(res.demande);
    } catch (err: any) {
      const simulated: DemandeLocation = {
        id: `LOC-${Math.floor(1000 + Math.random() * 9000)}`,
        espace_id: selectedEspace.id,
        nom_demandeur: nomDemandeur,
        email_demandeur: emailDemandeur,
        telephone_demandeur: phoneDemandeur,
        date_evenement: dateEvenement,
        heure_debut: heureDebut,
        heure_fin: heureFin,
        type_evenement: typeEvenement,
        nombre_personnes: nombrePersonnes,
        statut: 'en_attente',
        montant_devis: estimatedQuote,
        created_at: new Date().toISOString(),
        espace: { nom: selectedEspace.nom, tarif_horaire: selectedEspace.tarif_horaire },
      };
      setSubmissionCompleted(simulated);
      setSearchedDemande(simulated);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchRef = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    setSearchLoading(true);
    setSearchError('');

    try {
      const res = await fetchDemandeLocationByIdApi(searchRef.trim());
      setSearchedDemande(res);
    } catch (err: any) {
      if (submissionCompleted && submissionCompleted.id.toLowerCase() === searchRef.trim().toLowerCase()) {
        setSearchedDemande(submissionCompleted);
      } else {
        setSearchError('Aucun dossier trouvé pour cette référence.');
        setSearchedDemande(null);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const handleOpenPaymentForDemande = (demande: DemandeLocation) => {
    if (demande.statut !== 'validee') {
      alert("PAIEMENT BLOQUÉ : L'administration du parc n'a pas encore validé cette demande.");
      return;
    }
    setPaymentTargetDemande(demande);
    setPaymentModalOpen(true);
  };

  const handleConfirmPayment = async (details: PaymentDetails) => {
    if (!paymentTargetDemande) return;

    const txId = `TX-${details.provider.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    try {
      await payDemandeLocationApi(paymentTargetDemande.id, {
        provider_paiement: details.provider,
        telephone_paiement: details.phoneNumber,
        card_number: details.cardNumber,
        card_expiry: details.cardExpiry,
        card_cvc: details.cardCvc,
      });
    } catch (err) {
      console.warn('Fallback confirmation paiement');
    }

    setPaidDemandes((prev) => ({
      ...prev,
      [paymentTargetDemande.id]: {
        transactionId: txId,
        provider: details.provider,
      },
    }));
  };

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        <Breadcrumb items={[{ label: 'Location d\'Espaces' }]} />

        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf inline-block mb-2 bg-leaf/10 border border-leaf/30 px-3.5 py-1 rounded-full">
            Réservation &amp; Événementiel Officiel
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-canopy-deep">
            Location d'Espaces au Parc Bangr-Weoogo
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Obtenez votre récépissé officiel de demande et réglez votre devis via Mobile Money ou Carte Bancaire.
          </p>
        </div>

        {/* AFFICHAGE DE TOUS LES LOGOS DE PAIEMENT ACCEPTÉS DANS LA SECTION LOCATION */}
        <div className="mb-8 bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-canopy mb-3">
            <CreditCard className="w-4 h-4 text-leaf" /> Moyens de Paiement Officiels Acceptés pour les Locations
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(PaymentProviderLogos).map(([key, item]) => (
              <div key={key} className="bg-harmattan p-3 rounded-2xl border border-[#E9E1CC] flex items-center gap-3">
                <img src={item.logoUrl} alt={item.name} className="h-7 w-auto max-w-[65px] object-contain rounded" />
                <div>
                  <div className="text-xs font-bold text-canopy">{item.name}</div>
                  <div className="text-[10px] text-ink-soft">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALERTE REGLEMENTAIRE EN TÊTE DE PAGE */}
        <div className="mb-8 bg-amber-900/10 border border-amber-800/30 text-amber-950 p-5 rounded-3xl flex items-start gap-4 shadow-sm">
          <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-sm font-serif font-bold text-amber-900 block mb-1">
              Règle Administrative : Examen Préalable Obligatoire
            </strong>
            Conformément au règlement du Parc Urbain Bangr-Weoogo, <strong>si l'Administration du parc n'a pas validé votre demande, aucun paiement n'est exécuté</strong>. Cependant, vous pouvez télécharger à tout moment votre <strong>Récépissé Officiel</strong> (mentionnant <em>« En attente de paiement »</em> tant que le règlement n'a pas été acquitté).
          </div>
        </div>

        {/* SUIVI DE DOSSIER ET TELECHARGEMENT RECEPISSE */}
        <div className="mb-10 bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-lg font-medium text-canopy flex items-center gap-2">
                <Search className="w-4 h-4 text-leaf" /> Suivi de Dossier &amp; Téléchargement de Récépissé
              </h3>
              <p className="text-xs text-ink-soft">
                Entrez la référence de votre dossier pour télécharger votre récépissé ou procéder au paiement.
              </p>
            </div>

            <form onSubmit={handleSearchRef} className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Ex: LOC-2026-101"
                className="px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-full text-xs text-ink focus:outline-none focus:border-canopy w-full sm:w-48 font-mono"
              />
              <button
                type="submit"
                disabled={searchLoading}
                className="bg-canopy text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-canopy-deep transition whitespace-nowrap"
              >
                Rechercher
              </button>
            </form>
          </div>

          {searchError && (
            <div className="text-xs text-red-600 bg-red-50 p-3 rounded-2xl border border-red-200">
              {searchError}
            </div>
          )}

          {/* RÉSULTAT ET TELECHARGEMENT RECEPISSE */}
          {searchedDemande && (
            <div className="mt-4 p-5 bg-harmattan rounded-2xl border border-sand space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E4DAC2]">
                <div>
                  <span className="text-[11px] text-ink-soft uppercase font-mono">Dossier N° {searchedDemande.id}</span>
                  <h4 className="font-serif font-bold text-base text-canopy">
                    {searchedDemande.espace?.nom || selectedEspace?.nom}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {/* STATUT PAIEMENT BADGE */}
                  {paidDemandes[searchedDemande.id] ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-emerald-700" /> 🟢 PAYÉ &amp; ACQUITTÉ
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-amber-700" /> 🟡 EN ATTENTE DE PAIEMENT
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-ink-soft block">Demandeur :</span>
                  <strong className="text-ink">{searchedDemande.nom_demandeur}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Date Événement :</span>
                  <strong className="text-canopy">{searchedDemande.date_evenement}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Créneau :</span>
                  <strong className="text-ink">{searchedDemande.heure_debut} – {searchedDemande.heure_fin}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Devis Total :</span>
                  <strong className="text-baobab text-sm">{searchedDemande.montant_devis.toLocaleString()} FCFA</strong>
                </div>
              </div>

              {/* ACTION BUTTONS & RÉCÉPISSÉ */}
              <div className="pt-3 border-t border-[#E4DAC2] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setShowReceiptModal(searchedDemande)}
                  className="bg-sand hover:bg-card border border-[#DED2B4] text-canopy px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 transition w-full sm:w-auto justify-center"
                >
                  <FileText className="w-4 h-4 text-leaf" /> Imprimer / Télécharger le Récépissé
                </button>

                {searchedDemande.statut === 'en_attente' && !paidDemandes[searchedDemande.id] && (
                  <div className="text-xs text-amber-900 font-medium bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                    🔒 Validation Admin en cours... Le récépissé porte la mention <strong>"En attente de paiement"</strong>.
                  </div>
                )}

                {searchedDemande.statut === 'validee' && !paidDemandes[searchedDemande.id] && (
                  <button
                    onClick={() => handleOpenPaymentForDemande(searchedDemande)}
                    className="bg-baobab hover:bg-[#966226] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-md whitespace-nowrap inline-flex items-center gap-2"
                  >
                    Valider le Paiement ({searchedDemande.montant_devis.toLocaleString()} FCFA) <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FORMULAIRE DE LOCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne Gauche */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-xl font-medium text-canopy mb-4">
              Espaces &amp; Salles du Parc
            </h2>

            {espaces.map((espace) => (
              <div
                key={espace.id}
                onClick={() => setSelectedEspace(espace)}
                className={`p-6 rounded-3xl border cursor-pointer transition ${
                  selectedEspace?.id === espace.id
                    ? 'bg-card border-canopy ring-2 ring-canopy/20 shadow-md'
                    : 'bg-sand/60 border-[#DED2B4] hover:bg-card'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-serif font-semibold text-lg text-canopy-deep">
                    {espace.nom}
                  </h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-leaf/20 text-leaf whitespace-nowrap">
                    {espace.tarif_horaire.toLocaleString()} FCFA / h
                  </span>
                </div>

                <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                  {espace.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-ink font-medium pt-3 border-t border-[#E9E1CC]">
                  <span className="flex items-center gap-1 text-ink-soft">
                    <Users className="w-3.5 h-3.5 text-baobab" /> Capacité : {espace.capacite} pers
                  </span>
                  <span className="text-[10px] text-canopy font-semibold">Cliquer pour réserver</span>
                </div>
              </div>
            ))}
          </div>

          {/* Colonne Droite */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-md">
            <div className="flex items-center justify-between pb-6 border-b border-[#E9E1CC] mb-6">
              <div>
                <h2 className="font-serif text-xl font-medium text-canopy">
                  Demande de Devis — {selectedEspace?.nom}
                </h2>
                <span className="text-xs text-ink-soft">Calculateur de tarif automatique</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-ink-soft uppercase block">Devis Estimé</span>
                <span className="font-serif font-semibold text-2xl text-baobab">
                  {estimatedQuote.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Nom du demandeur / Organisation
                  </label>
                  <input
                    type="text"
                    value={nomDemandeur}
                    onChange={(e) => setNomDemandeur(e.target.value)}
                    placeholder="Société X / M. Kaboré"
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Téléphone de contact
                  </label>
                  <input
                    type="tel"
                    value={phoneDemandeur}
                    onChange={(e) => setPhoneDemandeur(e.target.value)}
                    placeholder="70001122"
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={emailDemandeur}
                    onChange={(e) => setEmailDemandeur(e.target.value)}
                    placeholder="demandeur@gmail.com"
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Date de l'événement
                  </label>
                  <input
                    type="date"
                    value={dateEvenement}
                    onChange={(e) => setDateEvenement(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    value={heureDebut}
                    onChange={(e) => setHeureDebut(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    value={heureFin}
                    onChange={(e) => setHeureFin(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Durée estimée
                  </label>
                  <div className="px-4 py-2.5 bg-sand rounded-2xl text-xs font-semibold text-canopy text-center">
                    {durationHours} heure(s)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Type d'événement
                  </label>
                  <input
                    type="text"
                    value={typeEvenement}
                    onChange={(e) => setTypeEvenement(e.target.value)}
                    placeholder="Séminaire, Mariage, Concert..."
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1">
                    Nombre de personnes attendues
                  </label>
                  <input
                    type="number"
                    value={nombrePersonnes}
                    onChange={(e) => setNombrePersonnes(Number(e.target.value))}
                    max={selectedEspace?.capacite || 750}
                    min={1}
                    required
                    className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-baobab hover:bg-[#966226] text-white py-4 rounded-full font-semibold text-sm transition shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                Enregistrer la demande &amp; Obtenir le Récépissé ({estimatedQuote.toLocaleString()} FCFA) <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL DU RÉCÉPISSÉ OFFICIEL DE LOCATION */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative text-ink border border-canopy/20 my-8">
            <button
              onClick={() => setShowReceiptModal(null)}
              className="absolute top-4 right-4 text-ink-soft hover:text-ink w-8 h-8 rounded-full bg-sand flex items-center justify-center"
            >
              ✕
            </button>

            {/* HEADER RÉCÉPISSÉ */}
            <div className="text-center border-b-2 border-canopy/20 pb-6 mb-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-canopy">
                BURKINA FASO — Unité - Progrès - Justice
              </div>
              <div className="text-xs text-ink-soft">Ministère de l'Environnement &amp; Commune de Ouagadougou</div>
              <h2 className="font-serif font-bold text-2xl text-canopy-deep mt-2">
                PARC URBAIN BANGR-WEOOGO
              </h2>
              <div className="text-sm font-semibold text-baobab uppercase tracking-wider mt-1">
                Récépissé Officiel de Demande de Location
              </div>
            </div>

            {/* STAMP BADGE STATUT PAIEMENT */}
            <div className="mb-6 p-4 rounded-2xl text-center border-2 shadow-sm font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 relative overflow-hidden">
              {paidDemandes[showReceiptModal.id] ? (
                <div className="bg-emerald-50 text-emerald-950 border-emerald-400 w-full py-3 rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                  <span>🟢 STATUT DU RÉCÉPISSÉ : PAYÉ &amp; ACQUITTÉ</span>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-950 border-amber-400 w-full py-3 rounded-xl flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span>🟡 STATUT DU RÉCÉPISSÉ : EN ATTENTE DE PAIEMENT</span>
                </div>
              )}
            </div>

            {/* DETAILS DU RÉCÉPISSÉ */}
            <div className="space-y-4 text-xs bg-harmattan p-6 rounded-2xl border border-[#E9E1CC]">
              <div className="grid grid-cols-2 gap-4 border-b border-[#E9E1CC] pb-3">
                <div>
                  <span className="text-ink-soft block">Numéro de Référence :</span>
                  <strong className="text-canopy font-mono text-sm">{showReceiptModal.id}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Date d'enregistrement :</span>
                  <strong className="text-ink">{new Date(showReceiptModal.created_at).toLocaleDateString('fr-FR')}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#E9E1CC] pb-3">
                <div>
                  <span className="text-ink-soft block">Nom du Demandeur :</span>
                  <strong className="text-ink text-sm">{showReceiptModal.nom_demandeur}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Contact Téléphone / Email :</span>
                  <strong className="text-ink">{showReceiptModal.telephone_demandeur} / {showReceiptModal.email_demandeur}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#E9E1CC] pb-3">
                <div>
                  <span className="text-ink-soft block">Espace Réservé :</span>
                  <strong className="text-canopy-deep text-sm">{showReceiptModal.espace?.nom || selectedEspace?.nom}</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Type d'Événement &amp; Public :</span>
                  <strong className="text-ink">{showReceiptModal.type_evenement} ({showReceiptModal.nombre_personnes} personnes)</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#E9E1CC] pb-3">
                <div>
                  <span className="text-ink-soft block">Date &amp; Horaire demandés :</span>
                  <strong className="text-canopy">{showReceiptModal.date_evenement} ({showReceiptModal.heure_debut} à {showReceiptModal.heure_fin})</strong>
                </div>
                <div>
                  <span className="text-ink-soft block">Montant du Devis :</span>
                  <strong className="text-baobab font-serif text-base">{showReceiptModal.montant_devis.toLocaleString()} FCFA</strong>
                </div>
              </div>

              <div>
                <span className="text-ink-soft block">Règlement du Paiement :</span>
                {paidDemandes[showReceiptModal.id] ? (
                  <strong className="text-emerald-700">
                    PAYÉ via {paidDemandes[showReceiptModal.id].provider.toUpperCase()} (Réf Tx: {paidDemandes[showReceiptModal.id].transactionId})
                  </strong>
                ) : (
                  <strong className="text-amber-800">
                    NON PAYÉ — EN ATTENTE DE RÈGLEMENT APRES VALIDATION ADMIN
                  </strong>
                )}
              </div>
            </div>

            {/* MENTION LEGALE */}
            <p className="text-[11px] text-ink-soft my-4 leading-relaxed italic text-center">
              * Ce récépissé fait foi du dépôt de dossier auprès de la Régie du Parc Urbain Bangr-Weoogo. L'occupation définitive des lieux est subordonnée à l'approbation formelle de l'Administration et au règlement intégral du devis.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="bg-canopy text-white flex-1 py-3 rounded-full font-semibold text-xs inline-flex items-center justify-center gap-2 hover:bg-canopy-deep transition shadow-md"
              >
                <Printer className="w-4 h-4" /> Imprimer / Imprimer en PDF
              </button>
              <button
                onClick={() => setShowReceiptModal(null)}
                className="bg-sand text-ink-soft border border-[#DED2B4] px-6 py-3 rounded-full font-semibold text-xs hover:bg-card transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {paymentTargetDemande && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          onConfirmPayment={handleConfirmPayment}
          amount={paymentTargetDemande.montant_devis}
          title="Paiement Location d'Espace Validée"
          itemDescription={`Location : ${paymentTargetDemande.espace?.nom || 'Espace Bangr-Weoogo'} (${paymentTargetDemande.date_evenement})`}
        />
      )}
    </div>
  );
}
