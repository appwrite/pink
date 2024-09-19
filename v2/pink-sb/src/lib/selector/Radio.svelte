<script lang="ts">
    import Base from './Base.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type $$Props = Omit<HTMLInputAttributes, 'size'> & {
        value: string;
        group: string;
    } & Partial<{
            size: 'small' | 'medium';
            label: string;
        }>;

    export let group: $$Props['group'];
    export let value: $$Props['value'];
    export let size: $$Props['size'] = 'medium';
    export let id: string | undefined = undefined;
    export let label: $$Props['label'] = undefined;
</script>

<Base {label} {id}>
    <input type="radio" bind:group {value} {id} class:small={size === 'small'} {...$$restProps} />
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    input {
        @include transitions.common;

        --p-radio-size: var(--icon-size-m);

        position: relative;
        border-radius: var(--border-radius-circular);
        inline-size: var(--p-radio-size);
        block-size: var(--p-radio-size);
        border: 1px solid var(--color-border-neutral);
        border-radius: var(--border-radius-circle);
        outline-offset: var(--border-width-l);

        &.small {
            --p-radio-size: var(--icon-size-s);
        }

        &:focus-visible {
            outline: var(--border-width-xl) solid var(--color-border-focus);
            border-color: var(--color-border-focus);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:hover:not(:disabled):not(:checked) {
            background-color: var(--color-overlay-button-neutral-hover);
        }

        &:checked {
            border: none;
            background-color: var(--color-bgcolor-neutral-invert);
            padding: calc(var(--p-radio-size) * 0.2);

            &::before {
                content: '';
                display: block;
                position: absolute;
                inset: 30%;
                background-color: var(--color-fgcolor-on-invert);
                border-radius: var(--border-radius-circle);
            }
        }
    }
</style>
