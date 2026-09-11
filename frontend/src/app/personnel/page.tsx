import React from 'react';
import Link from 'next/link';
import { CanopyLine } from '../../components/CanopyLine';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Users, ShieldCheck, HeartHandshake, TreePine, ArrowRight, UserCheck, Landmark, Award } from 'lucide-react';

export const metadata = {
  title: 'Personnel & Équipe Officielle du Parc — Bangr-Weoogo',
  description:
    'Découvrez l\'équipe locale du Parc Urbain Bangr-Weoogo à Ouagadougou : conservateurs, éco-gardes, biologistes et autorités coutumières du Burkina Faso.',
};

export default function PersonnelPage() {
  const staffMembers = [
    {
      category: 'Parrainage Institutionnel & Autorités Coutumières (Chantier 2026)',
      members: [
        {
          nom: 'Touk Naaba Kango',
          role: 'Autorité Coutumière de Ouagadougou & Gardien du Domaine Sacré',
          description: 'Représentant des chefs traditionnels Mossi, il garantit la sauvegarde des coutumes, du caractère sacré et spirituel de la forêt Bangr-Weoogo.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          badge: 'Coutume & Tradition',
        },
        {
          nom: 'Mahamadou Sana',
          role: 'Ministre de la Sécurité du Burkina Faso',
          description: 'Supervise le plan stratégique de sécurisation, la brigade verte et la pose des 10 km de clôture neuve du parc.',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          badge: 'Ministère Sécurité',
        },
        {
          nom: 'Dr. Amadou Dicko',
          role: 'Ministre Délégué aux Ressources Animales',
          description: 'Pilote du volet préservation de la faune, aménagement de la ménagerie moderne et réintroduction des espèces.',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
          badge: 'Gouvernement BF',
        },
      ],
    },
    {
      category: 'Direction Générale & Conservation Scientifique',
      members: [
        {
          nom: 'Dr. Salifou Ouédraogo',
          role: 'Directeur Général du Parc Urbain Bangr-Weoogo',
          description: 'Docteur en écologie forestière, il coordonne le développement durable, la gestion environnementale et le grand projet de réhabilitation.',
          photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
          badge: 'Directeur Général',
        },
        {
          nom: 'Dr. Fatoumata Zongo',
          role: 'Conservatrice en Chef & Pharmacopée du Sahel',
          description: 'Spécialiste de la botanique burkinabè et responsable du conservatoire des 250 espèces floristiques du parc.',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          badge: 'Botanique & Faune',
        },
        {
          nom: 'Dr. Rachid Zongo',
          role: 'Vétérinaire en Chef & Soins de la Faune',
          description: 'Assure le bien-être, l\'alimentation et la santé des hippopotames, reptiles et félins du parc zoologique.',
          photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
          badge: 'Santé Animale',
        },
      ],
    },
    {
      category: 'Éco-Gardes, Brigade Verte & Terrain',
      members: [
        {
          nom: 'M. Abdoulaye Compaoré',
          role: 'Chef de Brigade des Éco-Gardes',
          description: 'Supervise les patrouilles quotidiennes de surveillance des 265 hectares et la prévention du braconnage.',
          photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          badge: 'Brigade Verte',
        },
        {
          nom: 'Mme Mariam Kaboré',
          role: 'Responsable Éco-Guides & Animation Pédagogique',
          description: 'Anime les visites écologiques guidées pour les écoles, lycées et groupes touristiques.',
          photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          badge: 'Éco-Guide',
        },
        {
          nom: 'Mme Fatimata Ouattara',
          role: 'Responsable Accueil & Billetterie',
          description: 'Accueille chaleureusement les visiteurs au portail principal et assure la gestion de la billetterie numérique.',
          photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
          badge: 'Accueil Visiteurs',
        },
        {
          nom: 'M. Boukary Zida',
          role: 'Conservateur du Jardin Botanique & Reboisement',
          description: 'Veille sur la pépinière et coordonne la replantation annuelle de milliers d\'arbres indigènes.',
          photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
          badge: 'Reboisement',
        },
      ],
    },
  ];

  return (
    <div className="bg-harmattan min-h-screen">
      {/* HEADER HERO */}
      <section className="bg-canopy text-harmattan relative overflow-hidden pt-16 pb-12">
        <div className="max-w-[1180px] mx-auto px-6 relative z-20">
          <Breadcrumb items={[{ label: 'Équipe du Parc' }]} />
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf mb-4 bg-white/10 px-3.5 py-1.5 rounded-full border border-leaf/30">
            <Users className="w-4 h-4 text-leaf" /> Personnel &amp; Éco-Gardes du Burkina Faso
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium max-w-3xl leading-tight">
            Les femmes et les hommes qui protègent <em className="italic text-leaf">Bangr-Weoogo</em>
          </h1>
          <p className="text-base text-[#CFDAC7] max-w-2xl mt-4 leading-relaxed">
            Du Directeur Général aux éco-gardes et autorités coutumières, découvrez l'équipe locale burkinabè qui veille quotidiennement sur les 265 hectares du poumon vert de Ouagadougou.
          </p>
        </div>
        <CanopyLine fillColor="#F7F3E8" />
      </section>

      {/* CONTENT STAFF */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-6 space-y-16">
          {staffMembers.map((group, gIdx) => (
            <div key={gIdx} className="space-y-8">
              <div className="border-b border-[#DED2B4] pb-4 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-baobab inline-block" />
                <h2 className="font-serif text-2xl md:text-3xl text-canopy font-medium">
                  {group.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-card rounded-2xl p-6 border border-[#E9E1CC] shadow-sm hover:shadow-md transition flex gap-4 items-start"
                  >
                    <img
                      src={member.photo}
                      alt={member.nom}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-leaf shrink-0 shadow-sm"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-baobab uppercase tracking-wider bg-baobab/10 px-2 py-0.5 rounded-full inline-block">
                        {member.badge}
                      </span>
                      <h3 className="font-serif font-bold text-canopy text-base leading-snug">
                        {member.nom}
                      </h3>
                      <p className="text-xs text-leaf font-semibold">{member.role}</p>
                      <p className="text-xs text-ink-soft leading-relaxed pt-2">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* RECRUTEMENT / REJOINDRE LA BRIGADE VERTE */}
          <div className="bg-canopy-deep text-harmattan rounded-3xl p-8 md:p-12 border border-leaf/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf">Engagement &amp; Volontariat</span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium mt-1">Rejoindre la Brigade Verte Bénévole</h3>
              <p className="text-sm text-harmattan/80 mt-2 max-w-xl">
                Vous souhaitez participer aux campagnes de reboisement et de sensibilisation écologique du parc Bangr-Weoogo ? Devenez un éco-guide bénévole.
              </p>
            </div>
            <Link
              href="/sensibilisation"
              className="bg-baobab hover:bg-baobab/90 text-white font-bold text-sm px-6 py-3.5 rounded-xl shrink-0 transition flex items-center gap-2"
            >
              <span>Participer aux Écogestes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
