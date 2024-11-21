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
    export let readonly: $$Props['readonly'] = false;

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
        class:readonly
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
            {readonly}
            {...$$restProps}
        />
        {#if nullable}
            <Nullable bind:disabled bind:value />
        {/if}
        <span class="actions">
            <button
                disabled={disabled || readonly}
                on:mousedown={increment}
                on:keydown={increment}
                tabindex="-1"
                type="button"
            >
                <Icon icon={IconChevronUp} size="s" />
            </button>
            <button
                disabled={disabled || readonly}
                on:mousedown={decrement}
                on:keydown={increment}
                tabindex="-1"
                type="button"
            >
                <Icon icon={IconChevronDown} size="s" />
            </button>
        </span>
    </div>
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;
        @include input.wrapper;
        align-items: stretch;
        overflow: hidden;

        input {
            @include input.input;
            appearance: textfield;
            -moz-appearance: textfield;

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

        @include input.state;
    }
</style>
