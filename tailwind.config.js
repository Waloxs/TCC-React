/** @type {import('tailwindcss').Config} */
export default {  
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    
    extend: {
      screens: {
        'xl': '1300px',
        'sm': '1024px',
      },
      width: {
        '80rem': '80rem',
        '60rem': '60rem',
        '520px': '520px',
        '400px': '400px',
        '300px': '300px',
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',
        btnCriar: '#22C55E',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [
    function({ addComponents}){
      addComponents({
        '.h1Footer':{
            color: 'var(--white, #FFF)',
            fontFamily: 'Lexend',
            fontSize: '0.875rem',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '160%', 
        },

        '.SubFooter':{
          color: 'var(--grey-300, #CBD5E1)',
          fontFamily: 'Lexend',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '160%',
        }
        
      });
    }
  ],
}


