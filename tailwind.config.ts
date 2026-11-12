import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ga: {
          navy: {
            DEFAULT: "#0F1E36", // Azul-marinho profundo principal
            dark: "#081120",    // Azul-marinho para rodapés e fundos densos
            light: "#1C3254",   // Azul-marinho secundário para hover e bordas
          },
          gold: {
            DEFAULT: "#C5A059", // Dourado suave institucional
            light: "#DFC48C",   // Dourado claro para detalhes sutis
            dark: "#9E7B36",    // Dourado escuro para contraste acessível
          },
          ivory: {
            DEFAULT: "#FAF8F5", // Marfim editorial para fundo de leitura
            warm: "#F2EFE9",    // Marfim secundário para seções alternadas
          },
          slate: {
            DEFAULT: "#4A5568", // Cinza neutro para corpo de texto
            light: "#E2E8F0",   // Cinza claro para divisórias sutis
            dark: "#1E293B",    // Cinza chumbo para títulos secundários
          },
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 4px 20px -2px rgba(15, 30, 54, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;