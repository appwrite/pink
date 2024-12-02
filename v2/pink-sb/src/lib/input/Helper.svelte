<script lang="ts">
    import {
        IconInfo,
        IconCheckCircle,
        IconExclamation,
        IconExclamationCircle
    } from '@appwrite.io/pink-icons-svelte';
    import type { States } from './types.js';
    import Icon from '$lib/Icon.svelte';

    export let state: States;

    function resolveIcon(state: States) {
        switch (state) {
            case 'success':
                return IconCheckCircle;
            case 'warning':
                return IconExclamation;
            case 'error':
                return IconExclamationCircle;
            default:
                return IconInfo;
        }
    }
</script>

<div
    class:success={state === 'success'}
    class:warning={state === 'warning'}
    class:error={state === 'error'}
>
    <Icon icon={resolveIcon(state)} size="s" />
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--color-fgcolor-neutral-secondary);

        &.success {
            color: var(--color-fgcolor-success);
        }
        &.warning {
            color: var(--color-fgcolor-warning);
        }
        &.error {
            color: var(--color-fgcolor-error);
        }
    }
</style>
