import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { CanopyLine } from '../components/CanopyLine';
import { SpeciesCard } from '../components/SpeciesCard';
import { FAQSection } from '../components/FAQSection';
import { Testimonials } from '../components/Testimonials';
import { TeamSection } from '../components/TeamSection';
import { ImpactCaseStudies } from '../components/ImpactCaseStudies';
import { ArrowRight, Calendar, Users, ShieldCheck, Sparkles, MapPin, Navigation, Bus, Car } from 'lucide-react';
import { fetchSiteBySlug } from '../lib/api';

export default async function HomePage() {
  let site;
  try {
    site = await fetchSiteBySlug('bangr-weoogo');
  } catch (error) {
    console.error('Erreur chargement site:', error);
  }

  // Species fallback if backend is offline/mocking
  const speciesList = site?.especes && site.especes.length > 0 ? site.especes.slice(0, 4) : [
    {
      id: '1',
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Singe patas',
      nom_scientifique: 'Erythrocebus patas',
      description: 'Le singe le plus rapide au monde (55 km/h), emblème du parc Bangr-Weoogo.',
      photo_url: '/images/pexels-daniel-gomez-2158503858-35567587.jpg',
    },
    {
      id: '2',
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Varan du Nil',
      nom_scientifique: 'Varanus niloticus',
      description: 'Grand reptile aquatique vivant près du marigot du parc.',
      photo_url: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
    },
    {
      id: '3',
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Calao à bec rouge',
      nom_scientifique: 'Tockus erythrorhynchus',
      description: 'Oiseau majestueux au bec incurvé vif rythmant la canopée.',
      photo_url: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
    },
    {
      id: '4',
      site_id: '1',
      categorie: 'plante' as const,
      nom_commun: 'Karité',
      nom_scientifique: 'Vitellaria paradoxa',
      description: 'L\'arbre sacré du Sahel produisant les précieuses amandes de karité.',
      photo_url: '/images/pexels-lannguyentranm-37254820.jpg',
    },
  ];

  return (
    <div>
      {/* HERO SECTION - ABOVE THE FOLD CTA */}
      <section className="bg-canopy text-harmattan relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 pt-16 pb-12 relative z-20">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf mb-6">
            <span className="w-5 h-[1.5px] bg-leaf inline-block" />
            Parc urbain — Ouagadougou, Burkina Faso
          </div>

          <h1 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-[1.1] text-white">
            La forêt de la <em className="italic text-leaf">connaissance</em>, en plein cœur de la ville
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#CFDAC7] max-w-lg mt-6 leading-relaxed">
            265 hectares de nature préservée à deux pas du centre-ville. Découvrez la faune, la flore, et réservez votre visite ou votre événement au poumon vert de Ouagadougou.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <Link
              href="/billetterie"
              className="bg-baobab text-white px-7 py-3.5 rounded-full font-medium text-sm inline-flex items-center gap-2 hover:bg-[#966226] transition shadow-md"
            >
              Réserver ma visite <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faune-flore"
              className="border border-harmattan/30 text-harmattan px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/10 transition"
            >
              Découvrir la Faune &amp; Flore
            </Link>
          </div>
        </div>

        {/* Signature Canopy Line Divider */}
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* STATS STRIP */}
      <section className="bg-harmattan py-4">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#DED2B4] rounded-2xl overflow-hidden border border-[#DED2B4]">
            <div className="bg-[#F7F3E8] p-6 text-center">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">265 ha</div>
              <div className="text-xs text-ink-soft mt-1">Superficie forestière</div>
            </div>
            <div className="bg-[#F7F3E8] p-6 text-center">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">350+</div>
              <div className="text-xs text-ink-soft mt-1">Espèces répertoriées</div>
            </div>
            <div className="bg-[#F7F3E8] p-6 text-center">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">500 F</div>
              <div className="text-xs text-ink-soft mt-1">Billet d'entrée adulte</div>
            </div>
            <div className="bg-[#F7F3E8] p-6 text-center">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">100%</div>
              <div className="text-xs text-ink-soft mt-1">Paiement Mobile Money</div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPÈCES PHARES */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
                <span className="w-4 h-0.5 bg-baobab" /> Biodiversité remarquable
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep">
                Espèces phares du parc
              </h2>
            </div>
            <Link
              href="/faune-flore"
              className="text-sm font-medium text-canopy hover:text-canopy-deep flex items-center gap-1.5 transition"
            >
              Voir le catalogue complet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speciesList.map((espece) => (
              <SpeciesCard key={espece.id} espece={espece} />
            ))}
          </div>
        </div>
      </section>

      {/* ÉTUDES DE CAS & IMPACT ENVIRONNEMENTAL */}
      <div className="max-w-[1180px] mx-auto px-6">
        <ImpactCaseStudies />
      </div>

      {/* TARIFS & BILLETTERIE */}
      <section className="py-20 bg-sand/30">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
              <span className="w-4 h-0.5 bg-baobab" /> Billetterie en ligne
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep">
              Réservez vos tickets d'entrée
            </h2>
            <p className="text-sm text-ink-soft mt-3">
              Gagnez du temps à l'entrée. Recevez instantanément votre billet par QR Code sur votre smartphone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-[#E9E1CC] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-leaf tracking-wider">Pass Visiteur</span>
                <h3 className="font-serif text-2xl text-canopy font-medium mt-1">Billet Individuel</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-serif text-4xl font-bold text-canopy-deep">500</span>
                  <span className="text-sm font-medium text-ink-soft ml-1">FCFA / personne</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-ink-soft">
                  <li className="flex items-center gap-2">✓ Accès complet à la forêt classée</li>
                  <li className="flex items-center gap-2">✓ Parcours pédestres et d'observation</li>
                  <li className="flex items-center gap-2">✓ Valable toute la journée</li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/billetterie"
                  className="bg-canopy hover:bg-canopy-deep text-white w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  Acheter ce billet <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border-2 border-baobab shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 bg-baobab text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Recommandé
              </span>
              <div>
                <span className="text-xs font-semibold uppercase text-baobab tracking-wider">Pass Groupe</span>
                <h3 className="font-serif text-2xl text-canopy font-medium mt-1">Tarif Scolaire &amp; Asso</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-serif text-4xl font-bold text-canopy-deep">250</span>
                  <span className="text-sm font-medium text-ink-soft ml-1">FCFA / élève</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-ink-soft">
                  <li className="flex items-center gap-2">✓ À partir de 10 personnes</li>
                  <li className="flex items-center gap-2">✓ Visite guidée pédagogique incluse</li>
                  <li className="flex items-center gap-2">✓ Accès au Musée des Animaux Naturalisés</li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/billetterie"
                  className="bg-baobab hover:bg-[#966226] text-white w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  Réserver pour un groupe <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-[#E9E1CC] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase text-leaf tracking-wider">Pass Famille</span>
                <h3 className="font-serif text-2xl text-canopy font-medium mt-1">Pack Famille (4 pers)</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-serif text-4xl font-bold text-canopy-deep">1 500</span>
                  <span className="text-sm font-medium text-ink-soft ml-1">FCFA total</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-ink-soft">
                  <li className="flex items-center gap-2">✓ Entrée pour 2 adultes + 2 enfants</li>
                  <li className="flex items-center gap-2">✓ Accès à l'aire de jeu &amp; pique-nique</li>
                  <li className="flex items-center gap-2">✓ Plan illustré du parc offert</li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/billetterie"
                  className="bg-canopy hover:bg-canopy-deep text-white w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  Acheter le pass famille <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION D'ESPACES */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
                <span className="w-4 h-0.5 bg-baobab" /> Location d'espaces
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep">
                Organisez votre événement au cœur du parc
              </h2>
            </div>
            <p className="text-sm text-ink-soft max-w-xs">
              Salles, aires de pique-nique et amphithéâtre, disponibles à la location avec devis en temps réel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm flex flex-col justify-between">
              <div className="relative h-48 bg-canopy-deep/80 overflow-hidden">
                <img
                  src="/images/salle_polyvalente2.jpg"
                  alt="Salle polyvalente du parc (120 personnes)"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-ink">Salle polyvalente couverte</h3>
                <div className="text-xs text-ink-soft mt-1 flex gap-4">
                  <span>Jusqu'à 120 personnes</span>
                  <span>• Sonorisation &amp; Climatisation</span>
                </div>
                <p className="text-xs text-ink-soft mt-3 leading-relaxed">
                  Idéale pour séminaires, cérémonies, mariages et ateliers de travail avec vue directe sur la forêt.
                </p>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#E9E1CC]">
                  <span className="font-medium text-canopy text-sm">15 000 FCFA / heure</span>
                  <Link
                    href="/location-espaces"
                    className="border border-canopy text-canopy px-4 py-2 rounded-full text-xs font-medium hover:bg-canopy hover:text-white transition"
                  >
                    Calculer devis
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-sand rounded-2xl p-6 border border-[#DED2B4]">
                <h4 className="font-serif text-lg text-canopy-deep font-medium mb-1">
                  Comment ça marche ?
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Choisissez un espace, indiquez la date, les heures et le nombre d'invités. Vous obtenez un devis calculé automatiquement puis vous suivez l'avancement de votre demande en ligne.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-[#E9E1CC] flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-base text-ink font-medium">Aire de pique-nique ombragée</h4>
                  <p className="text-xs text-ink-soft mt-0.5">Jusqu'à 40 personnes — 5 000 FCFA / heure</p>
                </div>
                <Link
                  href="/location-espaces"
                  className="bg-baobab/10 text-baobab px-4 py-2 rounded-full text-xs font-semibold hover:bg-baobab hover:text-white transition shrink-0"
                >
                  Demander
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARTE & ITINÉRAIRE D'ACCÈS */}
      <section className="py-16 bg-harmattan">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-sand/40 border border-sand rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="px-4 py-1.5 bg-leaf/20 text-canopy font-bold text-xs rounded-full uppercase tracking-wider">
                Accès &amp; Localisation
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-canopy mt-3">
                Comment venir au Parc Bangr-Weoogo ?
              </h2>
              <p className="text-ink/80 text-sm md:text-base mt-3 leading-relaxed">
                Situé dans la commune de Ouagadougou (Secteur 12), le parc est facilement accessible depuis l'Avenue Pascal Zagré ou la Route de Somgandé.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-baobab shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-canopy text-sm">Coordonnées GPS</h4>
                    <p className="text-xs text-ink/70">12.3914° N, 1.4981° O — Secteur 12, Ouagadougou</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bus className="w-5 h-5 text-canopy shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-canopy text-sm">Transport en Commun (SOTRACO)</h4>
                    <p className="text-xs text-ink/70">Lignes de bus N° 2 et 6 — Arrêt "Entrée Principale Bangr-Weoogo"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-canopy text-sm">Parking &amp; Véhicules</h4>
                    <p className="text-xs text-ink/70">Parking gratuit et surveillé disponible à l'entrée Sud.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Parc+Urbain+Bangr-Weoogo+Ouagadougou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-xl shadow-md text-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ouvrir dans Google Maps (Itinéraire)</span>
                </a>
              </div>
            </div>

            {/* Représentation visuelle de la carte du parc */}
            <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-sand shadow-inner bg-canopy-deep/90 flex items-center justify-center p-6 text-center">
              <img
                src="/images/Parc_Urbain_Bangr-Weoogo_map_sign,_Burkina_Faso,_2008.jpg"
                alt="Carte de localisation du Parc Urbain Bangr-Weoogo à Ouagadougou"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 bg-canopy-deep/90 p-6 rounded-2xl border border-leaf/40 backdrop-blur-sm max-w-xs">
                <span className="text-3xl mb-2 block">📍</span>
                <h3 className="font-serif font-bold text-harmattan text-lg">Parc Urbain Bangr-Weoogo</h3>
                <p className="text-xs text-leaf font-medium mt-1">Burkina Faso - Ouagadougou</p>
                <span className="inline-block mt-3 text-[11px] bg-baobab text-harmattan px-3 py-1 rounded-full font-bold">
                  Ouvert aujourd'hui : 06h00 – 18h30
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ÉQUIPE ET GUIDES */}
      <div className="max-w-[1180px] mx-auto px-6">
        <TeamSection />
      </div>

      {/* SECTION AVIS CLIENTS */}
      <div className="max-w-[1180px] mx-auto px-6">
        <Testimonials />
      </div>

      {/* SECTION FAQ */}
      <div className="max-w-[1180px] mx-auto px-6">
        <FAQSection />
      </div>

      {/* CITATION SENSIBILISATION */}
      <section className="pb-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="relative rounded-[28px] p-10 md:p-16 text-center border border-leaf/30 overflow-hidden bg-canopy-deep text-harmattan shadow-xl">
            <img
              src="/images/aller.webp"
              alt="Arrière-plan sensibilisation"
              className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
            />
            <div className="relative z-10">
              <p className="font-serif italic text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                « Chaque arbre planté ici est un souffle pour Ouagadougou. Préserver Bangr-Weoogo, c'est préserver notre part d'air pur. »
              </p>
              <div className="mt-6 text-xs text-leaf font-bold uppercase tracking-wider">
                Espace sensibilisation — écogestes &amp; préservation des espaces verts du Burkina
              </div>
              <div className="mt-6">
                <Link
                  href="/sensibilisation"
                  className="inline-block bg-baobab hover:bg-[#966226] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition shadow-lg"
                >
                  Lire nos articles d'écologie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
