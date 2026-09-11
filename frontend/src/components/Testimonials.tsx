interface Testimonial {
  initials: string;
  badge: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  colorBg: string;
}

const reviews: Testimonial[] = [
  {
    initials: 'A. O.',
    badge: 'Visiteur Vérifié',
    role: 'Amoureuse de la nature & habitante de Ouaga',
    rating: 5,
    comment:
      'Bangr-Weoogo est notre véritable poumon vert à Ouagadougou. L’achat du billet par Mobile Money m’a évité toute attente à l’entrée. La fraîcheur sous la canopée est exceptionnelle !',
    date: 'Août 2026',
    colorBg: 'bg-leaf/20 text-canopy border-leaf/40',
  },
  {
    initials: 'B. S.',
    badge: 'Sortie Pédagogique',
    role: 'Enseignant de collège',
    rating: 5,
    comment:
      'Nous avons organisé une sortie éducative pour 60 élèves. L’accueil chaleureux des éco-gardes et la découverte guidée des animaux du musée naturalisé ont émerveillé les enfants.',
    date: 'Juillet 2026',
    colorBg: 'bg-baobab/20 text-baobab border-baobab/40',
  },
  {
    initials: 'M. & S.',
    badge: 'Visiteurs Internationaux',
    role: 'Touristes passionnés d’écologie',
    rating: 5,
    comment:
      'Un sanctuaire naturel impressionnant en pleine ville ! Observer les crocodiles sacrés au marigot et écouter le chant des calaos restera l’un de nos plus beaux souvenirs au Burkina.',
    date: 'Juin 2026',
    colorBg: 'bg-canopy/20 text-canopy-deep border-canopy/40',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 my-12 bg-sand/30 rounded-3xl p-6 md:p-12 border border-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-baobab/20 text-baobab font-bold text-xs rounded-full uppercase tracking-wider">
            Avis &amp; Témoignages des Visiteurs
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-canopy mt-3">
            Retours d'Expérience Authentiques
          </h2>
          <p className="text-ink-soft mt-2 max-w-2xl mx-auto text-sm md:text-base">
            Découvrez les impressions de nos visiteurs sur la préservation du poumon vert de Ouagadougou.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl border border-[#E9E1CC] shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="text-base">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${rev.colorBg}`}>
                    {rev.badge}
                  </span>
                </div>
                <p className="text-ink/90 text-sm italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#E9E1CC] min-w-0">
                <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-bold text-xs leading-none whitespace-nowrap border-2 shadow-xs ${rev.colorBg}`}>
                  {rev.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-canopy-deep text-sm truncate">
                    Visiteur {rev.initials}
                  </h3>
                  <p className="text-[11px] text-ink-soft truncate mt-0.5">
                    {rev.role} • <span className="italic">{rev.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
