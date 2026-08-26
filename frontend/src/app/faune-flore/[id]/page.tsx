import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

import { fetchSiteEspeces } from '../../../lib/api';
import { ArrowLeft, MapPin, Shield, Info, TreePine } from 'lucide-react';

export default async function EspeceDetailPage({ params }: { params: { id: string } }) {
  let especeData;

  try {
    const list = await fetchSiteEspeces('bangr-weoogo');
    especeData = list.find((e) => e.id === params.id);
  } catch (err) {
    console.error('Erreur chargement espèce:', err);
  }

  // Fallback static data if not found or server renders statically
  if (!especeData) {
    especeData = {
      id: params.id,
      site_id: '1',
      categorie: 'animal' as const,
      nom_commun: 'Singe patas',
      nom_scientifique: 'Erythrocebus patas',
      description:
        'Le singe patas, aussi connu sous le nom de singe rouge ou hussard, est une espèce de primates de la famille des Cercopithecidae. C\'est le seul représentant du genre Erythrocebus. Il se caractérise par son pelage roux vif, son ventre blanc et sa vitesse de course exceptionnelle qui peut atteindre 55 km/h dans les savanes ouvertes du parc Bangr-Weoogo.',
      photo_url: 'https://images.unsplash.com/photo-1540573133985-780688d1728b?auto=format&fit=crop&w=800&q=80',
    };
  }

  return (
    <div className="py-12 bg-harmattan min-h-screen">
      <div className="max-w-[960px] mx-auto px-6">
        <Link
          href="/faune-flore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-canopy hover:text-baobab mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la liste de la faune &amp; flore
        </Link>

        <div className="bg-card rounded-3xl overflow-hidden border border-[#E9E1CC] shadow-md grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-80 md:h-auto bg-sand min-h-[300px]">
            {especeData.photo_url ? (
              <img
                src={especeData.photo_url}
                alt={especeData.nom_commun}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-canopy/10 text-canopy font-medium text-xs">
                Photo indisponible
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-leaf/15 text-leaf rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                {especeData.categorie === 'animal' ? 'Mammifère / Faune' : 'Arbre / Flore'}
              </span>

              <h1 className="font-serif text-3xl md:text-4xl font-medium text-ink">
                {especeData.nom_commun}
              </h1>

              <div className="font-serif italic text-base text-ink-soft mt-1">
                {especeData.nom_scientifique}
              </div>

              <div className="my-6 pt-6 border-t border-[#E9E1CC]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-canopy mb-2">
                  Description &amp; Habitat
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {especeData.description}
                </p>
              </div>
            </div>

            <div className="bg-sand/60 rounded-2xl p-4 border border-[#DED2B4] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-canopy font-medium">
                <MapPin className="w-4 h-4 text-baobab" /> Habitat : Parc Bangr-Weoogo
              </div>
              <div className="flex items-center gap-1.5 text-leaf font-semibold">
                <Shield className="w-3.5 h-3.5" /> Espèce Protégée
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
