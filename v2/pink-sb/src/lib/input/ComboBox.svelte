<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import { autofocusInput } from './autofocus.js';
    import { createCombobox } from '@melt-ui/svelte';
    import { Icon } from '$lib/index.js';
    import { createEventDispatcher, hasContext, onMount } from 'svelte';
    import { IconChevronDown, IconChevronUp } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import { fly } from 'svelte/transition';
    import type { ComponentType } from 'svelte';

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
            autofocus: boolean;
            leadingIcon?: ComponentType;
            noResultsOption?:
                | string
                | {
                      message: string;
                      disabled?: boolean;
                  };
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
    export let autofocus: ComboboxProps['autofocus'] = false;
    export let leadingIcon: ComboboxProps['leadingIcon'] = undefined;
    export let noResultsOption: ComboboxProps['noResultsOption'] = 'No results found';

    const dispatch = createEventDispatcher();

    const inDialogGroup = hasContext('dialog-group');

    const {
        elements: { menu, input, option },
        states: { open, inputValue, touchedInput },
        helpers: { isSelected }
    } = createCombobox<Option['value']>({
        forceVisible: true,
        portal: inDialogGroup ? 'dialog[open]' : null,
        onSelectedChange(event) {
            value = event.next?.value;
            $inputValue = event.next?.label as unknown as string;
            dispatch('change', value);

            return event.next;
        }
    });

    onMount(() => {
        if (value) {
            $inputValue = (options.find((opt) => opt.value === value)?.label ||
                value) as unknown as string;
        }
    });

    inputValue.subscribe((v) => value = options.find((opt) => opt.label === v)?.value || v);

    $: filteredOptions = $touchedInput
        ? options.filter(({ label }) => {
              const normalizedInput = $inputValue?.toLowerCase();
              return label?.toLowerCase()?.includes(normalizedInput);
          })
        : options;

    $: showNoResults = $touchedInput && filteredOptions.length === 0;

    $: noResultsProps = noResultsOption
        ? typeof noResultsOption === 'object'
            ? { message: noResultsOption?.message, disabled: noResultsOption?.disabled ?? false }
            : { message: noResultsOption, disabled: true }
        : { message: 'No results found', disabled: true };

    $: displayOptions = showNoResults
        ? [{ label: noResultsProps.message, value: null, disabled: noResultsProps.disabled }]
        : filteredOptions;
</script>

<Base {id} {label} {helper} {state} {required} {leadingIcon}>
    <slot name="info" slot="info" />
    <input type="hidden" {...$$restProps} {disabled} {readonly} {required} {value} on:invalid />
    <div
        class="input"
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
        use:input
    >
        <input
            {...$input}
            {placeholder}
            disabled={disabled || readonly}
            class:disabled
            class:readonly
            use:autofocusInput={autofocus}
        />
        <Icon size="m" icon={$open ? IconChevronUp : IconChevronDown} />
    </div>
    {#if $open}
        <ul {...$menu} use:menu transition:fly={{ duration: 80 }}>
            {#each displayOptions as opt, index (index)}
                <li {...$option(opt)} use:option class:selected={$isSelected(opt)}>
                    {opt.label}
                </li>
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
            width: 100%;
        }

        &.placeholder {
            color: var(--fgcolor-neutral-tertiary);
        }
        &.readonly.placeholder {
            color: var(--fgcolor-neutral-primary);
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
        border: var(--border-width-s) solid var(--border-neutral);
        background: var(--bgcolor-neutral-primary);
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);

        //tmp fix:
        z-index: 9001;

        max-height: 300px;
        overflow-y: auto;

        &::-webkit-scrollbar-track {
            margin-top: 7px;
            margin-bottom: 7px;
        }

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
            color: var(--fgcolor-neutral-secondary);
            font-size: var(--font-size-s);
            font-style: normal;
            font-weight: 400;

            &:hover,
            &[data-highlighted] {
                background: var(--overlay-neutral-hover);
            }

            &[aria-disabled='true'] {
                opacity: 0.4;
                cursor: initial;

                &:hover,
                &[data-highlighted] {
                    background: transparent;
                }
            }
        }
    }
    .search-input {
        flex-grow: 1;
        color: var(--fgcolor-neutral-primary);
    }
</style>
