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
    description: 'Grand oiseau d\'eau reconnaissable à son imposante poche gulaire sous le bec.',
    photo_url: '/images/BEC_A_POCHE_DU_PELICAN.jpg',
  },
  {
    id: '3',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Choucador à longue queue',
    nom_scientifique: 'Lamprotornis caudatus',
    description: 'Magnifique passereau aux plumages vert et bleu métalliques iridescents, remarquable par sa longue queue étincelante.',
    photo_url: '/images/Choucador_à_longue_queue.jpg',
  },
  {
    id: '4',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Crocodile du Nil',
    nom_scientifique: 'Crocodylus niloticus',
    description: 'Grand reptile aquatique impressionnant abrité et préservé dans le domaine réservé du marigot du parc.',
    photo_url: '/images/DOMAINE_DU_CROCO.jpg',
  },
  {
    id: '5',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Marabout d\'Afrique',
    nom_scientifique: 'Leptoptilos crumenifer',
    description: 'Grand échassier symbole de la faune africaine, doté d\'une envergure spectaculaire.',
    photo_url: '/images/Marabout_d_Afrique.jpg',
  },
  {
    id: '6',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Singe patas (Singe rouge)',
    nom_scientifique: 'Erythrocebus patas',
    description: 'Le singe le plus rapide au monde (jusqu\'à 55 km/h), emblème agitateur et populaire du parc Bangr-Weoogo.',
    photo_url: '/images/pexels-daniel-gomez-2158503858-35567587.jpg',
  },
  {
    id: '7',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Cobe de Fassa / Antilope',
    nom_scientifique: 'Kobus ellipsiprymnus',
    description: 'Élégante antilope aux cornes lyrées et au regard captivant, évoluant dans la réserve faunique.',
    photo_url: '/images/REGARD_D_ANTILOPE.jpg',
  },
  {
    id: '8',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Nénuphar blanc du marigot',
    nom_scientifique: 'Nymphaea lotus',
    description: 'Plante aquatique sacrée fleurissant à la surface des eaux tranquilles du parc.',
    photo_url: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
  },
  {
    id: '9',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Fromager géant (Kapokier)',
    nom_scientifique: 'Ceiba pentandra',
    description: 'Arbre géant tropical aux contreforts puissants marquant la canopée sacrée de la forêt classée.',
    photo_url: '/images/TREE.jpg',
  },
  {
    id: '10',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Tortue sillonnée du Sahel',
    nom_scientifique: 'Centrochelys sulcata',
    description: 'Troisième plus grande tortue terrestre du monde et la plus grande d\'Afrique, protégée au zoo de Bangr-Weoogo.',
    photo_url: '/images/pexels-f-fezari-326720894-30966189.jpg',
  },
  {
    id: '11',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Écureuil de savane (Écureuil arboricole)',
    nom_scientifique: 'Heliosciurus gambianus',
    description: 'Petit rongeur agile au pelage touffu grimpant le long des troncs et des branches des grands arbres.',
    photo_url: '/images/pexels-barrytheoctopus-36438047.jpg',
  },
  {
    id: '12',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Hyène tachetée',
    nom_scientifique: 'Crocuta crocuta',
    description: 'Grand carnivore emblématique de la savane africaine aux mâchoires puissantes et au pelage tacheté.',
    photo_url: '/images/pexels-charmain-11727678.jpg',
  },
  {
    id: '13',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Pintade de Numidie (Pintade sauvage)',
    nom_scientifique: 'Numida meleagris',
    description: 'Oiseau terrestre d\'Afrique au plumage sombre ponctué de blanc et au casque corné caractéristiques.',
    photo_url: '/images/pexels-enginakyurt-34313526.jpg',
  },
  {
    id: '14',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Baobab africain',
    nom_scientifique: 'Adansonia digitata',
    description: 'L\'arbre de vie mythique du Sahel au tronc gigantesque emmagasinant de précieuses réserves d\'eau.',
    photo_url: '/images/pexels-julesgermainformel-36625842.jpg',
  },
  {
    id: '15',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Karité du Burkina',
    nom_scientifique: 'Vitellaria paradoxa',
    description: 'Arbre vénéré produisant les amandes de karité, véritable or vert des savanes de l\'Afrique de l\'Ouest.',
    photo_url: '/images/pexels-lannguyentranm-37254820.jpg',
  },
  {
    id: '16',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Paon bleu',
    nom_scientifique: 'Pavo cristatus',
    description: 'Superbe oiseau d\'ornement au cou bleu saphir étincelant et aux plumes ocellées évoluant en liberté.',
    photo_url: '/images/pexels-moon-485480442-18345783.jpg',
  },
  {
    id: '17',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Héron cendré',
    nom_scientifique: 'Ardea cinerea',
    description: 'Grand échassier solitaire au plumage gris et blanc guettant les poissons au bord des plans d\'eau.',
    photo_url: '/images/pexels-peterjochim-fotografie-37502422.jpg',
  },
  {
    id: '18',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Varan du Nil',
    nom_scientifique: 'Varanus niloticus',
    description: 'Grand reptile semi-aquatique agile arpentant les berges du marigot et les rochers de la forêt classée.',
    photo_url: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
  },
  {
    id: '19',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Canards sauvages du plan d\'eau',
    nom_scientifique: 'Anas platyrhynchos',
    description: 'Oiseaux aquatiques s\'ébattant paisiblement sur la surface des marigots et des bassins du parc.',
    photo_url: '/images/pexels-roman-odintsov-8189183.jpg',
  },
  {
    id: '20',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Chauve-souris frugivore (Roussette)',
    nom_scientifique: 'Eidolon helvum',
    description: 'Mammifère volant nocturne suspendu aux hautes branches, essentiel à la pollinisation de la forêt.',
    photo_url: '/images/pexels-talharesitoglu-29591828.jpg',
  },
  {
    id: '21',
    site_id: '1',
    categorie: 'animal',
    nom_commun: 'Calao à bec jaune',
    nom_scientifique: 'Tockus flavirostris',
    description: 'Oiseau emblématique de la savane au bec courbé jaune vif dont les appels résonnent au sommet des arbres.',
    photo_url: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
  },
  {
    id: '22',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Flamboyant jaune en fleurs',
    nom_scientifique: 'Cassia fistula',
    description: 'Arbre d\'ornement remarquable aux grappes dorées éclatantes apportant une touche de couleur au parc.',
    photo_url: '/images/pexels-debora-silva-2149722460-32678993.jpg',
  },
  {
    id: '23',
    site_id: '1',
    categorie: 'plante',
    nom_commun: 'Acacia de la savane',
    nom_scientifique: 'Acacia senegal',
    description: 'Arbre typique des régions sahéliennes au feuillage fin composé, symbole de résistance à la sécheresse.',
    photo_url: '/images/pexels-joel-jose-518889169-16764330.jpg',
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
