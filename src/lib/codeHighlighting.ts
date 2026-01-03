import { codeToHtml } from "shiki";

async function generateCodeBlock(code: string, lang: string, meta?: string) {
    return await codeToHtml(code, {
        lang,
        meta: meta ? { __raw: meta } : undefined,
        themes: {
            light: "snazzy-light",
            dark: "one-dark-pro",
        },
        transformers: [
            {
                name: "line-numbers",
                line(node, line) {
                    node.properties["data-line"] = line;
                },
            },
            {
                name: "highlight-lines",
                line(node, line) {
                    if (this.options.meta?.__raw?.includes(`{${line}}`)) {
                        this.addClassToHast(node, "highlight");
                    }
                },
            },
        ],
    });
}

export default generateCodeBlock;
