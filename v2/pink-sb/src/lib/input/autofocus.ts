/**
 * Svelte action to autofocus an input or the textarea element.
 */
export function autofocusInput(
    node: HTMLInputElement | HTMLTextAreaElement,
    autofocus: boolean = false
) {
    if (autofocus) {
        node.focus();
    }

    return {
        update(newAutofocus: boolean) {
            if (newAutofocus) {
                node.focus();
            }
        }
    };
}
