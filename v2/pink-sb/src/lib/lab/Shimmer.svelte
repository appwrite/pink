<script lang="ts">
    import { afterUpdate } from 'svelte';

    export let spread: number = 2;
    export let duration: number = 2;

    let el: HTMLElement;
    let textLength = 0;
    let dynamicSpread = 0;

    afterUpdate(() => {
        if (el) {
            textLength = el.innerText.length;
            dynamicSpread = textLength * spread;
        }
    });
</script>

<span
    class="message"
    bind:this={el}
    style:--spread="{dynamicSpread}px"
    style:--duration="{duration}s"
>
    <slot />
</span>

<style lang="scss">
    .message {
        --pink-base-color: var(--color-fgcolor-neutral-tertiary);
        --pink-base-gradient-color: var(--color-fgcolor-neutral-primary);
        --pink-base-font-family: var(--font-family-monospace);

        --gradient: linear-gradient(
            90deg,
            #0000 calc(50% - var(--spread)),
            var(--base-gradient-color, var(--pink-base-gradient-color)),
            #0000 calc(50% + var(--spread))
        );

        font-family: var(--font-family, var(--font-family-monospace));
        display: inline-block;
        position: relative;
        background: var(--gradient),
            linear-gradient(
                var(--base-color, var(--pink-base-color)),
                var(--base-color, var(--pink-base-color))
            );
        background-clip: text;
        background-size:
            250% 150%,
            auto;
        animation: loader var(--duration) linear infinite;
        color: transparent;
    }

    @keyframes loader {
        from {
            background-position: 100% center;
        }
        to {
            background-position: 0% center;
        }
    }
</style>
