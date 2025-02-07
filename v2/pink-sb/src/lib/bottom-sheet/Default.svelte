<script lang="ts">
    import { fade } from 'svelte/transition';
    import { Divider } from '$lib/index.js';
    import type { $$Props } from '$lib/bottom-sheet/index.js';

    export let isOpen: $$Props['isOpen'] = false;
    export let useSlots: $$Props['useSlots'] = false;
    export let sheetContainerRef: $$Props['sheetContainerRef'];
    export let showDivider: $$Props['showDivider'] = true;
    let isDisappearing: null | boolean = null;

    function setIfDisappearing(isOpenState: boolean) {
        if (isDisappearing === null) {
            isDisappearing = false;
        } else if (!isOpenState) {
            isDisappearing = true;
            setTimeout(() => {
                isDisappearing = false;
            }, 400);
        }
    }

    $: setIfDisappearing(isOpen);
</script>

{#if isOpen || isDisappearing}
    <div
        class="overlay"
        class:disappear={isDisappearing}
        on:click={() => {
            isOpen = false;
        }}
        aria-hidden="true"
        transition:fade={{ duration: 400 }}
    />

    <dialog class="sheet" bind:this={sheetContainerRef}>
        {#if useSlots}
            <div class="content">
                <slot name="top" />
            </div>
            {#if showDivider}<Divider />{/if}
            <div class="content">
                <slot name="bottom" />
            </div>
        {:else}
            <div class="content">
                <slot />
            </div>
        {/if}
    </dialog>
{/if}

<style lang="scss">
    .overlay {
        position: fixed;
        width: 100dvw;
        height: 100dvh;
        z-index: 50;
        top: 0;
        left: 0;
        background-color: var(--color-overlay-scrim-weak, rgba(25, 25, 28, 40%));
    }

    @keyframes slideIn {
        from {
            bottom: calc(-1 * var(--base-36));
            opacity: 0;
        }
        to {
            bottom: var(--base-36);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            bottom: var(--base-36);
            opacity: 1;
        }
        to {
            bottom: calc(-1 * var(--base-36));
            opacity: 0;
        }
    }

    .sheet {
        width: calc(100vw - (2 * var(--space-7)));
        background-color: var(--color-bgcolor-neutral-primary);
        border-radius: 12px;
        border: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);
        position: fixed;
        z-index: 55;
        bottom: var(--base-36);
        opacity: 1;
        display: flex;
        flex-direction: column;
        left: 50%;
        transform: translateX(-50%);
        animation: slideIn 0.2s ease-in-out forwards;
        transition: max-height 0.1s ease-in-out;

        /* box-shadow/neutral/S */
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    }

    :global(.disappear + .sheet) {
        animation: slideOut 0.2s ease-in-out forwards;
    }

    .content:has(:nth-child(2)) {
        padding: var(--gap-xxs, 4px);
    }
</style>
