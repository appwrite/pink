<script lang="ts">
    import { Layout } from '$lib/index.ts';
    import { createPinInput } from '@melt-ui/svelte';
    import type { ComponentProps } from 'svelte';
    import type Stack from '$lib/layout/Stack.svelte';
    import type { States } from './types.ts';

    export let type: 'text' | 'password' = 'text';
    export let size: 'small' | 'medium' = 'medium';
    export let length = 6;
    export let value = '';
    export let placeholder = '';
    export let disabled = false;
    export let gap: ComponentProps<Stack>['gap'] = 's';
    export let state: Omit<States, 'error' | 'default'> = 'default';

    const {
        elements: { root, input }
    } = createPinInput({
        defaultValue: value.split(''),
        placeholder,
        disabled,
        type
    });
</script>

<div {...$root} use:root>
    <Layout.Stack direction="row" {gap}>
        {#each Array.from({ length }) as index}
            <input
                {...$input()}
                {disabled}
                use:input
                class:small={size === 'small'}
                class:medium={size === 'medium'}
                class:error={state === 'error'}
                data-pink-index={index}
            />
        {/each}
    </Layout.Stack>
</div>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    input {
        @include transitions.common;
        --p-otp-size: var(--otp-size);

        border: var(--border-width-s) solid var(--color-border-neutral-weak);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        outline-offset: var(--border-width-l);
        width: var(--p-otp-size);
        height: var(--p-otp-size);
        text-align: center;
        color: var(--color-fgcolor-neutral-primary);

        &.small {
            --p-otp-size: 40px;
            font-size: var(--font-size-xl);
        }
        &.medium {
            --p-otp-size: 64px;
            font-size: var(--font-size-xxxl);
        }
        &:hover:not(:focus-within):not(:disabled) {
            border: var(--border-width-s) solid var(--color-border-focus-secondary);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--color-border-focus);
        }
        &:disabled {
            opacity: 0.4;
            background-color: var(--color-bgcolor-neutral-tertiary);
        }
    }
</style>
