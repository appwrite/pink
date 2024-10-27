<script lang="ts">
    import Code from './typography/Code.svelte';

    export let code: string;
    export let size: 's' | 'medium' = 'medium';
</script>

<pre class="inline-code">
<Code {size}>{code?.trim()}</Code>
</pre>

<style>
    .inline-code {
        padding: var(--space-0) var(--space-2);
        border-radius: var(--border-radius-xxs);
        background: var(--color-overlay-on-neutral);
        display: inline-flex;
    }
</style>
