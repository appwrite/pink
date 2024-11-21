<script lang="ts">
    import Base from './Base.svelte';
    import type { SelectProps, States } from './types.js';
    import { createSelect } from '@melt-ui/svelte';
    import { Icon, Badge } from '$lib/index.js';
    import { createEventDispatcher } from 'svelte';
    import { IconChevronDown, IconChevronUp } from '@appwrite.io/pink-icons-svelte';

    export let state: States = 'default';
    export let options: SelectProps['options'];
    export let placeholder: SelectProps['placeholder'] = 'Select an option';
    export let disabled: SelectProps['disabled'] = false;
    export let label: SelectProps['label'] = undefined;
    export let value: SelectProps['value'] = undefined;
    export let id: SelectProps['id'] = undefined;
    export let helper: SelectProps['helper'] = undefined;
    export let readonly: SelectProps['readonly'] = false;
    export let isSearchable: SelectProps['isSearchable'] = false;

    let searchQuery: string = '';
    $: filteredOptions = isSearchable
        ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : options;

    const dispatch = createEventDispatcher();
    let selectedLeadingHtml: undefined | string = undefined;

    const {
        elements: { trigger, menu, option },
        states: { selectedLabel, open }
    } = createSelect<string | boolean | number | null>({
        forceVisible: true,
        ids: {
            label: id ?? undefined,
            trigger: id ?? undefined
        },
        defaultSelected: options?.find((option) => option.value === value),
        positioning: {
            placement: 'bottom',
            fitViewport: false,
            sameWidth: true
        },
        preventScroll: false,
        portal: null,
        onSelectedChange(event) {
            value = event.next?.value;
            selectedLeadingHtml = options.find((option) => option.value === value)?.leadingHtml;
            dispatch('change', value);
            searchQuery = event.next?.label;
            return event.next;
        }
    });
</script>

<Base {id} {label} {helper} {state}>
    <input type="hidden" {...$$restProps} {disabled} {readonly} {value} on:invalid />
    <div
        {...$trigger}
        use:trigger
        class="input"
        class:disabled
        class:readonly
        class:placeholder={!$selectedLabel}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
        disabled={disabled || readonly}
        role={!isSearchable && 'button'}
    >
        {#if isSearchable}
            <input type="text" class="search-input" bind:value={searchQuery} />
        {:else}
        <span>
            {#if $selectedLabel}
                {#if selectedLeadingHtml}
                    {@html selectedLeadingHtml}
                {/if}
                {$selectedLabel}
            {:else}
                {placeholder}
            {/if}
        </span>
            {/if}
        <Icon size="m" icon={$open ? IconChevronUp : IconChevronDown} />
    </button>
    {#if $open}
        <ul {...$menu} use:menu>
            {#each filteredOptions as { value, label, badge, disabled, readonly, leadingIcon, trailingIcon, leadingHtml }}
                <li {...$option({ value, label, disabled })} use:option>
                    {#if leadingHtml}
                        {@html leadingHtml}
                    {/if}
                    {#if leadingIcon}
                        <Icon size="s" icon={leadingIcon} />
                    {/if}
                    <span>{label}</span>
                    {#if badge}
                        <Badge variant="secondary" content={badge} />
                    {/if}
                    {#if trailingIcon}
                        <Icon size="s" icon={trailingIcon} />
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    button span {
        display: flex;
        gap: var(--space-3);
    }

    .input {
        @include transitions.common;
        @include input.wrapper;
        line-height: 140%;
        inline-size: 100%;
        block-size: 2.5rem;
        span {
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

            span {
                margin-inline-end: auto;
            }

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
