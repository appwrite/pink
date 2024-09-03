<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import type { HTMLTextareaAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = HTMLTextareaAttributes &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
            value: string;
        }>;

    export let state: States = 'default';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let id: $$Props['id'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let maxlength: $$Props['maxlength'] = undefined;
    export let helper: $$Props['helper'] = undefined;
</script>

<Base {id} {label} {helper} {state}>
    <div
        class="input"
        class:disabled
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <textarea on:change bind:value {disabled} {maxlength} {id} {...$$restProps} />
        {#if maxlength}
            <span class="limits">{value?.length ?? 0}/{maxlength}</span>
        {/if}
        {#if nullable}
            <Nullable bind:disabled bind:value />
        {/if}
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;

        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        width: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline: var(--space-6);
        padding-block: var(--space-3);
        outline-offset: var(--border-width-l);

        .limits {
            color: var(--color-fgcolor-neutral-tertiary);
        }

        textarea {
            width: 100%;
            &:disabled {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--color-fgcolor-neutral-tertiary);
            }
        }

        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--color-border-focus-secondary);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--color-border-focus);

            .limits {
                color: var(--color-fgcolor-neutral-secondary);
            }
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
