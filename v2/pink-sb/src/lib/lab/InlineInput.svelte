<script lang="ts">
    import Tooltip from '$lib/Tooltip.svelte';
    import { IconHashtag } from '@appwrite.io/pink-icons-svelte';
    import { onMount, onDestroy } from 'svelte';

    export let label: string = '';
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

    onMount(() => {
        document.addEventListener('keydown', handleKeyDown);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', handleKeyDown);
    });
</script>

<div class="input">
    <Tooltip offsetAmount={20}>
        <button class="trigger" on:click={handleOpen}><IconHashtag /></button>
        <p slot="tooltip">Enter a custom Project ID</p>
    </Tooltip>
    <div class="sub">
        {#if open}
            <!-- svelte-ignore a11y-autofocus -->
            <input type="text" bind:value autofocus />
        {/if}
    </div>
</div>

<style lang="scss">
    .input {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid var(--color-border-neutral-strong);
        width: fit-content;
        min-height: 50px;
        transition: width 0.2s ease-out;

        .sub {
            display: block;
            width: fit-content;
        }

        .trigger {
            height: 12px;
            width: 12px;
            display: flex;
            align-items: center;
            gap: var(--space-3);
        }
    }
</style>
