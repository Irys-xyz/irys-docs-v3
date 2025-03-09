import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		maxWidth: {
    			'8xl': '1920px'
    		},
    		fontSize: {
    			'7.5xl': '88px'
    		},
    		fontFamily: {
    			skrappa: 'var(--font-skrappa)',
    			skrappaNarrow: 'var(--font-skrappa-narrow)',
    			skrappaReasonable: 'var(--font-skrappa-reasonable)',
    			gtPressura: 'var(--font-gt-pressura)'
    		},
    		colors: {
    			'primary-green': '#51FFD6',
    			'secondary-lavender': '#BAC5FF',
    			'secondary-blue': '#0090D6',
    			'secondary-red': '#FF5029',
    			'secondary-yellow': '#FFB016',
    			grey2: '#DBE7E9',
    			grey3: '#A5B3C8',
    			grey4: '#41454E',
    			grey5: '#18191A',
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'), require('tailwind-scrollbar')],
} satisfies Config;
