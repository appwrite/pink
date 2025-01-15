<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    type $$Props = HTMLButtonAttributes;

    function clickOnEnter(
        event: KeyboardEvent & {
            currentTarget: EventTarget & HTMLElement;
        }
    ) {
        if (event.key === 'Enter' && event.currentTarget.contains(event.target as Node)) {
            event.preventDefault();
            event.currentTarget.click();
        }
    }
</script>

<button role="row" tabindex="0" on:click|preventDefault {...$$restProps} on:keyup={clickOnEnter}>
    <slot />
</button>

<style lang="scss">
    [role='row'] {
        display: table-row;
        width: 100%;
        cursor: pointer;

        &:hover {
            background: var(--color-overlay-neutral-hover);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }
    }
</style>
