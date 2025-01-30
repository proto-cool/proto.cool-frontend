import { codeToHtml } from "shiki";

function generateCodeBlock(code: string, lang: string) {
    return codeToHtml(code, {
        lang,
        themes: {
            light: "snazzy-light",
            dark: "one-dark-pro",
        },
    });
}

export default generateCodeBlock;
