'use client';

import React, { useState, useEffect } from 'react';
import { fetchContenus, ContenuSensibilisation } from '../../lib/api';
import { BookOpen, HelpCircle, Newspaper, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export default function SensibilisationPage() {
  const [contenus, setContenus] = useState<ContenuSensibilisation[]>([]);
  const [activeType, setActiveType] = useState<string>('all');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    async function loadContenus() {
      try {
        const data = await fetchContenus();
        setContenus(data);
      } catch (err) {
        console.error('Erreur chargement contenus:', err);
        // Fallback default contents
        setContenus([
          {
            id: 'c1',
            titre: 'Pourquoi préserver la canopée de Bangr-Weoogo ?',
            contenu:
              'Le parc Bangr-Weoogo constitue le poumon vert de Ouagadougou. Il absorbe les poussières du vent d\'harmattan, régule le microclimat de la ville en réduisant les îlots de chaleur urbains et préserve plus de 140 espèces végétales et animales.',
            type: 'article',
            publie_le: new Date().toISOString(),
          },
          {
            id: 'c2',
            titre: 'Quiz : Vitesse maximale du Singe patas ?',
            contenu:
              'Testez votre érudition ! Quelle est la vitesse maximale enregistrée par un singe patas en pleine course dans la savane ?',
            type: 'quiz',
            publie_le: new Date().toISOString(),
          },
          {
            id: 'c3',
            titre: 'Saison des pluies : renaissance de la flore au parc',
            contenu:
              'Après les premières pluies de juin, le parc se pare d\'un tapis de verdure éclatant. Venez admirer la renaissance du marigot et la nichée des hérons.',
            type: 'actualite',
            publie_le: new Date().toISOString(),
          },
        ]);
      }
    }
    loadContenus();
  }, []);

  const filteredContenus = contenus.filter(
    (item) => activeType === 'all' || item.type === activeType
  );

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf inline-block mb-2">
            Écologie &amp; Éducation environnementale
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-canopy-deep">
            Espace Sensibilisation
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Articles, actualités écologiques et quiz pour mieux comprendre l'écosystème du parc Bangr-Weoogo et préserver le patrimoine naturel du Burkina.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveType('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition ${
              activeType === 'all'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand'
            }`}
          >
            Tous les contenus ({contenus.length})
          </button>
          <button
            onClick={() => setActiveType('article')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition ${
              activeType === 'article'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Articles
          </button>
          <button
            onClick={() => setActiveType('quiz')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition ${
              activeType === 'quiz'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Quiz interactifs
          </button>
          <button
            onClick={() => setActiveType('actualite')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition ${
              activeType === 'actualite'
                ? 'bg-canopy text-white shadow-sm'
                : 'bg-card text-ink-soft border border-[#E9E1CC] hover:bg-sand'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" /> Actualités
          </button>
        </div>

        {/* Content list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContenus.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-3xl p-6 border border-[#E9E1CC] shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      item.type === 'article'
                        ? 'bg-canopy/10 text-canopy'
                        : item.type === 'quiz'
                        ? 'bg-baobab/15 text-baobab'
                        : 'bg-leaf/20 text-leaf'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[11px] text-ink-soft flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.publie_le).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-ink leading-snug">
                  {item.titre}
                </h3>

                <p className="text-xs text-ink-soft mt-3 leading-relaxed">
                  {item.contenu}
                </p>

                {/* If quiz, render interactive options */}
                {item.type === 'quiz' && (
                  <div className="mt-4 p-4 bg-sand/60 rounded-2xl border border-[#DED2B4] space-y-2">
                    <p className="text-xs font-medium text-canopy mb-2">Faites votre choix :</p>
                    {[
                      { idx: 1, text: '30 km/h' },
                      { idx: 2, text: '55 km/h (Réponse exacte !)', correct: true },
                      { idx: 3, text: '80 km/h' },
                    ].map((opt) => (
                      <button
                        key={opt.idx}
                        onClick={() => setSelectedQuizAnswer(opt.idx)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition ${
                          selectedQuizAnswer === opt.idx
                            ? opt.correct
                              ? 'bg-leaf text-white font-semibold'
                              : 'bg-red-500 text-white'
                            : 'bg-white text-ink border border-[#E9E1CC] hover:bg-sand'
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9E1CC] flex justify-between items-center text-xs">
                <span className="text-canopy font-medium">Parc Bangr-Weoogo</span>
                <span className="text-baobab font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
