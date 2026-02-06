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
                        // Monster Energy inspired color scheme
                        'monster-green': '#95D600',
                        'monster-green-light': '#A8E000',
                        'monster-green-dark': '#7AB800',
                        'monster-black': '#0D0D0D',
                        'monster-dark': '#1A1A1A',
                        'monster-darker': '#121212',
                        'monster-gray': '#2A2A2A',
                        'monster-silver': '#B8B8B8',
                        'monster-white': '#F5F5F5',
                        // Keep compatibility colors
                        navy: '#0A1628',
                        'navy-light': '#132337',
                        gold: '#95D600',
                        slate: '#94A3B8',
                        ivory: '#F8F6F3',
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
                                to: { height: '0' }
                        },
                        'fade-up': {
                                from: { opacity: '0', transform: 'translateY(40px)' },
                                to: { opacity: '1', transform: 'translateY(0)' }
                        },
                        'marquee': {
                                from: { transform: 'translateX(0)' },
                                to: { transform: 'translateX(-50%)' }
                        },
                        'pulse-green': {
                                '0%, 100%': { boxShadow: '0 0 0 0 rgba(149, 214, 0, 0.4)' },
                                '50%': { boxShadow: '0 0 20px 4px rgba(149, 214, 0, 0.2)' }
                        },
                        'glow': {
                                '0%, 100%': { textShadow: '0 0 10px rgba(149, 214, 0, 0.5)' },
                                '50%': { textShadow: '0 0 20px rgba(149, 214, 0, 0.8), 0 0 30px rgba(149, 214, 0, 0.4)' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                        'marquee': 'marquee 25s linear infinite',
                        'pulse-green': 'pulse-green 2s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
