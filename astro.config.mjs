import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap'; // <--- DODAJ TEN IMPORT

export default defineConfig({
  site: 'https://devsalaries.co', // Upewnij się, że masz tu wpisany swój adres
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});