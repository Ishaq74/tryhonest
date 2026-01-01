import { pgTable, text, serial, timestamp, boolean, integer, decimal, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const locationTypeEnum = pgEnum('location_type', ['restaurant', 'hotel', 'bnb', 'gite', 'activity', 'shop']);
export const classifiedTypeEnum = pgEnum('classified_type', ['job', 'real_estate', 'deal', 'service']);
export const eventTypeEnum = pgEnum('event_type', ['event', 'festival', 'live_traffic', 'live_weather', 'promo', 'voting']);
export const userRoleEnum = pgEnum('user_role', ['user', 'verified', 'moderator', 'pro', 'admin']);
export const languageEnum = pgEnum('language', ['fr', 'en', 'es', 'de', 'ar', 'zh']);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').default('user'),
  isVerified: boolean('is_verified').default(false),
  preferredLanguage: languageEnum('preferred_language').default('fr'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  gdprConsentDate: timestamp('gdpr_consent_date'),
  profileData: jsonb('profile_data'), // stores bio, avatar, social links, etc.
});

// Locations table (Restaurants, Hotels, B&B, Gîtes, Activities, Shops)
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  type: locationTypeEnum('type').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  address: text('address'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: text('website'),
  // Filters
  isPmrAccessible: boolean('is_pmr_accessible').default(false),
  openingHours: jsonb('opening_hours'), // {monday: "9:00-18:00", ...}
  isOnline: boolean('is_online').default(false),
  languages: jsonb('languages').default([]), // array of supported languages
  hasParking: boolean('has_parking').default(false),
  hasWifi: boolean('has_wifi').default(false),
  // Multi-language content
  translations: jsonb('translations'), // {fr: {name, description}, en: {...}}
  ownerId: integer('owner_id').references(() => users.id),
  images: jsonb('images').default([]), // array of image URLs
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  isActive: boolean('is_active').default(true),
  isPro: boolean('is_pro').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Events and Festivals
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  type: eventTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  location: text('location'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  translations: jsonb('translations'),
  images: jsonb('images').default([]),
  organizerId: integer('organizer_id').references(() => users.id),
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  metadata: jsonb('metadata'), // for live events: traffic data, weather, voting results
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User Submissions
export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // location, event, article, etc.
  title: varchar('title', { length: 255 }).notNull(),
  content: jsonb('content'), // flexible content structure
  status: varchar('status', { length: 50 }).default('pending'), // pending, approved, rejected
  moderatorId: integer('moderator_id').references(() => users.id),
  moderatorNotes: text('moderator_notes'),
  createdAt: timestamp('created_at').defaultNow(),
  reviewedAt: timestamp('reviewed_at'),
});

// Hiking Trails
export const hikingTrails = pgTable('hiking_trails', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  difficulty: varchar('difficulty', { length: 50 }), // easy, moderate, hard
  distance: decimal('distance', { precision: 6, scale: 2 }), // in km
  duration: integer('duration'), // in minutes
  elevationGain: integer('elevation_gain'), // in meters
  gpxFile: text('gpx_file'), // URL or path to GPX file
  gpxData: jsonb('gpx_data'), // parsed GPX data with coordinates
  startPoint: jsonb('start_point'), // {lat, lng, address}
  endPoint: jsonb('end_point'),
  translations: jsonb('translations'),
  images: jsonb('images').default([]),
  isPmrAccessible: boolean('is_pmr_accessible').default(false),
  createdBy: integer('created_by').references(() => users.id),
  isActive: boolean('is_active').default(true),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Magazine and Articles
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  authorId: integer('author_id').references(() => users.id).notNull(),
  category: varchar('category', { length: 100 }),
  tags: jsonb('tags').default([]),
  translations: jsonb('translations'),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Classifieds
export const classifieds = pgTable('classifieds', {
  id: serial('id').primaryKey(),
  type: classifiedTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  location: text('location'),
  userId: integer('user_id').references(() => users.id).notNull(),
  contactInfo: jsonb('contact_info'),
  images: jsonb('images').default([]),
  translations: jsonb('translations'),
  metadata: jsonb('metadata'), // job: salary, type; real_estate: size, rooms
  isActive: boolean('is_active').default(true),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Forums
export const forums = pgTable('forums', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  translations: jsonb('translations'),
  topicCount: integer('topic_count').default(0),
  postCount: integer('post_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Forum Topics
export const forumTopics = pgTable('forum_topics', {
  id: serial('id').primaryKey(),
  forumId: integer('forum_id').references(() => forums.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  isPinned: boolean('is_pinned').default(false),
  isLocked: boolean('is_locked').default(false),
  viewCount: integer('view_count').default(0),
  replyCount: integer('reply_count').default(0),
  lastPostAt: timestamp('last_post_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Forum Posts
export const forumPosts = pgTable('forum_posts', {
  id: serial('id').primaryKey(),
  topicId: integer('topic_id').references(() => forumTopics.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  isEdited: boolean('is_edited').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Groups
export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  translations: jsonb('translations'),
  creatorId: integer('creator_id').references(() => users.id).notNull(),
  avatar: text('avatar'),
  memberCount: integer('member_count').default(0),
  isPublic: boolean('is_public').default(true),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Group Members
export const groupMembers = pgTable('group_members', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id').references(() => groups.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  role: varchar('role', { length: 50 }).default('member'), // member, moderator, admin
  joinedAt: timestamp('joined_at').defaultNow(),
});

// Messages
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  receiverId: integer('receiver_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Pro Space - Bookings
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  locationId: integer('location_id').references(() => locations.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  guests: integer('guests').default(1),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).default('pending'), // pending, confirmed, cancelled
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Pro Space - Analytics
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // location, article, event
  entityId: integer('entity_id').notNull(),
  date: timestamp('date').notNull(),
  views: integer('views').default(0),
  clicks: integer('clicks').default(0),
  conversions: integer('conversions').default(0),
  metadata: jsonb('metadata'),
});

// Pro Space - Ads
export const ads = pgTable('ads', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  imageUrl: text('image_url'),
  targetUrl: text('target_url'),
  advertiserId: integer('advertiser_id').references(() => users.id).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  impressions: integer('impressions').default(0),
  clicks: integer('clicks').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Favorites
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // location, event, article, trail
  entityId: integer('entity_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Moderation Actions
export const moderationActions = pgTable('moderation_actions', {
  id: serial('id').primaryKey(),
  moderatorId: integer('moderator_id').references(() => users.id).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: integer('entity_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(), // approve, reject, flag, delete
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
});

// GDPR Data Export Requests
export const dataExportRequests = pgTable('data_export_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  status: varchar('status', { length: 50 }).default('pending'), // pending, processing, completed
  downloadUrl: text('download_url'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: integer('entity_id').notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
