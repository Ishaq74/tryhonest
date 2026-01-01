# Annecy Guide

A comprehensive multi-language guide to Annecy built with Astro, TypeScript, and PostgreSQL.

## Features

### Multi-language Support
- 🌍 Available in 6 languages: FR, EN, ES, DE, AR, ZH
- Built-in i18n routing and translations

### Core Features

#### 📍 Locations
- Restaurants, Hotels, B&B, Gîtes, Activities, Shops
- Advanced filtering: PMR accessibility, Hours, Online, Languages, Parking, WiFi
- Pro space for business owners to manage locations

#### 🎉 Events & Festivals
- Event calendar and festival listings
- Live events: Traffic, Weather, Promotions, Community Voting

#### 🥾 Hiking Trails
- GPX file support
- Geolocation-enabled trails
- Difficulty ratings and elevation data

#### 📰 Magazine & Articles
- Local news and stories
- Category-based browsing
- View tracking

#### 📢 Classifieds
- Jobs
- Real Estate
- Deals
- Services

#### 👥 Community
- Forums and discussion topics
- Groups and memberships
- Private messaging
- Verified user profiles

#### 💼 Pro Space
- Location management
- E-commerce integration
- Booking system
- Analytics dashboard
- Advertising platform

#### 🔒 GDPR Compliance
- Data export functionality
- Consent management
- Privacy controls
- Account deletion

#### 🛡️ Moderation
- Content approval system
- Flagged content management
- User submissions review

## Tech Stack

- **Framework**: Astro 4.x with SSR
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: React
- **Languages**: TypeScript (strict mode)
- **Deployment**: Node.js adapter

## Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL 14+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ishaq74/tryhonest.git
cd tryhonest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database:
```bash
# Create the database
createdb annecy_guide

# Push the schema
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:4321`

## Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables include:

- **users**: User accounts with role-based permissions
- **locations**: Places (restaurants, hotels, etc.) with multi-language support
- **events**: Events and festivals
- **hiking_trails**: Trails with GPX data
- **articles**: Magazine articles
- **classifieds**: Job listings, real estate, deals, services
- **forums**: Community forums and topics
- **groups**: User groups
- **messages**: Private messaging
- **bookings**: Reservation system
- **analytics**: Performance tracking
- **ads**: Advertisement management
- **favorites**: User favorites
- **moderation_actions**: Content moderation logs
- **data_export_requests**: GDPR data export requests
- **reviews**: User reviews and ratings

## Project Structure

```
/
├── src/
│   ├── db/
│   │   ├── schema.ts       # Database schema
│   │   └── index.ts        # Database connection
│   ├── i18n/
│   │   └── ui.ts           # Translations for all languages
│   ├── layouts/
│   │   └── Layout.astro    # Main layout with navigation
│   ├── pages/
│   │   ├── index.astro     # Homepage
│   │   ├── locations/      # Location pages
│   │   ├── events/         # Event pages
│   │   ├── hiking/         # Hiking trail pages
│   │   ├── magazine/       # Magazine pages
│   │   ├── classifieds/    # Classified pages
│   │   ├── community/      # Community pages
│   │   ├── pro/            # Pro space pages
│   │   ├── moderation/     # Moderation dashboard
│   │   └── gdpr.astro      # GDPR & privacy page
│   ├── components/         # Reusable components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript types
├── astro.config.mjs        # Astro configuration
├── drizzle.config.ts       # Drizzle ORM configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Filter System

The application includes comprehensive filtering options:

- **PMR Accessibility**: Filter locations accessible for people with reduced mobility
- **Opening Hours**: Find places open now or with specific hours
- **Online Availability**: Show locations with online services
- **Languages**: Filter by supported languages
- **Parking**: Find places with parking
- **WiFi**: Filter locations with WiFi access

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
