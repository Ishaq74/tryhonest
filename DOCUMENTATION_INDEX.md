# Documentation Index - Salut Annecy

Welcome to the complete documentation for Salut Annecy! This guide will help you navigate through all available documentation.

## 📚 Table of Contents

### Getting Started
- [README.md](./README.md) - Project overview and installation
- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [CATEGORIES.md](./CATEGORIES.md) - Complete categorization system

### Technical Documentation
- [DATABASE.md](./DATABASE.md) - Database schema and setup
- [I18N.md](./I18N.md) - Multi-language implementation
- [API.md](./API.md) - API routes and endpoints (Coming soon)

### Feature Documentation
- [FEATURES.md](./FEATURES.md) - Complete features overview
- [FILTERS.md](./FILTERS.md) - Advanced filtering system

### Project Status
- [ACTION_PLAN.md](./ACTION_PLAN.md) - Development roadmap
- [CRITIQUE_ET_PRECONISATION.md](./CRITIQUE_ET_PRECONISATION.md) - Current state and recommendations

## 🚀 Quick Start

1. **Installation**: See [README.md](./README.md#installation)
2. **Database Setup**: See [DATABASE.md](./DATABASE.md)
3. **Development**: Run `npm run dev`
4. **Build**: Run `npm run build`

## 🌐 Multi-Language Support

The platform supports 6 languages:
- 🇫🇷 Français (French)
- 🇬🇧 English
- 🇪🇸 Español (Spanish)
- 🇩🇪 Deutsch (German)
- 🇸🇦 العربية (Arabic)
- 🇨🇳 中文 (Chinese)

See [I18N.md](./I18N.md) for implementation details.

## 📊 Database Schema

The platform uses PostgreSQL with the following main entities:
- Places (Restaurants, Hotels, Activities, etc.)
- Events
- Hiking Trails
- Reviews
- Users
- Articles
- Classifieds
- Live Events

See [DATABASE.md](./DATABASE.md) for complete schema.

## 🎯 Features

### Core Features
- **Découverte de Lieux**: Comprehensive place directory
- **Événements**: Local events calendar
- **Randonnées**: Hiking trails with GPX files
- **Magazine**: Editorial content
- **Petites Annonces**: Classifieds (Jobs, Real Estate, Services)
- **Communauté**: Forums, groups, messaging
- **Live Events**: Real-time updates
- **Espace Professionnel**: Business dashboard

See [FEATURES.md](./FEATURES.md) for detailed information.

## 📂 Project Structure

```
tryhonest/
├── src/
│   ├── components/     # React components
│   ├── layouts/        # Astro layouts
│   ├── pages/          # Page routes
│   ├── i18n/           # Translation files
│   ├── types/          # TypeScript types
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── prisma/
│   └── schema.prisma   # Database schema
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

See `.env.example` for required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Google Gemini API key (for AI features)
- `SITE_URL`: Site URL

## 📝 Contributing

When contributing to this project:
1. Follow the existing code style
2. Update documentation as needed
3. Test your changes thoroughly
4. Update the ACTION_PLAN.md if adding new features

## 📄 License

© 2026 Salut Annecy. All rights reserved.
