import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demande Enregistrée — Location d\'Espaces Bangr-Weoogo',
  description: 'Votre demande de location d\'espace au Parc Bangr-Weoogo a été transmise à l\'administration.',
};

export default function LocationConfirmationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Location d\'Espaces', href: '/location-espaces' }, { label: 'Confirmation' }]} />

      <div className="bg-harmattan p-8 md:p-12 rounded-3xl border border-sand shadow-lg text-center space-y-6">
        <div className="w-20 h-20 bg-baobab/20 text-baobab rounded-full flex items-center justify-center mx-auto text-4xl">
          📋
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-canopy">
          Demande de Location Transmise !
        </h1>

        <p className="text-ink/80 text-base max-w-lg mx-auto leading-relaxed">
          Nous avons bien reçu votre demande de devis et d'occupation d'espace. Un agent de la régie du parc examinera votre dossier et vous répondra sous 24h ouvrées.
        </p>

        <div className="bg-sand/30 p-6 rounded-2xl border border-sand text-left max-w-md mx-auto space-y-3 text-sm">
          <h3 className="font-bold text-canopy border-b border-sand pb-2">Prochaines Étapes :</h3>
          <div className="flex items-start gap-2">
            <span className="text-baobab font-bold">1.</span>
            <p className="text-ink/80">Validation de la disponibilité du site choisi par la direction.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-baobab font-bold">2.</span>
            <p className="text-ink/80">Réception du devis officiel détaillé par e-mail et SMS.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-baobab font-bold">3.</span>
            <p className="text-ink/80">Paiement d'acompte sécurisé en ligne pour bloquer la date.</p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-xl shadow-lg transition-all"
          >
            <span>Retourner à l'Accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
