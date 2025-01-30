<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { Variant } from './types.ts';
    import { getContext } from 'svelte';

    type $$Props = HTMLAnchorAttributes & {
        href: string;
    } & Partial<{
            disabled: boolean;
            active: boolean;
        }>;

    export let href: $$Props['href'];
    export let disabled: $$Props['disabled'] = false;
    export let active: $$Props['active'] = false;
    const variant: Variant = getContext('tabs-variant');
    const stretch: boolean = getContext('tabs-stretch');
</script>

<a
    role="tab"
    {href}
    on:keydown
    {...$$restProps}
    class:active
    class:tab-primary={variant === 'primary'}
    class:tab-secondary={variant === 'secondary'}
    class:tab-stretch={stretch}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
>
    <slot />
</a>

<style lang="scss">
    @use 'tabs';

    a {
        @include tabs.base;
    }
</style>
