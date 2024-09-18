<script lang="ts">
    import {
        IconInfo,
        IconCheckCircle,
        IconExclamation,
        IconExclamationCircle
    } from '@appwrite.io/pink-icons-svelte';
    import type { ToastStatus } from './index.js';
    import { Icon } from '$lib/index.js';

    export let status: ToastStatus;
</script>

<div
    class:success={status === 'success'}
    class:warning={status === 'warning'}
    class:error={status === 'error'}
>
    <Icon
        icon={status === 'success'
            ? IconCheckCircle
            : status === 'warning'
              ? IconExclamation
              : status === 'error'
                ? IconExclamationCircle
                : IconInfo}
    />
</div>

<style lang="scss">
    div {
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-invert-weaker);
        color: var(--color-fgcolor-on-invert);
        flex-shrink: 0;

        &.success {
            background: var(--color-bgcolor-success);
        }
        &.warning {
            background: var(--color-bgcolor-warning);
        }
        &.error {
            background: var(--color-bgcolor-error);
        }
    }
</style>
