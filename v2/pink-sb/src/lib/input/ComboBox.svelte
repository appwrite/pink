<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import { createSelect } from '@melt-ui/svelte';
    import { Icon, Badge } from '$lib/index.js';
    import type { ComponentType } from 'svelte';
    import { IconChevronDown, IconChevronUp } from '@appwrite.io/pink-icons-svelte';

    type $$Props = {
        options: Array<{
            label: string;
            value: string;
            disabled?: boolean;
            badge?: string;
            leadingIcon?: ComponentType;
            trailingIcon?: ComponentType;
        }>;
    } & Partial<{
        label: string;
        state: States;
        helper: string;
        value: string;
        id: string;
        disabled: boolean;
    }>;

    export let state: States = 'default';
    export let options: $$Props['options'];
    export let placeholder: string = 'Select an option';
    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let helper: $$Props['helper'] = undefined;

    const {
        elements: { trigger, menu, option },
        states: { selectedLabel, open }
    } = createSelect<string>({
        forceVisible: true,
        positioning: {
            placement: 'bottom',
            fitViewport: true,
            sameWidth: true
        },
        onSelectedChange(event) {
            value = event.next?.value;

            return event.next;
        }
    });
</script>

<Base {id} {label} {helper} {state}>
    <button
        class="input"
        class:disabled
        class:placeholder={!$selectedLabel}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
        {...$trigger}
        use:trigger
    >
        <span>
            {$selectedLabel || placeholder}
        </span>
        <Icon size="m" icon={$open ? IconChevronUp : IconChevronDown} />
    </button>
    {#if $open}
        <ul {...$menu} use:menu>
            {#each Object.entries(options) as [value, { label, badge, disabled, leadingIcon, trailingIcon }]}
                <li {...$option({ value, label, disabled })} use:option>
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
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;

        display: flex;
        gap: var(--space-5);
        align-items: center;
        width: 100%;
        block-size: 2.5rem;
        inline-size: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline: var(--space-6);
        outline-offset: calc(var(--border-width-s) * -1);

        span {
            margin-inline-end: auto;
        }
        &.placeholder {
            color: var(--color-fgcolor-neutral-tertiary);
        }
        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--color-border-focus);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--color-border-focus);
        }
        &.disabled {
            background-color: var(--color-bgcolor-neutral-tertiary);
        }
        &.success {
            border-color: var(--color-border-success);
        }
        &.warning {
            border-color: var(--color-border-warning);
        }
        &.error {
            border-color: var(--color-border-error);
        }
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
</style>
