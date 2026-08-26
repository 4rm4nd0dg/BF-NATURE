import React from 'react';
import { CanopyLine } from '../../components/CanopyLine';
import { Image as ImageIcon, Video, Play, Eye, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Médiathèque (Photothèque & Vidéothèque) — Bangr-Weoogo',
  description: 'Galerie photos HD et vidéothèque officielle du Parc Urbain Bangr-Weoogo à Ouagadougou.',
};

export default function MediathequePage() {
  const photoGallery = [
    {
      title: 'Singe Patas en pleine liberté',
      category: 'Faune',
      image: '/images/pexels-daniel-gomez-2158503858-35567587.jpg',
    },
    {
      title: 'Portail Monumental d\'Entrée',
      category: 'Patrimoine',
      image: '/images/Parc_Urbain_Bangr-Weoogo_entrance,_Burkina_Faso,_2008 (1).jpg',
    },
    {
      title: 'Plan d\'Orientation & Signalisation',
      category: 'Parcours & Cartes',
      image: '/images/Parc_Urbain_Bangr-Weoogo_map_sign,_Burkina_Faso,_2008.jpg',
    },
    {
      title: 'Hippopotame amphibie dans son bassin',
      category: 'Faune',
      image: '/images/BAIN_D\'HIPPOPO.jpg',
    },
    {
      title: 'Crocodile du Nil au marigot',
      category: 'Faune',
      image: '/images/DOMAINE_DU_CROCO.jpg',
    },
    {
      title: 'Regard captivant du Cobe de Fassa',
      category: 'Faune',
      image: '/images/REGARD_D\'ANTILOPE.jpg',
    },
    {
      title: 'Pélican blanc au bord du cours d\'eau',
      category: 'Faune',
      image: '/images/BEC_A_POCHE_DU_PELICAN.jpg',
    },
    {
      title: 'Choucador à longue queue iridescent',
      category: 'Faune',
      image: '/images/Choucador_à_longue_queue.jpg',
    },
    {
      title: 'Marabout d\'Afrique majestueux',
      category: 'Faune',
      image: '/images/Marabout_d\'Afrique.jpg',
    },
    {
      title: 'Tortue sillonnée sous le soleil sahélien',
      category: 'Faune',
      image: '/images/pexels-f-fezari-326720894-30966189.jpg',
    },
    {
      title: 'Baobab africain au coucher du soleil',
      category: 'Flore',
      image: '/images/pexels-julesgermainformel-36625842.jpg',
    },
    {
      title: 'Fromager majestueux (Kapokier)',
      category: 'Flore',
      image: '/images/TREE.jpg',
    },
    {
      title: 'Canopée verdoyante & forêt classée',
      category: 'Paysage',
      image: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
    },
    {
      title: 'Varan du Nil sur un tronc d\'arbre',
      category: 'Faune',
      image: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
    },
    {
      title: 'Calao à bec rouge dans les arbres',
      category: 'Faune',
      image: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
    },
  ];

  const videoGallery = [
    {
      title: 'Au Cœur de Bangr-Weoogo : Le Poumon Vert de Ouagadougou',
      duration: '12 min 45',
      category: 'Documentaire Officiel',
      description: 'Découvrez l\'histoire, l\'écosystème et la diversité faunique des 250 hectares du parc réaménagé.',
      thumbnail: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
    },
    {
      title: 'Immersion dans la Réserve Zoologique & le Marigot',
      duration: '08 min 20',
      category: 'Visite Virtuelle 4K',
      description: 'Rencontre avec les singes patas, hippopotames, pélicans et crocodiles protégés du parc.',
      thumbnail: '/images/BAIN_D\'HIPPOPO.jpg',
    },
    {
      title: 'Le Sentier des Arbres Sacrés & la Flore Sahélienne',
      duration: '06 min 15',
      category: 'Botanique & Culture',
      description: 'Visite guidée du Jardin Botanique avec les conservateurs à la découverte des baobabs et karités centenaires.',
      thumbnail: '/images/pexels-julesgermainformel-36625842.jpg',
    },
  ];

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HEADER */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4">
            <ImageIcon className="w-4 h-4" /> Médiathèque Officielle du Parc
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium max-w-2xl leading-tight">
            Photothèque &amp; Vidéothèque de <em className="italic text-leaf">Bangr-Weoogo</em>
          </h1>
          <p className="text-base text-[#CFDAC7] max-w-xl mt-4 leading-relaxed">
            Explorez en images et en vidéos la splendeur sauvage de la biodiversité, les infrastructures d'accueil et les paysages préservés du poumon vert de Ouaga.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* PHOTOTHÈQUE */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10 pb-3 border-b border-[#DED2B4]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-1">
                <ImageIcon className="w-4 h-4" /> Galerie d'images HD
              </div>
              <h2 className="font-serif text-3xl text-canopy-deep font-medium">
                Photothèque du Parc
              </h2>
            </div>
            <span className="text-xs text-ink-soft bg-sand px-3 py-1.5 rounded-full border border-[#DED2B4]">
              {photoGallery.length} clichés haute définition
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {photoGallery.map((item, idx) => (
              <div
                key={idx}
                className="group bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="relative h-56 w-full bg-sand overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-leaf" /> Agrandir
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-canopy-deep/85 text-harmattan text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 bg-card">
                  <h3 className="font-serif text-sm font-medium text-ink line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉOTHÈQUE */}
      <section className="py-16 bg-sand border-t border-[#DED2B4]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10 pb-3 border-b border-[#C9B888]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-1">
                <Video className="w-4 h-4" /> Espace Multimédia
              </div>
              <h2 className="font-serif text-3xl text-canopy-deep font-medium">
                Vidéothèque &amp; Documentaires
              </h2>
            </div>
            <span className="text-xs text-canopy bg-harmattan px-3 py-1.5 rounded-full border border-[#C9B888]">
              3 reportages officiels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoGallery.map((video, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-md hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="relative h-56 w-full bg-canopy-deep overflow-hidden group cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-baobab text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                    {video.duration}
                  </span>
                  <span className="absolute top-3 left-3 bg-leaf text-canopy-deep text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {video.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-lg font-medium text-ink leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-ink-soft mt-2.5 leading-relaxed">
                    {video.description}
                  </p>
                  <button className="mt-5 text-xs font-semibold text-canopy hover:text-baobab inline-flex items-center gap-1.5 transition">
                    Regarder la vidéo <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
