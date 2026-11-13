'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RotateCcw, TreePine, Compass, BookOpen, MapPin } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-card rounded-3xl p-8 border border-sand shadow-lg text-center">
        {/* Badge statut */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand/60 text-ink-soft text-xs font-semibold mb-6">
          <WifiOff className="w-3.5 h-3.5 text-baobab" />
          <span>{isOnline ? 'Connexion rétablie' : 'Mode hors connexion'}</span>
        </div>

        {/* Icône principale */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-canopy/10 border-2 border-leaf/30 flex items-center justify-center text-canopy shadow-inner">
          <TreePine className="w-10 h-10 text-canopy stroke-[2]" />
        </div>

        {/* Titre & Message */}
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-canopy-deep mb-3 leading-tight">
          Vous êtes au cœur de Bangr-Weoogo
        </h1>
        <p className="text-ink-soft text-sm leading-relaxed mb-6">
          La connexion Internet est actuellement faible ou indisponible dans cette zone du parc.
          Vos pages et fiches déjà consultées restent accessibles ci-dessous.
        </p>

        {/* Bouton Réessayer */}
        <button
          onClick={handleRetry}
          className="w-full py-3 px-5 bg-canopy hover:bg-canopy-deep text-harmattan font-semibold text-sm rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2 mb-6 transform active:scale-98"
        >
          <RotateCcw className="w-4 h-4 text-leaf" />
          <span>Actualiser la page</span>
        </button>

        {/* Accès rapide aux pages mises en cache */}
        <div className="text-left pt-6 border-t border-sand">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">
            Contenus disponibles hors ligne :
          </p>
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-harmattan hover:bg-sand/60 transition text-sm text-canopy-deep font-medium"
            >
              <Compass className="w-4 h-4 text-leaf flex-shrink-0" />
              <span>Accueil du Parc</span>
            </Link>
            <Link
              href="/faune-flore"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-harmattan hover:bg-sand/60 transition text-sm text-canopy-deep font-medium"
            >
              <TreePine className="w-4 h-4 text-leaf flex-shrink-0" />
              <span>Biodiversité (Faune & Flore)</span>
            </Link>
            <Link
              href="/histoire"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-harmattan hover:bg-sand/60 transition text-sm text-canopy-deep font-medium"
            >
              <BookOpen className="w-4 h-4 text-leaf flex-shrink-0" />
              <span>Histoire de la Forêt Classée</span>
            </Link>
          </div>
        </div>

        {/* Note écologique */}
        <div className="mt-6 pt-4 text-[11px] text-ink-soft flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-leaf" />
          <span>Parc Urbain Bangr-Weoogo — Ouagadougou</span>
        </div>
      </div>
    </div>
  );
}

