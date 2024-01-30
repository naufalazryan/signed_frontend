/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
    colors: {
        sidebar: "#f8f8f8",
        merahMuda: "#ffa7a7",
        merah: "#AC2427",
        abuTua: "#59595c",
        abuMuda: "#808184",
        abuNavbar: "#e8e8e8",
        input: "#f8f8f8",
      },
      fontFamily: { 
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        "xs" : "0px 0px 20px -4px rgba(0, 0, 0, 0.3)",
        "container": "0 0px 15px -5px rgba(0, 0, 0, 0.3)",
        "inner-2": "inset 0 2px 2px 1px rgba(0,0,0,0.05)",
        "inner-3": "inset 0px 2px 5px 3px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
}
