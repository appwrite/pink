<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import Icon from '$lib/Icon.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';
    import type { ComponentProps, ComponentType } from 'svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';
    import Stack from './layout/Stack.svelte';

    export let open = false;
    export let title: string;
    export let badge: string | null = null;
    export let badgeType: 'success' | 'warning' | 'error' | undefined = undefined;
    export let icon: ComponentType | null = null;
    export let disabled: boolean = false;
    export let selectable: boolean = false;
    export let hideDivider: boolean = false;
    export let checked: ComponentProps<Checkbox>['checked'] = false;
    export let type: 'primary' | 'secondary' = 'primary';
    export let buttonPadding = '--space-4';
    export let hasAvatarIcon = true;
    export let titleVariant: 'm-500' | 'm-400' | 'l-600' | 'l-500' | 'l-400' | 'm-600' | undefined =
        'm-500';
    export let titleColor = '--fgcolor-neutral-primary';

    // Allows user to open the accordion by pressing the enter key
    function clickOnEnter(
        event: KeyboardEvent & {
            currentTarget: EventTarget & HTMLElement;
        }
    ) {
        if (event.key === 'Enter' && event.currentTarget.contains(event.target as Node)) {
            event.preventDefault();
            open = !open;
        }
    }
</script>

<div style={`--accordion-button-padding: var(${buttonPadding})`}>
    <div
        class="details"
        class:open
        class:secondary={type === 'secondary'}
        aria-disabled={disabled}
        tabindex="0"
        role="button"
        on:keyup={clickOnEnter}
    >
        {#if selectable}
            <span class="checkbox">
                <Checkbox bind:checked size="s" on:change />
            </span>
        {/if}
        <button type="button" on:click={() => (open = !open)} {disabled}>
            {#if icon && hasAvatarIcon}
                <span class="avatar">
                    <Icon {icon} size="s" />
                </span>
            {:else if icon}
                <span class="no-avatar">
                    <Icon {icon} size="m" />
                </span>
            {/if}
            <summary>
                <Stack gap="s" direction="row" alignItems="center" inline>
                    <Text variant={titleVariant} color={titleColor}>
                        {title}
                    </Text>

                    {#if badge}
                        <Badge size="xs" variant="secondary" type={badgeType} content={badge} />
                    {/if}
                </Stack>
                <slot name="end" />
            </summary>

            <span class="chevron" data-open={open}>
                <Icon icon={IconChevronDown} />
            </span>
        </button>
        {#if open}
            <article transition:slide={{ duration: 200 }}>
                <Text variant="m-400">
                    <slot />
                </Text>
            </article>
        {/if}
    </div>
    {#if !hideDivider}
        <div class="divider"></div>
    {/if}
</div>

<style lang="scss">
    .details {
        position: relative;
        width: 100%;
        border-radius: var(--border-radius-s);
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto auto 1fr auto;
        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
        }

        &[aria-disabled='true'] {
            opacity: 0.5;
            pointer-events: none;
        }

        &:hover.secondary {
            background: var(--overlay-neutral-hover);
        }
        &.open.secondary {
            background: var(--overlay-neutral-hover);
        }

        .checkbox {
            display: grid;
            grid-column: 1 / 2;
            align-items: center;
            margin-inline-end: var(--gap-s);
            margin-inline-start: var(--space-4);
        }

        button {
            display: grid;
            grid-column: 2 / -1;
            grid-template-columns: subgrid;
            align-items: center;
            padding: var(--accordion-button-padding);
            cursor: pointer;

            .avatar {
                margin-inline-end: var(--gap-s);
                grid-column: 1 / 2;
                display: flex;
                width: 24px;
                height: 24px;
                padding: 4px;
                justify-content: center;
                align-items: center;
                border-radius: var(--border-radius-circle, 99999px);
                border: var(--border-width-s) solid var(--border-neutral-strong,);
                background: var(--bgcolor-neutral-secondary);
            }

            .no-avatar {
                margin-inline-end: var(--gap-s);
                display: flex;
            }
            summary {
                grid-column: 2 / 3;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--gap-s);
                padding-inline-end: var(--gap-s);
            }
            .chevron {
                grid-column: 3 / -1;
                margin-inline-start: auto;
                display: flex;
                align-items: center;
                transition: rotate 300ms ease-in-out;
                &[data-open='true'] {
                    rotate: 180deg;
                }
            }
        }
        article {
            margin-block-start: var(--space-2);
            display: grid;
            grid-column: 3 / -1;
            padding-block-end: var(--space-4);
            overflow: hidden;
        }
    }
    .divider {
        height: 1px;
        width: 100%;
        background: var(--border-neutral);
    }
</style>
