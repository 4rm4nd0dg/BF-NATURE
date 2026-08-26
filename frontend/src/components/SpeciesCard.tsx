import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Espece } from '../lib/api';

interface SpeciesCardProps {
  espece: Espece;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ espece }) => {
  return (
    <Link
      href={`/faune-flore/${espece.id}`}
      className="group bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-md transition duration-200 flex flex-col"
    >
      <div className="relative h-44 w-full bg-sand overflow-hidden">
        {espece.photo_url ? (
          <img
            src={espece.photo_url}
            alt={espece.nom_commun}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-canopy/10 text-canopy font-medium text-xs">
            Photo indisponible
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-leaf mb-1">
            {espece.categorie === 'animal' ? 'Faune' : 'Flore'}
          </span>
          <h3 className="font-serif text-lg font-medium text-ink group-hover:text-canopy transition-colors">
            {espece.nom_commun}
          </h3>
          <div className="text-xs italic text-ink-soft mt-0.5 font-serif">
            {espece.nom_scientifique}
          </div>
        </div>

        <p className="text-xs text-ink-soft line-clamp-2 mt-3 leading-relaxed">
          {espece.description}
        </p>
      </div>
    </Link>
  );
};
