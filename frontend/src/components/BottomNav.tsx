'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  TreePine,
  Ticket,
  Compass,
  MapPin,
  Phone,
  MessageCircle,
  Camera,
  BookOpen,
  X,
  ExternalLink,
} from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Vérifier si un onglet est actif
  const isHomeActive = pathname === '/';
  const isNatureActive = pathname.startsWith('/faune-flore');
  const isTicketActive = pathname.startsWith('/billetterie');
  const isVisiteActive =
    pathname.startsWith('/histoire') ||
    pathname.startsWith('/mediatheque') ||
    pathname.startsWith('/personnel') ||
    pathname.startsWith('/sensibilisation') ||
    pathname.startsWith('/location-espaces');

  return (
    <>
      {/* Barre de navigation basse (Mobile Only) */}
      <nav
        aria-label="Navigation principale mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-canopy-deep/95 backdrop-blur-lg border-t border-leaf/20 shadow-2xl transition-all duration-300 pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
          
          {/* Onglet 1 : Accueil */}
          <Link
            href="/"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition duration-150 transform active:scale-95 ${
              isHomeActive
                ? 'text-leaf font-bold'
                : 'text-[#C9D8C4] hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Accueil</span>
          </Link>

          {/* Onglet 2 : Biodiversité */}
          <Link
            href="/faune-flore"
            aria-current={isNatureActive ? 'page' : undefined}
            className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition duration-150 transform active:scale-95 ${
              isNatureActive
                ? 'text-leaf font-bold'
                : 'text-[#C9D8C4] hover:text-white'
            }`}
          >
            <TreePine className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Nature</span>
          </Link>

          {/* Onglet 3 : Billetterie (Mise en avant) */}
          <Link
            href="/billetterie"
            aria-current={isTicketActive ? 'page' : undefined}
            className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition duration-150 transform active:scale-95 ${
              isTicketActive
                ? 'text-baobab font-bold'
                : 'text-harmattan hover:text-baobab'
            }`}
          >
            <div className={`p-1 rounded-lg ${isTicketActive ? 'bg-baobab/20' : ''}`}>
              <Ticket className="w-5 h-5 stroke-[2.2] text-baobab" />
            </div>
            <span className="text-[10px] tracking-tight font-semibold">Billets</span>
          </Link>

          {/* Onglet 4 : Visite & Infos (Menu contextuel) */}
          <button
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            aria-label="Ouvrir le menu de visite et services"
            className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition duration-150 transform active:scale-95 ${
              isVisiteActive || sheetOpen
                ? 'text-leaf font-bold'
                : 'text-[#C9D8C4] hover:text-white'
            }`}
          >
            <Compass className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Visite</span>
          </button>
        </div>
      </nav>

      {/* Tiroir d'actions rapides & Visite (Bottom Sheet) */}
      {sheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-card rounded-t-3xl p-6 border-t border-sand shadow-2xl animate-in slide-in-from-bottom duration-300 pb-[calc(24px+env(safe-area-inset-bottom,0px))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header tiroir */}
            <div className="flex items-center justify-between pb-4 border-b border-sand mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-canopy/10 text-canopy flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-canopy-deep">
                    Visiter Bangr-Weoogo
                  </h3>
                  <p className="text-[11px] text-ink-soft">Actions rapides &amp; services du parc</p>
                </div>
              </div>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Fermer le menu"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-ink-soft hover:bg-sand/40 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions prioritaires (Itinéraire GPS & Contact) */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Lien direct Google Maps (jamais mis en cache par le SW) */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.3914,-1.4981"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] p-3 rounded-2xl bg-canopy text-harmattan flex items-center gap-3 transition transform active:scale-98 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-leaf shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">Itinéraire</p>
                  <p className="text-[10px] text-[#C9D8C4] flex items-center gap-1">
                    Google Maps <ExternalLink className="w-2.5 h-2.5 inline" />
                  </p>
                </div>
              </a>

              {/* Appel direct téléphonique */}
              <a
                href="tel:+22625300000"
                className="min-h-[48px] p-3 rounded-2xl bg-sand/60 text-canopy-deep border border-sand flex items-center gap-3 transition transform active:scale-98"
              >
                <div className="w-8 h-8 rounded-xl bg-canopy/10 flex items-center justify-center text-canopy shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">Appeler le parc</p>
                  <p className="text-[10px] text-ink-soft truncate">+226 25 30 00 00</p>
                </div>
              </a>
            </div>

            {/* Rubriques complémentaires */}
            <div className="space-y-2">
              <Link
                href="/histoire"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] flex items-center justify-between p-3 rounded-xl hover:bg-harmattan transition text-xs font-semibold text-canopy-deep border border-transparent hover:border-sand"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-leaf" />
                  <span>Histoire &amp; Forêt sacrée (depuis 1932)</span>
                </div>
                <span className="text-ink-soft text-[11px]">→</span>
              </Link>

              <Link
                href="/mediatheque"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] flex items-center justify-between p-3 rounded-xl hover:bg-harmattan transition text-xs font-semibold text-canopy-deep border border-transparent hover:border-sand"
              >
                <div className="flex items-center gap-3">
                  <Camera className="w-4 h-4 text-leaf" />
                  <span>Médiathèque (Photos &amp; Vidéos)</span>
                </div>
                <span className="text-ink-soft text-[11px]">→</span>
              </Link>

              <Link
                href="/location-espaces"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] flex items-center justify-between p-3 rounded-xl hover:bg-harmattan transition text-xs font-semibold text-canopy-deep border border-transparent hover:border-sand"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-leaf" />
                  <span>Location de salles &amp; espaces événementiels</span>
                </div>
                <span className="text-ink-soft text-[11px]">→</span>
              </Link>

              <Link
                href="/sensibilisation"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] flex items-center justify-between p-3 rounded-xl hover:bg-harmattan transition text-xs font-semibold text-canopy-deep border border-transparent hover:border-sand"
              >
                <div className="flex items-center gap-3">
                  <TreePine className="w-4 h-4 text-leaf" />
                  <span>Musée &amp; Écogestes</span>
                </div>
                <span className="text-ink-soft text-[11px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

