/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './public/**/*.html'
    ],
    theme: {
        extend: {
            fontFamily: {
                'serif': ['Georgia', 'Times New Roman', 'serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#0ea5e9',
                    'primary-content': '#ffffff',
                    secondary: '#64748b',
                    'secondary-content': '#ffffff',
                    accent: '#10b981',
                    'accent-content': '#ffffff',
                    neutral: '#374151',
                    'neutral-content': '#ffffff',
                    'base-100': '#ffffff',
                    'base-200': '#f8fafc',
                    'base-300': '#e2e8f0',
                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
            {
                dark: {
                    primary: '#38bdf8',
                    'primary-content': '#0c4a6e',
                    secondary: '#94a3b8',
                    'secondary-content': '#1e293b',
                    accent: '#34d399',
                    'accent-content': '#064e3b',
                    neutral: '#1e293b',
                    'neutral-content': '#f1f5f9',
                    'base-100': '#0f172a',
                    'base-200': '#1e293b',
                    'base-300': '#334155',
                    info: '#60a5fa',
                    success: '#34d399',
                    warning: '#fbbf24',
                    error: '#f87171',
                },
            }
        ],
    }
}