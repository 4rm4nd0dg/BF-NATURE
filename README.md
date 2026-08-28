# Burkina Nature & Culture — Architecture Multi-Projets (Backend, Frontend Public & Portail Admin)

Bienvenue sur la plateforme **Burkina Nature & Culture**, dédiée au **Parc Urbain Bangr-Weoogo** à Ouagadougou, Burkina Faso.

Le projet est conçu avec une **architecture découplée et modulaire** :
- **Backend API Central** (`backend/`) : Base de données PostgreSQL + Express REST API (Port 4000)
- **Portail Public Visiteurs** (`frontend/`) : Site web public Next.js (Port 3000)
- **Portail d'Administration Autonome** (`admin/`) : Dashboard de gestion Next.js indépendant (Port 3001)

---

## 🛠️ Stack Technique

- **Frontend Public (`frontend/`)** : Next.js 14 (React, TypeScript, Tailwind CSS), rendu SSR/SEO
- **Portail Admin (`admin/`)** : Next.js 14 (React, TypeScript, Tailwind CSS), Dashboard autonome
- **Backend API Central (`backend/`)** : Node.js + Express + TypeScript
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

---

## 🚀 Guide de Démarrage Rapide (Développement Local)

### 1. Pré-requis
- **Node.js** (v18+) & `npm`
- **Docker / Docker Compose** (pour PostgreSQL)

---

### 2. Démarrer la Base de Données (PostgreSQL)

Dans le dossier racine du projet :

```bash
docker-compose up -d
```

---

### 3. Configurer & Lancer le Backend (API REST Express - Port 4000)

1. Ouvrez un terminal dans `backend/` :
   ```bash
   cd backend
   npm install
   ```

2. Exécutez les migrations Prisma & le script de seed :
   ```bash
   npx prisma db push
   npm run db:seed
   ```

3. Démarrez l'API REST :
   ```bash
   npm run dev
   ```
   *L'API REST est accessible sur `http://localhost:4000/api`.*

---

### 4. Configurer & Lancer le Portail Public (`frontend/` - Port 3000)

1. Dans un autre terminal, allez dans `frontend/` :
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Le site public est accessible sur `http://localhost:3000`.*

---

### 5. Configurer & Lancer le Portail Administration Autonome (`admin/` - Port 3001)

1. Dans un troisième terminal, allez dans `admin/` :
   ```bash
   cd admin
   npm install
   npm run dev
   ```
   *Le portail d'administration est accessible sur `http://localhost:3001`.*

---

## 🔑 Identifiants d'Accès Administration (Portail Admin - `http://localhost:3001`)

- **E-mail** : `admin@bangrweoogo.bf`
- **Mot de passe** : `AdminPassword123!`

---

## 📌 Endpoints API REST Centralisés

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
