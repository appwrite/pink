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
    // TODO: checkbox
</script>

<div>
    <button
        class="details"
        class:open
        class:nested={!!icon || selectable}
        {disabled}
        on:click={() => (open = !open)}
    >
        <summary>
            <div class="optional">
                {#if selectable}
                    <span>
                        <Checkbox
                            bind:checked
                            size="s"
                            on:click={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        />
                    </span>
                {/if}
                {#if icon}
                    <span class="avatar">
                        <Icon {icon} size="s" />
                    </span>
                {/if}
            </div>
            <div class="title">
                <Text variant="m-500" color="--color-fgcolor-neutral-primary">
                    {title}
                </Text>

                {#if badge}
                    <Badge size="xs" variant="secondary" content={badge} />
                {/if}
            </div>

            <span class="chevron" data-open={open}>
                <Icon icon={IconChevronDown} />
            </span>
        </summary>
        {#if open}
            <article transition:slide={{ duration: 200 }}>
                <Text variant="m-400">
                    <slot />
                </Text>
            </article>
        {/if}
    </button>
    <div class="divider"></div>
</div>

<style lang="scss">
    .details {
        position: relative;
        width: 100%;
        border-radius: var(--border-radius-s);
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto 1fr auto;
        padding: var(--space-4);
        &:hover {
            background: var(--color-overlay-neutral-hover);
        }
        &:focus-visible {
            outline: var(--border-width-xl) solid var(--color-border-focus);
        }
        &.open.nested {
            background: var(--color-overlay-neutral-hover);
        }

        &[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }
        summary {
            display: grid;
            grid-column: 1 / -1;
            grid-template-columns: subgrid;
            align-items: center;

            .optional {
                grid-column: 1 / 2;
                display: flex;
                align-items: center;
                & > * {
                    margin-inline-end: var(--space-4);
                }
                .avatar {
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
            }
            .title {
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
            grid-column: 2 / -1;
            grid-template-columns: subgrid;
            padding-block-start: var(--space-4);
        }
    }
    .divider {
        height: 1px;
        width: 100%;
        margin-block-start: var(--space-6);
        background: var(--color-border-neutral);
    }
</style>
