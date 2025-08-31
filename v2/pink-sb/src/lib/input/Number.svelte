<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import Icon from '$lib/Icon.svelte';
    import { autofocusInput } from './autofocus.js';
    import { IconChevronUp, IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';
    import { createEventDispatcher } from 'svelte';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
            autofocus: boolean;
        }>;

    export let state: States = 'default';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let id: $$Props['id'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let readonly: $$Props['readonly'] = false;
    export let required: $$Props['required'] = false;
    export let autofocus: $$Props['autofocus'] = false;

    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    function fireOnChangeDispatch() {
        dispatch('change', Number(value));
    }

    function increment(): void {
        input.stepUp();
        value = input.value;
        fireOnChangeDispatch();
    }

    function decrement(): void {
        input.stepDown();
        value = input.value;
        fireOnChangeDispatch();
    }
</script>

<Base {id} {label} {helper} {state} {required}>
    <slot name="info" slot="info" />
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
            on:change={fireOnChangeDispatch}
            bind:this={input}
            bind:value
            type="number"
            {disabled}
            {readonly}
            {required}
            {...$$restProps}
            use:autofocusInput={autofocus}
        />
        {#if nullable}
            <Nullable bind:value />
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
        padding-inline-end: 0;
        align-items: stretch;
        overflow: hidden;

        input {
            appearance: textfield;
            -moz-appearance: textfield;
            @include input.input;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            border-left: var(--border-width-s) solid var(--border-neutral);

            button {
                display: inline-flex;
                align-items: center;
                height: var(--icon-size-s);
                justify-content: center;
                padding-inline: var(--space-3);
                height: 100%;
                margin-top: -0.5px; /** accounts for the 1px border added */

                &:not(:disabled) {
                    &:hover {
                        background: var(--overlay-neutral-hover);
                    }

                    &:active {
                        background: var(--overlay-neutral-pressed);
                    }
                }
                &:first-child {
                    border-block-end: var(--border-width-s) solid var(--border-neutral);
                }
            }
        }

        @include input.state;
    }
</style>
