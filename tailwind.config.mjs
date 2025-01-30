/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";

const tailwindConfig = {
    content: ["./src/**/*.{astro,html,lib,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "selector",
    theme: {
        screens: {
            xs: "400px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
        colors: {
            inherit: "inherit",
            current: "currentColor",
            transparent: "transparent",
            green: {
                50: "rgb(244,253,232)",
                100: "rgb(208,246,167)",
                200: "rgb(173,242,105)",
                300: "rgb(150,241,59)",
                400: "rgb(126,241,19)",
                500: "rgb(109,212,12)",
                600: "rgb(87,169,10)",
                700: "rgb(69,134,9)",
                800: "rgb(55,108,9)",
                900: "rgb(37,74,7)",
                950: "rgb(18,37,4)",
            },
            black: colors.black,
            white: colors.white,
        },
        extend: {
            colors: {
                // use any standard tailwind colors from here https://tailwindcss.com/docs/customizing-colors
                // or generate with https://uicolors.app/create
                // {
                //   50: "hsl(87,90%,90%)",
                //   100: "hsl(88,91%,76%)",
                //   200: "hsl(89,92%,68%)",
                //   300: "hsl(90,93%,57%)",
                //   400: "hsl(91,94%,46%)",
                //   500: "hsl(92,95%,37%)",
                //   600: "hsl(93,96%,30%)", // adjusted main color
                //   700: "hsl(94,97%,23%)",
                //   800: "hsl(95,98%,17%)",
                //   900: "hsl(96,99%,12%)",
                //   950: "hsl(97,100%,7%)",
                // },
                base: {
                    50: "rgb(250,250,250)",
                    100: "rgb(244,244,245)",
                    200: "rgb(228,228,231)",
                    300: "rgb(212,212,216)",
                    400: "rgb(161,161,170)",
                    500: "rgb(113,113,122)",
                    600: "rgb(82,82,91)",
                    700: "rgb(63,63,70)",
                    800: "rgb(39,39,42)",
                    900: "rgb(24,24,27)",
                    950: "rgb(9,9,11)",
                },
                info: colors.sky["500"],
                "info-content": colors.sky["950"],
                success: colors.green["500"],
                "success-content": colors.green["950"],
                warning: colors.yellow["500"],
                "warning-content": colors.yellow["950"],
                error: colors.red["500"],
                "error-content": colors.red["950"],
                theme: {
                    "bg-primary": "var(--color-bg-primary)",
                    "bg-secondary": "var(--color-bg-secondary)",
                    "bg-tertiary": "var(--color-bg-tertiary)",
                    "fg-primary": "var(--color-fg-primary)",
                    "fg-secondary": "var(--color-fg-secondary)",
                    "fg-tertiary": "var(--color-fg-tertiary)",
                    "color-primary": "var(--color-primary)",
                    "color-secondary": "var(--color-secondary)",
                    "color-tertiary": "var(--color-tertiary)",
                },
            },
        },
        fontFamily: {
            sans: [
                "Public Sans",
                "Arial",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
            ],
            mono: ["Monaspace Neon", "monospace"],
            cool: ["Chinook", "sans-serif"],
        },
    },
    plugins: [forms],
};

export default tailwindConfig;
