import { _light } from "#tailwind-config/theme/fontWeight";
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      luckiestGuy: ["Luckiest Guy"],
      roboto: ["Roboto"],
      londrina: ["Londrina Solid"],
      inter: ["Inter"],
    },
    extend: {
      colors: {
        "nile-blue": {
          "50": "#f5f7fa",
          "100": "#e9eef5",
          "200": "#cfdae8",
          "300": "#a5bcd4",
          "400": "#7498bc",
          "500": "#527ba5",
          "600": "#3f628a",
          "700": "#345070",
          "800": "#2e445e",
          "900": "#273649",
          "950": "#1c2635",
        },
        voodoo: {
          "50": "#fbf8fb",
          "100": "#f7f0f7",
          "200": "#eedfef",
          "300": "#e1c6e1",
          "400": "#cfa3cf",
          "500": "#b77eb6",
          "600": "#9a5f99",
          "700": "#7e4d7b",
          "800": "#684065",
          "900": "#573855",
          "950": "#492746",
        },
        "social-yellow": {
          "100": "#FFCC6F",
        },
        "social-blue": {
          "100": "#024B76",
          "200": "#002544",
          "300": "#31456F",
          "400": "#011A2F",
          "500": "#10152E",
        },
        "social-red": {
          "100": "#FF0048",
        },
        "social-purple": {
          "100": "#9285AC",
        },
      },
      screens: {
        xs: "325px",
      },
      aspectRatio: {
        "286/175": "286/175",
        "326/314": "326/314",
        "206/49": "206/49",
        "286/28": "286/28",
        "167/32": "167/32",
        "66/28": "66/28",
      },
      keyframes: {
        floatUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-50px)" },
        },
        floatUpAndLeft: {
          "0%": { opacity: "1", transform: "translateY(0) translateX(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(-50px) translateX(-50px)",
          },
        },
        floatUpAndRight: {
          "0%": { opacity: "1", transform: "translateY(0) translateX(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(-50px) translateX(50px)",
          },
        },
        floatDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(50px)" },
        },
        floatDownAndLeft: {
          "0%": { opacity: "1", transform: "translateY(0) translateX(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(50px) translateX(-50px)",
          },
        },
        floatDownAndRight: {
          "0%": { opacity: "1", transform: "translateY(0) translateX(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(50px) translateX(50px)",
          },
        },
        floatDownButton: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "50%": { opacity: "0.25", transform: "translateY(5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        scrollCredits: {
          "0%": {
            transform: "translateY(5px)",
          },
          "100%": {
            transform: " translateY(-100%)",
          },
        },
      },
      animation: {
        floatUp: "floatUp 1s ease-in forwards",
        floatUpAndLeft: "floatUpAndLeft 1s ease-in forwards",
        floatUpAndRight: "floatUpAndRight 1s ease-in forwards",
        floatDown: "floatDown 1s ease-in forwards",
        floatDownAndLeft: "floatDownAndLeft 1s ease-in forwards",
        floatDownAndRight: "floatDownAndRight 1s ease-in forwards",
        wiggle: "wiggle 1s ease-in infinite",
        floatDownButton: "floatDownButton 0.5s ease-in forwards",
        spinReverse: "spinReverse 1s linear infinite",
        scrollCredits: "scrollCredits 30s linear infinite",
      },
    },
  },
};
