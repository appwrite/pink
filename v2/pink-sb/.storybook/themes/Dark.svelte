<script lang="ts">
    import Root from '$lib/Root.svelte';
    import theme from '../../src/themes/dark.json';
</script>

<Root {theme}>
    <slot />
</Root>
