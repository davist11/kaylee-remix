/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{ts,tsx,jsx,js}'],
    mode: 'jit',
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',

            mdd: { max: '767px' },
        },
        colors: {
            black: '#000',
            white: '#fff',
            pink: '#ff00e5',
        },
        fontFamily: {
            base: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
        },
        spacing: {
            0: 0,
            2: '.125rem',
            4: '.25rem',
            6: '.375rem',
            8: '.5rem',
            16: '1rem',
            24: '1.5rem',
            32: '2rem',
            48: '3rem',
            64: '4rem',
        },
        maxWidth: {
            1340: '1340px',
            1440: '1440px',
        },
        fontSize: {
            sm: '.625rem',
            md: '1.25rem',
            lg: '1.875rem',
        },
        zIndex: {
            1: 1,
            2: 2,
            3: 3,
        },
    },
    plugins: [],
}
