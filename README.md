# Sky Benin BTP — Site web + Panneau d'administration

Site vitrine moderne pour Sky Benin (BTP) avec animations GSAP et un panneau d'administration complet permettant de gérer le contenu sans toucher au code.

## ✨ Fonctionnalités

- **Page d'accueil** moderne avec sections Hero, Services, Projets, Pourquoi Nous, Contact, Footer
- **Animations GSAP** : parallax sur le hero, reveal au scroll, scrub sur les images, badge spring
- **Panneau admin sécurisé** sur `/admin` (NextAuth + bcrypt)
- **CRUD complet** : projets, services, contenus de toutes les sections
- **Upload d'images** avec stockage local dans `/public/uploads`
- **Base SQLite** par défaut (zéro config), migration possible vers PostgreSQL pour Heroku/Vercel

## 🚀 Démarrage local

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

**Admin** : `/admin/login`
- Email : `admin@gmail.com`
- Mot de passe : `admin123`

## ⚙️ Variables d'environnement

Voir `.env.example`. À configurer en production :

```env
DATABASE_URL="file:./prod.db"      # ou postgresql://… sur Heroku
AUTH_SECRET="<32+ chars random>"    # openssl rand -base64 32
AUTH_TRUST_HOST="true"
NEXTAUTH_URL="https://votredomaine.com"
ADMIN_EMAIL="admin@gmail.com"
ADMIN_PASSWORD="motdepasse-fort"
```

## 🌐 Déploiement

### Hostinger (VPS Node.js — recommandé)

Hostinger Premium/Business avec Node.js ou un VPS Hostinger fonctionnent directement avec SQLite + uploads filesystem.

1. **Créer le projet Node.js** dans hPanel → Avancé → Node.js
2. **Uploader les fichiers** (sans `node_modules`, `.next`, `prisma/dev.db`) via Git ou FTP
3. **Définir le point d'entrée** : `node_modules/next/dist/bin/next`
4. **Variables d'environnement** : copier celles de `.env.example` avec vos valeurs
5. **Connexion SSH** :
   ```bash
   cd ~/domains/votredomaine.com/public_html
   npm install
   npx prisma migrate deploy
   npm run db:seed
   npm run build
   ```
6. **Démarrer l'application** depuis le hPanel (NPM Start)
7. Configurer un **reverse proxy** vers le port Node (3000 par défaut)

### Heroku (PostgreSQL requis)

Heroku a un filesystem **éphémère** : SQLite et `/public/uploads` perdent leurs données à chaque redémarrage. Il faut :

1. **Ajouter PostgreSQL** :
   ```bash
   heroku addons:create heroku-postgresql:essential-0
   ```

2. **Modifier `prisma/schema.prisma`** :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Stocker les images sur un service externe** (Cloudinary, S3, UploadThing) — l'upload local ne survivra pas. Voir `src/app/api/upload/route.ts` à adapter.

4. **Déployer** :
   ```bash
   heroku config:set AUTH_SECRET=$(openssl rand -base64 32)
   heroku config:set AUTH_TRUST_HOST=true
   heroku config:set NEXTAUTH_URL=https://votre-app.herokuapp.com
   heroku config:set ADMIN_EMAIL=admin@gmail.com
   heroku config:set ADMIN_PASSWORD=admin123
   git push heroku main
   heroku run npm run db:seed
   ```

### Vercel (alternative simple, gratuit)

Vercel est l'hébergeur natif Next.js. Filesystem éphémère aussi → utiliser **Vercel Postgres** + **Vercel Blob** pour les images. Connecter le repo GitHub, configurer les env vars, déployer.

## 🛠️ Commandes utiles

```bash
npm run dev           # Dév local
npm run build         # Build production
npm start             # Démarrer en prod
npm run db:studio     # Explorer la BDD (Prisma Studio)
npm run db:seed       # Recharger les données initiales
npm run db:migrate    # Créer une nouvelle migration
```

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx              ← Page d'accueil (publique)
│   ├── admin/
│   │   ├── login/            ← Connexion admin
│   │   └── (dash)/           ← Pages protégées
│   │       ├── projects/     ← CRUD projets
│   │       ├── services/     ← CRUD services
│   │       ├── hero/         ← Édition section Hero
│   │       ├── about/        ← Édition Pourquoi Nous
│   │       ├── contact/      ← Édition coordonnées
│   │       └── footer/       ← Édition footer
│   └── api/
│       ├── projects/         ← REST API projets
│       ├── services/         ← REST API services
│       ├── content/          ← Édition contenu site
│       ├── upload/           ← Upload images
│       └── auth/             ← NextAuth
├── components/
│   ├── home/                 ← Composants page publique (GSAP)
│   └── admin/                ← Composants admin réutilisables
├── lib/
│   ├── auth.ts               ← Config NextAuth
│   ├── prisma.ts             ← Client Prisma
│   └── content.ts            ← Helpers DB
└── middleware.ts             ← Protection /admin/*
prisma/
├── schema.prisma             ← Modèles BDD
└── seed.ts                   ← Données initiales
```

## 🔒 Sécurité

- Le mot de passe admin est **hashé avec bcrypt** (cost 10)
- Le middleware redirige automatiquement les non-connectés
- Toutes les routes API mutantes vérifient la session
- Les uploads sont validés (type MIME + taille max 8 Mo)
- **Important** : changer `AUTH_SECRET` et `ADMIN_PASSWORD` en production

## 🎨 Personnalisation

- Couleurs et typographie : `tailwind.config.ts`
- Animations GSAP : composants dans `src/components/home/`
- Charte graphique : voir `DESIGN.md`
