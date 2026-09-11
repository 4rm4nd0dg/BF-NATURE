interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  badge: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Touk Naaba Kango',
    role: 'Autorité Coutumière & Gardien de la Tradition',
    badge: 'Tradition Sacrée',
    description: 'Représentant des chefs traditionnels Mossi de Ouagadougou, il veille sur le patrimoine spirituel et sacré de la forêt ancestrale de Bangr-Weoogo.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Salifou Ouédraogo',
    role: 'Conservateur en Chef & Ingénieur Forestier',
    badge: 'Direction du Parc',
    description: 'Ingénieur des Eaux et Forêts du Burkina Faso avec 20 ans d’expérience dans la gestion écologique des 265 hectares du domaine classé.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Capitaine Abdoulaye Compaoré',
    role: 'Chef de Brigade des Éco-Gardes',
    badge: 'Sécurité & Brigade Verte',
    description: 'Commandant des éco-gardes et de la patrouille forestière assurant la protection permanente de la faune sauvage et la sécurité des visiteurs.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Fatoumata Zongo',
    role: 'Biologiste & Conservatrice de la Flore',
    badge: 'Botanique & Recherche',
    description: 'Spécialiste de la pharmacopée traditionnelle sahélienne et responsable du conservatoire des 250 espèces d’arbres du parc.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
];

export function TeamSection() {
  return (
    <section className="py-16 my-12 bg-sand/20 rounded-3xl p-6 md:p-12 border border-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-leaf/20 text-canopy font-bold text-xs rounded-full uppercase tracking-wider">
            Équipe Locale &amp; Éco-Gardes du Burkina Faso
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-canopy mt-3">
            Le Personnel du Parc Bangr-Weoogo
          </h2>
          <p className="text-ink/80 mt-2 max-w-2xl mx-auto text-sm md:text-base">
            Les femmes, hommes, conservateurs et éco-gardes burkinabè qui consacrent leur vie à protéger le poumon vert de Ouagadougou.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-harmattan rounded-2xl overflow-hidden border border-sand shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={`Photo de l'équipe : ${member.name}, ${member.role}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canopy-deep/90 via-canopy-deep/30 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-leaf/90 text-canopy font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {member.badge}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-harmattan">
                  <h3 className="font-serif font-bold text-base leading-tight">{member.name}</h3>
                  <p className="text-[11px] text-leaf font-medium mt-0.5">{member.role}</p>
                </div>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-ink/80 text-xs leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
