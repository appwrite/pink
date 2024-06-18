<script lang="ts" context="module">
    export type Crumb = {
        title: string;
        href: string;
    };
</script>

<script lang="ts">
    import Link from './Link.svelte';

    export let crumbs: Crumb[];

    function is_not_last(index: number): boolean {
        return crumbs.length !== index + 1;
    }
</script>

<ol>
    {#each crumbs as crumb, i}
        <li>
            <Link type="quiet" href={crumb.href}>{crumb.title}</Link>
        </li>
        {#if is_not_last(i)}
            <li>/</li>
        {/if}
    {/each}
</ol>

<style lang="scss">
    ol {
        display: flex;
        align-items: center;
        gap: var(--space-5);
    }
</style>
