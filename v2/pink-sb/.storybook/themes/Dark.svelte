<script lang="ts">
    import 'the-new-css-reset/css/reset.css';
    import Root from '$lib/Root.svelte';
    import theme from '../../src/themes/dark.json';
</script>

<Root {theme}>
    <slot />
</Root>
