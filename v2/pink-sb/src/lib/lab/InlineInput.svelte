<script lang="ts">
    import Tooltip from '$lib/Tooltip.svelte';
    import { IconPencil } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';

    let inputWidth = 200; // Set a default expanded width
    let w = 0;
    $: width = open ? `${inputWidth}px` : '25px';

    export let value: string = '';

    let open: boolean = false;

    const handleOpen = () => {
        open = !open;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            open = false;
        }
    };
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="input-container" style:--width={width}>
    <div class="icon-container">
        <Tooltip offsetAmount={12}>
            <button class="trigger" on:click={handleOpen}>
                <span class="icon"><IconPencil /></span>
            </button>
            <p slot="tooltip" class="tooltip">Enter a custom Project ID</p>
        </Tooltip>
    </div>

    {#if open}
        <div class="input-wrapper" transition:slide={{ duration: 200 }}>
            <input type="text" bind:value />
        </div>
    {/if}
</div>

<style lang="scss">
    .input-container {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid var(--color-border-neutral-strong);
        width: var(--width);
        min-height: 25px;
        transition: width 0.2s ease-out;
    }

    .icon-container {
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        width: 25px;
        height: 25px;
    }

    .input-wrapper {
        flex-grow: 1;
        margin-left: 25px;
    }

    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0 8px;
    }

    .tooltip {
        font-size: 12px;
        color: var(--color-text-neutral-strong);
    }

    .trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 12px;
        width: 12px;
    }
</style>
