<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    interface $$Props extends HTMLAttributes<HTMLHRElement> {
        dashed: boolean;
    }

    export let dashed: $$Props['dashed'] = false;
</script>

<hr class:dashed {...$$restProps} />

<style lang="scss">
    hr {
        height: 1px;
        background-image: linear-gradient(
            90deg,
            var(--color-border-neutral),
            var(--color-border-neutral)
        );

        &.dashed {
            background-image: linear-gradient(
                90deg,
                var(--color-border-neutral),
                var(--color-border-neutral) 50%,
                transparent 50%,
                transparent 100%
            );
            background-size: 8px 1px;
        }
    }
</style>
