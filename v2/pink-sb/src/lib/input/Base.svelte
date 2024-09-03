<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    export let id: HTMLInputAttributes['id'];
    export let label: string | undefined = undefined;
    export let helper: string | undefined = undefined;
</script>

<Stack direction="column" gap="s">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <slot />
    {#if helper}
        <span>(wip){helper}</span>
    {/if}
</Stack>

<style lang="scss">
    label {
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
    }
</style>
