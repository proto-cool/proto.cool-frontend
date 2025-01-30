/**
 * * returns a nicely formatted string based on the input date
 * @param date - the date to format
 */
export function formatDate(date: string | number | Date): string {
    return new Date(date).toLocaleDateString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
}

export function generateRandomId(length: number = 8): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = new Uint8Array(length);

    // Use cryptographic randomness
    crypto.getRandomValues(randomValues);

    // Map each random value to a character in the charset
    return Array.from(randomValues, (value) => charset[value % charset.length]).join("");
}
