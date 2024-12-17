<script lang="ts">
    import { afterUpdate } from 'svelte';

    export let spread: number = 2;

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

<span class="message" bind:this={el} style:--spread="{dynamicSpread}px">
    <slot />
</span>

<style lang="scss">
    .message {
        --pink-base-color: var(--color-fgcolor-neutral-tertiary);
        --pink-base-gradient-color: var(--color-fgcolor-neutral-primary);

        --gradient: linear-gradient(
            90deg,
            #0000 calc(50% - var(--spread)),
            var(--base-gradient-color, var(--pink-base-gradient-color)),
            #0000 calc(50% + var(--spread))
        );

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
        animation: loader 1.5s linear infinite;
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
