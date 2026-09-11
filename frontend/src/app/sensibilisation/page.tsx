'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import {
  BookOpen,
  Newspaper,
  Sparkles,
  Search,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Leaf,
  Award,
  HelpCircle,
  Gamepad2,
  Brain,
  Share2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface PressArticle {
  id: string;
  source: string;
  date: string;
  title: string;
  category: 'presse' | 'ecologie' | 'ecogeste';
  summary: string;
  content: string;
  imageUrl: string;
  readTime: string;
  linkText?: string;
}

const ARTICLES_LIST: PressArticle[] = [
  {
    id: 'art-1',
    source: 'Sidwaya & RTB Officiel',
    date: '18 Août 2026',
    category: 'presse',
    title: 'Pose de la première pierre : 75 Milliards FCFA pour la réhabilitation historique de Bangr-Weoogo',
    summary:
      'Le gouvernement burkinabè, sous la direction des ministres Mahamadou Sana et Dr Amadou Dicko, ainsi que le Touk Naaba Kango, a officiellement lancé le plan de modernisation intégrale du parc.',
    content:
      'Ce projet monumental prévoit 10 km de clôture neuve, la création de deux portiques d\'entrée monumentaux, une salle polyvalente de 750 places et l\'aménagement d\'une ménagerie moderne pour accueillir grands fauves et pachydermes. La Phase 1 (5 milliards FCFA) sera livrée d\'ici décembre 2026.',
    imageUrl: '/images/Parc_Urbain_Bangr-Weoogo_entrance,_Burkina_Faso,_2008 (1).jpg',
    readTime: '4 min de lecture',
    linkText: 'Article de Presse Sidwaya',
  },
  {
    id: 'art-2',
    source: 'Revue de la Biodiversité du Sahel',
    date: '25 Juillet 2026',
    category: 'ecologie',
    title: 'Le rôle protecteur de Bangr-Weoogo face aux poussières du vent d\'Harmattan',
    summary:
      'Comment les 265 hectares de canopée forestière agissent comme un filtre naturel géant et réduisent la température de Ouagadougou de 3°C.',
    content:
      'Chaque année durant la saison sèche, le vent chaud de l\'harmattan transporte des tonnes de poussières. La masse végétale dense de Bangr-Weoogo piège ces particules et libère de l\'humidité grâce à l\'évapotranspiration de ses arbres centenaires (Kapokiers, Karités, Baobabs).',
    imageUrl: '/images/TREE.jpg',
    readTime: '5 min de lecture',
  },
  {
    id: 'art-3',
    source: 'LeFaso.net',
    date: '10 Juin 2026',
    category: 'presse',
    title: 'Sauvegarde du Singe patas : Le primate le plus rapide d\'Afrique protégé à Ouaga',
    summary:
      'Focus sur Erythrocebus patas, véritable mascotte du parc capable d\'atteindre 55 km/h en pleine course dans la savane.',
    content:
      'Menacé dans plusieurs régions du Sahel, le singe patas trouve à Bangr-Weoogo un refuge sécurisé. Les éco-gardes du parc assurent un suivi quotidien des troupes de primates et sensibilisent les riverains à ne pas les déranger.',
    imageUrl: '/images/pexels-daniel-gomez-2158503858-35567587.jpg',
    readTime: '3 min de lecture',
    linkText: 'Consulter sur LeFaso.net',
  },
  {
    id: 'art-4',
    source: 'Guide Écologique Officiel',
    date: '02 Mai 2026',
    category: 'ecogeste',
    title: 'Les 5 règles d\'or du visiteur éco-responsable à Bangr-Weoogo',
    summary:
      'Adoptez les bons réflexes pour préserver la quiétude des animaux et maintenir la propreté du domaine classé.',
    content:
      '1. Ne jetez aucun déchet plastique (utilisez les poubelles de tri à l\'entrée).\n2. Ne nourrissez pas les crocodiles du marigot ni les singes.\n3. Restez sur les sentiers balisés pour ne pas piétiner les jeunes pousses.\n4. Évitez les bruits excessifs pour ne pas effrayer la faune ornithologique.\n5. Privilégiez les billets numériques QR Code pour économiser le papier.',
    imageUrl: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
    readTime: '3 min de lecture',
  },
  {
    id: 'art-5',
    source: 'Botanique & Pharmacopée du Burkina',
    date: '14 Avril 2026',
    category: 'ecologie',
    title: 'La Pharmacopée Traditionnelle Mossi : Les arbres sacrés qui soignent',
    summary:
      'Le Karité, le Néré et le Baobab : découvrez les vertus médicinales séculaires des espèces végétales de Bangr-Weoogo.',
    content:
      'En langue mooré, "Bangr-Weoogo" signifie la forêt du savoir. Depuis des siècles, les tradipraticiens y récoltent de manière responsable des écorces et feuilles médicinales. Le conservatoire botanique du parc perpétue ce savoir d\'interdiction de la sur-exploitation.',
    imageUrl: '/images/pexels-lannguyentranm-37254820.jpg',
    readTime: '6 min de lecture',
  },
  {
    id: 'art-6',
    source: 'Bulletin de l\'Éco-Garde',
    date: '28 Mars 2026',
    category: 'ecogeste',
    title: 'Marigot et faune aquatique : Pourquoi préserver les zones humides ?',
    summary:
      'Le marigot du parc abrite le Varan du Nil, le Pelican blanc et le Crocodile sacré. Protegeons les berges !',
    content:
      'Les zones humides du parc filtrent les eaux de ruissellement urbaines et constituent le milieu de vie d\'espèces rares. L\'interdiction du braconnage et de la pêche sauvage a permis une augmentation de 40% des reptiles aquatiques.',
    imageUrl: '/images/DOMAINE_DU_CROCO.jpg',
    readTime: '4 min de lecture',
  },
];

// DATA FOR QUIZ GAME
const QUIZ_QUESTIONS = [
  {
    question: 'Que signifie "Bangr-Weoogo" en langue mooré ?',
    options: [
      'La Forêt du Savoir / de la Connaissance',
      'Le Grand Jardin du Roi',
      'La Rivière aux Crocodiles',
      'Le Bois des Éléphants',
    ],
    correctIndex: 0,
    explanation:
      'En mooré, "Bangr" signifie le savoir/la connaissance, et "Weoogo" désigne la forêt. C\'était l\'espace traditionnel d\'initiation des jeunes Mossi.',
  },
  {
    question: 'Quelle est la vitesse maximale que peut atteindre le Singe Patas en pleine course ?',
    options: ['25 km/h', '35 km/h', '55 km/h', '80 km/h'],
    correctIndex: 2,
    explanation:
      'Le Singe Patas (Erythrocebus patas) est le primate le plus rapide du monde, capable d\'atteindre 55 km/h pour échapper aux prédateurs.',
  },
  {
    question: 'Quelle est la superficie totale du domaine classé du Parc Urbain Bangr-Weoogo ?',
    options: ['50 hectares', '120 hectares', '265 hectares', '500 hectares'],
    correctIndex: 2,
    explanation:
      'Le parc couvre 265 hectares de forêt classée en plein cœur de la commune de Ouagadougou.',
  },
  {
    question: 'Quel est l\'impact environnemental majeur de la canopée du parc sur Ouagadougou ?',
    options: [
      'Elle réduit la température de la ville jusqu\'à 3°C et absorbe la poussière d\'harmattan',
      'Elle produit de l\'or',
      'Elle attire des marées océaniques',
      'Elle stoppe le soleil',
    ],
    correctIndex: 0,
    explanation:
      'Grâce à son évapotranspiration et à sa masse végétale, la forêt régule le microclimat et filtre l\'air urbain.',
  },
];

// DATA FOR MEMORY CARDS
const MEMORY_CARDS_DATA = [
  { id: '1', name: 'Singe patas', icon: '🐒', matchId: 'm1', label: 'Le primate à 55 km/h' },
  { id: 'm1', name: 'Le primate à 55 km/h', icon: '⚡', matchId: '1', label: 'Singe patas' },
  { id: '2', name: 'Crocodile du Nil', icon: '🐊', matchId: 'm2', label: 'Habitant du Marigot' },
  { id: 'm2', name: 'Habitant du Marigot', icon: '🌊', matchId: '2', label: 'Crocodile du Nil' },
  { id: '3', name: 'Karité Sacré', icon: '🌳', matchId: 'm3', label: 'Beurre traditionnel du Sahel' },
  { id: 'm3', name: 'Beurre traditionnel du Sahel', icon: '🧴', matchId: '3', label: 'Karité Sacré' },
  { id: '4', name: 'Pélican Blanc', icon: '🦤', matchId: 'm4', label: 'Bec gulaire d\'eau' },
  { id: 'm4', name: 'Bec gulaire d\'eau', icon: '🐟', matchId: '4', label: 'Pélican Blanc' },
];

export default function SensibilisationPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'quiz' | 'memory' | 'ecogestes'>('articles');
  const [filterCategory, setFilterCategory] = useState<'all' | 'presse' | 'ecologie' | 'ecogeste'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState<PressArticle | null>(null);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Memory Game State
  const [cards, setCards] = useState<any[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Eco-challenge state
  const [ecoChecklist, setEcoChecklist] = useState<Record<string, boolean>>({
    gourde: false,
    dechets: false,
    sentiers: false,
    billet_qr: false,
    silence: false,
  });

  // Init Memory Game
  useEffect(() => {
    resetMemoryGame();
  }, []);

  const resetMemoryGame = () => {
    const shuffled = [...MEMORY_CARDS_DATA].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMemoryMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIds.includes(cards[index].id)) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((prev) => prev + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.matchId === card2.id) {
        setMatchedIds((prev) => [...prev, card1.id, card2.id]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // Quiz Actions
  const handleAnswerQuiz = (choiceIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choiceIdx);
    if (choiceIdx === QUIZ_QUESTIONS[quizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const filteredArticles = ARTICLES_LIST.filter((art) => {
    const matchCat = filterCategory === 'all' || art.category === filterCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleEcoCheck = (key: string) => {
    setEcoChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedEcoCount = Object.values(ecoChecklist).filter(Boolean).length;
  const ecoScorePercent = Math.round((completedEcoCount / 5) * 100);

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        <Breadcrumb items={[{ label: 'Sensibilisation & Écologie' }]} />

        {/* HEADER HERO */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf inline-block mb-2 bg-leaf/10 border border-leaf/30 px-3.5 py-1 rounded-full">
            Éducation Environnementale &amp; Actualités
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-canopy-deep">
            Espace Sensibilisation &amp; Jeux Ludiques
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Découvrez nos articles de presse, nos enquêtes écologiques sur Bangr-Weoogo, et testez vos connaissances avec nos jeux interactifs.
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'articles'
                ? 'bg-canopy text-white shadow-md ring-2 ring-canopy/20'
                : 'bg-card text-ink border border-[#E9E1CC] hover:bg-sand/40'
            }`}
          >
            <Newspaper className="w-4 h-4 text-leaf" /> Articles de Presse &amp; Écologie ({ARTICLES_LIST.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-baobab text-white shadow-md ring-2 ring-baobab/20'
                : 'bg-card text-ink border border-[#E9E1CC] hover:bg-sand/40'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-400" /> Quiz de la Biodiversité
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-5 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'memory'
                ? 'bg-canopy text-white shadow-md ring-2 ring-canopy/20'
                : 'bg-card text-ink border border-[#E9E1CC] hover:bg-sand/40'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-leaf" /> Jeu de Mémoire &amp; Association
          </button>
          <button
            onClick={() => setActiveTab('ecogestes')}
            className={`px-5 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ecogestes'
                ? 'bg-leaf text-canopy shadow-md ring-2 ring-leaf/20'
                : 'bg-card text-ink border border-[#E9E1CC] hover:bg-sand/40'
            }`}
          >
            <Leaf className="w-4 h-4 text-canopy" /> Défi Éco-Citoyen (Calculateur)
          </button>
        </div>

        {/* TAB 1: ARTICLES DE PRESSE & ÉCOLOGIE */}
        {activeTab === 'articles' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filters & Search */}
            <div className="bg-sand/50 border border-[#DED2B4] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    filterCategory === 'all'
                      ? 'bg-canopy text-white'
                      : 'bg-white text-ink border border-[#E9E1CC] hover:bg-sand/60'
                  }`}
                >
                  Tous les articles
                </button>
                <button
                  onClick={() => setFilterCategory('presse')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    filterCategory === 'presse'
                      ? 'bg-baobab text-white'
                      : 'bg-white text-ink border border-[#E9E1CC] hover:bg-sand/60'
                  }`}
                >
                  Articles de Presse (RTB / Sidwaya)
                </button>
                <button
                  onClick={() => setFilterCategory('ecologie')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    filterCategory === 'ecologie'
                      ? 'bg-canopy text-white'
                      : 'bg-white text-ink border border-[#E9E1CC] hover:bg-sand/60'
                  }`}
                >
                  Biodiversité &amp; Forêt
                </button>
                <button
                  onClick={() => setFilterCategory('ecogeste')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    filterCategory === 'ecogeste'
                      ? 'bg-leaf text-canopy font-bold'
                      : 'bg-white text-ink border border-[#E9E1CC] hover:bg-sand/60'
                  }`}
                >
                  Écogestes du Visiteur
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un sujet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E9E1CC] rounded-full text-xs focus:outline-none focus:border-canopy"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-sm ${
                          art.category === 'presse'
                            ? 'bg-baobab'
                            : art.category === 'ecologie'
                            ? 'bg-canopy'
                            : 'bg-leaf text-canopy font-bold'
                        }`}
                      >
                        {art.category === 'presse'
                          ? 'Article de Presse'
                          : art.category === 'ecologie'
                          ? 'Dossier Écologie'
                          : 'Conseils Écogestes'}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-ink-soft mb-2">
                        <span className="font-semibold text-canopy">{art.source}</span>
                        <span>{art.date}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-canopy-deep leading-snug group-hover:text-baobab transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-ink-soft mt-3 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-sand/30 flex items-center justify-between mt-4">
                    <span className="text-[11px] text-leaf font-medium">{art.readTime}</span>
                    <button
                      onClick={() => setActiveArticleModal(art)}
                      className="text-xs font-bold text-canopy hover:text-baobab flex items-center gap-1 transition"
                    >
                      <span>Lire l'article</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: QUIZ DE LA BIODIVERSITÉ */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-xl animate-in fade-in duration-300">
            {!quizCompleted ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-sand">
                  <span className="text-xs font-bold uppercase tracking-wider text-leaf">
                    Question {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-baobab bg-baobab/10 px-3 py-1 rounded-full">
                    Score : {quizScore} pte(s)
                  </span>
                </div>

                <h2 className="font-serif text-xl md:text-2xl font-bold text-canopy">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h2>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[quizIndex].correctIndex;
                    let btnStyle = 'bg-harmattan border-[#E9E1CC] text-ink hover:bg-sand/60';

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-leaf/20 border-leaf text-canopy font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-100 border-red-400 text-red-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-2xl text-left border transition text-sm flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedAnswer !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-leaf shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="p-4 bg-sand/40 rounded-2xl border border-sand text-xs text-canopy leading-relaxed space-y-3 animate-in fade-in">
                    <p className="font-medium">
                      💡 <strong>Explication :</strong> {QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                    <button
                      onClick={nextQuizQuestion}
                      className="w-full py-3 bg-canopy hover:bg-canopy-deep text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                    >
                      <span>
                        {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Question Suivante →' : 'Voir le Résultat Final 🎉'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-20 h-20 bg-baobab/20 text-baobab rounded-full flex items-center justify-center mx-auto text-4xl">
                  🏆
                </div>
                <h2 className="font-serif text-3xl font-bold text-canopy">
                  Quiz Terminé !
                </h2>
                <p className="text-base text-ink font-medium">
                  Votre Score : <span className="font-bold text-baobab text-2xl">{quizScore} / {QUIZ_QUESTIONS.length}</span>
                </p>

                <div className="p-4 bg-sand/30 rounded-2xl border border-sand text-xs text-ink-soft max-w-md mx-auto">
                  {quizScore === QUIZ_QUESTIONS.length ? (
                    <p className="text-canopy font-bold">
                      🥇 Félicitations ! Vous êtes un véritable Expert Écolo du Parc Bangr-Weoogo !
                    </p>
                  ) : (
                    <p>
                      Bravo pour votre participation ! Relisez nos articles de presse pour parfaire vos connaissances.
                    </p>
                  )}
                </div>

                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-canopy hover:bg-canopy-deep text-white font-bold rounded-xl transition text-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Recommencer le Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: JEU DE MÉMOIRE (MEMORY GAME) */}
        {activeTab === 'memory' && (
          <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-sand mb-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-canopy">Jeu de Mémoire — Faune &amp; Flore</h2>
                <p className="text-xs text-ink-soft">Associez chaque symbole de Bangr-Weoogo à sa description !</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-soft block">Coup(s) joué(s)</span>
                <span className="font-bold text-canopy text-lg">{memoryMoves}</span>
              </div>
            </div>

            {matchedIds.length === cards.length ? (
              <div className="text-center py-8 space-y-4">
                <span className="text-5xl block animate-bounce">🎉</span>
                <h3 className="font-serif text-2xl font-bold text-canopy">Super ! Vous avez réussi le Memory !</h3>
                <p className="text-xs text-ink-soft">Réussi en {memoryMoves} coups.</p>
                <button
                  onClick={resetMemoryGame}
                  className="px-6 py-3 bg-baobab hover:bg-baobab/90 text-white font-bold rounded-xl transition text-xs inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Rejouer une Partie
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cards.map((card, idx) => {
                  const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      className={`h-28 rounded-2xl p-3 border-2 transition-all flex flex-col items-center justify-center text-center ${
                        isFlipped
                          ? 'bg-harmattan border-leaf shadow-md scale-95'
                          : 'bg-canopy text-harmattan border-canopy hover:bg-canopy-deep'
                      }`}
                    >
                      {isFlipped ? (
                        <>
                          <span className="text-3xl mb-1">{card.icon}</span>
                          <span className="text-[11px] font-bold text-canopy leading-tight">{card.name}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-serif opacity-40">🌿</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DÉFI ÉCO-CITOYEN (CHECKLIST CALCULATEUR) */}
        {activeTab === 'ecogestes' && (
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 border border-[#E9E1CC] shadow-xl animate-in fade-in duration-300 space-y-8">
            <div className="text-center">
              <span className="px-3.5 py-1 bg-leaf/20 text-canopy font-bold text-xs rounded-full uppercase">
                Calculateur d'Impact
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-canopy mt-2">
                Le Défi du Visiteur Éco-Responsable
              </h2>
              <p className="text-xs text-ink-soft mt-1">
                Cochez les engagements que vous prenez lors de votre venue au Parc Bangr-Weoogo.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'gourde', title: 'Gourde réutilisable', desc: 'J\'emporte ma propre gourde d\'eau pour éviter le jet de bouteilles plastiques.' },
                { key: 'dechets', title: 'Zéro déchet dans la forêt', desc: 'Je jette mes emballages uniquement dans les poubelles de tri prévues aux sorties.' },
                { key: 'sentiers', title: 'Respect des sentiers balisés', desc: 'Je reste sur les chemins de marche pour ne pas détruire les jeunes pousses d\'arbres.' },
                { key: 'billet_qr', title: 'Billetterie numérique QR Code', desc: 'J\'achète mes tickets en ligne par Mobile Money pour éviter l\'impression sur papier.' },
                { key: 'silence', title: 'Tranquillité de la faune', desc: 'Je ne crie pas et ne nourris pas les animaux (crocodiles, primates, oiseaux).' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleEcoCheck(item.key)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
                    ecoChecklist[item.key]
                      ? 'bg-leaf/15 border-leaf shadow-sm'
                      : 'bg-harmattan border-[#E9E1CC] hover:bg-sand/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      ecoChecklist[item.key] ? 'bg-canopy text-white border-canopy' : 'border-ink-soft/40'
                    }`}
                  >
                    {ecoChecklist[item.key] ? '✓' : ''}
                  </div>
                  <div>
                    <h3 className="font-bold text-canopy text-sm">{item.title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Score Display */}
            <div className="bg-sand/40 p-6 rounded-2xl border border-sand text-center space-y-3">
              <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">Votre Score d'Engagement</span>
              <div className="font-serif text-4xl font-extrabold text-canopy">{ecoScorePercent}%</div>
              <p className="text-xs text-canopy font-medium">
                {completedEcoCount === 5
                  ? '🌟 Parfait ! Vous êtes un Éco-Citoyen exemplaire pour Ouagadougou !'
                  : `${completedEcoCount} engagement(s) coché(s). Complétez le défi pour devenir Éco-Citoyen !`}
              </p>
            </div>
          </div>
        )}

        {/* MODAL ARTICLE COMPLET */}
        {activeArticleModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-harmattan rounded-3xl max-w-2xl w-full p-6 md:p-8 border border-sand shadow-2xl space-y-6 relative my-8">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-sand/60 hover:bg-sand text-canopy flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold text-baobab uppercase tracking-wider">
                  {activeArticleModal.source} • {activeArticleModal.date}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-canopy">
                  {activeArticleModal.title}
                </h2>
              </div>

              <img
                src={activeArticleModal.imageUrl}
                alt={activeArticleModal.title}
                className="w-full h-64 object-cover rounded-2xl border border-sand"
              />

              <div className="text-ink/90 text-sm md:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
                {activeArticleModal.content}
              </div>

              <div className="pt-4 border-t border-sand flex justify-between items-center text-xs">
                <span className="text-leaf font-bold">{activeArticleModal.readTime}</span>
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="px-6 py-2.5 bg-canopy text-white font-bold rounded-xl hover:bg-canopy-deep transition"
                >
                  Fermer l'article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
