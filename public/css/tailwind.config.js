module.exports = {
  content: [
    './**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1351B4',
        secondary: '#FF6B35',
        success: '#5EA51D',
        warning: '#FFCD07',
        info: '#3498db',
        dark: '#071D41',
      },
      fontFamily: {
        sans: ['Rawline', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0,0,0,0.1)',
        'hover': '0 10px 20px rgba(0,0,0,0.1)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '1000': '1000',
        '2000': '2000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover'],
      textColor: ['active', 'group-hover'],
      borderColor: ['active', 'group-hover'],
      scale: ['active', 'group-hover'],
      transform: ['active', 'group-hover'],
    },
  },
}
