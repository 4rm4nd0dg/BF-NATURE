'use client';

import React, { useState } from 'react';
import { CanopyLine } from '../../components/CanopyLine';
import { Image as ImageIcon, Video, Play, Eye, X, ExternalLink, Sparkles } from 'lucide-react';

export interface VideoItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  thumbnail: string;
  isFeatured?: boolean;
}

export interface PhotoItem {
  title: string;
  category: string;
  image: string;
}

const photoGallery: PhotoItem[] = [
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

const videoGallery: VideoItem[] = [
  {
    id: 'vid-bangr-weoogo-official',
    youtubeId: '5Nqin_BzxJM',
    youtubeUrl: 'https://youtu.be/5Nqin_BzxJM?si=tqHnAkMjpMacC7Xo',
    title: 'Au Cœur de Bangr-Weoogo : Le Poumon Vert de Ouagadougou',
    duration: 'Reportage Officiel',
    category: 'Documentaire Exclusif',
    description: 'Découvrez l\'histoire, l\'écosystème exceptionnel et la biodiversité préservée des 250 hectares du Parc Urbain Bangr-Weoogo.',
    thumbnail: 'https://img.youtube.com/vi/5Nqin_BzxJM/hqdefault.jpg',
    isFeatured: true,
  },
  {
    id: 'vid-faune-flore-bangr',
    youtubeId: 'fHhsMtBL1ik',
    youtubeUrl: 'https://youtu.be/fHhsMtBL1ik?si=Q0vR4Nz-SbRNG8ga',
    title: 'Immersion Faune & Flore Sauvage de Bangr-Weoogo',
    duration: 'Découverte HD',
    category: 'Exploration Nature',
    description: 'Une plongée fascinante au cœur de la faune sauvage, des singes patas et de la végétation sahélienne protégée.',
    thumbnail: 'https://img.youtube.com/vi/fHhsMtBL1ik/hqdefault.jpg',
  },
  {
    id: 'vid-visite-guidee-bangr',
    youtubeId: 'DT4ShqclnRQ',
    youtubeUrl: 'https://youtu.be/DT4ShqclnRQ?si=OTeRJ_QMxnJG3LGY',
    title: 'Visite Guidée & Sentiers Botaniques en 4K',
    duration: 'Visite Virtuelle',
    category: 'Parcours Écologique',
    description: 'Parcourez les sentiers ombragés du parc et découvrez les arbres centenaires et le jardin botanique guidé par nos experts.',
    thumbnail: 'https://img.youtube.com/vi/DT4ShqclnRQ/hqdefault.jpg',
  },
  {
    id: 'vid-patrimoine-environnement',
    youtubeId: 'ZvGrpXJSUfw',
    youtubeUrl: 'https://youtu.be/ZvGrpXJSUfw?si=Hl5MVSbgnX0do7jK',
    title: 'Patrimoine Naturel & Protection de l\'Écosystème',
    duration: 'Reportage Culture',
    category: 'Conservation & Patrimoine',
    description: 'Reportage sur la préservation du patrimoine naturel burkinabè et la conservation environnementale du marigot.',
    thumbnail: 'https://img.youtube.com/vi/ZvGrpXJSUfw/hqdefault.jpg',
  },
];

export function MediathequeClient() {
  const [featuredVideo, setFeaturedVideo] = useState<VideoItem>(
    videoGallery.find((v) => v.isFeatured) || videoGallery[0]
  );
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [isPlayingInlineFeatured, setIsPlayingInlineFeatured] = useState<boolean>(false);

  const handleSelectVideo = (video: VideoItem) => {
    setFeaturedVideo(video);
    setIsPlayingInlineFeatured(true);
    // Scroll smoothly to video player if clicked from gallery
    const playerElement = document.getElementById('featured-player-section');
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HEADER */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-leaf/30">
            <ImageIcon className="w-4 h-4 text-leaf" /> Médiathèque Officielle du Parc
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium max-w-2xl leading-tight">
            Photothèque &amp; Vidéothèque de <em className="italic text-leaf">Bangr-Weoogo</em>
          </h1>
          <p className="text-base text-[#CFDAC7] max-w-xl mt-4 leading-relaxed">
            Explorez en images et en vidéos la splendeur sauvage de la biodiversité, les infrastructures d'accueil et les paysages préservés du poumon vert de Ouagadougou.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* SECTION VIDÉO VEDETTE (LECTEUR YOUTUBE PRINCIPAL) */}
      <section id="featured-player-section" className="py-12 max-w-[1180px] mx-auto px-6">
        <div className="bg-canopy-deep text-white rounded-3xl overflow-hidden shadow-2xl border border-leaf/20 relative">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-canopy-deep via-canopy to-canopy-deep border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-2">
                <Sparkles className="w-4 h-4" /> Vidéo sélectionnée ({featuredVideo.category})
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {featuredVideo.title}
              </h2>
            </div>
            <a
              href={featuredVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full transition shadow-md whitespace-nowrap"
            >
              Regarder sur YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* PLAYER EMBED */}
          <div className="relative aspect-video w-full bg-black">
            {isPlayingInlineFeatured ? (
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&rel=0`}
                title={featuredVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlayingInlineFeatured(true)}>
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-baobab/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-baobab transition duration-300 border-2 border-white/40">
                    <Play className="w-9 h-9 fill-current ml-1" />
                  </div>
                  <span className="mt-4 font-semibold text-sm sm:text-base text-white bg-black/60 px-5 py-2 rounded-full backdrop-blur-md border border-white/20">
                    Cliquer pour lancer la vidéo
                  </span>
                  <p className="text-xs text-[#CFDAC7] max-w-lg mt-3 line-clamp-2">
                    {featuredVideo.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VIDÉOTHÈQUE GALLERY */}
      <section className="py-12 bg-sand border-t border-[#DED2B4]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10 pb-3 border-b border-[#C9B888]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-baobab mb-1">
                <Video className="w-4 h-4" /> Espace Multimédia Vidéothèque
              </div>
              <h2 className="font-serif text-3xl text-canopy-deep font-medium">
                Vidéothèque Officielle &amp; Reportages
              </h2>
            </div>
            <span className="text-xs text-canopy bg-harmattan px-3 py-1.5 rounded-full border border-[#C9B888]">
              {videoGallery.length} reportages HD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoGallery.map((video) => {
              const isSelected = featuredVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  className={`bg-card rounded-2xl overflow-hidden border transition flex flex-col justify-between ${
                    isSelected ? 'ring-2 ring-leaf border-leaf shadow-lg' : 'border-[#E9E1CC] shadow-md hover:shadow-xl'
                  }`}
                >
                  <div
                    className="relative h-48 w-full bg-canopy-deep overflow-hidden group cursor-pointer"
                    onClick={() => handleSelectVideo(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition">
                      <div className="w-12 h-12 rounded-full bg-baobab text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-2.5 left-2.5 bg-leaf text-canopy-deep text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {video.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-base font-medium text-ink leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-xs text-ink-soft mt-2 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E9E1CC] flex items-center justify-between">
                      <button
                        onClick={() => handleSelectVideo(video)}
                        className="text-xs font-semibold text-canopy hover:text-baobab inline-flex items-center gap-1 transition"
                      >
                        {isSelected && isPlayingInlineFeatured ? 'En cours de lecture' : 'Lire la vidéo'}{' '}
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                      <button
                        onClick={() => setActiveModalVideo(video)}
                        className="text-[11px] font-medium text-ink-soft hover:text-canopy underline"
                      >
                        Plein écran
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
                className="group bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
                onClick={() => setActivePhoto(item)}
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

      {/* MODAL LECTEUR VIDÉO */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-canopy-deep rounded-3xl overflow-hidden w-full max-w-4xl border border-white/20 shadow-2xl relative">
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-leaf">
                  {activeModalVideo.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeModalVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-canopy flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-[#CFDAC7] max-w-xl leading-relaxed">
                {activeModalVideo.description}
              </p>
              <a
                href={activeModalVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full transition shadow-md whitespace-nowrap"
              >
                Ouvrir sur YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AGRANDISSEMENT PHOTO */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-canopy-deep rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-canopy flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-leaf tracking-wider">
                  {activePhoto.category}
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  {activePhoto.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
