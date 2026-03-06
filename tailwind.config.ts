import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        liveSweep: {
          "0%": {
            transform: "scaleX(0)",
            opacity: "0.25",
          },
          "15%": {
            opacity: "1",
          },
          "85%": {
            transform: "scaleX(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scaleX(1)",
            opacity: "0",
          },
        },
      },
      animation: {
        liveSweep: "liveSweep 1.8s ease-out infinite",
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        primary: "hsl(var(--brand))",
        "primary-foreground": "hsl(var(--brand-foreground))",
      },
    },
  },
  plugins: [],
} satisfies Config;
