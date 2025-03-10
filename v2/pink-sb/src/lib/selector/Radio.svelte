<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '$lib/typography/Text.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type $$Props = Omit<HTMLInputAttributes, 'size'> & {
        value: string;
        group: string;
    } & Partial<{
            size: 's' | 'm';
            label: string;
            radioInput: HTMLInputElement;
        }>;

    export let group: $$Props['group'];
    export let value: $$Props['value'];
    export let size: $$Props['size'] = 'm';
    export let id: $$Props['id'] | undefined = undefined;
    export let label: $$Props['label'] = undefined;
    export let description: string | undefined = undefined;
    export let radioInput: $$Props['radioInput'] = undefined;
</script>

<Stack inline gap="s" alignItems="flex-start" direction="row">
    <input
        type="radio"
        bind:this={radioInput}
        bind:group
        {value}
        {id}
        on:invalid
        on:change
        class:s={size === 's'}
        {...$$restProps}
    />

    {#if label || description}
        <Stack gap="xxs">
            {#if label}
                <label for={id}>
                    <Text variant="m-500">{label}</Text>
                </label>
            {/if}

            <slot name="description">
                {#if description}
                    <Text variant="m-400" color="--fgcolor-neutral-tertiary">
                        {description}
                    </Text>
                {/if}
            </slot>
        </Stack>
    {/if}
</Stack>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    label {
        cursor: pointer;
    }

    input {
        @include transitions.common;

        --p-radio-size: var(--icon-size-m);

        position: relative;
        border-radius: var(--border-radius-circular);
        inline-size: var(--p-radio-size);
        block-size: var(--p-radio-size);
        border: 1px solid var(--border-neutral);
        border-radius: var(--border-radius-circle);
        outline-offset: var(--border-width-l);
        background-color: var(--bgcolor-neutral-primary);

        &.s {
            --p-radio-size: var(--icon-size-s);
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
            border-color: var(--border-focus);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:hover:not(:disabled):not(:checked) {
            background-color: var(--overlay-button-neutral-hover);
        }

        &:checked {
            border: none;
            background-color: var(--bgcolor-neutral-invert);
            padding: calc(var(--p-radio-size) * 0.2);

            &::before {
                content: '';
                display: block;
                position: absolute;
                inset: 30%;
                background-color: var(--fgcolor-on-invert);
                border-radius: var(--border-radius-circle);
            }
        }
    }
</style>
