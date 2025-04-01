<script lang="ts">
    import { IconChevronLeft, IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Icon from '$lib/Icon.svelte';
    import Link from './Link.svelte';
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';

    type BaseProps = {
        type: 'link' | 'button';
        page: number;
        total: number;
        limit: number;
        siblings: number;
    };
    type LinkProps = {
        type: 'link';
        createLink: (page: number) => string;
    };
    type ButtonProps = {
        type: 'button';
        createLink: never;
    };
    type $$Props = BaseProps & (LinkProps | ButtonProps);

    export let page: $$Props['page'];
    export let total: $$Props['total'];
    export let limit: $$Props['limit'];
    export let siblings: $$Props['siblings'] = 1;
    export let createLink: $$Props['createLink'];
    export let type: $$Props['type'] = 'link';

    $: totalPages = Math.ceil(total / limit);
    $: hasPrevious = page > 1;
    $: hasNext = page < totalPages;
    $: nextPage = page + 1;
    $: previousPage = page - 1;

    const dispatch = createEventDispatcher<{ page: number }>();

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
    {#if type === 'link'}
        <Link href={hasPrevious ? createLink(previousPage) : undefined} disabled={!hasPrevious}>
            <Icon icon={IconChevronLeft} slot="start" />
            Prev
        </Link>
        {#each createPages({ page, total, limit, siblings }) as value, i (i)}
            {#if value === '...'}
                <Link disabled isPage>...</Link>
            {:else}
                <Link selected={value === page} href={createLink(value)} isPage>
                    {value}
                </Link>
            {/if}
        {/each}
        <Link href={hasNext ? createLink(nextPage) : undefined} disabled={!hasNext}>
            <Icon icon={IconChevronRight} slot="end" />
            Next
        </Link>
    {:else}
        <Button on:click={() => dispatch('page', previousPage)} disabled={!hasPrevious}>
            <Icon icon={IconChevronLeft} slot="start" />
            Prev
        </Button>
        {#each createPages({ page, total, limit, siblings }) as value, i (i)}
            {#if value === '...'}
                <Button disabled isPage>...</Button>
            {:else}
                <Button selected={value === page} isPage on:click={() => dispatch('page', value)}>
                    {value}
                </Button>
            {/if}
        {/each}
        <Button on:click={() => dispatch('page', nextPage)} disabled={!hasNext}>
            <Icon icon={IconChevronRight} slot="end" />
            Next
        </Button>
    {/if}
</nav>

<style lang="scss">
    nav {
        display: flex;
        gap: var(--space-2);
    }
</style>
