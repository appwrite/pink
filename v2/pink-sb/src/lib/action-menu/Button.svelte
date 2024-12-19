<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { ItemProps } from './index.js';
    import Badge from '$lib/Badge.svelte';

    type $$Props = HTMLButtonAttributes & ItemProps;

    export let leadingIcon: $$Props['leadingIcon'] = undefined;
    export let trailingIcon: $$Props['trailingIcon'] = undefined;
    export let badge: $$Props['badge'] = '';
    export let disabled: $$Props['disabled'] = false;
    export let status: $$Props['status'] = 'default';
</script>

<button
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    type="button"
    {...$$restProps}
    {disabled}
    data-status={status}
>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap="s" alignItems="center">
            {#if leadingIcon}
                <Icon size="s" icon={leadingIcon} />
            {/if}
            <span>
                <slot />
            </span>
        </Stack>
        <Stack direction="row" gap="s" alignItems="center" justifyContent="flex-end">
            {#if badge}
                <Badge variant="secondary" content={badge} />
            {/if}
            {#if trailingIcon}
                <Icon size="s" icon={trailingIcon} />
            {/if}
        </Stack>
    </Stack>
</button>

<style lang="scss">
    @use './item';

    button {
        @include item.base;
    }
</style>
