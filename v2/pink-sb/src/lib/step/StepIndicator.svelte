<script lang="ts">
    import ActiveIndicator from '$lib/step/ActiveIndicator.svelte';

    export let variant: 'idle' | 'active' = 'idle';
</script>

{#if variant === 'idle'}
    <div class="idle"></div>
{:else}
    <div class="active"><ActiveIndicator /></div>
{/if}

<style>
    .idle {
        width: var(--base-6, 6px);
        aspect-ratio: 1/1;
        border-radius: 100%;
        background-color: var(--bgcolor-neutral-tertiary, #ededf0);
    }

    .active {
        width: var(--base-16, 16px);
        height: var(--base-16, 16px);
    }
</style>
