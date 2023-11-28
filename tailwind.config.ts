import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: ['bg-blue-500', 'bg-green-500'],
  theme: {
    aspectRatio: {
      "2/1": "2/1",
    },
    extend: {
      "gridTemplateColumns": {
        "1fr-auto": "1fr auto",
        "auto-1fr": "auto 1fr",
        "2-max-content": "max-content max-content",
        "1fr-maxContent": "1fr max-content",
        "5-max": "repeat(5, max-content)",
        header: "minmax(0,1fr) minmax(40px,auto)",
        ram: "repeat(auto-fit, minmax(150px, 1fr))",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config
