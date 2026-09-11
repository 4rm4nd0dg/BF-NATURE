import { Breadcrumb } from '@/components/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Parc Urbain Bangr-Weoogo',
  description:
    'Politique de protection des données personnelles, respect de la vie privée et gestion des informations sur la plateforme Burkina Nature & Culture.',
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Politique de Confidentialité' }]} />

      <div className="bg-harmattan p-8 md:p-12 rounded-3xl border border-sand shadow-sm space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-canopy mb-4">
            Politique de Confidentialité & Protection des Données
          </h1>
          <p className="text-sm text-ink/70">
            Dernière mise à jour : 9 Septembre 2026 — Conforme aux réglementations en vigueur.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-canopy border-b border-sand pb-2">
            1. Collecte des Données Personnelles
          </h2>
          <p className="text-ink/80 text-sm md:text-base leading-relaxed">
            Dans le cadre de l'utilisation de la plateforme Burkina Nature & Culture (Parc Urbain Bangr-Weoogo), nous pouvons recueillir les informations suivantes lors de vos réservations de billets ou demandes de location :
          </p>
          <ul className="list-disc pl-6 text-sm text-ink/80 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone (pour les notifications et validations Mobile Money)</li>
            <li>Historique des réservations et billets émis</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-canopy border-b border-sand pb-2">
            2. Utilisation de vos Données
          </h2>
          <p className="text-ink/80 text-sm md:text-base leading-relaxed">
            Vos données personnelles sont strictement utilisées pour l'émission des e-billets QR Code, le traitement des paiements sécurisés via Mobile Money (Orange Money / Moov Money), et l'accès au parc. Elles ne seront en aucun cas vendues ni cédées à des tiers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-canopy border-b border-sand pb-2">
            3. Sécurité des Paiements et des Données
          </h2>
          <p className="text-ink/80 text-sm md:text-base leading-relaxed">
            Toutes les communications entre votre navigateur et notre serveur sont chiffrées via le protocole HTTPS. Les mots de passe sont hachés de manière sécurisée avec `bcrypt` et les transactions financières sont authentifiées par signature numérique.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-canopy border-b border-sand pb-2">
            4. Vos Droits
          </h2>
          <p className="text-ink/80 text-sm md:text-base leading-relaxed">
            Conformément à la législation relative à la protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez contacter la gestion du parc à :{' '}
            <a href="mailto:contact@bangrweoogo.bf" className="text-baobab underline font-semibold">
              contact@bangrweoogo.bf
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
