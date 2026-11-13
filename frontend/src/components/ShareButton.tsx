'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareData = {
      title,
      text: text || `${title} — Découvrez la biodiversité du Parc Bangr-Weoogo`,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Annulé par l'utilisateur ou non supporté
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Repli sur le presse-papier si Web Share non supporté
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.warn('Impossible de copier le lien :', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      aria-label="Partager cette fiche d'espèce"
      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition duration-150 flex items-center justify-center gap-2 transform active:scale-95 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-leaf" />
          <span>Lien copié !</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Partager</span>
        </>
      )}
    </button>
  );
}

