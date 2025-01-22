<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { ItemProps } from './index.js';
    import Badge from '$lib/Badge.svelte';

    type $$Props = HTMLAnchorAttributes &
        ItemProps & {
            href: string;
            external?: boolean;
            onClick?: () => void;
        };

    export let href: $$Props['href'];
    export let onClick: $$Props['onClick'] = undefined;
    export let leadingIcon: $$Props['leadingIcon'] = undefined;
    export let trailingIcon: $$Props['trailingIcon'] = undefined;
    export let badge: $$Props['badge'] = undefined;
    export let disabled: $$Props['disabled'] = false;
    export let status: $$Props['status'] = 'default';
    export let external: $$Props['external'] = false;
    export let size: $$Props['size'] = 'm';
</script>

<a
    {href}
    {...$$restProps}
    on:click={onClick}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    data-status={status}
    target={external ? '_blank' : ''}
    rel={external ? 'noopener noreferrer' : ''}
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
        <Stack direction="row" gap="s" alignItems="center" justifyContent="flex-end">
            {#if badge}
                <Badge variant="secondary" content={badge} />
            {/if}
            {#if trailingIcon}
                <Icon size="s" icon={trailingIcon} />
            {/if}
        </Stack>
    </Stack>
</a>

<style lang="scss">
    @use './item';

    a {
        @include item.base;
    }
</style>
