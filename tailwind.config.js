/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                'slide-in': {
                    from: { opacity: '0', transform: 'translateX(12px)' },
                    to:   { opacity: '1', transform: 'translateX(0)' },
                }
            },
            animation: {
                'slide-in': 'slide-in 0.2s ease-out',
            }
        },
    },
    plugins: [],
};