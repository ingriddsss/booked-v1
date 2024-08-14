import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      margaret: ["var(--font-margaret)"],
      dmsans: ["var(--font-dmsans)"]
    },
    extend: {
      colors: {
        //background
        lightcream: "#FCF1ED", 
        //card background
        cream: "#FFE9E2",
        //input
        creaminput: "#FFF5F0",
        //unhovered button
        lightbrown: "#C9A197",
        //hovered button
        mediumbrown: "#A37A72",
        //text
        darkbrown: "#573B37",
        //star
        gold: "#EBB426",
        //notes background
        peachy: "#F0CCC1",
        //delete
        auburn: "#A83A2A",
        //delete hover
        darkauburn: "#7E2316",
      },
    },
  },
  plugins: [],
};
export default config;
