<script lang="ts">
    import Root from '$lib/Root.svelte';
    import theme from '../../src/themes/light.json';
</script>

<Root {theme}>
    <slot />
</Root>
