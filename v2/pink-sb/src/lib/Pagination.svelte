<script lang="ts">
    import { IconChevronLeft, IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Anchor from './button/Anchor.svelte';
    import Icon from './Icon.svelte';

    export let page;
    export let total;
    export let limit;
    export let siblings = 2;
    export let createLink: (page: number) => string = (page: number) => '#' + page;

    $: pages = Math.ceil(total / limit);
    $: hasPrevious = page > 1;
    $: hasNext = page < pages;
    $: firstPages = Array.from({ length: siblings }, (_, i) => i + 1);
    $: lastPages = Array.from({ length: siblings }, (_, i) => pages - i).reverse();
</script>

<nav>
    <Anchor
        variant="text"
        href={hasPrevious ? createLink(page - 1) : null}
        size="small"
        disabled={!hasPrevious}
    >
        <svelte:fragment slot="start">
            <Icon icon={IconChevronLeft} />
        </svelte:fragment>
        Previous
    </Anchor>
    {#each firstPages as link}
        <Anchor variant="text" href={createLink(link)} size="small">
            {link}
        </Anchor>
    {/each}
    {#each lastPages as link}
        <Anchor variant="text" href={createLink(link)} size="small">
            {link}
        </Anchor>
    {/each}
    <Anchor
        variant="text"
        href={hasNext ? createLink(page + 1) : null}
        size="small"
        disabled={!hasNext}
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
    }
</style>
