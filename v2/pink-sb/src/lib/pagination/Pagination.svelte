<script lang="ts">
    import { IconChevronLeft, IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Anchor from '$lib/button/Anchor.svelte';
    import Icon from '$lib/Icon.svelte';
    import Page from './Page.svelte';

    export let page: number;
    export let total: number;
    export let limit: number;
    export let siblings: number = 1;
    export let createLink: (page: number) => string = (page: number) => '#' + page;

    $: totalPages = Math.ceil(total / limit);
    $: hasPrevious = page > 1;
    $: hasNext = page < totalPages;

    function createPages(args: {
        page: number;
        total: number;
        limit: number;
        siblings: number;
    }): (number | '...')[] {
        const totalPages = Math.ceil(args.total / args.limit);
        const firstPages = Array.from(
            { length: Math.min(args.siblings, totalPages) },
            (_, i) => i + 1
        );
        const lastPages = Array.from(
            { length: Math.min(args.siblings, totalPages - firstPages.length) },
            (_, i) => totalPages - i
        ).reverse();

        let middlePages: (number | '...')[] = [];
        if (args.page > args.siblings + 2) {
            middlePages.push('...');
        }

        // Add pages around current page
        for (
            let i = Math.max(args.siblings + 1, args.page - args.siblings);
            i <= Math.min(totalPages - args.siblings, args.page + args.siblings);
            i++
        ) {
            if (!firstPages.includes(i) && !lastPages.includes(i)) {
                middlePages.push(i);
            }
        }

        if (args.page < totalPages - args.siblings - 1) {
            middlePages.push('...');
        }

        return [...firstPages, ...middlePages, ...lastPages];
    }
</script>

<nav>
    <Anchor
        variant="text"
        href={hasPrevious ? createLink(page - 1) : undefined}
        size="s"
        disabled={!hasPrevious}
    >
        <Icon icon={IconChevronLeft} slot="start" />
        Prev
    </Anchor>
    {#each createPages({ page, total, limit, siblings }) as value, i (i)}
        {#if value === '...'}
            <Page disabled>...</Page>
        {:else}
            <Page selected={value === page} href={createLink(value)}>
                {value}
            </Page>
        {/if}
    {/each}
    <Anchor
        variant="text"
        href={hasNext ? createLink(page + 1) : undefined}
        size="s"
        disabled={!hasNext}
    >
        <Icon icon={IconChevronRight} slot="end" />
        Next
    </Anchor>
</nav>

<style lang="scss">
    nav {
        display: flex;
        gap: var(--space-2);
    }
</style>
