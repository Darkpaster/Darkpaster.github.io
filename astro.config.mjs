import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  site: 'https://Darkpaster.github.io',
  base: '/',

  integrations: [
      mdx({
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
      }),
      sitemap(),
      // tailwind({
      //     applyBaseStyles: true,
      // }),
  ],

  markdown: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      shikiConfig: {
          theme: 'github-dark',
          wrap: true
      }
  },

  // vite: {
  //   plugins: [tailwindcss()]
  // }
  build: {
      assets: 'assets'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});