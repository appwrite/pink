<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { ItemProps } from './index.js';

    type $$Props = HTMLAnchorAttributes & ItemProps;

    export let title: $$Props['title'];
    export let href: $$Props['href'] = undefined;
    export let subtitle: $$Props['subtitle'] = undefined;
    export let description: $$Props['description'] = undefined;
    export let icon: $$Props['icon'] = undefined;
</script>

<a {href} {...$$restProps}>
    <Stack gap="xs">
        <Stack direction="row" gap="s">
            {#if icon}
                <Icon size="m" {icon} />
            {/if}
            <span>{title}</span>
            {#if subtitle}
                <span class="divider" />
                <span>{subtitle}</span>
            {/if}
        </Stack>
        {#if description}
            <span>{description}</span>
        {/if}
    </Stack>
</a>

<style lang="scss">
    @use './item';

    a {
        @include item.base;
    }
</style>
