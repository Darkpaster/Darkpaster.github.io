import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

const defaultLocale = "en";
const locales = { en: "en-US", ru: "ru-RU" };

export default defineConfig({
    site: "https://darkpaster.github.io",
    base: "/",
    trailingSlash: "never",
    integrations: [
        mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
        sitemap({
            i18n: { locales, defaultLocale },
            filter: filterSitemapByDefaultLocale({ defaultLocale }),
        }),
        i18n({ locales, defaultLocale }),
    ],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        syntaxHighlight: "shiki",
        shikiConfig: { theme: "github-dark", wrap: true },
    },
    build: { format: "directory", assets: "assets" },
});