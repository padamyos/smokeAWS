/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    // สร้างฟอนต์ที่เราใช้งาน
    fontFamily: {
      'sans': ['Kanit , sans-serif'],
    }
  },
  plugins: [
    // ใช้งาน daisyUI
    require('daisyui'),
  ],
  // กำหนด theme ให้กับ daisyUI
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#F9CA10",
          "secondary": "#e8f7ee",
          "accent": "#264675",
          "neutral": "#0b4eb3",
          "base-100": "#1E2633",
        },
      },
      "light", "dark", "luxury" ,
      
    ],
  },

}