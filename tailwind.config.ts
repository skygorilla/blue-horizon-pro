/*

  
  1. **Global Responsiveness**  
     - Define breakpoints for sm, md, lg, xl.  
     - Ensure all containers, grids and typography scale fluidly between breakpoints.
  
  2. **Consistent Typography**  
     - Set CSS variables (or Tailwind theme) for font-family, font-size scale (e.g. 1rem, 1.25rem, 1.5rem…), line-height.  
     - Apply them site-wide via base styles or a Layout component.

  3. **Color Palette**  
     - Create design tokens for primary, secondary, accent, background, text, muted, error, success.  
     - Apply semantic classes/utilities (e.g. `.bg-primary`, `text-accent`) everywhere.

  4. **Layout & Spacing**  
     - Establish a global gutter and section padding in your theme (e.g. `px-4 md:px-8`).  
     - Build reusable `<Container>` and `<Section>` components to enforce consistent margins.

  5. **Site-wide “Report Issue” Checkbox**  
     - Add a “Report Issue” checkbox in the footer (or toolbar) on every non-admin page.  
     - Toggling it should open a feedback modal or attach a “report” flag to API calls.

  6. **Admin Exception**  
     - Exclude the admin login form and dashboard from these global styles.  
     - Use a separate theme or override file (e.g. `admin.css` or `tailwind.config.js: adminTheme`) that only applies to `/admin/*`.

  7. **Verification**  
     - After generating, visually test at each breakpoint to confirm consistency.  
     - Ensure no flash of unstyled content on admin routes.

  
*/

import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Changed from require
import typography from '@tailwindcss/typography'; // Import the typography plugin

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A3C34", // Added from CSS
          foreground: "hsl(var(--primary-foreground))",
          dark: "#0F2A24", // Added from CSS
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#D4A017", // Added from CSS
          foreground: "hsl(var(--accent-foreground))",
          blue: "#3B82F6",
          purple: "#8B5CF6",
          pink: "#EC4899",
          orange: "#F97316",
          yellow: "#FBBF24",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        maritime: {
          navy: "hsl(210 35% 25%)", // Use direct HSL value
          teal: "hsl(185 50% 40%)", // Use direct HSL value
          gold: "hsl(40 80% 60%)",  // Use direct HSL value
          sand: "hsl(35 30% 88%)",  // Use direct HSL value
        },
        neutral: {
          light: "#f7f9fc",
          DEFAULT: "#f1f5f9",
          medium: "#e2e8f0",
          dark: "#cbd5e1",
        },
        "excel-blue": "#1a73e8",
        functional: {
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
      backgroundImage: {
        "wave-pattern": "url('/images/wave-pattern.svg')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "12px", // Added from CSS for --border-radius
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography // Add the typography plugin here
  ],
};

export default config;
