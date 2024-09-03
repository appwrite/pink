<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.ts';
    import Helper from './Helper.svelte';

    export let id: HTMLInputAttributes['id'];
    export let state: States;
    export let label: string | undefined = undefined;
    export let helper: string | undefined = undefined;
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
