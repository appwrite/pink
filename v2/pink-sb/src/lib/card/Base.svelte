<script context="module" lang="ts">
    export type BaseCardProps = Partial<{
        variant: 'primary' | 'secondary';
        radius: 'small' | 'medium' | 'large';
        padding: 'small' | 'medium' | 'large';
    }>;
</script>

<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps & HTMLAttributes<HTMLDivElement>;

    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'medium';
</script>

<div
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-small={radius === 'small'}
    class:radius-medium={radius === 'medium'}
    class:radius-large={radius === 'large'}
    class:padding-small={padding === 'small'}
    class:padding-medium={padding === 'medium'}
    class:padding-large={padding === 'large'}
    {...$$restProps}
>
    <slot />
</div>

<style lang="scss">
    @use './card';
    @use '../../scss/mixins/transitions';

    div {
        @include transitions.common;
        @include card.base;
        @include card.variant;
        @include card.radius;
        @include card.padding;
    }
</style>
