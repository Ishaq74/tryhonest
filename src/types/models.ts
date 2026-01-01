export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  subcategory?: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceLevel?: 1 | 2 | 3 | 4;
  openingHours?: OpeningHours;
  attributes: string[];
  verified: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PlaceCategory = 
  | 'accommodation'
  | 'restaurant'
  | 'shop'
  | 'activity'
  | 'culture'
  | 'nature'
  | 'health'
  | 'education'
  | 'transport'
  | 'service'
  | 'institution'
  | 'worship'
  | 'industry';

export interface OpeningHours {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  open: string;
  close: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  startDate: Date;
  endDate?: Date;
  location: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  organizer: string;
  website?: string;
  ticketUrl?: string;
  price?: string;
  featured: boolean;
  createdAt: Date;
}

export type EventCategory = 
  | 'festival'
  | 'concert'
  | 'market'
  | 'sport'
  | 'culture'
  | 'exhibition'
  | 'workshop'
  | 'conference';

export interface Hike {
  id: string;
  title: string;
  description: string;
  distance: number;
  elevation: number;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  startPoint: string;
  latitude: number;
  longitude: number;
  images: string[];
  gpxFile?: string;
  featured: boolean;
  createdAt: Date;
}

export interface Review {
  id: string;
  placeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  helpful: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  points: number;
  verified: boolean;
  expert: boolean;
  joinedAt: Date;
}
