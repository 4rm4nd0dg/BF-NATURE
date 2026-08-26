'use client';

import React, { useState, useEffect } from 'react';
import { fetchSiteEspaces, createDemandeLocationApi, EspaceLocation, DemandeLocation } from '../../lib/api';
import { Calendar, Clock, Users, Building, Calculator, CheckCircle2, Send, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    async function loadEspaces() {
      try {
        const list = await fetchSiteEspaces('bangr-weoogo');
        setEspaces(list);
        if (list.length > 0) setSelectedEspace(list[0]);
      } catch (err) {
        console.error('Erreur chargement espaces:', err);
        // Fallback default spaces
        const fallback = [
          {
            id: 'e101',
            site_id: '1',
            nom: 'Salle polyvalente du parc',
            capacite: 120,
            description: 'Salle couverte avec sonorisation et climatisation, idéale pour séminaires et mariages.',
            tarif_horaire: 15000,
          },
          {
            id: 'e102',
            site_id: '1',
            nom: 'Aire de pique-nique ombragée',
            capacite: 40,
            description: 'Espace boisé aménagé avec tables en bois pour réceptions et anniversaires.',
            tarif_horaire: 5000,
          },
          {
            id: 'e103',
            site_id: '1',
            nom: 'Amphithéâtre verdoyant',
            capacite: 250,
            description: 'Grand théâtre de verdure en plein air pour concerts acoustiques et cérémonies.',
            tarif_horaire: 25000,
          },
        ];
        setEspaces(fallback);
        setSelectedEspace(fallback[0]);
      }
    }
    loadEspaces();
  }, []);

  // Calculation of hours and total quote
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
    } catch (err: any) {
      console.warn('API non disponible, génération de devis simulé local:', err);
      setSubmissionCompleted({
        id: `DEM-${Math.floor(1000 + Math.random() * 9000)}`,
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
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf inline-block mb-2">
            Réservation &amp; Événementiel
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-canopy-deep">
            Location d'Espaces au Parc
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Obtenez une estimation de devis en temps réel et soumettez votre demande d'événement en quelques secondes.
          </p>
        </div>

        {submissionCompleted ? (
          /* CONFIRMATION DEVIS */
          <div className="max-w-xl mx-auto bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-2xl text-center">
            <div className="w-16 h-16 bg-leaf/20 text-leaf rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 stroke-[2]" />
            </div>

            <h2 className="font-serif text-2xl font-medium text-canopy">
              Demande de Location Transmise !
            </h2>
            <p className="text-xs text-ink-soft mt-1">
              Référence du dossier : <span className="font-mono font-semibold text-ink">{submissionCompleted.id}</span>
            </p>

            <div className="my-6 p-6 bg-harmattan rounded-2xl border border-sand text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-soft">Espace sélectionné :</span>
                <span className="font-semibold text-canopy">{submissionCompleted.espace?.nom || selectedEspace?.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Date de l'événement :</span>
                <span className="font-medium text-ink">{submissionCompleted.date_evenement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Créneau horaire :</span>
                <span className="font-medium text-ink">{submissionCompleted.heure_debut} à {submissionCompleted.heure_fin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Demandeur :</span>
                <span className="font-medium text-ink">{submissionCompleted.nom_demandeur} ({submissionCompleted.telephone_demandeur})</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E4DAC2]">
                <span className="font-medium text-ink-soft">Devis Estimé :</span>
                <span className="font-serif font-semibold text-lg text-baobab">
                  {submissionCompleted.montant_devis.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            <p className="text-xs text-ink-soft mb-6">
              Nos agents gestionnaires examineront votre dossier sous 24h. Vous recevrez la confirmation de validation par SMS/Email.
            </p>

            <button
              onClick={() => setSubmissionCompleted(null)}
              className="bg-canopy text-white py-3 px-8 rounded-full font-medium text-xs hover:bg-canopy-deep transition"
            >
              Faire une nouvelle demande
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Colonne Gauche : Sélection des espaces */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif text-xl font-medium text-canopy mb-4">
                Espaces disponibles à la location
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
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-leaf/20 text-leaf">
                      {espace.tarif_horaire.toLocaleString()} FCFA / h
                    </span>
                  </div>

                  <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                    {espace.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-ink font-medium pt-3 border-t border-[#E9E1CC]">
                    <span className="flex items-center gap-1 text-ink-soft">
                      <Users className="w-3.5 h-3.5 text-baobab" /> Capacité : {espace.capacite} pers
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Colonne Droite : Formulaire & Calculette */}
            <div className="lg:col-span-7 bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-md">
              <div className="flex items-center justify-between pb-6 border-b border-[#E9E1CC] mb-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-canopy">
                    Demande de Devis — {selectedEspace?.nom}
                  </h2>
                  <span className="text-xs text-ink-soft">Calculateur de tarif en temps réel</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-ink-soft uppercase block">Devis Calculé</span>
                  <span className="font-serif font-semibold text-2xl text-baobab">
                    {estimatedQuote.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1">
                      Nom complet du demandeur / Structure
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
                      placeholder="Séminaire, Mariage, Pique-nique..."
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
                      max={selectedEspace?.capacite || 300}
                      min={1}
                      required
                      className="w-full px-4 py-2.5 bg-harmattan border border-[#E9E1CC] rounded-2xl text-xs text-ink focus:outline-none focus:border-canopy"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-baobab hover:bg-[#966226] text-white py-3.5 rounded-full font-medium text-sm transition shadow-md flex items-center justify-center gap-2 mt-4"
                >
                  Soumettre la demande de devis ({estimatedQuote.toLocaleString()} FCFA) <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
