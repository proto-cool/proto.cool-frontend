/** @type {import("prettier").Config} */
export default {
    semi: true,
    tabWidth: 4,
    useTabs: false,
    singleQuote: false,
    trailingComma: "all",
    printWidth: 100,
    endOfLine: "lf",
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
