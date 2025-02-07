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
    export let size: $$Props['size'] = 'm';
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
    style:--action-padding={size === 'l'
        ? 'var(--space-5) var(--space-5)'
        : 'var(--space-3) var(--space-5)'}
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
        {#if badge || trailingIcon}
            <Stack
                direction="row"
                gap="s"
                alignItems="center"
                justifyContent="flex-end"
                inline={true}
            >
                {#if badge}
                    <Badge variant="secondary" content={badge} />
                {/if}
                {#if trailingIcon}
                    <Icon size="s" icon={trailingIcon} />
                {/if}
            </Stack>
        {/if}
    </Stack>
</button>

<style lang="scss">
    @use './item';

    button {
        @include item.base;
    }
</style>
