<script>
    /** @type {boolean} dashed */
    export let dashed = false;
</script>

<hr class:dashed />

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
