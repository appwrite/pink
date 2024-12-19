<div class="lights">
    <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
    <slot />
</div>

<style lang="scss">
    .lights {
        --background-color: hsla(0, 0%, 0%, 1);
        --gaps: repeating-linear-gradient(
            110deg,
            var(--background-color) 0%,
            var(--background-color) 7%,
            transparent 10%,
            transparent 12%,
            var(--background-color) 19%
        );
        --lights: radial-gradient(circle at center, #ff9595 0%, #ffa670 100%);

        filter: url(#goo) blur(40px);
        width: 100%;
        height: 100%;

        z-index: -2;
        margin: 0 auto;
        width: 75%;
        height: 250px;
        filter: blur(20px);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        svg {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
        }

        &::before {
            content: '';

            position: absolute;
            width: 509.18px;
            height: 132.5px;

            background-size: 200%;
            background-image: linear-gradient(180deg, #fd366e 0%, #fe7a69 71.41%, #fe9567 100%),
                linear-gradient(180deg, #fd366e 0%, #fe7a69 71.41%, #fe9567 100%);
            opacity: 0.2;
            filter: blur(20px);
            transform: matrix(1, 0.01, -0.09, 1, 0, 0);
            animation: lights-before-rotation 20s infinite linear;
        }

        &::after {
            content: '';
            position: absolute;
            width: 138.64px;
            height: 194.98px;
            z-index: -10;

            background-image: linear-gradient(180deg, #fd366e 0%, #fe9567 100%),
                linear-gradient(180deg, #fd366e 0%, #fe9567 100%);
            background-size: 200%;
            opacity: 0.2;
            filter: blur(20px);
            animation: lights-before-rotation 10s infinite linear;
        }
    }

    @keyframes lights-before-rotation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
</style>
