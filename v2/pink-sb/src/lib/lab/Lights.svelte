<script lang="ts">
    export let colors: Array<string> = ['#fd366e', '#fe7a69', '#fe9567'];
    export let speed: number = 0.05;
    export let blur: number = 100;

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let container: HTMLDivElement;
    let dimensions: DOMRect;

    $: if (container) {
        dimensions = container.getBoundingClientRect();
    }

    let circleSize: number;
    $: if (dimensions) {
        circleSize = Math.max(dimensions.width, dimensions.height);
    }
</script>

<div class="lights" bind:this={container} {...$$restProps}>
    <div class="lights-container" style:filter={`blur(${blur}px)`}>
        {#each colors as color}
            <svg
                class="light"
                style:top={`${Math.random() * 50}%`}
                style:left={`${Math.random() * 50}%`}
                style:--background-gradient-speed={`${1 / speed}s`}
                style:--tx-1={Math.random() - 0.5}
                style:--ty-1={Math.random() - 0.5}
                style:--tx-2={Math.random() - 0.5}
                style:--ty-2={Math.random() - 0.5}
                style:--tx-3={Math.random() - 0.5}
                style:--ty-3={Math.random() - 0.5}
                style:--tx-4={Math.random() - 0.5}
                style:--ty-4={Math.random() - 0.5}
                width={circleSize * randomInt(0.5, 1.5)}
                height={circleSize * randomInt(0.5, 1.5)}
                viewBox="0 0 100 100"
                style:opacity="0.2"
            >
                <circle cx="50" cy="50" r="50" fill={color} />
            </svg>
        {/each}
    </div>
</div>

<style lang="scss">
    .lights {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: -1;
    }

    .lights-container {
        position: absolute;
        inset: 0;
    }

    .light {
        position: absolute;
        animation: background var(--background-gradient-speed, 15s)
            cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
    }

    @keyframes background {
        0%,
        100% {
            transform: translate(0, 0);
            animation-delay: var(--background-gradient-delay, 0s);
        }
        20% {
            transform: translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)));
        }
        40% {
            transform: translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)));
        }
        60% {
            transform: translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)));
        }
        80% {
            transform: translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)));
        }
    }
</style>
