<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';

    export let status: 'waiting' | 'ready' | 'processing' | 'pending' | 'failed' | 'complete';
    export let label: string;
</script>

<Stack gap="s" direction="row" alignItems="baseline">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle
            cx="6"
            cy="6"
            r="6"
            class:status-waiting={status === 'waiting'}
            class:status-ready={status === 'ready'}
            class:status-processing={status === 'processing'}
            class:status-pending={status === 'pending'}
            class:status-failed={status === 'failed'}
            class:status-complete={status === 'complete'}
        />
    </svg>
    <span>{label}</span>
</Stack>

<style lang="scss">
    circle.status- {
        &waiting {
            stroke-width: 1.2px;
            stroke: var(--color-border-neutral);
        }
        &ready {
            fill: var(--color-bgcolor-neutral-invert-weak);
        }
        &processing {
            fill: var(--color-bgcolor-neutral-invert-weaker);
        }
        &pending {
            fill: var(--color-bgcolor-warning);
        }
        &failed {
            fill: var(--color-bgcolor-error);
        }
        &complete {
            fill: var(--color-bgcolor-success);
        }
    }
    span {
        color: var(--color-fgcolor-neutral-primary);
        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-s);
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: -0.063px;
    }
</style>
