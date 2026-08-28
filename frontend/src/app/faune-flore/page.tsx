'use client';

import React, { useState, useEffect } from 'react';
import { SpeciesCard } from '../../components/SpeciesCard';
import { fetchSiteEspeces, Espece } from '../../lib/api';
import { Filter, Search, TreePine, PawPrint } from 'lucide-react';

const FALLBACK_ESPECES: Espece[] = [
  {
    id: '1',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Hippopotame amphibie',
    nom_scientifique: 'Hippopotamus amphibius',
    description: 'Grand mammifère semi-aquatique vivant dans les zones humides et le marigot du parc Bangr-Weoogo.',
    photo_url: '/images/BAIN_D_HIPPOPO.jpg',
  },
  {
    id: '2',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Pélican blanc',
    nom_scientifique: 'Pelecanus onocrotalus',
    description: 'Grand oiseau d\'eau à la poche gulaire impressionnante sous le bec.',
    photo_url: '/images/BEC_A_POCHE_DU_PELICAN.jpg',
  },
  {
    id: '3',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Choucador à longue queue',
    nom_scientifique: 'Lamprotornis caudatus',
    description: 'Passereau iridescent aux reflets bleus et verts métalliques et longue queue étincelante.',
    photo_url: '/images/Choucador_à_longue_queue.jpg',
  },
  {
    id: '4',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Crocodile du Nil',
    nom_scientifique: 'Crocodylus niloticus',
    description: 'Grand prédateur aquatique vivant dans le domaine réservé du marigot.',
    photo_url: '/images/DOMAINE_DU_CROCO.jpg',
  },
  {
    id: '5',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Marabout d\'Afrique',
    nom_scientifique: 'Leptoptilos crumenifer',
    description: 'Grand échassier symbole de la faune africaine à la grande envergure.',
    photo_url: '/images/Marabout_d_Afrique.jpg',
  },
  {
    id: '6',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Singe patas (Singe rouge)',
    nom_scientifique: 'Erythrocebus patas',
    description: 'Le singe le plus rapide au monde (55 km/h), emblème très connu du parc Bangr-Weoogo.',
    photo_url: '/images/Mr._MONKEY_01.jpg',
  },
  {
    id: '7',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Cobe de Fassa / Antilope',
    nom_scientifique: 'Kobus ellipsiprymnus',
    description: 'Élégante antilope aux cornes lyrées vivant dans la zone faunique préservée.',
    photo_url: '/images/REGARD_D_ANTILOPE.jpg',
  },
  {
    id: '8',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Nénuphar blanc du marigot',
    nom_scientifique: 'Nymphaea lotus',
    description: 'Plante aquatique sacrée fleurissant à la surface des eaux claires du parc.',
    photo_url: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
  },
  {
    id: '9',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Fromager géant (Kapokier)',
    nom_scientifique: 'Ceiba pentandra',
    description: 'Arbre géant aux contreforts impressionnants marquant la canopée du parc.',
    photo_url: '/images/TREE.jpg',
  },
  {
    id: '10',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Tortue sillonnée du Sahel',
    nom_scientifique: 'Centrochelys sulcata',
    description: 'Plus grande tortue terrestre d\'Afrique, protégée au zoo de Bangr-Weoogo.',
    photo_url: '/images/Tortue_en_chaleur.jpg',
  },
  {
    id: '11',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Héron garde-bœufs',
    nom_scientifique: 'Bubulcus ibis',
    description: 'Échassier blanc au bec jaune accompagnant la grande faune herbivore du parc.',
    photo_url: '/images/pexels-barrytheoctopus-36438047.jpg',
  },
  {
    id: '12',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Aigle ravisseur',
    nom_scientifique: 'Aquila rapax',
    description: 'Rapace de la savane au vol majestueux planant au-dessus de la forêt classée.',
    photo_url: '/images/pexels-charmain-11727678.jpg',
  },
  {
    id: '13',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Agame des colons (Margouillat)',
    nom_scientifique: 'Agama agama',
    description: 'Lézard très vif à la tête couleur orange vif arpentant les rochers du parc.',
    photo_url: '/images/pexels-enginakyurt-34313526.jpg',
  },
  {
    id: '14',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Baobab africain',
    nom_scientifique: 'Adansonia digitata',
    description: 'L\'arbre de vie emblématique du Sahel au tronc gigantesque gorgé d\'eau.',
    photo_url: '/images/pexels-julesgermainformel-36625842.jpg',
  },
  {
    id: '15',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Karité du Burkina',
    nom_scientifique: 'Vitellaria paradoxa',
    description: 'Arbre béni d\'Afrique de l\'Ouest produisant les noix de karité.',
    photo_url: '/images/pexels-lannguyentranm-37254820.jpg',
  },
  {
    id: '16',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Néré (Arbre à moutarde)',
    nom_scientifique: 'Parkia biglobosa',
    description: 'Arbre emblématique dont les graines fermentées fabriquent le Soumbala.',
    photo_url: '/images/pexels-moon-485480442-18345783.jpg',
  },
  {
    id: '17',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Touraco violet',
    nom_scientifique: 'Musophaga violacea',
    description: 'Magnifique oiseau forestier au plumage violet sombre et huppe rouge carmin.',
    photo_url: '/images/pexels-peterjochim-fotografie-37502422.jpg',
  },
  {
    id: '18',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Varan du Nil du marigot',
    nom_scientifique: 'Varanus niloticus',
    description: 'Grand reptile semi-aquatique agile peuplant les rives du marigot.',
    photo_url: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
  },
  {
    id: '19',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Rônier (Palmier à éventail)',
    nom_scientifique: 'Borassus aethiopum',
    description: 'Grand palmier élancé aux larges palmes marquant le paysage du parc.',
    photo_url: '/images/pexels-roman-odintsov-8189183.jpg',
  },
  {
    id: '20',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Guêpier à gorge rouge',
    nom_scientifique: 'Merops bulocki',
    description: 'Oiseau multicolore chassant les insectes volants au-dessus des mares.',
    photo_url: '/images/pexels-talharesitoglu-29591828.jpg',
  },
  {
    id: '21',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Calao à bec rouge',
    nom_scientifique: 'Tockus erythrorhynchus',
    description: 'Oiseau emblématique de la canopée au chant matinal puissant.',
    photo_url: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
  },
];

export default function FauneFlorePage() {
  const [especes, setEspeces] = useState<Espece[]>([]);
  const [filter, setFilter] = useState<'all' | 'animal' | 'plante'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSiteEspeces('bangr-weoogo');
        if (data && data.length > 0) {
          setEspeces(data);
        } else {
          setEspeces(FALLBACK_ESPECES);
        }
      } catch (err) {
        console.warn('Utilisation de la liste de secours pour la biodiversité:', err);
        setEspeces(FALLBACK_ESPECES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredEspeces = especes.filter((item) => {
    const matchesFilter = filter === 'all' || item.categorie === filter;
    const matchesSearch =
      item.nom_commun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nom_scientifique.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf inline-block mb-2">
            Biodiversité du parc Bangr-Weoogo
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-canopy-deep">
            Biodiversité du Sahel
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Explorez la riche variété d'animaux et de plantes répertoriés dans la forêt classée de 250 hectares à Ouagadougou.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-sand/60 border border-[#DED2B4] rounded-2xl p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-canopy text-white shadow-sm'
                  : 'bg-white text-ink-soft border border-[#E9E1CC] hover:bg-white/80'
              }`}
            >
              Toutes les espèces ({especes.length})
            </button>
            <button
              onClick={() => setFilter('animal')}
              className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                filter === 'animal'
                  ? 'bg-canopy text-white shadow-sm'
                  : 'bg-white text-ink-soft border border-[#E9E1CC] hover:bg-white/80'
              }`}
            >
              <PawPrint className="w-3.5 h-3.5" /> Faune / Animaux (
              {especes.filter((e) => e.categorie === 'animal').length})
            </button>
            <button
              onClick={() => setFilter('plante')}
              className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition whitespace-nowrap ${
                filter === 'plante'
                  ? 'bg-canopy text-white shadow-sm'
                  : 'bg-white text-ink-soft border border-[#E9E1CC] hover:bg-white/80'
              }`}
            >
              <TreePine className="w-3.5 h-3.5" /> Flore / Plantes (
              {especes.filter((e) => e.categorie === 'plante').length})
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une espèce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#E9E1CC] rounded-full text-xs text-ink focus:outline-none focus:border-canopy"
            />
          </div>
        </div>

        {/* Species Grid */}
        {loading ? (
          <div className="text-center py-20 text-ink-soft text-sm">
            Chargement de la biodiversité...
          </div>
        ) : filteredEspeces.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E9E1CC] max-w-md mx-auto">
            <p className="text-sm font-medium text-ink mb-1">Aucune espèce trouvée</p>
            <p className="text-xs text-ink-soft">Essayez un autre mot clé ou réinitialisez le filtre.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEspeces.map((espece) => (
              <SpeciesCard key={espece.id} espece={espece} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
