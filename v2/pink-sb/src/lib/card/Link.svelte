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
    export let radius: $$Props['radius'] = 'm';
    export let padding: $$Props['padding'] = 'm';
</script>

<a
    {href}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-s={radius === 's'}
    class:radius-m={radius === 'm'}
    class:radius-l={radius === 'l'}
    class:padding-xxs={padding === 'xxs'}
    class:padding-xs={padding === 'xs'}
    class:padding-s={padding === 's'}
    class:padding-m={padding === 'm'}
    class:padding-l={padding === 'l'}
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
