/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'serif': ['Georgia', 'Times New Roman', 'serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                }
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'underline',
                            fontWeight: '500',
                        },
                        '[class~="lead"]': {
                            color: 'inherit',
                        },
                        strong: {
                            color: 'inherit',
                        },
                        'ol > li::before': {
                            color: 'inherit',
                        },
                        'ul > li::before': {
                            backgroundColor: 'currentColor',
                        },
                        hr: {
                            borderColor: 'currentColor',
                            opacity: '0.1',
                        },
                        blockquote: {
                            color: 'inherit',
                            borderLeftColor: 'currentColor',
                            opacity: '0.8',
                        },
                        h1: {
                            color: 'inherit',
                        },
                        h2: {
                            color: 'inherit',
                        },
                        h3: {
                            color: 'inherit',
                        },
                        h4: {
                            color: 'inherit',
                        },
                        'figure figcaption': {
                            color: 'inherit',
                        },
                        code: {
                            color: 'inherit',
                        },
                        'a code': {
                            color: 'inherit',
                        },
                        pre: {
                            color: 'inherit',
                            backgroundColor: 'transparent',
                        },
                        thead: {
                            color: 'inherit',
                            borderBottomColor: 'currentColor',
                        },
                        'tbody tr': {
                            borderBottomColor: 'currentColor',
                            opacity: '0.1',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
    ],
    daisyui: {
        themes: [
            // {
            //     light: {
            //         primary: '#0ea5e9',
            //         'primary-content': '#ffffff',
            //         secondary: '#64748b',
            //         'secondary-content': '#ffffff',
            //         accent: '#10b981',
            //         'accent-content': '#ffffff',
            //         neutral: '#374151',
            //         'neutral-content': '#ffffff',
            //         'base-100': '#ffffff',
            //         'base-200': '#f8fafc',
            //         'base-300': '#e2e8f0',
            //         info: '#3b82f6',
            //         success: '#10b981',
            //         warning: '#f59e0b',
            //         error: '#ef4444',
            //     },
            // },
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
    },
    // colors: {
    //     'base-content': 'hsl(var(--bc) / <alpha-value>)', // Добавьте это
    // }
};