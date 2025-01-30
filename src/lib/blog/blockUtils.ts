const initCodeBlocks = () => {
    const buttons = document.querySelectorAll("[data-code] button") as NodeListOf<HTMLElement>;
    const timeoutMap = new Map<HTMLElement, number>(); // Map to store timeout IDs for buttons

    function copyToClipboard(button: HTMLElement) {
        const parentElement = button.closest("[data-code]");
        const code = parentElement?.getAttribute("data-code");

        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = "copied!";

                // Clear any existing timeout for this button
                if (timeoutMap.has(button)) {
                    clearTimeout(timeoutMap.get(button)!);
                }

                // Set a new timeout and store its ID
                const timeoutId = setTimeout(() => {
                    button.innerText = "copy";
                    timeoutMap.delete(button); // Remove the timeout from the map after it executes
                }, 3000) as unknown as number;

                timeoutMap.set(button, timeoutId);
            });
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => copyToClipboard(button));
    });
};

export { initCodeBlocks };
