<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { LinkProps } from './index.js';
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { IconExternalLink } from '@appwrite.io/pink-icons-svelte';

    type $$Props = HTMLAnchorAttributes & Partial<LinkProps & { disabled: boolean }>;

    export let href: $$Props['href'] = undefined;
    export let variant: $$Props['variant'] = 'default';
    export let size: $$Props['size'] = 'm';
    export let disabled: $$Props['disabled'] = false;
</script>

<a
    {href}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : undefined}
    class:disabled
    class:s={size === 's'}
    class:l={size === 'l'}
    class:default={variant === 'default'}
    class:muted={variant === 'muted'}
    class:quiet={variant === 'quiet'}
    class:quiet-muted={variant === 'quiet-muted'}
    {...$$restProps}
>
    <Stack direction="row" gap="xxxs">
        <slot />
        <span class="link-icon">
            <Icon size={size === 'm' || size === 's' ? 'xs' : 's'} icon={IconExternalLink} />
        </span>
    </Stack>
</a>

<style lang="scss">
    @use './link';
    @use '../../scss/mixins/transitions';

    a {
        @include link.base;

        gap: var(--space-1);

        & .link-icon {
            opacity: 0;
            align-items: center;
            display: inline-flex;
            @include transitions.common;
        }

        &:hover .link-icon {
            opacity: 1;
        }
    }
</style>
