<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLHRElement> &
        Partial<{
            dashed: boolean;
            vertical: boolean;
        }>;

    export let vertical: $$Props['vertical'] = false;
    export let dashed: $$Props['dashed'] = false;
</script>

<hr class:dashed class:vertical {...$$restProps} />

<style lang="scss">
    hr {
        min-width: 100%;
        height: 1px;
        background-image: linear-gradient(90deg, var(--border-neutral), var(--border-neutral));

        &.dashed {
            background-image: linear-gradient(
                90deg,
                var(--border-neutral),
                var(--border-neutral) 50%,
                transparent 50%,
                transparent 100%
            );
            background-size: 8px 1px;
        }

        &.vertical {
            display: inline-flex;
            max-width: 1px;
            min-width: 1px;
            height: 100%;

            &.dashed {
                background-image: linear-gradient(
                    0deg,
                    var(--border-neutral),
                    var(--border-neutral) 50%,
                    transparent 50%,
                    transparent 100%
                );
                background-size: 1px 8px;
            }
        }
    }
</style>
