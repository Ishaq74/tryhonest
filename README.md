# Salut Annecy - Guide Local Complet 🇫🇷

Une plateforme web complète pour découvrir et explorer Annecy, France. Ce guide local permet aux utilisateurs de découvrir les meilleurs endroits, événements, randonnées, et de participer à une communauté locale dynamique.

## 🚀 Fonctionnalités

### 🌐 Multi-Language Support
- 6 langues disponibles : Français 🇫🇷 | English 🇬🇧 | Español 🇪🇸 | Deutsch 🇩🇪 | العربية 🇸🇦 | 中文 🇨🇳
- Changement de langue en temps réel depuis l'interface

### 📍 Découverte de Lieux
- Restaurants, hébergements, activités, commerces
- Système de notation et d'avis
- Carte interactive avec Leaflet
- Filtres avancés (catégorie, prix, note)

### 📅 Événements
- Agenda complet des événements locaux
- Festivals, concerts, marchés, événements sportifs
- Calendrier avec dates et lieux

### 🥾 Randonnées
- Catalogue de sentiers
- Informations détaillées (distance, dénivelé, durée, difficulté)
- Fichiers GPX téléchargeables

### 📰 Magazine & Articles
- Articles éditoriaux sur Annecy
- Guides et recommandations
- Système de commentaires

### 🏪 Petites Annonces
- Emploi, Immobilier, Services, Bonnes Affaires

### 💬 Communauté
- Forums et groupes
- Messagerie privée
- Profils utilisateurs avec système de niveaux

### 💼 Espace Professionnel
- Gestion de lieux pour les professionnels
- Analytiques et réservations

## 🛠️ Technologies

- **Framework**: Astro
- **UI**: React + TailwindCSS
- **Database**: PostgreSQL + Prisma ORM
- **Maps**: Leaflet
- **i18n**: Multi-language support
- **AI**: Google Gemini (planned)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Ishaq74/tryhonest.git
cd tryhonest

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🗄️ Database Setup

The project uses PostgreSQL with Prisma ORM. The schema supports:

- Places (restaurants, hotels, activities, etc.)
- Events
- Hiking trails
- Reviews and ratings
- Users and authentication
- Articles and blog posts
- Classifieds
- Live events

## 🌍 Multi-Language Support

The application supports 6 languages with complete translation files in `src/i18n/`:
- French (default)
- English
- Spanish
- German
- Arabic (RTL support)
- Chinese

## 📝 License

© 2026 Salut Annecy. All rights reserved.
