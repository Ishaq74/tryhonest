import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    tailwind()
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es', 'de', 'ar', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
