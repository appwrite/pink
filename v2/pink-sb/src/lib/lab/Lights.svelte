<div class="lights-container right">
    <div class="stop-1 light"></div>
    <div class="stop-2 light"></div>
    <div class="stop-3 light"></div>
</div>

<style lang="scss">
    .lights-container {
        --bg: #f0dba5;
        --stop-1: #fd366e;
        --stop-2: #fe7a69;
        --stop-3: #fe9567;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: -2;
        height: 500px;
        width: 100%;
        max-width: 800px;
        top: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        position: absolute;

        .light {
            border-radius: 100px;
            filter: blur(60px);
            opacity: 0.25;
        }

        .stop-1 {
            background-color: var(--stop-1);
            position: absolute;
            top: 150px;
            left: 100px;
            height: 200px;
            width: 200px;

            animation: stop-1 8s infinite ease;
        }

        .stop-2 {
            background-color: var(--stop-2);
            position: absolute;
            top: 80px;
            right: 100px;
            height: 200px;
            width: 250px;

            animation: stop-2 8s infinite ease;
        }

        .stop-3 {
            background-color: var(--stop-3);
            position: absolute;
            right: 50px;
            top: 200px;
            height: 250px;
            width: 200px;

            animation: stop-3 8s infinite linear;
        }
        @keyframes stop-1 {
            0% {
                top: 200px;
                left: 100px;
                transform: scale(1);
            }
            30% {
                top: 250px;
                left: 150px;
                transform: scale(1.2);
            }
            60% {
                top: 125px;
                left: 200px;
                transform: scale(1.3);
            }
            100% {
                top: 200px;
                left: 150px;
                transform: scale(1);
            }
        }

        @keyframes stop-2 {
            0% {
                top: 80px;
                right: -20px;
                transform: scale(1.2);
            }
            30% {
                top: 300px;
                right: -20px;
                transform: scale(1);
            }
            60% {
                top: 200px;
                right: 100px;
                transform: scale(1);
            }
            100% {
                top: 80px;
                right: -20px;
                transform: scale(1.2);
            }
        }

        @keyframes stop-3 {
            0% {
                top: 250px;
                right: 0px;
                transform: scale(1);
            }
            30% {
                top: 150px;
                right: 150px;
                transform: scale(1.4);
            }
            60% {
                top: 250px;
                right: 80px;
                transform: scale(1);
            }
            100% {
                top: 250px;
                right: 0px;
                transform: scale(1);
            }
        }
    }
</style>
