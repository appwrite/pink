<script lang="ts">
    import { createCheckbox } from '@melt-ui/svelte';
    import { IconCheck, IconMinusSm } from '@appwrite.io/pink-icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/Icon.svelte';
    import Text from '$lib/typography/Text.svelte';
    import Stack from '$lib/layout/Stack.svelte';

    export let disabled: boolean = false;
    export let id: string | undefined = undefined;
    export let size: 's' | 'm' = 'm';
    export let label: string | undefined = undefined;
    export let description: string | undefined = undefined;
    export let checked: boolean | 'indeterminate' = false;
    export let required: boolean = false;

    const dispatch = createEventDispatcher();

    const {
        elements: { root, input },
        states: { checked: localChecked },
        helpers: { isChecked, isIndeterminate }
    } = createCheckbox({
        defaultChecked: checked
    });

    $: localChecked.set(checked);
    localChecked.subscribe((n) => {
        checked = n;
        dispatch('change', checked);
    });
</script>

<Stack inline gap="s" alignItems="flex-start" direction="row">
    <button
        {id}
        {...$root}
        {disabled}
        use:root
        class:active={$isIndeterminate || $isChecked}
        class:s={size === 's'}
    >
        {#if $isIndeterminate}
            <Icon icon={IconMinusSm} {size} --icon-color="white" />
        {:else if $isChecked}
            <Icon icon={IconCheck} {size} --icon-color="white" />
        {/if}
    </button>
    <input {...$input} use:input {required} />

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

    button {
        @include transitions.common;

        --p-checkbox-size: var(--icon-size-m);

        $border-width: 1px;
        $border-width-double: $border-width * 2;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--p-checkbox-size));
        min-width: calc(var(--p-checkbox-size));
        height: calc(var(--p-checkbox-size));
        color: var(--fgcolor-on-invert);
        cursor: pointer;
        flex-shrink: 0;

        outline-offset: var(--border-width-l);

        border: $border-width solid;
        border-color: var(--border-neutral);
        border-radius: var(--border-radius-xs);

        &.s {
            --p-checkbox-size: var(--icon-size-s);
            margin: var(--space-1) var(--space-0);
            border-radius: var(--border-radius-xxs);
        }

        &:hover:not(.active):not([aria-disabled='true']) {
            background-color: var(--overlay-button-neutral-hover);
        }

        &.active {
            border-color: var(--bgcolor-neutral-invert);
            background-color: var(--bgcolor-neutral-invert);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
            border-color: var(--border-focus);
        }
    }
</style>
