<script lang="ts">
    import Button from '$lib/button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import {
        IconCheckCircle,
        IconExclamation,
        IconExclamationCircle,
        IconInfo,
        IconX
    } from '@appwrite.io/pink-icons-svelte';
    import { createEventDispatcher } from 'svelte';

    export let title = '';
    export let status: 'success' | 'info' | 'warning' | 'error' = 'info';
    export let dismissible = false;
    export let hideActions = false;

    const dispatch = createEventDispatcher();

    function getIcon() {
        switch (status) {
            case 'success':
                return IconCheckCircle;
            case 'info':
                return IconInfo;
            case 'warning':
                return IconExclamation;

            case 'error':
                return IconExclamationCircle;
        }
    }
</script>

<article
    class:info={status === 'info'}
    class:success={status === 'success'}
    class:warning={status === 'warning'}
    class:error={status === 'error'}
>
    <Stack gap="s" direction="row">
        <span class="primary-color">
            <Icon icon={getIcon()} />
        </span>
        <Stack>
            <Stack gap="s" direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack>
                    <div>
                        {#if title}
                            <h5 class="primary-color">{title}</h5>
                        {/if}
                        <slot />
                    </div>
                    {#if !hideActions}
                        <Stack direction="row">
                            <slot name="actions" />
                        </Stack>
                    {/if}
                </Stack>
                {#if dismissible}
                    <Button icon variant="text" size="s" on:click={() => dispatch('dismiss')}>
                        <span class="close">
                            <Icon icon={IconX} color="--color-fgcolor-neutral-tertiary" />
                        </span>
                    </Button>
                {/if}
            </Stack>
        </Stack>
    </Stack>
</article>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    article {
        @include transitions.common;

        padding: var(--space-7);
        border-radius: var(--border-radius-s);
        border: var(--border-width-s) solid var(--color-border-neutral-strong);
        background: var(--color-bgcolor-neutral-default);

        h5 {
            color: var(--color-fgcolor-neutral-primary);
            /* Desktop/Body M 500 */
            font-family: var(--font-family-sansserif);
            font-size: var(--font-size-s);
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 19.6px */
            letter-spacing: -0.063px;
        }
        &.success {
            border-color: var(--color-border-success-weak);
            background: var(--color-bgcolor-success-weaker);
            .primary-color {
                color: var(--color-fgcolor-success);
            }
        }
        &.warning {
            border-color: var(--color-border-warning-weak);
            background: var(--color-bgcolor-warning-weaker);
            .primary-color {
                color: var(--color-fgcolor-warning);
            }
        }
        &.error {
            border-color: var(--color-border-error-weak);
            background: var(--color-bgcolor-error-weaker);
            .primary-color {
                color: var(--color-fgcolor-error);
            }
        }
        .close {
            color: var(--color-fgcolor-neutral-tertiary);
            display: flex;
        }
    }
</style>
