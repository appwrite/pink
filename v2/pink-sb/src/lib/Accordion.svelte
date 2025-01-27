<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import Icon from '$lib/Icon.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';
    import type { ComponentType } from 'svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    export let open = false;
    export let title: string;
    export let disabled = false;
    export let badge = '';
    export let icon: ComponentType | null = null;
    export let selectable = false;
    export let checked = false;
    export let hideDivider = false;

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

<div>
    <div
        class="details"
        class:open
        class:nested={!!icon || selectable}
        aria-disabled={disabled}
        tabindex="0"
        role="button"
        on:keyup={clickOnEnter}
    >
        {#if selectable}
            <span class="checkbox">
                <Checkbox bind:checked size="s" />
            </span>
        {/if}
        <button on:click={() => (open = !open)} {disabled}>
            {#if icon}
                <span class="avatar">
                    <Icon {icon} size="s" />
                </span>
            {/if}
            <summary>
                <Text variant="m-500" color="--color-fgcolor-neutral-primary">
                    {title}
                </Text>

                {#if badge}
                    <Badge size="xs" variant="secondary" content={badge} />
                {/if}
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
        &:hover {
            background: var(--color-overlay-neutral-hover);
        }
        &:focus-visible {
            outline: var(--border-width-xl) solid var(--color-border-focus);
        }
        &.open.nested {
            background: var(--color-overlay-neutral-hover);
        }
        &[aria-disabled='true'] {
            opacity: 0.5;
            pointer-events: none;
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
            padding: var(--space-4);
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
                border: var(--border-width-s) solid var(--color-border-neutral-strong,);
                background: var(--color-bgcolor-neutral-secondary);
            }
            summary {
                grid-column: 2 / 3;
                display: flex;
                align-items: center;
                gap: var(--gap-s);
            }
            .chevron {
                grid-column: 3 / 4;
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
            display: grid;
            grid-column: 3 / -1;
            grid-template-columns: subgrid;
            padding-block-end: var(--space-4);
            overflow: hidden;
        }
    }
    .divider {
        height: 1px;
        width: 100%;
        margin-block-start: var(--space-6);
        background: var(--color-border-neutral);
    }
</style>
