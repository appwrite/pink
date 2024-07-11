<script lang="ts">
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLButtonElement> &
        Partial<{
            selected: boolean;
        }>;

    export let selected: $$Props['selected'] = false;
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'medium';
</script>

<button
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    class:selected
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-small={radius === 'small'}
    class:radius-medium={radius === 'medium'}
    class:radius-large={radius === 'large'}
    class:padding-small={padding === 'small'}
    class:padding-medium={padding === 'medium'}
    class:padding-large={padding === 'large'}
    {...$$restProps}><slot /></button
>

<style lang="scss">
    @use './card';
    @use '../../scss/mixins/transitions';

    button {
        @include transitions.common;
        @include card.base;
        @include card.variant;
        @include card.radius;
        @include card.padding;
        @include card.interactive;
    }
</style>
