<script lang="ts">
    import { createPagination } from '@melt-ui/svelte';
    import { IconChevronLeft, IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Anchor from './button/Anchor.svelte';
    import Icon from './Icon.svelte';

    export let page;
    export let total;
    export let limit;
    export let siblings = 1;
    export let createLink: (page: number) => string = (page: number) => '#' + page;

    // $: pages = Math.ceil(total / limit);
    // $: hasPrevious = page > 1;
    // $: hasNext = page < pages;
    // $: firstPages = Array.from({ length: siblings }, (_, i) => i + 1);
    // $: lastPages = Array.from({ length: siblings }, (_, i) => pages - i).reverse();

    const {
        elements: { root, prevButton, nextButton },
        states: { pages }
    } = createPagination({
        count: total,
        perPage: limit,
        defaultPage: page,
        siblingCount: siblings
    });
</script>

<nav {...$root} use:root>
    <Anchor
        variant="text"
        href={$prevButton.disabled ? undefined : createLink(page - 1)}
        size="s"
        disabled={$prevButton.disabled}
    >
        <svelte:fragment slot="start">
            <Icon icon={IconChevronLeft} />
        </svelte:fragment>
        Previous
    </Anchor>
    {#each $pages as page (page.key)}
        {#if page.type === 'ellipsis'}
            <Anchor variant="text" disabled size="s">...</Anchor>
        {:else}
            <Anchor variant="text" href={createLink(page.value)} size="s">
                {page.value}
            </Anchor>
        {/if}
    {/each}
    <Anchor
        variant="text"
        href={$nextButton.disabled ? undefined : createLink(page + 1)}
        size="s"
        disabled={$nextButton.disabled}
    >
        <svelte:fragment slot="end">
            <Icon icon={IconChevronRight} />
        </svelte:fragment>
        Next
    </Anchor>
</nav>

<style lang="scss">
    nav {
        display: flex;
        gap: var(--space-2);
    }
</style>
