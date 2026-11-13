'use client';

import React, { useEffect, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

export function PwaRegister() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Désactivé en développement local pour éviter tout cache gênant lors du dev
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        // Cas où un SW est déjà en attente au chargement
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowUpdateToast(true);
        }

        // Cas où un nouveau SW est découvert
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShowUpdateToast(true);
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('[PWA] Échec enregistrement Service Worker :', err);
      });
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowUpdateToast(false);
  };

  if (!showUpdateToast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-canopy-deep text-harmattan p-4 rounded-2xl border border-leaf/40 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-leaf/20 flex items-center justify-center shrink-0 text-leaf">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">Nouvelle version disponible</p>
            <p className="text-[11px] text-[#C9D8C4] truncate">Mise à jour du contenu du parc</p>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="px-3.5 py-1.5 bg-baobab hover:bg-baobab/90 text-white rounded-xl text-xs font-bold transition transform active:scale-95 flex items-center gap-1.5 shrink-0 shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Actualiser</span>
        </button>
      </div>
    </div>
  );
}
