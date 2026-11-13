'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Share2, PlusSquare, TreePine, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Vérifier si l'application tourne déjà en mode autonome (PWA installée)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      return;
    }

    // 2. Vérifier si l'utilisateur a fermé le bandeau il y a moins de 7 jours
    const dismissedUntil = localStorage.getItem('pwa_prompt_dismissed_until');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // 3. Détection iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !/crios|fxios/.test(ua);
    setIsIos(isIosDevice);

    // 4. Gestion de l'interception de beforeinstallprompt pour Android/Chromium
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Apparaît après un court délai ergonomique (4 secondes)
      setTimeout(() => {
        setShowPrompt(true);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Pour iOS Safari, afficher après 5 secondes si pas de prompt natif
    let iosTimer: NodeJS.Timeout;
    if (isIosDevice) {
      iosTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.warn('[PWA] Erreur installation :', err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    // Ne plus réapparaître pendant 7 jours
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('pwa_prompt_dismissed_until', (Date.now() + sevenDaysMs).toString());
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Bandeau d'installation discret au bas de l'écran */}
      <aside
        aria-label="Installation de l'application"
        className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="bg-canopy-deep/95 backdrop-blur-md text-harmattan p-4 rounded-2xl border border-leaf/30 shadow-2xl flex items-center justify-between gap-3">
          
          {/* Logo du Parc */}
          <div className="w-11 h-11 rounded-2xl bg-leaf/20 border border-leaf/40 flex items-center justify-center shrink-0 text-leaf">
            <TreePine className="w-6 h-6 stroke-[2]" />
          </div>

          {/* Description */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm text-white">Bangr-Weoogo</span>
              <span className="px-1.5 py-0.2 text-[9.5px] uppercase font-bold tracking-wider rounded-md bg-leaf/20 text-leaf border border-leaf/30">
                App
              </span>
            </div>
            <p className="text-xs text-[#C9D8C4] truncate mt-0.5">
              Accès rapide et consultation hors connexion
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="min-h-[44px] px-3.5 py-2 bg-baobab hover:bg-baobab/90 text-white rounded-xl text-xs font-bold transition transform active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>

            <button
              onClick={handleDismiss}
              aria-label="Fermer la suggestion d'installation"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-harmattan/60 hover:text-white rounded-xl hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal d'instructions pour iOS Safari */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
        >
          <div className="bg-card text-ink max-w-sm w-full rounded-3xl p-6 border border-sand shadow-2xl relative animate-in slide-in-from-bottom-6 duration-300">
            <button
              onClick={() => setShowIosGuide(false)}
              aria-label="Fermer le guide"
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-soft hover:text-ink rounded-full hover:bg-sand/40 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-canopy/10 border border-leaf/30 flex items-center justify-center mb-4 text-canopy">
              <TreePine className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-lg font-bold text-canopy-deep mb-2">
              Installer sur iPhone / iPad
            </h3>
            <p className="text-xs text-ink-soft mb-5 leading-relaxed">
              Pour profiter de l'application Bangr-Weoogo même sans réseau au parc, suivez ces 3 étapes simples :
            </p>

            <ol className="space-y-3.5 text-xs text-ink font-medium">
              <li className="flex items-start gap-3 p-2.5 rounded-xl bg-harmattan border border-sand">
                <span className="w-6 h-6 rounded-full bg-canopy text-harmattan flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </span>
                <span className="leading-snug">
                  Appuyez sur le bouton <strong>Partager</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-canopy" /> au bas de Safari.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-xl bg-harmattan border border-sand">
                <span className="w-6 h-6 rounded-full bg-canopy text-harmattan flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </span>
                <span className="leading-snug">
                  Faites défiler vers le bas et sélectionnez <strong>Sur l’écran d’accueil</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-canopy" />.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2.5 rounded-xl bg-harmattan border border-sand">
                <span className="w-6 h-6 rounded-full bg-canopy text-harmattan flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </span>
                <span className="leading-snug">
                  Appuyez sur <strong>Ajouter</strong> en haut à droite pour finaliser l’installation.
                </span>
              </li>
            </ol>

            <button
              onClick={handleDismiss}
              className="w-full mt-6 py-3 bg-canopy hover:bg-canopy-deep text-harmattan font-bold text-xs rounded-xl transition shadow-md"
            >
              C'est compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}

