<script lang="ts">
    import Action from './Action.svelte';
    import Base from './Base.svelte';
    import { IconEye, IconEyeOff } from '@appwrite.io/pink-icons';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = Omit<HTMLInputAttributes, 'type'> & {
        label: string;
        value: string;
    } & Partial<{
            state: States;
            showPassword: boolean;
        }>;
    /**
     * The label of the input.
     */
    export let label: $$Props['label'];
    /**
     * The value of the input.
     */
    export let value: $$Props['value'];
    /**
     * The state of the input.
     */
    export let state: $$Props['state'] = 'default';
    export let showPassword: $$Props['showPassword'] = false;
</script>

<Base id={$$props.id} {label}>
    <div
        class="input"
        class:disabled={$$props.disabled}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        {#if showPassword}
            <input type="text" bind:value {...$$restProps} />
        {:else}
            <input type="password" bind:value {...$$restProps} />
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
        border: var(--border-width-s) solid var(--color-border-neutral-weak);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline: var(--space-6);
        outline-offset: var(--border-width-l);

        input {
            width: 100%;
            padding-block: var(--space-3);
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
