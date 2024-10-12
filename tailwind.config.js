/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#feaf00',
        'light-orange': '#f8d442',
        'light-orange2': '#F2EAE1',
        'light-gray-2': '#6c6c6c',
        "upload" : '#f8f8ff',
        "graylight" : 'rgba(128, 128, 128, 0.55)',
        'delete-red': 'rgba(254, 0, 0, 1)',
        'label-color' : 'rgba(108, 108, 108, 1)'
      },
      padding: {
        '42px': '42px',
        '30,6px' : '30.6px',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
        '20px' : '20px'
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        fontP: '22px',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
    dropShadow: {
      '3xl': '8px 8px 4px rgba(0, 0, 0, 0.25)',
      '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
      ]
    },
    borderRadius: {
      '1px': '1px',
    },
  },
  plugins: [],
}

