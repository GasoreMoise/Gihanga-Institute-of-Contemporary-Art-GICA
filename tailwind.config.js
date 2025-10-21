/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './middleware.ts',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        'sabon': ['Sabon Next LT', 'serif'],
        'sans': ['system-ui', 'sans-serif'],
      },
      colors: {
        brand: { DEFAULT: '#0b0b0b', accent: '#f5f0e6' }
      },
      typography: {
        DEFAULT: { 
          css: { 
            maxWidth: '75ch',
            fontFamily: 'Sabon Next LT, serif'
          } 
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}

