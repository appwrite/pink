<script lang="ts">
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLLabelAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps &
        HTMLLabelAttributes &
        Partial<{
            selected: boolean;
        }>;

    export let selected: $$Props['selected'] = false;
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'm';
    export let padding: $$Props['padding'] = 'm';
</script>

<label
    class:selected
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
    {...$$restProps}><slot /></label
>

<style lang="scss">
    @use './card';
    @use '../../scss/mixins/transitions';

    label {
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
