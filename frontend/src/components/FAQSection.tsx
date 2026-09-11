'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "Quels sont les horaires d'ouverture du Parc Urbain Bangr-Weoogo ?",
    answer: "Le parc est ouvert tous les jours de la semaine (lundi au dimanche) de 06h00 à 18h30. Les visites guidées de la forêt classée se déroulent entre 08h00 et 16h00.",
  },
  {
    question: "Combien coûte le billet d'entrée au parc ?",
    answer: "Le tarif adulte individuel est de 500 FCFA. Un tarif réduit à 250 FCFA est proposé aux enfants et aux groupes scolaires. Les réservations en ligne sont recommandées pour éviter les files d'attente.",
  },
  {
    question: "Comment effectuer une réservation de billet ou de groupe ?",
    answer: "Vous pouvez réserver directement sur notre site via la section Billetterie. Le paiement s'effectue instantanément par Mobile Money (Orange Money ou Moov Money) avec confirmation par QR Code.",
  },
  {
    question: "Est-il possible de louer un espace pour un événement privé ou d'entreprise ?",
    answer: "Oui ! Le parc dispose d'espaces dédiés (amphithéâtre de verdure, sous-bois d'événements, zone pique-nique). Vous pouvez faire une demande de devis dans la rubrique 'Location d'espaces'.",
  },
  {
    question: "Quelles activités sont proposées au parc ?",
    answer: "Vous pourrez y pratiquer la marche sportive, observer les crocodiles sacrés, découvrir le musée des animaux naturalisés, louer des vélos, et faire des pique-niques en famille.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-sand/30 rounded-2xl p-6 md:p-12 my-12 border border-sand">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-leaf/20 text-canopy font-bold text-xs rounded-full uppercase tracking-wider">
            Besoin d'informations ?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-canopy mt-3">
            Foire Aux Questions (FAQ)
          </h2>
          <p className="text-ink/80 mt-2">
            Retrouvez les réponses aux questions les plus fréquentes posées par nos visiteurs.
          </p>
        </div>

        <div className="space-y-4">
          {defaultFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-harmattan border border-sand rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-sand/20 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-canopy text-base md:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`text-baobab font-bold text-xl transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-ink/80 text-sm md:text-base border-t border-sand/50 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
