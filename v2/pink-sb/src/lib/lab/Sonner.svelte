<script lang="ts">
    import { Toaster, toast } from 'svelte-sonner';
    import { Button } from '$lib/button/index.js';
</script>

<Toaster />

<Button on:click={() => toast('Using sonner-svelte')}>Render toast</Button>
