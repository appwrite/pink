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
    <Stack gap="s" direction="row">
        <span class="icon-holder" class:center-align={!$$slots.default}>
            <slot name="icon">
                <Icon icon={getIcon()} color="--alert-primary-color" />
            </slot>
        </span>

        <Stack>
            <Stack gap="s" direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack>
                    {#if title || $$slots.default}
                        <Stack gap="none">
                            {#if title}
                                <h5 style:color="var(--alert-primary-color)">{title}</h5>
                            {/if}
                            {#if $$slots.default}
                                <div>
                                    <slot />
                                </div>
                            {/if}
                        </Stack>
                    {/if}
                    {#if $$slots.actions}
                        <Stack direction="row">
                            <slot name="actions" />
                        </Stack>
                    {/if}
                </Stack>

                {#if dismissible}
                    <Button
                        icon
                        size="s"
                        variant="extra-compact"
                        on:click={() => dispatch('dismiss')}
                    >
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
        --alert-primary-color: var(--fgcolor-info);

        h5 {
            color: var(--fgcolor-neutral-primary);
            /* Desktop/Body M 500 */
            font-family: var(--font-family-sansserif), var(--sans-fallbacks);
            font-size: var(--font-size-s);
            font-style: normal;
            font-weight: 500;
            line-height: 140%; /* 19.6px */
            letter-spacing: -0.063px;
        }
        .icon-holder.center-align {
            display: flex;
            align-self: baseline;
        }
        &.success {
            border-color: var(--border-success-weak);
            background: var(--bgcolor-success-weaker);
            --alert-primary-color: var(--fgcolor-success);
        }
        &.warning {
            border-color: var(--border-warning-weak);
            background: var(--bgcolor-warning-weaker);
            --alert-primary-color: var(--fgcolor-warning);
        }
        &.error {
            border-color: var(--border-error-weak);
            background: var(--bgcolor-error-weaker);
            --alert-primary-color: var(--fgcolor-error);
        }
        .close {
            color: var(--fgcolor-neutral-tertiary);
            display: flex;
        }
    }
</style>
