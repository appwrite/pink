<script lang="ts">
    import { Typography } from '$lib/index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Helper from './Helper.svelte';
    import type { States } from './types.ts';

    export let state: States;
    export let label: string | undefined = undefined;
    export let helper: string | undefined = undefined;
    export let id: string | undefined | null = undefined;
    export let required: boolean | undefined | null = undefined;
</script>

<Stack direction="column" gap="s">
    {#if label}
        <label for={id}>
            {label}
            {#if !required}
                <Typography.Text variant="m-400" color="--color-fgcolor-neutral-tertiary"
                    >optional</Typography.Text
                >
            {/if}
            <slot name="info" />
        </label>
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
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }
</style>
