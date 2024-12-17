<script lang="ts">
    import Tooltip from '$lib/Tooltip.svelte';
    import { IconHashtag } from '@appwrite.io/pink-icons-svelte';
    import { onMount, onDestroy } from 'svelte';

    let w = 0;
    $: width = w + 'px';

    // export let label: string = '';
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

<div class="input" style:--width={width}>
    <div class="sub" bind:clientWidth={w}>
        <Tooltip offsetAmount={20}>
            <button class="trigger" on:click={handleOpen}>
                <span class="icon"><IconHashtag /></span></button
            >
            <p slot="tooltip">Enter a custom Project ID</p>
        </Tooltip>

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
        border-radius: 8px;
        border: 1px solid var(--color-border-neutral-strong);
        width: var(--width);
        min-height: 40px;
        min-width: 40px;
        justify-content: center;
        transition: width 0.2s ease-out;

        .sub {
            display: block;
        }

        .trigger {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;

            .icon {
                height: 12px;
                width: 12px;
            }
        }
    }
</style>
