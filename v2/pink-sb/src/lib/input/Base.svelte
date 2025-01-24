<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import type { States } from './types.ts';
    import Helper from './Helper.svelte';
    import { Tooltip } from '$lib/index.js';
    import Icon from '$lib/Icon.svelte';
    import { IconInfo } from '@appwrite.io/pink-icons-svelte';

    export let state: States;
    export let label: string | undefined = undefined;
    export let helper: string | undefined = undefined;
    export let id: string | undefined | null = undefined;
    export let tooltip: string | undefined = undefined;
</script>

<Stack direction="column" gap="s">
    <Stack direction="row" gap="s">
        {#if label}
            <label for={id}>{label}</label>
            {#if tooltip}
                <Tooltip disabled={!tooltip} flex>
                    <Icon icon={IconInfo} size="s" />
                    <span slot="tooltip">{tooltip}</span>
                </Tooltip>
            {/if}
        {/if}
    </Stack>

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
