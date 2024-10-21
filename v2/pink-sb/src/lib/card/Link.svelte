<script lang="ts">
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLAnchorElement> & {
            href: string;
        } & Partial<{
            disabled: boolean;
        }>;

    export let href: $$Props['href'];

    export let disabled: $$Props['disabled'] = false;
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'medium';
</script>

<a
    {href}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-small={radius === 'small'}
    class:radius-medium={radius === 'medium'}
    class:radius-large={radius === 'large'}
    class:padding-x-small={padding === 'x-small'}
    class:padding-small={padding === 'small'}
    class:padding-medium={padding === 'medium'}
    class:padding-large={padding === 'large'}
    {...$$restProps}><slot /></a
>

<style lang="scss">
    @use './card';
    @use '../../scss/mixins/transitions';

    a {
        display: inline-flex;
        cursor: pointer;
        @include transitions.common;
        @include card.base;
        @include card.variant;
        @include card.radius;
        @include card.padding;
        @include card.interactive;
    }
</style>
