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
        };

    export let href: $$Props['href'];
    export let leadingIcon: $$Props['leadingIcon'] = undefined;
    export let trailingIcon: $$Props['trailingIcon'] = undefined;
    export let badge: $$Props['badge'] = undefined;
    export let disabled: $$Props['disabled'] = false;
    export let status: $$Props['status'] = 'default';
    export let external: $$Props['external'] = false;
</script>

<a
    {href}
    {...$$restProps}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    data-status={status}
    target={external ? '_blank' : ''}
    rel={external ? 'noopener noreferrer' : ''}
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
