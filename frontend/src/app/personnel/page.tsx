import React from 'react';
import Link from 'next/link';
import { CanopyLine } from '../../components/CanopyLine';
import { Users, ShieldCheck, HeartHandshake, TreePine, ArrowRight, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Personnel & Équipe du Parc — Bangr-Weoogo',
  description: 'Découvrez l\'équipe passionnée du Parc Urbain Bangr-Weoogo, du Directeur Général aux éco-gardes et guides botaniques.',
};

export default function PersonnelPage() {
  const staffMembers = [
    {
      category: 'Direction Général & Administration',
      members: [
        {
          nom: 'Dr. Salifou Ouédraogo',
          role: 'Directeur Général du Parc Urbain Bangr-Weoogo',
          description: 'Docteur en écologie forestière, il coordonne la vision stratégique et le développement durable du parc.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          badge: 'Direction',
        },
        {
          nom: 'Mme Aminata Traoré',
          role: 'Directrice Adjointe & Coopération Institutionnelle',
          description: 'Responsable des partenariats internationaux, du mécénat environnemental et de l\'administration.',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          badge: 'Direction',
        },
      ],
    },
    {
      category: 'Conservation Scientifique & Parc Zoologique',
      members: [
        {
          nom: 'Dr. Issouf Sawadogo',
          role: 'Conservateur en Chef & Responsable Scientifique',
          description: 'Spécialiste de la faune sahélienne et du suivi biologique des 140+ espèces recensées au parc.',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          badge: 'Scientifique',
        },
        {
          nom: 'Dr. Rachid Zongo',
          role: 'Vétérinaire en Chef & Soins de la Faune',
          description: 'Assure la santé et le bien-être des mammifères, reptiles et oiseaux abrités dans le parc zoologique.',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          badge: 'Vétérinaire',
        },
      ],
    },
    {
      category: 'Éco-Gardes & Brigade de Surveillance',
      members: [
        {
          nom: 'M. Abdoulaye Compaoré',
          role: 'Chef de Brigade des Éco-Gardes',
          description: 'Supervise les patrouilles quotidiennes pour la sécurité des 250 hectares et la prévention du braconnage.',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
          badge: 'Sécurité',
        },
        {
          nom: 'Mme Mariam Kaboré',
          role: 'Responsable Éco-Guides & Animation',
          description: 'Anime les visites pédagogiques guidées et les ateliers d\'éducation environnementale pour scolaires.',
          photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          badge: 'Éco-Guide',
        },
      ],
    },
    {
      category: 'Jardin Botanique, Accueil & Maintenance',
      members: [
        {
          nom: 'M. Boukary Zida',
          role: 'Conservateur du Jardin Botanique',
          description: 'Botaniste passionnéveillant sur les arbres sacrés, les baobabs et le conservatoire des plantes médicinales.',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
          badge: 'Botanique',
        },
        {
          nom: 'Mme Fatimata Ouattara',
          role: 'Responsable Accueil & Billetterie',
          description: 'Accueille chaleureusement les 60 000 visiteurs annuels au portail principal et gère la billetterie.',
          photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
          badge: 'Accueil',
        },
        {
          nom: 'M. Souleymane Sanou',
          role: 'Chef Maintenance & Aménagements',
          description: 'Gère la réfection des allées, des ponts suspendus, des aires de pique-nique et des salles de location.',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          badge: 'Maintenance',
        },
        {
          nom: 'M. Karim Diallo',
          role: 'Agent d\'Entretien du Domaine Faunique & Reboisement',
          description: 'Travaille chaque jour à la replantation d\'arbres autochtones et au nettoyage des sentiers du parc.',
          photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
          badge: 'Terrain',
        },
      ],
    },
  ];

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HEADER HERO */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4">
            <Users className="w-4 h-4" /> Ressources Humaines &amp; Équipe du Parc
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium max-w-2xl leading-tight">
            Les femmes et les hommes qui font vivre <em className="italic text-leaf">Bangr-Weoogo</em>
          </h1>
          <p className="text-base text-[#CFDAC7] max-w-xl mt-4 leading-relaxed">
            Du Directeur Général aux éco-gardes et agents de terrain, découvrez les 35 passionnés qui protègent les 250 hectares du poumon vert de Ouagadougou au quotidien.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* CONTENT STAFF */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6 space-y-16">
          {staffMembers.map((group, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#DED2B4]">
                <span className="w-3 h-3 rounded-full bg-baobab" />
                <h2 className="font-serif text-2xl md:text-3xl text-canopy-deep font-medium">
                  {group.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.members.map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-card rounded-2xl overflow-hidden border border-[#E9E1CC] shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="relative h-52 bg-sand overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.nom}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-canopy-deep/90 text-harmattan text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {member.badge}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-medium text-ink">
                          {member.nom}
                        </h3>
                        <div className="text-xs font-semibold text-baobab mt-1">
                          {member.role}
                        </div>
                        <p className="text-xs text-ink-soft mt-3 leading-relaxed">
                          {member.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#E9E1CC] flex items-center justify-between text-[11px] text-canopy font-medium">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-leaf" /> Agent certifié
                        </span>
                        <span>Bangr-Weoogo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
