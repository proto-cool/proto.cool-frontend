import type { Heading, Node } from "@lib/types";
import slug from "slug";

interface FormattingStates {
    IS_BOLD: number | boolean;
    IS_ITALIC: number | boolean;
    IS_STRIKETHROUGH: number | boolean;
    IS_UNDERLINE: number | boolean;
    IS_CODE: number | boolean;
    IS_SUBSCRIPT: number | boolean;
    IS_SUPERSCRIPT: number | boolean;
    IS_HIGHLIGHT: number | boolean;
}

const FORMATTING_STATES: FormattingStates = {
    IS_BOLD: 1,
    IS_ITALIC: 1 << 1,
    IS_STRIKETHROUGH: 1 << 2,
    IS_UNDERLINE: 1 << 3,
    IS_CODE: 1 << 4,
    IS_SUBSCRIPT: 1 << 5,
    IS_SUPERSCRIPT: 1 << 6,
    IS_HIGHLIGHT: 1 << 7,
};

const parseFormattingState = (value: number): FormattingStates => {
    return Object.fromEntries(
        Object.entries(FORMATTING_STATES).map(([k, v]) => [k, !!(v & value)]),
    ) as unknown as FormattingStates;
};

function applyFormatting(text: string, formatting: FormattingStates) {
    let formattedText = text;

    // Wrap the text in all active styles
    if (formatting.IS_BOLD) formattedText = `<b>${formattedText}</b>`;
    if (formatting.IS_ITALIC) formattedText = `<i>${formattedText}</i>`;
    if (formatting.IS_STRIKETHROUGH) formattedText = `<s>${formattedText}</s>`;
    if (formatting.IS_UNDERLINE) formattedText = `<u>${formattedText}</u>`;
    if (formatting.IS_CODE) formattedText = `<code>${formattedText}</code>`;
    if (formatting.IS_SUBSCRIPT) formattedText = `<sub>${formattedText}</sub>`;
    else if (formatting.IS_SUPERSCRIPT) formattedText = `<sup>${formattedText}</sup>`;
    if (formatting.IS_HIGHLIGHT) formattedText = `<mark>${formattedText}</mark>`;

    return formattedText;
}

const renderNode = (node: { text: string; format: number }) => {
    return applyFormatting(node.text, parseFormattingState(node.format));
};

function extractText(children: Node[]): string {
    return children
        .map((child) =>
            child.type === "text" ? child.text || "" : extractText(child.children || []),
        )
        .join("");
}

function extractHeadings(rootNode: Node | any): Heading[] {
    const headings: Heading[] = [];

    function traverse(node: any) {
        if (node.type === "heading" && node.tag) {
            const depth = parseInt(node.tag.replace("h", ""), 10);
            const text = extractText(node.children || []);
            headings.push({ depth, text, slug: slug(text) });
        }

        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(rootNode);
    return headings;
}

function getSlugFromNode(node: Node | Node[]) {
    if (Array.isArray(node)) {
        return slug(extractText(node));
    } else {
        return slug(extractText(node.children || []));
    }
}

export { parseFormattingState, applyFormatting, extractHeadings, getSlugFromNode };

export default renderNode;
