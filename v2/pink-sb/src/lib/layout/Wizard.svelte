<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Button from '$lib/button/Button.svelte';
    import LinkButton from '$lib/button/Anchor.svelte';

    export let title = '';
    export let buttonMethod = () => {};
    export let href = '';
    export let invertColumns = false;
    export let hideAside = false;
    export let hideFooter = false;

    let scrollY: number;
</script>

<svelte:window bind:scrollY />

<section class="wizard">
    <div class="wizard-container">
        <div>
            <header class:hasScroll={scrollY > 0}>
                <Stack
                    gap="xl"
                    justifyContent={title ? 'space-between' : 'flex-end'}
                    direction="row"
                    alignItems="center"
                >
                    {#if title}
                        <Title size="l" color="--color-fgcolor-neutral-primary">{title}</Title>
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
            <div class="wizard-content" class:invert-columns={invertColumns}>
                <main>
                    <slot />
                </main>
                {#if !hideAside}
                    <aside>
                        <slot name="aside" />
                    </aside>
                {/if}
            </div>
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
        padding-inline: var(--space-10);
        background-color: var(--color-bgcolor-neutral-primary);

        &-container {
            max-inline-size: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;
        }

        &-content {
            display: flex;
            gap: 2rem;

            @media (max-width: 1127.99px) {
                flex-direction: column;
            }

            main {
                flex: 2.25;
            }
            aside {
                flex: 1;
            }

            &.invert-columns {
                flex-direction: row-reverse;
            }
        }

        header {
            margin-block-end: 2rem;
            position: sticky;
            z-index: 1;
            inset-block-start: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-block-start: 3rem;
            padding-block-end: 1rem;
            background-color: var(--color-bgcolor-neutral-primary);
            &.hasScroll {
                border-block-end: 1px solid var(--color-border-neutral);
            }

            // @media (min-width: 768px) {
            //     border: var(--border-width-s, 1px) solid var(--color-border-neutral);
            // }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: var(--gap-m);
            justify-content: flex-end;
            padding-block: 1rem;
            border-block-start: 1px solid var(--color-border-neutral);
            background-color: var(--color-bgcolor-neutral-primary);
            @media (max-width: 767.99px) {
                flex-direction: column-reverse;
            }
        }
    }
</style>
