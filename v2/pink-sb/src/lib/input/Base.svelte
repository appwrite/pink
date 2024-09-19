<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import type { States } from './types.ts';
    import Helper from './Helper.svelte';

    export let state: States;
    export let label: string | undefined = undefined;
    export let helper: string | undefined = undefined;
    export let id: string | undefined | null = undefined;
</script>

<Stack direction="column" gap="s">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <slot />
    {#if helper}
        <Helper {state}>{helper}</Helper>
    {/if}
</Stack>

<style lang="scss">
    label {
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
    }
</style>
