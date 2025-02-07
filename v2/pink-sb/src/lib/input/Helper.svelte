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
    <span>
        <Icon icon={resolveIcon(state)} size="s" />
    </span>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        align-items: start;
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

        & span :global(i) {
            // text's line-height: 140%; /* 19.6px */
            --p-icon-size: 19.6px !important;
        }
    }
</style>
