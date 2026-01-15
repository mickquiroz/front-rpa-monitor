/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ============================================
      // SPACING TOKENS - 8px Grid System
      // ============================================
      spacing: {
        'space-1': '0.5rem',   // 8px
        'space-2': '1rem',     // 16px
        'space-3': '1.5rem',   // 24px
        'space-4': '2rem',     // 32px
        'space-5': '2.5rem',   // 40px
        'space-6': '3rem',     // 48px
      },

      // ============================================
      // BORDER RADIUS - Minimal, Enterprise-focused
      // ============================================
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',       // 4px - badges, tags
        'DEFAULT': '0.375rem', // 6px - buttons, inputs
        'md': '0.375rem',      // 6px - cards (same as default)
        'lg': '0.5rem',        // 8px - modals, large containers
        'full': '9999px',      // Pills, avatars
      },

      // ============================================
      // SHADOWS - Refined, Subtle Elevation
      // ============================================
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
        // Keep Tailwind's defaults for other sizes
        'none': 'none',
      },

      // ============================================
      // TYPOGRAPHY - Inter Font System
      // ============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],      // 12px - small labels
        'sm': ['0.8125rem', { lineHeight: '1.5' }],    // 13px - body small
        'base': ['0.875rem', { lineHeight: '1.5' }],   // 14px - body default
        'lg': ['1rem', { lineHeight: '1.4' }],         // 16px - emphasized text
        'xl': ['1.25rem', { lineHeight: '1.3' }],      // 20px - h3
        '2xl': ['1.5rem', { lineHeight: '1.2' }],      // 24px - h2, h1
      },

      // ============================================
      // COLOR SYSTEM - Enterprise Palette
      // ============================================
      colors: {
        // Primary - Blue for interactive elements
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Semantic Colors - Status indicators only
        success: {
          DEFAULT: '#059669',
          light: '#d1fae5',
          dark: '#047857',
        },
        warning: {
          DEFAULT: '#d97706',
          light: '#fef3c7',
          dark: '#b45309',
        },
        error: {
          DEFAULT: '#dc2626',
          light: '#fee2e2',
          dark: '#b91c1c',
        },
        info: {
          DEFAULT: '#0284c7',
          light: '#e0f2fe',
          dark: '#0369a1',
        },

        // Neutral palette (slate) is inherited from Tailwind
        // Additional neutrals for fine-grained control
        border: {
          DEFAULT: 'rgb(226, 232, 240)', // slate-200
          light: 'rgb(241, 245, 249)',   // slate-100
          dark: 'rgb(203, 213, 225)',    // slate-300
        },
      },

      // ============================================
      // TRANSITIONS - Consistent Timing
      // ============================================
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
