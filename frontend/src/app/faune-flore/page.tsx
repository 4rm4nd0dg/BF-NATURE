'use client';

import React, { useState, useEffect } from 'react';
import { SpeciesCard } from '../../components/SpeciesCard';
import { fetchSiteEspeces, Espece } from '../../lib/api';
import { Filter, Search, TreePine, PawPrint } from 'lucide-react';

export default function FauneFlorePage() {
  const [especes, setEspeces] = useState<Espece[]>([]);
  const [filter, setFilter] = useState<'all' | 'animal' | 'plante'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSiteEspeces('bangr-weoogo');
        setEspeces(data);
      } catch (err) {
        console.error('Erreur de chargement des espèces:', err);
        // Backup static data if API is unreachable during static render
        setEspeces([
          {
            id: '1',
            site_id: '1',
            categorie: 'animal',
            nom_commun: 'Singe patas',
            nom_scientifique: 'Erythrocebus patas',
            description: 'Singe à pelage roux, très agile et rapide (jusqu\'à 55 km/h). Habite la forêt sainte de Bangr-Weoogo.',
            photo_url: 'https://images.unsplash.com/photo-1540573133985-780688d1728b?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: '2',
            site_id: '1',
            categorie: 'animal',
            nom_commun: 'Varan du Nil',
            nom_scientifique: 'Varanus niloticus',
            description: 'Grand reptile d\'eau douce, prédateur naturel assurant la régulation biologique du marigot.',
            photo_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: '3',
            site_id: '1',
            categorie: 'animal',
            nom_commun: 'Calao à bec rouge',
            nom_scientifique: 'Tockus erythrorhynchus',
            description: 'Oiseau emblématique de la savane arborée ouest-africaine, vivant en groupe dans les arbres fruitiers.',
            photo_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: '4',
            site_id: '1',
            categorie: 'plante',
            nom_commun: 'Karité',
            nom_scientifique: 'Vitellaria paradoxa',
            description: 'Arbre précieux des savanes soudano-sahéliennes produisant les noix de karité.',
            photo_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: '5',
            site_id: '1',
            categorie: 'plante',
            nom_commun: 'Baobab africain',
            nom_scientifique: 'Adansonia digitata',
            description: 'Arbre séculaire légendaire du Sahel, pouvant stocker des milliers de litres d\'eau.',
            photo_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: '6',
            site_id: '1',
            categorie: 'animal',
            nom_commun: 'Tortue sillonnée',
            nom_scientifique: 'Centrochelys sulcata',
            description: 'Troisième plus grande tortue terrestre du monde, préservée au zoo du parc.',
            photo_url: 'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=800&q=80',
          },
        ]);
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
            Faune &amp; Flore du Sahel
          </h1>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">
            Explorez les animaux et plantes répertoriés dans la forêt classée de 250 hectares à Ouagadougou.
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
