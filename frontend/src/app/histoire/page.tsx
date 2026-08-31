import React from 'react';
import Link from 'next/link';
import { CanopyLine } from '../../components/CanopyLine';
import {
  History,
  Calendar,
  Landmark,
  TreePine,
  Sparkles,
  Shield,
  ArrowRight,
  Bird,
  Building2,
  HardHat,
  BadgeCheck,
  CheckCircle2,
  Construction,
} from 'lucide-react';

export const metadata = {
  title: 'Histoire & Projets de Réhabilitation — Parc Urbain Bangr-Weoogo',
  description:
    'Découvrez l\'histoire complète de la forêt sacrée Mossi "Bangr-Weoogo", du Bois de Boulogne colonial au grand projet de réhabilitation de 75 milliards FCFA lancé en 2026.',
};

export default function HistoirePage() {
  const timelineEvents = [
    {
      period: 'Origines Précoloniales',
      year: 'Avant 1930',
      title: 'La Forêt Sacrée Mossi — "Bangr-Weoogo"',
      badge: 'Tradition & Sacré',
      badgeColor: 'bg-amber-800/10 text-amber-900 border-amber-800/20',
      description:
        'Propriété séculaire des chefs traditionnels Mossi de Ouagadougou, la forêt sacrée abritait des réceptacles culturels, des objets et animaux sacrés, et servait d\'espace d\'initiation, de méditation et de refuge. En langue mooré, "Bangr-Weoogo" signifie littéralement "La Forêt du Savoir" ou "La Forêt où l\'on accueille la Connaissance".',
      image: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
      keyFacts: [
        'Propriété ancestrale des chefs Mossi',
        'Lieu d\'initiation et de recueillement spirituel',
        'Protection sacrée de la faune et de la végétation',
      ],
    },
    {
      period: 'Époque Coloniale',
      year: 'Années 1930',
      title: 'Le "Bois de Boulogne" de Ouagadougou',
      badge: 'Administration Coloniale',
      badgeColor: 'bg-canopy/10 text-canopy border-canopy/20',
      description:
        'Ignorant la sacralité et la valeur spirituelle locale du site, l\'administration coloniale française annexe la forêt sacrée et la transforme en parc d\'agrément baptisé "Bois de Boulogne" de Ouagadougou, instituant un classement réglementé du couvert végétal.',
      image: '/images/TREE.jpg',
      keyFacts: [
        'Classement en périmètre forestier',
        'Appellation coloniale "Bois de Boulogne"',
        'Protection du bassin versant de la capitale',
      ],
    },
    {
      period: 'Renaissance Communale',
      year: '1985 & Janvier 2001',
      title: 'Restitution du Nom & Aménagement en Parc Urbain',
      badge: 'Gestion Communale',
      badgeColor: 'bg-emerald-800/10 text-emerald-900 border-emerald-800/20',
      description:
        'Après des travaux initiaux en 1985, le site est officiellement renommé "Parc Urbain Bangr-Weoogo" en janvier 2001. La Commune de Ouagadougou reprend la gestion directe de l\'espace pour en faire un havre de détente, de sport et de valorisation du patrimoine naturel du Burkina Faso.',
      image: '/images/Parc_Urbain_Bangr-Weoogo_map_sign,_Burkina_Faso,_2008.jpg',
      keyFacts: [
        'Janvier 2001 : Restitution officielle du nom mooré',
        'Reprise en main par la ville de Ouagadougou',
        'Création des sentiers botaniques et du zoo',
      ],
    },
    {
      period: 'État & Diagnostic',
      year: '2017 – 2024',
      title: 'Richesse Écologique & Constat de Dégradation',
      badge: 'Sanctuaire Préservé',
      badgeColor: 'bg-blue-800/10 text-blue-900 border-blue-800/20',
      description:
        'S\'étendant sur 265 hectares, le parc abrite 18,17 % du potentiel floristique national (inventaire 2017) et plus de 300 espèces d\'oiseaux sous la supervision hybride des Eaux et Forêts. Cependant, des décennies d\'usure dégradent l\'écosystème, poussant les autorités gouvernementales (dont l\'ex-PM Kyélem de Tambèla en mars 2024) à exiger un plan de sauvetage d\'envergure.',
      image: '/images/BEC_A_POCHE_DU_PELICAN.jpg',
      keyFacts: [
        '265 hectares de superficie totale',
        '18,17 % de la flore nationale & 300+ espèces d\'oiseaux',
        'Appel à une réhabilitation urgente',
      ],
    },
    {
      period: 'Le Grand Chantier',
      year: '18 Août 2026',
      title: 'Projet Historique de Réhabilitation de 75 Milliards FCFA',
      badge: 'Lancement Officiel 2026',
      badgeColor: 'bg-red-800/10 text-red-900 border-red-800/20 font-bold',
      description:
        'Le 18 août 2026 marque un tournant historique avec la pose de la première pierre du grand chantier de modernisation de Bangr-Weoogo, en présence du ministre de la Sécurité Mahamadou Sana, du ministre délégué aux Ressources animales Dr Amadou Dicko et des autorités coutumières (Touk Naaba Kango). Un plan global de 75 milliards FCFA est lancé.',
      image: '/images/Parc_Urbain_Bangr-Weoogo_entrance,_Burkina_Faso,_2008 (1).jpg',
      keyFacts: [
        'Lancement officiel le 18 août 2026',
        'En présence des ministres et autorités coutumières',
        'Enveloppe globale de 75 Milliards FCFA',
      ],
    },
    {
      period: 'Livraison Phase 1',
      year: 'Décembre 2026',
      title: 'Phase 1 (5 Milliards FCFA) : Nouveaux Portiques & Ménagerie',
      badge: 'Travaux en Cours',
      badgeColor: 'bg-baobab/10 text-baobab border-baobab/20 font-bold',
      description:
        'Entièrement financée à hauteur de 5 milliards FCFA sur fonds propres de l\'État avec un délai d\'exécution de 4 mois, la Phase 1 prévoit la construction de 2 portiques d\'entrée monumentaux, une salle polyvalente de 750 places, 10 km de nouvelle clôture et l\'aménagement d\'une ménagerie moderne destinée à accueillir lions, éléphants et hippopotames.',
      image: '/images/DOMAINE_DU_CROCO.jpg',
      keyFacts: [
        '5 Milliards FCFA financés par l\'État burkinabè',
        '2 Portiques d\'entrée + 10 km de clôture neuve',
        'Salle polyvalente 750 places & Ménagerie des grands fauves',
      ],
    },
  ];

  const keyStats = [
    { label: 'Budget Global Projet', value: '75 Mds FCFA', icon: Building2 },
    { label: 'Phase 1 (Fonds Propres)', value: '5 Mds FCFA', icon: Construction },
    { label: 'Superficie du Sanctuaire', value: '265 Hectares', icon: TreePine },
    { label: 'Flore Nationale', value: '18,17 %', icon: Sparkles },
    { label: 'Avifaune & Oiseaux', value: '300+ Espèces', icon: Bird },
    { label: 'Clôture Reconstruite', value: '10 Km', icon: Shield },
  ];

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-14">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-leaf/30">
            <History className="w-4 h-4 text-leaf" /> Mémoire, Patrimoine &amp; Avenir du Parc
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-medium max-w-4xl leading-tight">
            L'histoire de <em className="italic text-leaf">Bangr-Weoogo</em> : De la forêt sacrée au grand projet de 2026
          </h1>
          <p className="text-base sm:text-lg text-[#CFDAC7] max-w-3xl mt-5 leading-relaxed">
            Parcourez l'évolution séculaire du poumon vert de Ouagadougou : des cérémonies sacrées du royaume Mossi jusqu'au chantier historique de réhabilitation de <strong>75 milliards de FCFA</strong> lancé en août 2026.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* STATISTIQUES ET CHIFFRES CLÉS DU PROJET 2026 */}
      <section className="py-12 max-w-[1180px] mx-auto px-6 -mt-8 relative z-30">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-card p-5 rounded-2xl border border-[#E9E1CC] shadow-md hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-xl bg-canopy/10 text-canopy flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-canopy-deep">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-ink-soft mt-1 leading-tight font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NOUVEAUTÉ 2026 HIGHLIGHT BANNER */}
      <section className="pb-12 max-w-[1180px] mx-auto px-6">
        <div className="bg-gradient-to-r from-canopy-deep via-canopy to-canopy-deep text-white rounded-3xl p-8 sm:p-10 border border-leaf/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf bg-leaf/10 border border-leaf/30 px-3 py-1 rounded-full mb-3">
                <HardHat className="w-4 h-4 text-leaf" /> Actualité du 18 Août 2026
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-snug">
                Lancement du Chantier de Réhabilitation (75 Milliards FCFA)
              </h2>
              <p className="text-sm text-[#CFDAC7] mt-3 leading-relaxed">
                Le gouvernement burkinabè a officiellement posé la première pierre du plan de modernisation. La Phase 1 (5 milliards FCFA sur 4 mois) permettra de construire 2 portiques d'entrée monumentaux, une salle polyvalente de 750 places, 10 km de clôture et une ménagerie pour éléphants, hippopotames et lions.
              </p>
            </div>
            <Link
              href="/faune-flore"
              className="bg-baobab hover:bg-[#966226] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition shadow-lg inline-flex items-center gap-2"
            >
              Découvrir la Biodiversité <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CHRONOLOGIE HISTORIQUE DÉTAILLÉE */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-baobab uppercase tracking-widest bg-sand px-4 py-1.5 rounded-full border border-[#DED2B4]">
              Frise Chronologique
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-canopy-deep font-medium mt-3">
              Du passé traditionnel aux ambitions de 2026
            </h2>
          </div>

          <div className="relative border-l-2 border-[#C9B888] ml-4 md:ml-36 space-y-16 pl-6 md:pl-10">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Pin Point */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-canopy border-4 border-harmattan shadow-md group-hover:scale-125 transition" />

                {/* Year Label */}
                <div className="md:absolute md:-left-[165px] md:top-1 font-serif text-xl md:text-2xl font-bold text-canopy mb-2 md:mb-0">
                  {event.year}
                  <div className="text-[10px] font-sans font-semibold text-ink-soft uppercase tracking-wider">
                    {event.period}
                  </div>
                </div>

                {/* Card Event */}
                <div className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-md hover:shadow-xl transition grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="h-56 md:h-auto overflow-hidden bg-sand relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 md:hidden">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="hidden md:block mb-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${event.badgeColor}`}>
                          {event.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-medium text-ink leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-soft mt-3 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Key Facts */}
                      <div className="mt-4 pt-3 border-t border-[#E9E1CC]/80 space-y-1.5">
                        {event.keyFacts.map((fact, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-canopy font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-leaf flex-shrink-0" />
                            <span>{fact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#E9E1CC] flex items-center justify-between text-[11px] text-ink-soft">
                      <span>Parc Urbain Bangr-Weoogo</span>
                      <span className="text-leaf font-semibold">Ouagadougou, Burkina Faso</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNIÈRE VISION & FUTUR */}
      <section className="pb-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-canopy-deep text-harmattan rounded-[28px] p-8 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-leaf/20 shadow-2xl">
            <div className="md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-leaf mb-2 flex items-center gap-1.5">
                <Landmark className="w-4 h-4" /> Ambition Nationale &amp; Écotourisme
              </div>
              <h2 className="font-serif text-3xl text-white font-medium leading-tight">
                Repositionner Bangr-Weoogo au cœur de l'Afrique de l'Ouest
              </h2>
              <p className="text-sm text-[#C9D3C0] mt-3 leading-relaxed">
                Grâce au grand projet de 75 milliards FCFA, le Parc Urbain Bangr-Weoogo devient un espace d'excellence touristique, scientifique, éducatif et culturel à la hauteur des défis environnementaux contemporains.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link
                href="/billetterie"
                className="bg-baobab hover:bg-[#966226] text-white px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 transition shadow-lg"
              >
                Réserver votre visite <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
