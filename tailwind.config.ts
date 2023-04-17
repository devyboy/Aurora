import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: '850px',
        md: '1024px',
        lg: '1280px',
      },
      colors: {
        primary: '#4338ca',
        secondary: '#f97316'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
