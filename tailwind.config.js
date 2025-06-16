/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add these if you use other file types
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.mdx"
  ],
  theme: {
    extend: {
      // Essential extensions for layout reliability
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      // Ensures consistent z-index hierarchy
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  corePlugins: {
    // Disable if conflicting with other normalize.css
    preflight: true, // Keep true unless conflicts occur
  },
  plugins: [
    require('@tailwindcss/forms'), // If using form elements
    require('@tailwindcss/typography'), // For prose content
  ],
}
