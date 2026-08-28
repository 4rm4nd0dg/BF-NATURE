import { PrismaClient, TypeSite, CategorieEspece, RoleUtilisateur, TypeContenu } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database for Burkina Nature & Culture...');

  // Nettoyage préalable
  await prisma.demandeLocation.deleteMany();
  await prisma.reservationBillet.deleteMany();
  await prisma.contenuSensibilisation.deleteMany();
  await prisma.espaceLocation.deleteMany();
  await prisma.personnel.deleteMany();
  await prisma.espece.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.site.deleteMany();

  // 1. Création des Utilisateurs
  const passwordHashAdmin = await bcrypt.hash('AdminPassword123!', 10);
  await prisma.utilisateur.create({
    data: {
      nom: 'Gestionnaire Bangr-Weoogo',
      email: 'admin@bangrweoogo.bf',
      telephone: '+226 70 00 11 22',
      mot_de_passe_hash: passwordHashAdmin,
      role: RoleUtilisateur.gestionnaire,
    },
  });

  const passwordHashSuper = await bcrypt.hash('SuperAdmin123!', 10);
  await prisma.utilisateur.create({
    data: {
      nom: 'Super Administrateur',
      email: 'superadmin@bangrweoogo.bf',
      telephone: '+226 76 99 88 77',
      mot_de_passe_hash: passwordHashSuper,
      role: RoleUtilisateur.super_admin,
    },
  });

  console.log('✅ Utilisateurs créés (Admin: admin@bangrweoogo.bf / AdminPassword123!)');

  // 2. Création du Site : Parc Urbain Bangr-Weoogo
  const site = await prisma.site.create({
    data: {
      nom: 'Parc Urbain Bangr-Weoogo',
      slug: 'bangr-weoogo',
      type: TypeSite.parc_urbain,
      description:
        'Le Parc Urbain Bangr-Weoogo est une forêt classée de 250 hectares située au cœur de Ouagadougou. "La forêt de la connaissance" abrite un musée d\'histoire naturelle, un parc zoologique, un parc botanique, des installations sportives et offre une oasis de fraîcheur et de biodiversité au Burkina Faso.',
      region: 'Centre (Ouagadougou)',
      latitude: 12.3851,
      longitude: -1.4983,
      horaires: {
        ouverture: '06:00',
        fermeture: '18:00',
        jours: 'Lundi au Dimanche',
        remarque: 'Entrée autorisée jusqu\'à 17h30',
      },
      tarifs: {
        individuel: 1500,
        groupe: 1000,
        scolaire: 500,
        tarif_reduit: 800,
        devise: 'FCFA',
      },
    },
  });

  console.log(`✅ Site créé : ${site.nom} (ID: ${site.id})`);

  // 3. Création des Espèces à partir du dossier ./images
  const especesData = [
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Hippopotame amphibie',
      nom_scientifique: 'Hippopotamus amphibius',
      description:
        'Grand mammifère semi-aquatique vivant dans les zones humides et le marigot du parc Bangr-Weoogo.',
      photo_url: '/images/BAIN_D_HIPPOPO.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Pélican blanc',
      nom_scientifique: 'Pelecanus onocrotalus',
      description:
        'Grand oiseau d\'eau reconnaissable à son imposante poche gulaire sous le bec.',
      photo_url: '/images/BEC_A_POCHE_DU_PELICAN.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Choucador à longue queue',
      nom_scientifique: 'Lamprotornis caudatus',
      description:
        'Magnifique passereau aux plumages vert et bleu métalliques iridescents, remarquable par sa longue queue étincelante.',
      photo_url: '/images/Choucador_à_longue_queue.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Crocodile du Nil',
      nom_scientifique: 'Crocodylus niloticus',
      description:
        'Grand reptile aquatique impressionnant abrité et préservé dans le domaine réservé du marigot du parc.',
      photo_url: '/images/DOMAINE_DU_CROCO.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Marabout d\'Afrique',
      nom_scientifique: 'Leptoptilos crumenifer',
      description:
        'Grand échassier symbole de la faune africaine, doté d\'une envergure spectaculaire.',
      photo_url: '/images/Marabout_d_Afrique.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Singe patas (Singe rouge)',
      nom_scientifique: 'Erythrocebus patas',
      description:
        'Le singe le plus rapide au monde (jusqu\'à 55 km/h), emblème agitateur et populaire du parc Bangr-Weoogo.',
      photo_url: '/images/Mr._MONKEY_01.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Cobe de Fassa / Antilope',
      nom_scientifique: 'Kobus ellipsiprymnus',
      description:
        'Élégante antilope aux cornes lyrées et au regard captivant, évoluant dans la réserve faunique.',
      photo_url: '/images/REGARD_D_ANTILOPE.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Nénuphar blanc du marigot',
      nom_scientifique: 'Nymphaea lotus',
      description:
        'Plante aquatique sacrée fleurissant à la surface des eaux tranquilles du parc.',
      photo_url: '/images/RENAISSANCE_AU_BANGRE_WEOGO.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Fromager géant (Kapokier)',
      nom_scientifique: 'Ceiba pentandra',
      description:
        'Arbre géant tropical aux contreforts puissants marquant la canopée sacrée de la forêt classée.',
      photo_url: '/images/TREE.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Tortue sillonnée du Sahel',
      nom_scientifique: 'Centrochelys sulcata',
      description:
        'Troisième plus grande tortue terrestre du monde et la plus grande d\'Afrique, protégée au zoo.',
      photo_url: '/images/Tortue_en_chaleur.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Héron garde-bœufs',
      nom_scientifique: 'Bubulcus ibis',
      description:
        'Échassier blanc au bec jaune accompagnant la grande faune herbivore du parc.',
      photo_url: '/images/pexels-barrytheoctopus-36438047.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Aigle ravisseur',
      nom_scientifique: 'Aquila rapax',
      description:
        'Grand rapace de la savane au vol majestueux planant au-dessus de la canopée de Bangr-Weoogo.',
      photo_url: '/images/pexels-charmain-11727678.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Agame des colons (Margouillat)',
      nom_scientifique: 'Agama agama',
      description:
        'Petit lézard très coloré à tête orange vive arpentant les rochers et les bâtiments du parc.',
      photo_url: '/images/pexels-enginakyurt-34313526.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Baobab africain',
      nom_scientifique: 'Adansonia digitata',
      description:
        'L\'arbre de vie mythique du Sahel au tronc imposant emmagasinant des réserves d\'eau précieuses.',
      photo_url: '/images/pexels-julesgermainformel-36625842.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Karité du Burkina',
      nom_scientifique: 'Vitellaria paradoxa',
      description:
        'Arbre vénéré produisant les amandes de karité, véritable or vert de l\'Afrique de l\'Ouest.',
      photo_url: '/images/pexels-lannguyentranm-37254820.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Néré (Arbre à moutarde)',
      nom_scientifique: 'Parkia biglobosa',
      description:
        'Arbre champêtre produisant de longues gousses dont les graines fermentées fabriquent le Soumbala.',
      photo_url: '/images/pexels-moon-485480442-18345783.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Touraco violet',
      nom_scientifique: 'Musophaga violacea',
      description:
        'Magnifique oiseau forestier au plumage violet sombre brillant et à la huppe carmin flamboyante.',
      photo_url: '/images/pexels-peterjochim-fotografie-37502422.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Varan du Nil du marigot',
      nom_scientifique: 'Varanus niloticus',
      description:
        'Grand reptile semi-aquatique agile assurant l\'équilibre biologique des cours d\'eau du parc.',
      photo_url: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Rônier (Palmier à éventail)',
      nom_scientifique: 'Borassus aethiopum',
      description:
        'Grand palmier élancé aux larges palmes en éventail marquant les paysages humides du parc.',
      photo_url: '/images/pexels-roman-odintsov-8189183.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Guêpier à gorge rouge',
      nom_scientifique: 'Merops bulocki',
      description:
        'Oiseau multicolore aux reflets verts et rouge vif chassant les insectes volants en acrobatie.',
      photo_url: '/images/pexels-talharesitoglu-29591828.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Calao à bec rouge du Sahel',
      nom_scientifique: 'Tockus erythrorhynchus',
      description:
        'Oiseau emblématique dont le chant résonne chaque matin au sommet des grands arbres du parc.',
      photo_url: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
    },
  ];

  for (const esp of especesData) {
    await prisma.espece.create({ data: esp });
  }
  console.log(`✅ ${especesData.length} espèces créées à partir des images.`);

  // 4. Création du Personnel
  await prisma.personnel.createMany({
    data: [
      {
        site_id: site.id,
        nom: 'Dr. Salifou Ouédraogo',
        role: 'Directeur Général du Parc Urbain Bangr-Weoogo',
        photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'Mme Aminata Traoré',
        role: 'Directrice Adjointe & Chargée de la Coopération',
        photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'Dr. Issouf Sawadogo',
        role: 'Conservateur en Chef & Responsable Scientifique',
        photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'Dr. Rachid Zongo',
        role: 'Vétérinaire en Chef & Responsable de la Faune',
        photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'M. Abdoulaye Compaoré',
        role: 'Chef de Brigade des Éco-Gardes',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'Mme Mariam Kaboré',
        role: 'Responsable Éco-Guides & Animations Pédagogiques',
        photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'M. Boukary Zida',
        role: 'Conservateur du Jardin Botanique',
        photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'Mme Fatimata Ouattara',
        role: 'Responsable Accueil & Billetterie',
        photo_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'M. Souleymane Sanou',
        role: 'Chef de la Maintenance & Espaces Verts',
        photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      },
      {
        site_id: site.id,
        nom: 'M. Karim Diallo',
        role: 'Agent d\'Entretien du Domaine Faunique & Reboisement',
        photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      },
    ],
  });
  console.log('✅ Personnel créé.');

  // 5. Création des Espaces de location
  await prisma.espaceLocation.createMany({
    data: [
      {
        site_id: site.id,
        nom: 'Salle polyvalente du parc',
        capacite: 120,
        description:
          'Salle couverte climatisée et ventilée, idéale pour séminaires, conférences, mariages et ateliers.',
        tarif_horaire: 15000,
      },
      {
        site_id: site.id,
        nom: 'Aire de pique-nique ombragée',
        capacite: 40,
        description:
          'Espace extérieur aménagé sous la canopée de grand neem et baobabs.',
        tarif_horaire: 5000,
      },
      {
        site_id: site.id,
        nom: 'Amphithéâtre verdoyant',
        capacite: 250,
        description:
          'Grand théâtre de verdure en plein air pour spectacles culturels et cérémonies.',
        tarif_horaire: 25000,
      },
    ],
  });
  console.log('✅ Espaces de location créés.');

  // 6. Création des Contenus de Sensibilisation
  await prisma.contenuSensibilisation.createMany({
    data: [
      {
        site_id: site.id,
        titre: 'Pourquoi préserver la canopée de Bangr-Weoogo ?',
        contenu:
          'Le parc Bangr-Weoogo constitue le poumon vert de Ouagadougou. Il absorbe les poussières du vent d\'harmattan.',
        type: TypeContenu.article,
      },
      {
        site_id: site.id,
        titre: 'Quiz : Testez vos connaissances sur la faune sahelienne',
        contenu:
          'Sauriez-vous identifier le cri du calao à bec rouge ou la vitesse maximale du singe patas ?',
        type: TypeContenu.quiz,
      },
      {
        site_id: site.id,
        titre: 'Saison des pluies : floraison et réveil de la forêt',
        contenu:
          'Après les premières pluies de juin, le parc se pare d\'un tapis de verdure éclatant.',
        type: TypeContenu.actualite,
      },
    ],
  });
  console.log('✅ Contenus de sensibilisation créés.');

  console.log('✨ Database seeding complete successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
