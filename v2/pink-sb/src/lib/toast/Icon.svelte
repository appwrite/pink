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
        background: var(--bgcolor-neutral-invert-weaker);
        color: var(--fgcolor-on-invert);
        flex-shrink: 0;

        &.success {
            background: var(--bgcolor-success);
            color: var(--fgcolor-on-success);
        }
        &.warning {
            background: var(--bgcolor-warning);
            color: var(--fgcolor-on-warning);
        }
        &.error {
            background: var(--bgcolor-error);
            color: var(--fgcolor-on-error);
        }
    }
</style>
