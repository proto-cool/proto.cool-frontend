import eslintPluginAstro from "eslint-plugin-astro";
import prettier from "prettier";

export default [
    // add more generic rule sets here, such as:
    // lib.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    {
        plugins: {
            prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: false,
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^(_|ignore)",
                },
            ],
        },
    },
];
