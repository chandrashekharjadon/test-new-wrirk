import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      'xs': '450px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'member-desktop': "url('/Images/member-desktop.png')",
        'member-mobile': "url('/Images/member-mobile.png')",
        'addon-bg': "url('/Images/addon-bg.avif')",
      },
    },
    fontFamily: {
      'sans': ['DM Sans', 'sans-serif'],
      'mulish': ['Mulish', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'grypen': ['"Qwitcher Grypen"', 'cursive'],
      'roboto': ['Roboto', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
      'urbanist': ['Urbanist', 'sans-serif'],
      'prompt': ['Prompt', 'sans-serif'],
      'montserrat': ['Montserrat', 'sans-serif'],
      'mulish': ['Mulish Variable', 'sans-serif'],
      'manrope': ['Manrope Variable', 'sans-serif'],
    },
    boxShadow: {
      'custom': '0px 4px 4px 0px #00000040',
      'custom2': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
      'custom3': '0px 0px 11px 0px #00000040',
      'custom4': '0px 20px 50px 0px #12112714',
      'custom5': '0px 10px 40px 0px #1D161712',
      'custom6': '0px 10px 10px 0px #000000A3',
      'custom7': '0px 1px 70px 0px #00000061',
      'custom8': '0px 4px 17px 0px #00000003, 0px 4px 4px 0px #00000040',
      'custom9': '0px 67px 138px 0px #00000012, 0px 24.74px 52.24px 0px #0000000D, 0px 10.74px 24.74px 0px #0000000C, 0px 4.37px 11.51px 0px #0000000B, 0px 1.32px 4.8px 0px #00000009, 0px 0.1px 2.1px 0px #00000004',
      'custom10': '0px 0px 60px 30px #00000008',
      'custom11': '0px 12px 28px 0px #8C959F4D',
      'custom12': '0px 15px 24px 0px #00000040 ',
    },
  },
  plugins: [
    //  flowbite.plugin(),
  ],
};

