<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconChevronUp, IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
        }>;

    export let state: States = 'default';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let id: $$Props['id'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;

    let input: HTMLInputElement;

    function increment(): void {
        input.stepUp();
    }

    function decrement(): void {
        input.stepDown();
    }
</script>

<Base {id} {label} {helper} {state}>
    <div
        class="input"
        class:disabled
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <slot name="start" />
        <input
            {id}
            on:input
            on:invalid
            on:change
            bind:this={input}
            bind:value
            type="number"
            {...$$restProps}
        />
        {#if nullable}
            <Nullable bind:disabled bind:value />
        {/if}
        <span class="actions">
            <button
                {disabled}
                on:mousedown={increment}
                on:keydown={increment}
                tabindex="-1"
                type="button"
            >
                <Icon icon={IconChevronUp} size="small" />
            </button>
            <button
                {disabled}
                on:mousedown={decrement}
                on:keydown={increment}
                tabindex="-1"
                type="button"
            >
                <Icon icon={IconChevronDown} size="small" />
            </button>
        </span>
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;

        display: flex;
        gap: var(--space-5);
        align-items: stretch;
        width: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline-start: var(--space-6);
        outline-offset: calc(var(--border-width-s) * -1);
        overflow: hidden;

        input {
            inline-size: 100%;
            padding-block: var(--space-3);
            padding-inline: 0;
            border: none;
            display: block;
            block-size: 2.5rem;
            background: none;
            appearance: textfield;
            -moz-appearance: textfield;

            &:disabled {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            border-left: var(--border-width-s) solid var(--color-border-neutral);

            button {
                display: inline-flex;
                align-items: center;
                height: var(--icon-size-s);
                justify-content: center;
                padding-inline: var(--space-3);
                height: 100%;

                &:not(:disabled) {
                    &:hover {
                        background: var(--color-overlay-neutral-hover);
                    }

                    &:active {
                        background: var(--color-overlay-neutral-pressed);
                    }
                }
                &:first-child {
                    border-block-end: var(--border-width-s) solid var(--color-border-neutral);
                }
            }
        }

        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--color-border-focus);
        }
        &:focus-within {
            outline: var(--border-width-xl) solid var(--color-border-focus);
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
</style>
