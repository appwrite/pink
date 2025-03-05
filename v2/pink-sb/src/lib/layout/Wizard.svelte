<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Button from '$lib/button/Button.svelte';
    import LinkButton from '$lib/button/Anchor.svelte';

    export let title = '';
    export let buttonMethod = () => {};
    export let href = '';
    export let invertColumns = false;
    export let hideFooter = false;
    export let column = false;
    export let columnSize: 's' | 'm' | 'l' = 'm';
    export let variant: 'primary' | 'secondary' = 'primary';

    let scrollY: number;
</script>

<svelte:window bind:scrollY />

<section class="wizard">
    <div
        class="wizard-container"
        class:single={column}
        class:single--s={columnSize === 's'}
        class:single--l={columnSize === 'l'}
        class:hide-footer={hideFooter}
    >
        <div>
            <header class:hasScroll={scrollY > 0}>
                <Stack
                    gap="xl"
                    justifyContent={title ? 'space-between' : 'flex-end'}
                    direction="row"
                    alignItems="center"
                >
                    {#if title}
                        <h1>
                            {title}
                        </h1>
                    {/if}
                    {#if href}
                        <LinkButton icon variant="secondary" size="s" {href}>
                            <Icon icon={IconX} />
                        </LinkButton>
                    {:else}
                        <Button icon variant="secondary" size="s" on:click={buttonMethod}>
                            <Icon icon={IconX} />
                        </Button>
                    {/if}
                </Stack>
            </header>
            {#if column}
                <main>
                    <slot />
                </main>
            {:else}
                <div class="wizard-content" class:invert-columns={invertColumns}>
                    <main>
                        <slot />
                    </main>
                    <aside>
                        <slot name="aside" />
                    </aside>
                </div>
            {/if}
        </div>
        {#if !hideFooter && $$slots.footer}
            <footer>
                <slot name="footer" />
            </footer>
        {/if}
    </div>
</section>

<style lang="scss">
    .wizard {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-block-size: 100dvh;
        padding-inline: var(--space-11);
        background-color: var(--bgcolor-neutral-primary);

        @media (max-width: 1024px) {
            padding-inline: var(--space-10);
        }

        @media (max-width: 360px) {
            padding-inline: var(--space-7);
        }

        &-container {
            max-inline-size: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--space-7);
            justify-content: space-between;
            @media (max-width: 1280px) {
                max-inline-size: 1040px;
            }

            &.single {
                max-inline-size: 1040px;
                &--s {
                    max-inline-size: 794px;
                }
                &--l {
                    max-inline-size: 1200px;
                }
            }

            &.hide-footer {
                padding-block-end: var(--space-10);
            }
        }

        &-content {
            display: flex;
            gap: var(--space-11);
            &.invert-columns {
                flex-direction: row-reverse;
                @media (max-width: 1024px) {
                    flex-direction: column-reverse;
                }
            }
            @media (max-width: 1024px) {
                flex-direction: column;
                gap: var(--space-10);
            }

            main {
                width: 100%;
                max-width: 795px;
            }
            aside {
                width: 100%;

                max-width: 365px;
            }
            @media (max-width: 1280px) {
                main {
                    max-width: 688px;
                }
                aside {
                    max-width: 312px;
                }
            }
            @media (max-width: 1024px) {
                main {
                    max-width: 100%;
                }
                aside {
                    max-width: 100%;
                }
            }
        }

        header {
            position: sticky;
            z-index: 1;
            inset-block-start: 0;
            display: flex;
            flex-direction: column;
            gap: var(--space-7);
            padding-block-end: var(--base-28);
            padding-block-start: var(--space-12);
            margin-block-end: var(--base-4);
            background-color: var(--bgcolor-neutral-primary);
            &.hasScroll {
                border-block-end: 1px solid var(--border-neutral);
            }
            @media (max-width: 768px) {
                padding-block-start: var(--space-10);
            }

            h1 {
                color: var(--fgcolor-neutral-primary);

                /* Desktop/Title XL */
                font-family: var(--font-family-brand, 'Aeonik Pro');
                font-size: var(--font-size-xxl);
                font-style: normal;
                font-weight: 400;
                line-height: 140%; /* 44.8px */
                letter-spacing: -0.144px;
            }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: var(--gap-m);
            justify-content: flex-end;
            padding-block: var(--space-7);
            border-block-start: 1px solid var(--border-neutral);
            background-color: var(--bgcolor-neutral-primary);
            z-index: 1;
        }
    }
</style>
