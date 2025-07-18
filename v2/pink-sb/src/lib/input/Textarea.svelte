<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import type { HTMLTextareaAttributes } from 'svelte/elements';
    import type { States } from './types.js';
    import { autofocusInput } from './autofocus.js';
    import { Layout } from '$lib/index.js';

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
        position: relative;

        &::-webkit-resizer {
            display: none;
        }

        &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            width: 16px;
            height: 16px;

            background: url("data:image/svg+xml,%3Csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M13.7246%205.58224C13.9187%205.45407%2014.1826%205.47583%2014.3535%205.64669C14.5243%205.81756%2014.5461%206.08152%2014.4179%206.2756L14.3535%206.35372L6.35348%2014.3537C6.15822%2014.549%205.84171%2014.549%205.64645%2014.3537C5.45118%2014.1585%205.45118%2013.842%205.64645%2013.6467L13.6464%205.64669L13.7246%205.58224ZM13.7246%209.58224C13.9187%209.45407%2014.1826%209.47583%2014.3535%209.64669C14.5243%209.81756%2014.5461%2010.0815%2014.4179%2010.2756L14.3535%2010.3537L10.3535%2014.3537C10.1582%2014.549%209.84171%2014.549%209.64645%2014.3537C9.45118%2014.1585%209.45118%2013.842%209.64645%2013.6467L13.6464%209.64669L13.7246%209.58224Z'%20fill='%2356565C'/%3E%3C/svg%3E")
                no-repeat center/contain;
        }

        .limits {
            color: var(--fgcolor-neutral-tertiary);
        }

        textarea {
            width: 100%;
            height: 100%;
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
