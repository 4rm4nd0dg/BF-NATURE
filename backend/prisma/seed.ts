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
      photo_url: '/images/pexels-daniel-gomez-2158503858-35567587.jpg',
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
        'Troisième plus grande tortue terrestre du monde et la plus grande d\'Afrique, protégée au zoo de Bangr-Weoogo.',
      photo_url: '/images/pexels-f-fezari-326720894-30966189.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Écureuil de savane (Écureuil arboricole)',
      nom_scientifique: 'Heliosciurus gambianus',
      description:
        'Petit rongeur agile au pelage touffu grimpant le long des troncs et des branches des grands arbres.',
      photo_url: '/images/pexels-barrytheoctopus-36438047.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Hyène tachetée',
      nom_scientifique: 'Crocuta crocuta',
      description:
        'Grand carnivore emblématique de la savane africaine aux mâchoires puissantes et au pelage tacheté.',
      photo_url: '/images/pexels-charmain-11727678.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Pintade de Numidie (Pintade sauvage)',
      nom_scientifique: 'Numida meleagris',
      description:
        'Oiseau terrestre d\'Afrique au plumage sombre ponctué de blanc et au casque corné caractéristiques.',
      photo_url: '/images/pexels-enginakyurt-34313526.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Baobab africain',
      nom_scientifique: 'Adansonia digitata',
      description:
        'L\'arbre de vie mythique du Sahel au tronc gigantesque emmagasinant de précieuses réserves d\'eau.',
      photo_url: '/images/pexels-julesgermainformel-36625842.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Karité du Burkina',
      nom_scientifique: 'Vitellaria paradoxa',
      description:
        'Arbre vénéré produisant les amandes de karité, véritable or vert des savanes de l\'Afrique de l\'Ouest.',
      photo_url: '/images/pexels-lannguyentranm-37254820.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Paon bleu',
      nom_scientifique: 'Pavo cristatus',
      description:
        'Superbe oiseau d\'ornement au cou bleu saphir étincelant et aux plumes ocellées évoluant en liberté.',
      photo_url: '/images/pexels-moon-485480442-18345783.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Héron cendré',
      nom_scientifique: 'Ardea cinerea',
      description:
        'Grand échassier solitaire au plumage gris et blanc guettant les poissons au bord des plans d\'eau.',
      photo_url: '/images/pexels-peterjochim-fotografie-37502422.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Varan du Nil',
      nom_scientifique: 'Varanus niloticus',
      description:
        'Grand reptile semi-aquatique agile arpentant les berges du marigot et les rochers de la forêt classée.',
      photo_url: '/images/pexels-philipp-fahlbusch-2985340-34392962.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Canards sauvages du plan d\'eau',
      nom_scientifique: 'Anas platyrhynchos',
      description:
        'Oiseaux aquatiques s\'ébattant paisiblement sur la surface des marigots et des bassins du parc.',
      photo_url: '/images/pexels-roman-odintsov-8189183.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Chauve-souris frugivore (Roussette)',
      nom_scientifique: 'Eidolon helvum',
      description:
        'Mammifère volant nocturne suspendu aux hautes branches, essentiel à la pollinisation de la forêt.',
      photo_url: '/images/pexels-talharesitoglu-29591828.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.animal,
      nom_commun: 'Calao à bec jaune',
      nom_scientifique: 'Tockus flavirostris',
      description:
        'Oiseau emblématique de la savane au bec courbé jaune vif dont les appels résonnent au sommet des arbres.',
      photo_url: '/images/pexels-timon-cornelissen-241844481-12702524.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Flamboyant jaune en fleurs',
      nom_scientifique: 'Cassia fistula',
      description:
        'Arbre d\'ornement remarquable aux grappes dorées éclatantes apportant une touche de couleur au parc.',
      photo_url: '/images/pexels-debora-silva-2149722460-32678993.jpg',
    },
    {
      site_id: site.id,
      categorie: CategorieEspece.plante,
      nom_commun: 'Acacia de la savane',
      nom_scientifique: 'Acacia senegal',
      description:
        'Arbre typique des régions sahéliennes au feuillage fin composé, symbole de résistance à la sécheresse.',
      photo_url: '/images/pexels-joel-jose-518889169-16764330.jpg',
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
