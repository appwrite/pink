<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import Icon from '$lib/Icon.svelte';
    import { autofocusInput } from './autofocus.js';
    import { IconChevronUp, IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import { parseBigIntBound, parseBigIntStep, parseBigIntValue } from './bigint.js';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';
    import { createEventDispatcher, type ComponentType } from 'svelte';

    type NativeNumber = HTMLInputAttributes['value'];
    type ExtendedNumber = NativeNumber | bigint;

    type $$Props = Omit<HTMLInputAttributes, 'type' | 'min' | 'max' | 'value'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
            autofocus: boolean;
            leadingIcon?: ComponentType;
            min: ExtendedNumber;
            max: ExtendedNumber;
            value: ExtendedNumber;
        }>;

    export let state: States = 'default';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let id: $$Props['id'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let readonly: $$Props['readonly'] = false;
    export let required: $$Props['required'] = false;
    export let autofocus: $$Props['autofocus'] = false;
    export let leadingIcon: $$Props['leadingIcon'] = undefined;
    export let step: $$Props['step'] = undefined;

    export let min: ExtendedNumber = undefined;
    export let max: ExtendedNumber = undefined;
    export let value: ExtendedNumber = undefined;

    let bigintMode = false;
    let minAttr: NativeNumber = undefined;
    let maxAttr: NativeNumber = undefined;

    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();

    $: if (typeof value === 'bigint' || typeof value === 'number') {
        bigintMode = typeof value === 'bigint';
    }

    function toNumberInputBound(raw: ExtendedNumber): NativeNumber {
        if (raw === null || raw === undefined) {
            return raw;
        }

        if (typeof raw === 'bigint') {
            const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);

            if (raw > maxSafe) {
                return Number.MAX_SAFE_INTEGER;
            }

            const minSafe = BigInt(Number.MIN_SAFE_INTEGER);

            if (raw < minSafe) {
                return Number.MIN_SAFE_INTEGER;
            }

            return Number(raw);
        }

        return raw;
    }

    $: minAttr = bigintMode ? undefined : toNumberInputBound(min);
    $: maxAttr = bigintMode ? undefined : toNumberInputBound(max);

    function fireOnChangeDispatch() {
        if (bigintMode) {
            const parsed = parseBigIntValue(value);
            dispatch('change', parsed ?? undefined);
            return;
        }

        dispatch('change', Number(value));
    }

    function increment(): void {
        if (bigintMode) {
            const stepValue = parseBigIntStep(step);
            const current = parseBigIntValue(value) ?? 0n;
            const minValue = parseBigIntBound(min);
            const maxValue = parseBigIntBound(max);
            let next = current + stepValue;

            if (minValue !== null && next < minValue) {
                next = minValue;
            }

            if (maxValue !== null && next > maxValue) {
                next = maxValue;
            }

            value = next.toString();
            fireOnChangeDispatch();
            return;
        }

        input.stepUp();
        value = Number(input.value);
        fireOnChangeDispatch();
    }

    function decrement(): void {
        if (bigintMode) {
            const stepValue = parseBigIntStep(step);
            const current = parseBigIntValue(value) ?? 0n;
            const minValue = parseBigIntBound(min);
            const maxValue = parseBigIntBound(max);
            let next = current - stepValue;

            if (minValue !== null && next < minValue) {
                next = minValue;
            }

            if (maxValue !== null && next > maxValue) {
                next = maxValue;
            }

            value = next.toString();
            fireOnChangeDispatch();
            return;
        }

        input.stepDown();
        value = Number(input.value);
        fireOnChangeDispatch();
    }
</script>

<Base {id} {label} {helper} {state} {required} {leadingIcon}>
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
        {#key bigintMode}
            {#if bigintMode}
                <input
                    {id}
                    on:input
                    on:invalid
                    on:change={fireOnChangeDispatch}
                    bind:this={input}
                    bind:value
                    type="text"
                    inputmode="numeric"
                    {disabled}
                    {readonly}
                    {required}
                    {...$$restProps}
                    use:autofocusInput={autofocus}
                />
            {:else}
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
                    min={minAttr}
                    max={maxAttr}
                    {step}
                    {...$$restProps}
                    use:autofocusInput={autofocus}
                />
            {/if}
        {/key}
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
