<script lang="ts">
    import Action from './Action.svelte';
    import Base from './Base.svelte';
    import { IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            showPassword: boolean;
        }>;

    export let state: States = 'default';
    export let showPassword: $$Props['showPassword'] = false;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;
</script>

<Base id={$$props.id} {label} {helper} {state}>
    <div
        class="input"
        class:disabled={$$props.disabled}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        {#if showPassword}
            <input on:input on:invalid on:change type="text" bind:value {...$$restProps} />
        {:else}
            <input on:input on:invalid on:change type="password" bind:value {...$$restProps} />
        {/if}
        <Action
            icon={showPassword ? IconEyeOff : IconEye}
            on:click={() => (showPassword = !showPassword)}
        />
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;

        display: flex;
        gap: var(--space-5);
        align-items: center;
        width: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline: var(--space-6);
        outline-offset: var(--border-width-l);

        input {
            inline-size: 100%;
            padding-block: var(--space-3);
            padding-inline: 0;
            border: none;
            display: block;
            block-size: 2.5rem;
            background: none;

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
