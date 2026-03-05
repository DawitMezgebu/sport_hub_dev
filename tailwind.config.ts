import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        /* Your brand */
        primary: "hsl(var(--brand))",
        "primary-foreground": "hsl(var(--brand-foreground))",
      },
    },
  },
  plugins: [],
} satisfies Config;
