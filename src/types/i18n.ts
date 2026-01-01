export interface Translation {
  nav: {
    home: string;
    explore: string;
    events: string;
    hiking: string;
    magazine: string;
    classifieds: string;
    community: string;
    professional: string;
  };
  home: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    featuredPlaces: string;
    upcomingEvents: string;
  };
  categories: {
    restaurants: string;
    accommodation: string;
    activities: string;
    shops: string;
    culture: string;
    nature: string;
    health: string;
    education: string;
    transport: string;
    services: string;
  };
  filters: {
    all: string;
    price: string;
    rating: string;
    distance: string;
    openNow: string;
  };
  footer: {
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
}

export type Language = 'fr' | 'en' | 'es' | 'de' | 'ar' | 'zh';
