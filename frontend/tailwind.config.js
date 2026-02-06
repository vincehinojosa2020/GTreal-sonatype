/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        serif: ['Cormorant Garamond', 'serif'],
                        sans: ['DM Sans', 'sans-serif'],
                        accent: ['Outfit', 'sans-serif'],
                },
                colors: {
                        // New prestigious dark color scheme
                        navy: '#0A1628',
                        'navy-light': '#132337',
                        'navy-lighter': '#1C3147',
                        gold: '#C9A962',
                        'gold-light': '#D4B978',
                        'gold-dark': '#A88B4A',
                        slate: '#94A3B8',
                        'slate-dark': '#64748B',
                        ivory: '#F8F6F3',
                        'ivory-dark': '#E8E4DE',
                        // Keep old colors for compatibility
                        cream: '#FAF8F5',
                        'warm-grey': '#E8E4DE',
                        charcoal: '#2C2C2C',
                        'charcoal-light': '#6B6560',
                        taupe: '#9C8B7A',
                        'dark-charcoal': '#1E1E1E',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'fade-up': {
                                from: { opacity: '0', transform: 'translateY(40px)' },
                                to: { opacity: '1', transform: 'translateY(0)' }
                        },
                        'marquee': {
                                from: { transform: 'translateX(0)' },
                                to: { transform: 'translateX(-50%)' }
                        },
                        'pulse-gold': {
                                '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 98, 0.4)' },
                                '50%': { boxShadow: '0 0 0 8px rgba(201, 169, 98, 0)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                        'marquee': 'marquee 30s linear infinite',
                        'pulse-gold': 'pulse-gold 2s ease-in-out infinite'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
