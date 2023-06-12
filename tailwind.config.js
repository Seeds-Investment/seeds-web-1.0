/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      textShadow: {
        purple:
          '-1px -1px 0 #7555DA, 1px -1px 0 #7555DA, -1px 1px 0 #7555DA, 1px 1px 0 #7555DA',
        white:
          '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white'
      },
      colors: {
        'seeds-purple': '#7555DA',
        'seeds-purple-2': '#9A76FE',
        'seeds-green': '#4FE6AF',
        'seeds-button-green': '#3AC4A0',
        'seeds-green-2': '#DCFCE4',
        'neutral-medium': '#262626',
        'neutral-soft': '#7C7C7C',
        'neutral-ultrasoft': '#CCCCCC',
        'warning-hard': '#DD2525'
      },
      backgroundImage: {
        hello: "url('../src/assets/hello.png')",
        'ellipse-purple': "url('../src/assets/ellipse-purple.png')"
      },
      backgroundSize: {
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%',
        '100%': '100%',
        '120%': '120%',
        '140%': '140%',
        '160%': '160%',
        '180%': '180%'
      },
      rotate: {
        270: '270deg'
      },
      boxShadow: {
        center: '0 0px 1px 1px rgba(0, 0, 0, 0.05)'
      },
      animation: {
        'slide-down': 'slide-down 300ms ease-out forwards',
        'slide-up': 'slide-up 300ms ease-out forwards'
      },
      keyframes: {
        'slide-down': {
          from: {
            opacity: 0,
            transform: 'translateY(-3rem)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        'slide-up': {
          from: {
            opacity: 1,
            transform: 'translateY(0)'
          },
          to: {
            opacity: 0,
            transform: 'translateY(-3rem)'
          }
        }
      }
    }
  },
  plugins: []
});
