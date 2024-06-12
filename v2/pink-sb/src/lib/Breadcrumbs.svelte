<script>
    import Link from './Link.svelte';

    /**
     * @typedef {Object} Crumb
     * @property {string} title
     * @property {string} href
     */
    /**
     * @type {Crumb[]} crumbs
     */
    export let crumbs;

    /**
     * @param {number} index
     * @returns {boolean}
     */
    function is_not_last(index) {
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

        li {
        }
    }
</style>
