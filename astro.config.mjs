// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  trailingSlash: 'always',
  site: 'https://genuine-keys.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap(
    {
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date(),
    }
  )]
});