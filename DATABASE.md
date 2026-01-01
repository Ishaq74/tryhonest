# Database Setup and Schema - Salut Annecy

This document provides detailed information about the database setup and schema for the Salut Annecy platform.

## 📊 Database Technology

**PostgreSQL** is used as the primary database, chosen for:
- Excellent support for complex queries
- JSON field support for flexible data structures
- Array support for tags and attributes
- Strong performance with indexes
- Multi-language text search capabilities

**Prisma ORM** is used for:
- Type-safe database access
- Automatic migrations
- Easy schema management
- Great TypeScript integration

## 🚀 Setup Instructions

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE salutannecy;

# Create user (optional)
CREATE USER salutannecy_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE salutannecy TO salutannecy_user;
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update the database URL:

```env
DATABASE_URL="postgresql://salutannecy_user:your_password@localhost:5432/salutannecy?schema=public"
```

### 4. Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or use migrations (recommended for production)
npx prisma migrate dev --name init
```

### 5. Seed Data (Optional)

```bash
# Create seed script and run
npx prisma db seed
```

## 📋 Database Schema

### Core Entities

#### 1. Place

Stores all types of places (restaurants, hotels, activities, shops, etc.)

```prisma
model Place {
  id           String   @id @default(uuid())
  name         String
  category     String   // Main category (restaurant, accommodation, etc.)
  subcategory  String?  // Specific type (gastronomique, boutique, etc.)
  description  String   @db.Text
  address      String
  latitude     Float
  longitude    Float
  phone        String?
  email        String?
  website      String?
  images       String[] // Array of image URLs
  rating       Float    @default(0)
  reviewCount  Int      @default(0)
  priceLevel   Int?     // 1-4 (€ to €€€€)
  openingHours Json?    // Flexible JSON structure
  attributes   String[] // Array of attributes (wifi, parking, etc.)
  verified     Boolean  @default(false)
  featured     Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  reviews      Review[]
}
```

**Indexes:**
- `category`: Fast filtering by category
- `featured`: Quick access to featured places
- `rating`: Sorting by rating

#### 2. Event

Stores local events and activities

```prisma
model Event {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  category    String   // festival, concert, market, sport, etc.
  startDate   DateTime
  endDate     DateTime?
  location    String
  latitude    Float?
  longitude   Float?
  images      String[]
  organizer   String
  website     String?
  ticketUrl   String?
  price       String?  // Flexible: "Gratuit", "10€", "10-50€"
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

#### 3. Hike

Hiking trails with GPX support

```prisma
model Hike {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  distance    Float    // in kilometers
  elevation   Float    // in meters
  duration    Float    // in hours
  difficulty  String   // easy, moderate, hard, expert
  startPoint  String
  latitude    Float
  longitude   Float
  images      String[]
  gpxFile     String?  // URL to GPX file
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

#### 4. Review

User reviews for places

```prisma
model Review {
  id        String   @id @default(uuid())
  placeId   String
  userId    String
  userName  String
  rating    Int      // 1-5
  comment   String   @db.Text
  images    String[]
  helpful   Int      @default(0)
  createdAt DateTime @default(now())
  
  place     Place    @relation(fields: [placeId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### 5. User

User profiles and authentication

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  avatar    String?
  level     Int      @default(1)
  points    Int      @default(0)
  verified  Boolean  @default(false)
  expert    Boolean  @default(false)
  joinedAt  DateTime @default(now())
  
  reviews   Review[]
}
```

#### 6. Article

Magazine articles and blog posts

```prisma
model Article {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String
  author      String
  category    String
  tags        String[]
  images      String[]
  featured    Boolean  @default(false)
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 7. Classified

Classifieds (jobs, real estate, services)

```prisma
model Classified {
  id          String   @id @default(uuid())
  type        String   // job, real-estate, service, for-sale
  title       String
  description String   @db.Text
  price       Float?
  location    String
  images      String[]
  contactName String
  contactEmail String
  contactPhone String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  expiresAt   DateTime
}
```

#### 8. LiveEvent

Real-time updates and alerts

```prisma
model LiveEvent {
  id          String   @id @default(uuid())
  type        String   // promotion, traffic, weather, crowding
  title       String
  description String   @db.Text
  location    String?
  upvotes     Int      @default(0)
  downvotes   Int      @default(0)
  expiresAt   DateTime
  createdAt   DateTime @default(now())
}
```

## 🔍 Sample Queries

### Get Featured Places

```typescript
const featuredPlaces = await prisma.place.findMany({
  where: { featured: true },
  orderBy: { rating: 'desc' },
  take: 10
});
```

### Search Places by Category

```typescript
const restaurants = await prisma.place.findMany({
  where: {
    category: 'restaurant',
    rating: { gte: 4.0 }
  },
  include: {
    reviews: {
      take: 5,
      orderBy: { createdAt: 'desc' }
    }
  }
});
```

### Get Upcoming Events

```typescript
const upcomingEvents = await prisma.event.findMany({
  where: {
    startDate: { gte: new Date() }
  },
  orderBy: { startDate: 'asc' },
  take: 20
});
```

### Get Place with Reviews

```typescript
const placeWithReviews = await prisma.place.findUnique({
  where: { id: placeId },
  include: {
    reviews: {
      orderBy: { createdAt: 'desc' }
    }
  }
});
```

## 🌐 Multi-Language Support

For multi-language content, consider these approaches:

### Option 1: JSON Fields

```typescript
// In opening hours or flexible content
{
  "fr": "Horaires: 9h-18h",
  "en": "Hours: 9am-6pm",
  "es": "Horario: 9h-18h"
}
```

### Option 2: Separate Translation Tables

```prisma
model PlaceTranslation {
  id          String @id @default(uuid())
  placeId     String
  language    String
  name        String
  description String @db.Text
  
  place       Place  @relation(fields: [placeId], references: [id])
  
  @@unique([placeId, language])
}
```

## 🔧 Maintenance

### Backup Database

```bash
pg_dump salutannecy > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql salutannecy < backup_20260101.sql
```

### Reset Database

```bash
npx prisma migrate reset
```

### View Database in Browser

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` to view and edit data.

## 📈 Performance Optimization

### Indexes

Key indexes are already defined in the schema:
- Category fields for fast filtering
- Date fields for chronological queries
- Foreign keys for joins

### Caching

Consider implementing caching for:
- Featured places
- Popular categories
- Recent events

### Query Optimization

- Use `select` to limit returned fields
- Use pagination with `skip` and `take`
- Use `include` carefully to avoid over-fetching

## 🔐 Security

### Best Practices

1. **Never expose DATABASE_URL** in client-side code
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** on API routes
4. **Validate all inputs** before database operations
5. **Use prepared statements** (Prisma does this automatically)

### Connection Pooling

For production, configure connection pooling:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/salutannecy?schema=public&connection_limit=10&pool_timeout=20"
```

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Database Design Best Practices](https://www.prisma.io/dataguide)
