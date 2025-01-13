<script lang="ts">
    import Button from '$lib/button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';

    export let open = false;

    let sheet: HTMLElement;

    function handleBLur(event: MouseEvent) {
        if (event.target !== sheet) {
            open = false;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            open = false;
        }
    }
</script>

<svelte:window on:mousedown={handleBLur} on:keydown={handleKeydown} />

{#if open}
    <aside bind:this={sheet} class:open transition:slide={{ axis: 'x', duration: 300 }}>
        <header>
            <slot name="header" />
            <Button icon variant="text" size="s" on:click={() => (open = false)}>
                <Icon icon={IconX}></Icon>
            </Button>
        </header>
        <slot />
    </aside>
{/if}

<style lang="scss">
    aside {
        position: fixed;
        top: 0;
        right: 0;
        width: min(800px, 100%);
        height: 100%;
        z-index: 1000;
        display: none;
        border: 1px solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-primary);
        box-shadow:
            0px 8px 16px 0px rgba(0, 0, 0, 0.02),
            0px 20px 24px 0px rgba(0, 0, 0, 0.02);
        &.open {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: var(--space-4) var(--space-8);
        }
    }
</style>
