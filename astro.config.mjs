import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devsalaries.co', // Kluczowe: pełny URL z https://
  integrations: [sitemap()],
});