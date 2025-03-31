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
    <Stack
        gap="s"
        direction="row"
        alignItems={[$$slots?.default, $$slots?.actions, title].filter(Boolean)?.length > 1
            ? 'flex-start'
            : 'center'}
    >
        <span class="primary-color">
            <Icon icon={getIcon()} />
        </span>
        <Stack>
            <Stack
                gap="s"
                direction="row"
                justifyContent="space-between"
                alignItems={[$$slots?.default, $$slots?.actions, title].filter(Boolean)?.length > 1
                    ? 'flex-start'
                    : 'center'}
            >
                <Stack gap="s">
                    <div>
                        {#if title}
                            <h5 class="primary-color">{title}</h5>
                        {/if}
                        <slot />
                    </div>
                    {#if $$slots.actions}
                        <Stack direction="row">
                            <slot name="actions" />
                        </Stack>
                    {/if}
                </Stack>
                {#if dismissible}
                    <Button icon variant="text" size="s" on:click={() => dispatch('dismiss')}>
                        <span class="close">
                            <Icon icon={IconX} color="--fgcolor-neutral-tertiary" />
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
        border: var(--border-width-s) solid var(--border-neutral-strong);
        background: var(--bgcolor-neutral-default);

        h5 {
            color: var(--fgcolor-neutral-primary);
            /* Desktop/Body M 500 */
            font-family: var(--font-family-sansserif);
            font-size: var(--font-size-s);
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 19.6px */
            letter-spacing: -0.063px;
        }
        &.success {
            border-color: var(--border-success-weak);
            background: var(--bgcolor-success-weaker);
            .primary-color {
                color: var(--fgcolor-success);
            }
        }
        &.warning {
            border-color: var(--border-warning-weak);
            background: var(--bgcolor-warning-weaker);
            .primary-color {
                color: var(--fgcolor-warning);
            }
        }
        &.error {
            border-color: var(--border-error-weak);
            background: var(--bgcolor-error-weaker);
            .primary-color {
                color: var(--fgcolor-error);
            }
        }
        .close {
            color: var(--fgcolor-neutral-tertiary);
            display: flex;
        }
    }
</style>
