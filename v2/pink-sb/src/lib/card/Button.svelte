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
    export let radius: $$Props['radius'] = 'm';
    export let padding: $$Props['padding'] = 'm';
</script>

<button
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    class:selected
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-s={radius === 's'}
    class:radius-m={radius === 'm'}
    class:radius-l={radius === 'l'}
    class:padding-xs={padding === 'xs'}
    class:padding-s={padding === 's'}
    class:padding-m={padding === 'm'}
    class:padding-l={padding === 'l'}
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
