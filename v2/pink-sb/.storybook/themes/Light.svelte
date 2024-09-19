<script lang="ts">
    import 'the-new-css-reset/css/reset.css';
    import Root from '$lib/Root.svelte';
    import theme from '../../src/themes/light.json';
</script>

<Root {theme}>
    <slot />
</Root>
