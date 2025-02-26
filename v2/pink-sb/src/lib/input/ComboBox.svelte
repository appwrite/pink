<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import { createCombobox } from '@melt-ui/svelte';
    import { Icon } from '$lib/index.js';
    import { createEventDispatcher } from 'svelte';
    import { IconChevronDown, IconChevronUp } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type Option = {
        label: string;
        value: string | boolean | number | null;
        disabled?: boolean;
    };

    type ComboboxProps = Omit<HTMLInputAttributes, 'value'> & {
        options: Array<Option>;
        isSearchable?: boolean;
    } & Partial<{
            value: string | boolean | number | null;
            label: string;
            state: States;
            helper: string;
        }>;

    export let state: States = 'default';
    export let options: ComboboxProps['options'];
    export let placeholder: ComboboxProps['placeholder'] = 'Select an option';
    export let disabled: ComboboxProps['disabled'] = false;
    export let label: ComboboxProps['label'] = undefined;
    export let value: ComboboxProps['value'] = undefined;
    export let id: ComboboxProps['id'] = undefined;
    export let helper: ComboboxProps['helper'] = undefined;
    export let readonly: ComboboxProps['readonly'] = false;
    export let required: ComboboxProps['required'] = false;

    const dispatch = createEventDispatcher();

    let wrapper: HTMLDivElement;

    const {
        elements: { menu, input, option },
        states: { open, inputValue, touchedInput, selected },
        helpers: { isSelected }
    } = createCombobox<Option['value']>({
        forceVisible: true,
        onSelectedChange(event) {
            value = event.next?.value;
            dispatch('change', value);

            return event.next;
        }
    });

    $: if (!$open) {
        $inputValue = $selected?.label ?? '';
    }

    $: filteredOptions = $touchedInput
        ? options.filter(({ label }) => {
              const normalizedInput = $inputValue.toLowerCase();
              return label.toLowerCase().includes(normalizedInput);
          })
        : options;
</script>

<Base {id} {label} {helper} {state} {required}>
    <slot name="info" slot="info" />
    <input type="hidden" {...$$restProps} {disabled} {readonly} {required} {value} on:invalid />
    <div
        bind:this={wrapper}
        class="input"
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <input
            {...$input}
            {placeholder}
            use:input
            disabled={disabled || readonly}
            class:disabled
            class:readonly
        />
        <Icon size="m" icon={$open ? IconChevronUp : IconChevronDown} />
    </div>
    {#if $open}
        <ul {...$menu} use:menu>
            {#each filteredOptions as opt, index (index)}
                <li {...$option(opt)} use:option class:selected={$isSelected(opt)}>
                    {opt.label}
                </li>
            {:else}
                <li>No results found</li>
            {/each}
        </ul>
    {/if}
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    .selected {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding-block: var(--space-3);
    }

    .input {
        @include transitions.common;
        @include input.wrapper;
        line-height: 140%;
        inline-size: 100%;
        user-select: none;

        input {
            padding-block: var(--space-3);
            margin-inline-end: auto;
        }

        &.placeholder {
            color: var(--color-fgcolor-neutral-tertiary);
        }
        &.readonly.placeholder {
            color: var(--color-fgcolor-neutral-primary);
        }
        @include input.state;
    }
    ul {
        display: flex;
        padding: var(--gap-xxs);
        flex-direction: column;
        align-items: flex-start;
        gap: var(--gap-xxxs);

        border-radius: var(--border-radius-m);
        border: var(--border-width-s) solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-primary);
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);

        //tmp fix:
        z-index: 9001;
        li {
            display: flex;
            padding-block: var(--space-3);
            padding-inline: var(--space-5) var(--space-4);
            align-items: center;
            gap: var(--gap-s);
            cursor: pointer;
            align-self: stretch;
            border-radius: var(--border-radius-s);
            user-select: none;
            color: var(--color-fgcolor-neutral-secondary);
            font-size: var(--font-size-s);
            font-style: normal;
            font-weight: 400;

            &:hover,
            &[data-highlighted] {
                background: var(--color-overlay-neutral-hover);
            }

            &[aria-disabled='true'] {
                opacity: 0.4;
                cursor: initial;
            }
        }
    }
    .search-input {
        flex-grow: 1;
        color: var(--color-fgcolor-neutral-primary);
    }
</style>
