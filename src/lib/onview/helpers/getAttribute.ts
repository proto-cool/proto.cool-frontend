import config from "@/lib/onview/config";

export default function getAttribute(
    element: Element,
    attribute: string | null = null,
    defaultValue: any | null = null,
): string {
    return (
        element.getAttribute(
            attribute
                ? `data-${config.attribute_prefix}-${attribute}`
                : `data-${config.attribute_prefix}`,
        ) || defaultValue
    );
}
