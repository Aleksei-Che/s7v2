/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Указываем, где искать файлы с классами Tailwind
  theme: {
    extend: {}, // Здесь можно кастомизировать тему
  },
  plugins: [], // Сюда можно добавлять дополнительные плагины Tailwind
};