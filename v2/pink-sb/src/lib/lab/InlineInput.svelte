<script lang="ts">
    import Tooltip from '$lib/Tooltip.svelte';
    import { IconPencil } from '@appwrite.io/pink-icons-svelte';
    import { slide, blur } from 'svelte/transition';

    let inputWidth = 275; // Set a default expanded width
    $: width = open ? `${inputWidth}px` : '30px';

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

<div class="input-container" style:--width={width} class:open>
    <div class="icon-container">
        <Tooltip offsetAmount={12}>
            <button class="trigger" on:click={handleOpen}>
                <span class="icon"><IconPencil /></span>
            </button>
            <p slot="tooltip" class="tooltip">Enter a custom Project ID</p>
        </Tooltip>
    </div>

    {#if open}
        <div transition:blur={{ duration: 200 }}>
            <div class="input-wrapper" transition:slide={{ duration: 200 }}>
                <!-- svelte-ignore a11y-autofocus -->
                <input
                    type="text"
                    bind:value
                    autofocus={open}
                    placeholder="Enter a project id..."
                />
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .input-container {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid var(--border-neutral-strong);
        width: var(--width);
        min-height: 30px;
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
        width: 28px;
        height: 28px;
        border-right: 1px solid transparent;
        transition: all 0.2s ease-out;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }

    .open {
        .icon-container {
            color: var(--fgcolor-neutral-tertiary);
            background-color: var(--bgcolor-neutral-tertiary);
            border-color: var(--border-neutral-strong);
        }
    }

    .input-wrapper {
        flex-grow: 1;
        margin-left: 30px;
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
        color: var(--text-neutral-strong);
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
