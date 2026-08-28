import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-canopy-deep text-[#C9D3C0] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif font-semibold text-2xl text-white mb-3">
            Bangr-Weoogo
          </div>
          <p className="text-sm text-[#9CAA92] leading-relaxed max-w-xs">
            Burkina Nature &amp; Culture — Plateforme dédiée à la valorisation, la gestion et la réservation des parcs et sites culturels du Burkina Faso.
          </p>
        </div>

        <div>
          <h5 className="text-white text-xs font-medium uppercase tracking-wider mb-4">
            Découvrir
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/histoire" className="hover:text-white transition-colors">
                Histoire du parc (1932 à nos jours)
              </Link>
            </li>
            <li>
              <Link href="/faune-flore" className="hover:text-white transition-colors">
                Faune &amp; flore recensées
              </Link>
            </li>
            <li>
              <Link href="/personnel" className="hover:text-white transition-colors">
                Équipe &amp; Personnel du parc
              </Link>
            </li>
            <li>
              <Link href="/mediatheque" className="hover:text-white transition-colors">
                Médiathèque (Photos &amp; Vidéos)
              </Link>
            </li>
            <li>
              <Link href="/sensibilisation" className="hover:text-white transition-colors">
                Musée &amp; Écologie
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white text-xs font-medium uppercase tracking-wider mb-4">
            Services &amp; Accès
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/billetterie" className="hover:text-white transition-colors">
                Billetterie en ligne (QR Code)
              </Link>
            </li>
            <li>
              <Link href="/location-espaces" className="hover:text-white transition-colors">
                Location de salles &amp; espaces
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h5 className="text-white text-xs font-medium uppercase tracking-wider mb-4">
            Contact &amp; Horaires
          </h5>
          <p className="text-sm text-[#9CAA92] leading-relaxed">
            Ouagadougou, Burkina Faso<br />
            Ouvert 7j/7 : 06h00 – 18h00<br />
            Tél : +226 25 30 00 00<br />
            Email : contact@bangrweoogo.bf
          </p>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#8A9682] gap-4">
        <div>
          &copy; {new Date().getFullYear()} Burkina Nature &amp; Culture — Tous droits réservés.
        </div>
        <div className="flex gap-6">
          <span>Mentions légales</span>
          <span>Protection des données</span>
          <span>Mobile Money API Mock</span>
        </div>
      </div>
    </footer>
  );
};
