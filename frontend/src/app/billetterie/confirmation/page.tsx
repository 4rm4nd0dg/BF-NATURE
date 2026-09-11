'use client';

import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function BilletterieConfirmationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Billetterie', href: '/billetterie' }, { label: 'Confirmation' }]} />

      <div className="bg-harmattan p-8 md:p-12 rounded-3xl border border-sand shadow-lg text-center space-y-6">
        <div className="w-20 h-20 bg-leaf/20 text-canopy rounded-full flex items-center justify-center mx-auto text-4xl">
          ✓
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-canopy">
          Merci pour votre réservation !
        </h1>

        <p className="text-ink/80 text-base max-w-lg mx-auto">
          Votre paiement a été validé avec succès. Votre e-billet est activé et prêt à être scanné au guichet d'entrée du Parc Urbain Bangr-Weoogo.
        </p>

        {/* Représentation visuelle du Billet QR Code */}
        <div className="bg-sand/40 p-6 rounded-2xl border border-sand max-w-sm mx-auto my-6 text-center space-y-4 shadow-sm">
          <span className="text-xs font-bold text-baobab uppercase tracking-wider">
            Billet Électronique Officiel
          </span>
          <div className="w-44 h-44 bg-white p-3 mx-auto rounded-xl shadow-inner border border-sand flex items-center justify-center">
            {/* Simulation de QR Code SVG */}
            <svg className="w-full h-full text-canopy" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="30" height="30" />
              <rect x="60" y="10" width="30" height="30" />
              <rect x="10" y="60" width="30" height="30" />
              <rect x="20" y="20" width="10" height="10" fill="white" />
              <rect x="70" y="20" width="10" height="10" fill="white" />
              <rect x="20" y="70" width="10" height="10" fill="white" />
              <rect x="50" y="50" width="15" height="15" />
              <rect x="70" y="65" width="20" height="20" />
              <rect x="50" y="75" width="10" height="15" />
            </svg>
          </div>
          <p className="font-mono text-xs font-bold text-canopy">RÉF : BW-2026-PASS-8849</p>
          <p className="text-xs text-ink/70">Présentez ce code sur votre téléphone à l'arrivée</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-sand hover:bg-sand/80 text-canopy font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>🖨️ Imprimer mon Billet</span>
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>🌿 Retourner au Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
