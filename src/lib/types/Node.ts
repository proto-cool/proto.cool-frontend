export interface Node {
    type: string;
    children: Node[];
    format: number | string;
    indent: number;
    version: number;
    tag?: string; // Used for headings (e.g., "h1", "h2")
    text?: string; // Used for text components
    fields?: {
        [key: string]: any;
    };
}
