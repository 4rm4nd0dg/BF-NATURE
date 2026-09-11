interface CaseStudy {
  title: string;
  category: string;
  impact: string;
  summary: string;
  imageUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Protection du Marigot & Rétablissement de la faune aquatique",
    category: "Conservation Aquatique",
    impact: "+40% de présence du Crocodile du Nil",
    summary: "Restauration écologique du marigot de Bangr-Weoogo avec dépollution ciblée, filtration naturelle et aménagements de berges sécurisées.",
    imageUrl: "/images/DOMAINE_DU_CROCO.jpg",
  },
  {
    title: "Reboisement intensif & Jardin des plantes médicinales",
    category: "Biodiversité Floristique",
    impact: "12 000 arbres plantés en 3 ans",
    summary: "Sauvegarde de 250 espèces d'arbres indigènes et création d'un parcours éducatif dédié à la pharmacopée traditionnelle burkinabè.",
    imageUrl: "/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg",
  },
];

export function ImpactCaseStudies() {
  return (
    <section className="py-16 my-12 bg-canopy-deep text-harmattan rounded-3xl p-6 md:p-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-leaf/20 text-leaf font-bold text-xs rounded-full uppercase tracking-wider">
            Impact & Études de Cas
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-harmattan mt-3">
            Nos Projets de Conservation Réussis
          </h2>
          <p className="text-harmattan/80 mt-2 max-w-2xl mx-auto">
            Découvrez comment vos visites financent directement la préservation du patrimoine naturel du Burkina Faso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-canopy/60 rounded-2xl border border-leaf/30 overflow-hidden flex flex-col justify-between hover:border-leaf transition-colors"
            >
              <div className="relative h-52 bg-canopy-deep/80 overflow-hidden">
                <img
                  src={study.imageUrl}
                  alt={`Étude de cas : ${study.title}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-baobab text-harmattan text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  {study.impact}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs text-leaf font-semibold uppercase">{study.category}</span>
                <h3 className="font-serif font-bold text-xl text-harmattan mt-1 mb-3">
                  {study.title}
                </h3>
                <p className="text-harmattan/80 text-sm leading-relaxed mb-4">
                  {study.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
