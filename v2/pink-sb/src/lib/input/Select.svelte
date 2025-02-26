<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import { createSelect } from '@melt-ui/svelte';
    import { Icon, Badge, Layout } from '$lib/index.js';
    import { createEventDispatcher, hasContext, type ComponentType } from 'svelte';
    import { IconChevronDown, IconChevronUp } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type SelectProps = Omit<HTMLInputAttributes, 'value'> & {
        options: Array<{
            label: string;
            value: string | boolean | number | null;
            disabled?: boolean;
            readonly?: boolean;
            badge?: string;
            leadingIcon?: ComponentType;
            trailingIcon?: ComponentType;
            leadingHtml?: string;
        }>;
        isSearchable?: boolean;
    } & Partial<{
            value: string | boolean | number | null;
            label: string;
            state: States;
            helper: string;
        }>;

    export let state: States = 'default';
    export let options: SelectProps['options'];
    export let placeholder: SelectProps['placeholder'] = 'Select an option';
    export let disabled: SelectProps['disabled'] = false;
    export let label: SelectProps['label'] = undefined;
    export let value: SelectProps['value'] = undefined;
    export let id: SelectProps['id'] = undefined;
    export let helper: SelectProps['helper'] = undefined;
    export let readonly: SelectProps['readonly'] = false;
    export let required: SelectProps['required'] = false;

    $: selectedLeadingHtml = options.find((option) => option.value === value)?.leadingHtml;
    $: selectedIcon = options.find((option) => option.value === value)?.leadingIcon;

    const dispatch = createEventDispatcher();
    const inDialogGroup = hasContext('dialog-group');

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
        portal: inDialogGroup ? 'dialog' : null,
        onSelectedChange(event) {
            value = event.next?.value;
            dispatch('change', value);

            return event.next;
        }
    });
</script>

<Base {id} {label} {helper} {state} {required}>
    <slot name="info" slot="info" />
    <input type="hidden" {...$$restProps} {disabled} {readonly} {required} {value} on:invalid />
    <button
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
    >
        <Layout.Stack direction="row" justifyContent="space-between" alignItems="center" gap="s">
            {#if selectedLeadingHtml}
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html selectedLeadingHtml}
            {:else if selectedIcon}
                <Icon size="s" icon={selectedIcon} />
            {/if}
            <span class="selected">
                {#if $selectedLabel}
                    {$selectedLabel}
                {:else}
                    {placeholder}
                {/if}
            </span>
            <Icon size="m" icon={$open ? IconChevronUp : IconChevronDown} />
        </Layout.Stack>
    </button>
    {#if $open}
        <ul {...$menu} use:menu class:dialog-group={inDialogGroup}>
            {#each options as { value, label, badge, disabled, leadingIcon, trailingIcon, leadingHtml }}
                <li {...$option({ value, label, disabled })} use:option>
                    {#if leadingHtml}
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
            {:else}
                <li role="option" aria-selected="false" aria-disabled="true">
                    <span>No options available</span>
                </li>
            {/each}
        </ul>
    {/if}
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    .selected {
        display: inline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        align-items: center;
        gap: var(--space-4);
        padding-block: var(--space-3);
    }
    button span {
        display: flex;
        gap: var(--space-3);
    }

    .input {
        @include transitions.common;
        @include input.wrapper;
        line-height: 140%;
        inline-size: 100%;
        user-select: none;
        padding-inline-end: var(--space-3);

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

        &.dialog-group {
            position: fixed;
            overflow-y: auto;
            max-height: 20rem;

            &::-webkit-scrollbar {
                opacity: 0.7;
            }
        }

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
