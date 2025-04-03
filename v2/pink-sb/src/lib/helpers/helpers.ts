export function clickOnEnter(
    event: KeyboardEvent & {
        currentTarget: EventTarget & HTMLElement;
    }
) {
    if (event.key === 'Enter' && event.currentTarget.contains(event.target as Node)) {
        event.preventDefault();
        event.currentTarget.click();
    }
}

export function clickOutside(node: HTMLElement, callback: () => void) {
    const handleClick = (event: MouseEvent) => {
        if (!node.contains(event.target as Node)) {
            callback();
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}
