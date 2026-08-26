import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { CanopyLine } from '../components/CanopyLine';
import { SpeciesCard } from '../components/SpeciesCard';
import { ArrowRight, Calendar, Users, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
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
      photo_url: 'https://images.unsplash.com/photo-1540573133985-780688d1728b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Varan du Nil',
      nom_scientifique: 'Varanus niloticus',
      description: 'Grand reptile aquatique vivant près du marigot du parc.',
      photo_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Calao à bec rouge',
      nom_scientifique: 'Tockus erythrorhynchus',
      description: 'Oiseau majestueux au bec incurvé vif rythmant la canopée.',
      photo_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      site_id: '1',
      categorie: 'plante' as const,
      nom_commun: 'Karité',
      nom_scientifique: 'Vitellaria paradoxa',
      description: 'L\'arbre sacré du Sahel produisant les précieuses amandes de karité.',
      photo_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-canopy text-harmattan relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 pt-16 pb-12 relative z-20">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf mb-6">
            <span className="w-5 h-[1.5px] bg-leaf inline-block" />
            Parc urbain — Ouagadougou
          </div>

          <h1 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-[1.1] text-white">
            La forêt de la <em className="italic text-leaf">connaissance</em>, en plein cœur de la ville
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#CFDAC7] max-w-lg mt-6 leading-relaxed">
            250 hectares de nature préservée à deux pas du centre-ville. Découvrez la faune, la flore, et réservez votre visite ou votre événement au poumon vert de Ouaga.
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
              Découvrir le parc
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
            <div className="bg-harmattan p-6 text-center md:text-left">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">250 ha</div>
              <div className="text-xs text-ink-soft mt-1">Superficie du parc</div>
            </div>
            <div className="bg-harmattan p-6 text-center md:text-left">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">140+</div>
              <div className="text-xs text-ink-soft mt-1">Espèces recensées</div>
            </div>
            <div className="bg-harmattan p-6 text-center md:text-left">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">35</div>
              <div className="text-xs text-ink-soft mt-1">Agents et guides</div>
            </div>
            <div className="bg-harmattan p-6 text-center md:text-left">
              <div className="font-serif text-3xl md:text-4xl text-canopy font-medium">60k</div>
              <div className="text-xs text-ink-soft mt-1">Visiteurs par an</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 : PORTAIL D'ENTRÉE PRINCIPALE */}
      <section className="py-16 bg-harmattan">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-md">
              <img
                src="/images/Parc_Urbain_Bangr-Weoogo_entrance,_Burkina_Faso,_2008 (1).jpg"
                alt="Portail d'entrée principale du Parc Bangr-Weoogo"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 text-xs text-ink-soft bg-[#FAF6EC] border-t border-[#E9E1CC]">
                📍 <strong>Portail Monumental d'Entrée (Avenue Charles de Gaulle)</strong> — Guichets d'accueil, contrôle d'accès et billetterie du Parc Bangr-Weoogo.
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
                <span className="w-4 h-0.5 bg-baobab" /> Accueil &amp; Accès Principal
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep mb-3">
                Le Portail d'Entrée du Parc
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">
                Bienvenue à l'entrée officielle de la forêt classée de Bangr-Weoogo. Un lieu emblématique qui marque la transition entre l'animation urbaine de Ouagadougou et le calme de la nature.
              </p>

              <div className="space-y-3.5">
                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">🏛 Architecture &amp; Guichets d'Accueil</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Entrée construite selon l'architecture traditionnelle burkinabè, abritant le poste des guides assermentés et le centre d'information touristique.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">⏰ Horaires d'Ouverture Officiels</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Ouvert tous les jours de <strong>06h00 à 18h00</strong>. Les dernières entrées sont enregistrées jusqu'à 17h30.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">🌿 Consignes Environnementales</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Réserve naturelle protégée : l'usage de sachets plastiques jetables, feux de camp et bruits excessifs y est strictement interdit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : PLAN D'ORIENTATION ET SIGNALISATION */}
      <section className="py-16 bg-sand border-y border-[#DED2B4]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
                <span className="w-4 h-0.5 bg-baobab" /> Orientation &amp; Cartographie
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep mb-3">
                Plan Général &amp; Signalisation
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">
                « La Forêt de la Connaissance » s'étend sur 250 hectares entièrement aménagés avec une signalétique bilingue pour vous guider en toute sécurité.
              </p>

              <div className="space-y-3.5">
                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">🗺 Zones &amp; Circuits Thématiques</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Signalisation claire vers la Réserve Zoologique, le Jardin Botanique, le Musée d'Histoire Naturelle et les aires de détente.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">🏃 Pistes de Randonnée &amp; Santé</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Parcours de santé et sentiers de course de 5 km et 10 km sous la canopée, très prisés par les sportifs dès l'aube.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-xl border border-[#E9E1CC]">
                  <strong className="text-sm text-canopy block font-medium">ℹ️ Panneaux d'Interprétation Botanique</strong>
                  <p className="text-xs text-ink-soft mt-1 leading-normal">
                    Plaques explicatives identifiant les arbres sacrés, les plantes médicinales et les habitats écologiques remarquables.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-md order-1 md:order-2">
              <img
                src="/images/Parc_Urbain_Bangr-Weoogo_map_sign,_Burkina_Faso,_2008.jpg"
                alt="Panneau d'orientation et carte du Parc Bangr-Weoogo"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 text-xs text-ink-soft bg-[#FAF6EC] border-t border-[#E9E1CC]">
                🗺 <strong>Plan &amp; Signalisation Officielle du Parc</strong> — Carte géolocalisée et repères d'orientation pour promeneurs et sportifs.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAUNE & FLORE PREVIEW */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-2">
                <span className="w-4 h-0.5 bg-baobab" /> Faune &amp; flore
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-canopy-deep">
                Une biodiversité à découvrir, fiche par fiche
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-sm text-ink-soft max-w-xs">
                Chaque espèce a sa propre fiche : description, habitat, statut de conservation.
              </p>
              <Link
                href="/faune-flore"
                className="text-xs font-semibold text-canopy hover:text-baobab flex items-center gap-1 mt-1 transition"
              >
                Voir toute la biodiversité ({site?.especes?.length || 6} espèces) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {speciesList.map((esp) => (
              <SpeciesCard key={esp.id} espece={esp} />
            ))}
          </div>
        </div>
      </section>

      {/* BILLETTERIE SECTION */}
      <section className="py-12">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-canopy-deep text-harmattan rounded-[28px] p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-leaf mb-3">
                Billetterie officielle
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-medium max-w-sm leading-tight">
                Réservez votre visite en quelques clics
              </h2>
              <p className="text-sm text-[#C9D3C0] mt-4 leading-relaxed max-w-md">
                Choisissez votre date, votre type de billet, et payez directement par Orange Money ou Moov Money. Recevez votre billet numérique instantané avec QR code.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#C9D3C0]">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-leaf" /> Paiement sécurisé
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-baobab" /> QR Code instantané
                </div>
              </div>
            </div>

            {/* Ticket Preview Box */}
            <div className="bg-harmattan text-ink rounded-2xl p-6 shadow-xl border border-sand">
              <div className="flex justify-between items-center pb-3 border-b border-[#E4DAC2]">
                <span className="text-xs text-ink-soft">Tarif Billet Individuel</span>
                <span className="font-semibold text-sm text-canopy">1 500 FCFA / pers</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#E4DAC2]">
                <span className="text-xs text-ink-soft">Lieu</span>
                <span className="text-xs font-medium text-ink flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-baobab" /> Ouagadougou, Secteur 13
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#E4DAC2]">
                <span className="text-xs text-ink-soft">Paiement accepté</span>
                <span className="text-xs font-semibold text-leaf">Orange Money &amp; Moov Money</span>
              </div>
              <div className="mt-6">
                <Link
                  href="/billetterie"
                  className="bg-baobab hover:bg-[#966226] text-white w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition"
                >
                  Accéder à la billetterie <ArrowRight className="w-4 h-4" />
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
              <div className="h-48 bg-gradient-to-br from-[#D8C9A3] to-[#C9B888] flex items-center justify-center text-[#5B4E2E] font-medium text-sm p-6 text-center">
                Salle polyvalente du parc (120 personnes)
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

      {/* CITATION SENSIBILISATION */}
      <section className="pb-24">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-sand rounded-[28px] p-10 md:p-16 text-center border border-[#DED2B4]">
            <p className="font-serif italic text-2xl md:text-3xl text-canopy-deep max-w-2xl mx-auto leading-relaxed">
              « Chaque arbre planté ici est un souffle pour Ouagadougou. Préserver Bangr-Weoogo, c'est préserver notre part d'air pur. »
            </p>
            <div className="mt-6 text-xs text-ink-soft font-medium uppercase tracking-wider">
              Espace sensibilisation — écogestes &amp; préservation des espaces verts du Burkina
            </div>
            <div className="mt-6">
              <Link
                href="/sensibilisation"
                className="inline-block bg-canopy text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-canopy-deep transition"
              >
                Lire nos articles d'écologie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
