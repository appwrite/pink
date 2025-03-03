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
    <span class="icon">
        <Icon icon={resolveIcon(state)} size="s" />
    </span>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        align-items: flex-start;
        gap: var(--space-3);
        color: var(--fgcolor-neutral-secondary);

        &.success {
            color: var(--fgcolor-success);
        }
        &.warning {
            color: var(--fgcolor-warning);
        }
        &.error {
            color: var(--fgcolor-error);
        }

        .icon {
            display: flex;
            align-items: center;
            height: 1.4rem;
        }
    }
</style>
