import React from 'react';
import Link from 'next/link';
import { CanopyLine } from '../../components/CanopyLine';
import { History, Calendar, Landmark, TreePine, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Histoire du Parc Bangr-Weoogo (1932 à nos jours) — Burkina Nature',
  description: 'Récit historique complet de la forêt sacrée Mossi "Bangr-Weoogo" devenue le premier parc urbain du Burkina Faso.',
};

export default function HistoirePage() {
  const timelineEvents = [
    {
      year: 'Avant 1932',
      title: 'La Forêt Sacrée Mossi — "La Forêt du Savoir"',
      badge: 'Époque Traditionnelle',
      description:
        'À l\'origine, le site portait le nom mooré de "Bangr-Weoogo", qui signifie littéralement "La Forêt de la Connaissance" ou "La Forêt du Savoir". C\'était un lieu sacré réservé aux rites d\'initiation, à la méditation et au recueillement des chefs traditionnels du royaume Mossi de Ouagadougou.',
      image: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
    },
    {
      year: '1932',
      title: 'Classement Officiel en Forêt Classée',
      badge: 'Administration Coloniale',
      description:
        'Face à l\'expansion de la ville de Ouagadougou, un arrêté du gouverneur colonial acte le classement du site comme réserve naturelle protégée. L\'objectif majeur était de constituer une barrière végétale contre le vent d\'Harmattan et de sauvegarder la nappe phréatique alimentant les puits de la capitale.',
      image: '/images/TREE.jpg',
    },
    {
      year: '1995 – 2001',
      title: 'Le Grand Projet de Rénovation Urbaine',
      badge: 'Projet Communal',
      description:
        'Sous l\'impulsion de la Commune de Ouagadougou et de ses partenaires écologiques, un vaste projet de reboisement et d\'aménagement récréatif est lancé. Le périmètre de 250 hectares est clôturé, sécurisé et doté de sentiers botaniques, d\'un parc zoologique et d\'aires d\'accueil.',
      image: '/images/Parc_Urbain_Bangr-Weoogo_map_sign,_Burkina_Faso,_2008.jpg',
    },
    {
      year: '2001',
      title: 'Inauguration du Parc Urbain Bangr-Weoogo',
      badge: 'Inauguration',
      description:
        'Le parc rouvre officiellement ses portes au grand public sous sa forme actuelle de Parc Urbain d\'Environnement et de Loisirs. Il intègre le Musée d\'Histoire Naturelle, la Réserve Zoologique et les premiers parcours sportifs sous les arbres centenaires.',
      image: '/images/Parc_Urbain_Bangr-Weoogo_entrance,_Burkina_Faso,_2008 (1).jpg',
    },
    {
      year: 'Aujourd\'hui (2026)',
      title: 'Poumon Vert & Sanctuaire de Biodiversité',
      badge: 'Époque Moderne',
      description:
        'Avec plus de 140 espèces de faune et de flore recensées, 35 agents engagés et 60 000 visiteurs par an, Bangr-Weoogo constitue une oasis de verdure indispensable au centre-ville de Ouagadougou, un modèle sous-régional d\'écotourisme et de conservation urbaine.',
      image: '/images/pexels-lannguyentranm-37254820.jpg',
    },
  ];

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4">
            <History className="w-4 h-4" /> Mémoire &amp; Patrimoine Naturel
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium max-w-3xl leading-tight">
            L'histoire de <em className="italic text-leaf">Bangr-Weoogo</em> : De la forêt sacrée au poumon vert
          </h1>
          <p className="text-base text-[#CFDAC7] max-w-2xl mt-4 leading-relaxed">
            Plongez dans l'histoire séculaire d'une réserve mythique de 250 hectares, sanctuaire spirituel devenu le premier parc urbain écologique du Burkina Faso.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* CHRONOLOGIE HISTORIQUE */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-baobab uppercase tracking-widest bg-sand px-4 py-1.5 rounded-full border border-[#DED2B4]">
              Frise Chronologique
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-canopy-deep font-medium mt-3">
              Les grandes étapes de Bangr-Weoogo
            </h2>
          </div>

          <div className="relative border-l-2 border-[#C9B888] ml-4 md:ml-32 space-y-16 pl-6 md:pl-10">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Pin Point */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1 w-6 h-6 rounded-full bg-canopy border-4 border-harmattan shadow-md group-hover:scale-125 transition" />

                {/* Year Label */}
                <div className="md:absolute md:-left-[150px] md:top-1 font-serif text-2xl font-semibold text-canopy mb-2 md:mb-0">
                  {event.year}
                </div>

                {/* Card Event */}
                <div className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-md transition grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="h-52 md:h-auto overflow-hidden bg-sand">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-6 md:col-span-2 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-canopy/10 text-canopy text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                        {event.badge}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-ink leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs text-ink-soft mt-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E9E1CC] flex items-center justify-between text-[11px] text-ink-soft">
                      <span>Bangr-Weoogo — Ouagadougou</span>
                      <span className="text-leaf font-semibold">Burkina Faso</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNIÈRE PATRIMOINE */}
      <section className="pb-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="bg-canopy-deep text-harmattan rounded-[28px] p-8 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-leaf mb-2">
                Patrimoine Culturel &amp; Naturel
              </div>
              <h2 className="font-serif text-3xl text-white font-medium leading-tight">
                Visitez le Musée d'Histoire Naturelle du Parc
              </h2>
              <p className="text-sm text-[#C9D3C0] mt-3 leading-relaxed">
                Situé au cœur de la forêt, le musée abrite des collections uniques sur la faune fossile du Sahel, l'histoire des peuples Mossi et l'évolution botanique du Burkina Faso.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link
                href="/billetterie"
                className="bg-baobab hover:bg-[#966226] text-white px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2 transition shadow-md"
              >
                Réserver une visite guidée <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
