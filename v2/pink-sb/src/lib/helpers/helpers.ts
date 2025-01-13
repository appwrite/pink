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
