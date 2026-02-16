/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#968c7c",
          secondary: "#FFEB3B",
          background: "#EBDBC1",
          "base-content": "#EBDBC1",
          text: "#111928",
        },
        dark: {
          primary: "#8BC34A",
          secondary: "#FF9800",
          background: "#1e0101",
          text: "#FFFFFF",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        yekanbakh: ["YekanBakh", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    function ({ addBase }) {
      addBase({
        /* مخفی کردن اسکرول بار برای تمام عناصر */
        "*": {
          scrollbarWidth: "none", // مخفی کردن اسکرول بار برای فایرفاکس
          "-ms-overflow-style": "none", // مخفی کردن اسکرول بار برای IE و Edge قدیمی
        },
        "*::-webkit-scrollbar": {
          display: "none", // مخفی کردن اسکرول بار برای WebKit (Chrome, Safari, Opera)
        },
        "*::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
      });
    },
  ],
};
