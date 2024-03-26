/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "n-black": "#000000",
                "n-dark-gray": "#0A0A0A",
                "n-dark-gray-2": "#1a1a1a",
                "n-white": "#EDEDED",
                "n-light-gray": "#A1A1A1",
                "n-light-gray-2": "#2D2D2D",
            },
        },
    },
    plugins: [],
};
