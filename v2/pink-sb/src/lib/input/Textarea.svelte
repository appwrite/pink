<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import type { HTMLTextareaAttributes } from 'svelte/elements';
    import type { States } from './types.js';
    import { autofocusInput } from './autofocus.js';
    import { Layout } from '$lib';

    type $$Props = HTMLTextareaAttributes &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
            value: string;
            autofocus: boolean;
        }>;

    export let state: States = 'default';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let id: $$Props['id'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let maxlength: $$Props['maxlength'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let rows: $$Props['rows'] = undefined;
    export let readonly: $$Props['readonly'] = false;
    export let required: $$Props['required'] = false;
    export let autofocus: $$Props['autofocus'] = false;
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
        <textarea
            on:input
            on:invalid
            on:change
            bind:value
            rows={rows || value?.split('\n').length}
            {disabled}
            {readonly}
            {maxlength}
            {id}
            {required}
            {...$$restProps}
            use:autofocusInput={autofocus}
        />
        <Layout.Stack direction="row" justifyContent="space-between">
            {#if maxlength}
                <span class="limits">{value?.length ?? 0}/{maxlength}</span>
            {/if}
            {#if nullable}
                <Nullable bind:disabled bind:value />
            {/if}
        </Layout.Stack>
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .input {
        transition:
            all 0.15s ease-in-out,
            height 0s;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-5);
        width: 100%;
        border: var(--border-width-s) solid var(--border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--bgcolor-neutral-default);
        padding-inline: var(--space-6);
        padding-block: var(--space-3);
        outline-offset: calc(var(--border-width-s) * -1);
        resize: vertical;
        overflow: scroll;

        .limits {
            color: var(--fgcolor-neutral-tertiary);
        }

        textarea {
            width: 100%;
            &:disabled {
                color: var(--fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--fgcolor-neutral-tertiary);
            }
        }

        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--border-focus);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--border-focus);
            .limits {
                color: var(--fgcolor-neutral-secondary);
            }
        }
        &.disabled {
            background-color: var(--bgcolor-neutral-tertiary);
        }

        &.success {
            border-color: var(--border-success);
        }
        &.warning {
            border-color: var(--border-warning);
        }
        &.error {
            border-color: var(--border-error);
        }
    }
</style>
