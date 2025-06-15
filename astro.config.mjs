import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
    site: 'https://darkpaster.github.io', // строчными буквами
    base: '/', // именно так для username.github.io

    integrations: [
        mdx({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
        sitemap(),
    ],

    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'github-dark',
            wrap: true
        }
    },

    build: {
        assets: 'assets'
        // убрал css: 'inline' - может вызывать проблемы
    }
});