<div class="lights">
    <div class="border">
        <slot />
    </div>
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

        &::before,
        &::after {
            animation: lights-unblur 20s infinite linear;
        }

        &::before {
            content: '';

            position: absolute;
            width: 509.18px;
            height: 132.5px;

            background-size: 200% 100%;
            background-image: linear-gradient(180deg, #fd366e 0%, #fe7a69 71.41%, #fe9567 100%);
            opacity: 0.24;
            filter: blur(20px);
            transform: matrix(1, 0.01, -0.09, 1, 0, 0);
            animation:
                lights-before-rotation 20s infinite linear,
                lights-unblur 5s infinite linear;
        }

        &::after {
            content: '';
            position: absolute;
            width: 138.64px;
            height: 194.98px;
            z-index: -10;

            background-image: linear-gradient(180deg, #fd366e 0%, #fe9567 100%);
            opacity: 0.4;
            filter: blur(20px);
            transform: matrix(0.71, 0.7, -0.99, 0.1, 0, 0);
        }

        // .border {
        //     &::before {
        //         content: '';
        //         position: absolute;
        //         inset: 0;
        //         border-radius: 12px;
        //         border: 1px solid #0000;
        //         background: #0000;
        //         -webkit-mask:
        //             linear-gradient(#fff 0 0) padding-box,
        //             linear-gradient(#fff 0 0);
        //         mask:
        //             linear-gradient(#fff 0 0) padding-box,
        //             linear-gradient(#fff 0 0);
        //         mask-composite: exclude;
        //         backdrop-filter: blur(20px) brightness(1) saturate(12.5);
        //         opacity: 0.8;
        //     }
        // }

        filter: blur(20px);
        position: absolute;
        inset: 0;
    }

    @keyframes lights-before-rotation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    @keyframes lights-unblur {
        0% {
            filter: blur(60px);
        }
        100% {
            filter: blur(20px);
        }
    }
</style>
