<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import Icon from '$lib/Icon.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';
    import type { ComponentType } from 'svelte';

    export let open = false;
    export let title: string;
    export let disabled = false;
    export let badge = '';
    export let icon: ComponentType | null = null;

    // TODO: checkbox
</script>

<div>
    <details class:open class:nested={!!icon} aria-disabled={disabled} bind:open>
        <summary>
            <div>
                {#if icon}
                    <div class="accordion-icon">
                        <Icon {icon} size="s" />
                    </div>
                {/if}
                <Text variant="m-500" color="--color-fgcolor-neutral-primary">
                    {title}
                </Text>

                {#if badge}
                    <Badge size="xs" variant="secondary" content={badge} />
                {/if}
            </div>

            <span data-open={open}>
                <Icon icon={IconChevronDown} />
            </span>
        </summary>
        {#if open}
            <article transition:slide={{ duration: 300 }} class:parentHasIcon={!!icon}>
                <Text variant="m-400">
                    <slot />
                </Text>
            </article>
        {/if}
    </details>
    <div class="divider"></div>
</div>

<style lang="scss">
    details {
        list-style-type: none;
        position: relative;
        border-radius: var(--border-radius-s);

        &:hover {
            background: var(--color-overlay-neutral-hover);
        }
        &:focus {
            outline: var(--border-width-xl) solid var(--color-border-focus);
        }
        &.open.nested {
            background: var(--color-overlay-neutral-hover);
        }

        &[aria-disabled='true'] {
            opacity: 0.5;
            pointer-events: none;
        }
        summary {
            padding: var(--space-4);

            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                display: flex;
                align-items: center;
                gap: var(--gap-s);
                .accordion-icon {
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
            span {
                display: flex;
                align-items: center;
                transition: rotate 300ms ease-in-out;
                &[data-open='true'] {
                    rotate: 180deg;
                }
            }
        }
        article {
            padding: var(--space-4);
            padding-block-start: 0;
            &.parentHasIcon {
                padding-inline-start: calc(var(--base-24) + var(--gap-s) + var(--gap-s));
            }
        }
    }
    .divider {
        height: 1px;
        width: 100%;
        margin-block-start: var(--space-6);
        background: var(--color-border-neutral);
    }
</style>
