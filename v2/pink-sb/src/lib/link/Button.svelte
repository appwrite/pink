<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { LinkProps } from './index.js';
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { IconExternalLink } from '@appwrite.io/pink-icons-svelte';

    type $$Props = HTMLButtonAttributes & Partial<LinkProps>;

    export let type: $$Props['type'] = 'button';
    export let variant: $$Props['variant'] = 'default';
    export let size: $$Props['size'] = 'm';
    export let disabled: $$Props['disabled'] = false;
</script>

{#key type}
    <button
        {...{ type }}
        {disabled}
        on:click
        on:dblclick
        on:mousedown
        on:mouseup
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
    </button>
{/key}

<style lang="scss">
    @use './link';
    @use '../../scss/mixins/transitions';

    button {
        @include link.base;

        gap: var(--space-1);

        & .link-icon {
            opacity: 0;
            display: inline-flex;
            @include transitions.common;
        }

        &:hover .link-icon {
            opacity: 1;
        }
    }
</style>
