# Burkina Nature & Culture — Parc Urbain Bangr-Weoogo MVP (Phase 1)

Bienvenue sur la plateforme **Burkina Nature & Culture**, dédiée au **Parc Urbain Bangr-Weoogo** à Ouagadougou, Burkina Faso. 

Le projet est conçu avec une **architecture en 3 couches réutilisable** (Base de données PostgreSQL → API REST centrale Node.js/Express → Client Frontend Next.js).

---

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 (React, TypeScript, Tailwind CSS), rendu SSR/SEO
- **Backend** : Node.js + Express + TypeScript
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification & Sécurité** : JWT + Hachage `bcryptjs` + Validation `Zod`
- **Services** : Mock/Stub Paiement Mobile Money (Orange Money / Moov Money) & Générateur de QR Code SVG/PNG

---

## 🎨 Charte Visuelle & Design System

- `--canopy` : `#1E4029` (Vert forêt profond — Couleur primaire)
- `--canopy-deep` : `#132B1B` (Vert sombre — Footer & contrastes)
- `--harmattan` : `#F7F3E8` (Fond crème chaud principal)
- `--sand` : `#EDE4CE` (Fond secondaire / blocs)
- `--baobab` : `#A9702E` (Ocre bois — Accent & CTA "Réserver")
- `--leaf` : `#7FA65C` (Vert tendre — Accents & tags)
- `--ink` : `#23281F` (Texte chaud)
- **Typographie** : `Fraunces` (Google Fonts, Titres serif) & `Work Sans` (Google Fonts, Corps & UI)
- **Signature visuelle** : Ligne de canopée ondulée (SVG) sous le hero.

---

## 🚀 Guide de Démarrage Rapide (Développement Local)

### 1. Pré-requis
- **Node.js** (v18+) & `npm`
- **Docker / Docker Compose** (pour PostgreSQL) ou un serveur PostgreSQL local

---

### 2. Démarrer la Base de Données (PostgreSQL)

Dans le dossier racine du projet :

```bash
docker-compose up -d
```

*(Cette commande démarre une instance PostgreSQL 15 sur le port `5432` avec les identifiants `postgres` / `postgrespassword` / base `bf_nature`)*

---

### 3. Configurer & Lancer le Backend (API REST Express)

1. Ouvrez un terminal dans `backend/` :
   ```bash
   cd backend
   npm install
   ```

2. Créez / vérifiez le fichier `.env` :
   ```env
   PORT=4000
   DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/bf_nature?schema=public"
   JWT_SECRET="burkina_nature_culture_jwt_secret_key_2026_super_secure"
   FRONTEND_URL="http://localhost:3000"
   ```

3. Exécutez les migrations Prisma & le script de seed :
   ```bash
   npx prisma db push
   npm run db:seed
   ```
   *(Insère le site Bangr-Weoogo, les espèces : Singe patas, Varan du Nil, Calao, Karité, Baobab, Tortue, les espaces de location et le compte admin)*

4. Démarrez l'API REST en mode dev :
   ```bash
   npm run dev
   ```
   *L'API REST est accessible sur `http://localhost:4000/api`.*

---

### 4. Configurer & Lancer le Frontend (Next.js)

1. Dans un second terminal, allez dans `frontend/` :
   ```bash
   cd frontend
   npm install
   ```

2. Lancer le serveur Next.js :
   ```bash
   npm run dev
   ```
   *Le site web est accessible sur `http://localhost:3000`.*

---

## 🔑 Identifiants d'Accès Administration (Back-Office `/admin`)

- **E-mail** : `admin@bangrweoogo.bf`
- **Mot de passe** : `AdminPassword123!`

---

## 📌 Endpoints API REST Implémentés

```
GET    /api/sites                   # Liste tous les sites
GET    /api/sites/:slug             # Détails du site Bangr-Weoogo
GET    /api/sites/:slug/especes     # Espèces du site
GET    /api/sites/:slug/espaces      # Espaces de location du site
POST   /api/reservations            # Créer réservation + Paiement Mobile Money + QR Code
GET    /api/reservations/:id        # Consulter une réservation
POST   /api/locations               # Demande de location d'espace + devis automatique
PATCH  /api/locations/:id           # Valider/Refuser une demande de location (Admin)
POST   /api/auth/register           # Inscription utilisateur
POST   /api/auth/login              # Connexion utilisateur (Retourne un JWT)
POST   /api/admin/contenus          # Publier un article de sensibilisation (Protégé JWT)
GET    /api/admin/reservations      # Liste des réservations (Protégé JWT)
GET    /api/admin/locations         # Liste des demandes de location (Protégé JWT)
POST   /api/admin/especes           # Créer une nouvelle espèce (Protégé JWT)
DELETE /api/admin/especes/:id       # Supprimer une espèce (Protégé JWT)
```
