<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Text from '$lib/typography/Text.svelte';
    import Image from './Image.svelte';

    export let type: 'primary' | 'secondary' = 'primary';
    export let title: string;
    export let description: string = '';
    export let src: string = '';
</script>

<div class="empty">
    {#if src}
        <div class="empty-image">
            <Image {src} alt="Empty State" height={184} />
        </div>
    {/if}
    <header>
        {#if type === 'primary'}
            <Title size="s" color="--fgcolor-neutral-primary" align="center">{title}</Title>
        {:else if type === 'secondary'}
            <Text variant="m-600" color="--fgcolor-neutral-primary" align="center">{title}</Text>
        {/if}
        <div class="description">
            <Text align="center"><slot name="description">{description}</slot></Text>
        </div>
    </header>
    {#if $$slots.actions}
        <footer>
            <slot name="actions" />
        </footer>
    {/if}
</div>

<style lang="scss">
    .empty {
        display: flex;
        padding: var(--space-10);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap-l);

        @container card (width < 400px) {
            --button-width: 100%;
            padding: var(--space-7);
        }

        &-image {
            width: 100%;
            @container card (width < 738px) {
                display: none;
            }
        }

        header,
        footer {
            width: 100%;
        }
        header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--gap-xs);

            .description {
                max-width: 400px;
            }
        }
        footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--gap-s);

            @container card (width < 400px) {
                flex-direction: column-reverse;
            }
        }
    }
</style>
