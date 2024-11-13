<script lang="ts">
    import { Badge } from '$lib/index.ts';

    export let step: number;
    export let total: number;
    export let status: 'active' | 'done' | 'pending' | 'disabled' = 'pending';
    // export let title: string = '';
    // export let description: string = '';

    $: content =
        status === 'active'
            ? 'Now'
            : status === 'done'
              ? 'Done'
              : status === 'pending'
                ? 'Next'
                : status;
</script>

<div class="container">
    <div class="indicator" class:first={step === 1}>
        {#if status === 'pending' || status === 'done'}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
            >
                <ellipse cx="3" cy="3.51901" rx="3" ry="2.90085" fill="#EDEDF0" />
            </svg>
        {:else if status === 'active'}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
            >
                <g filter="url(#filter0_b_6595_16603)">
                    <ellipse
                        cx="8"
                        cy="8.64771"
                        rx="8"
                        ry="7.7356"
                        fill="#FD366E"
                        fill-opacity="0.08"
                    />
                    <path
                        d="M15.5 8.64771C15.5 12.6281 12.1581 15.8833 8 15.8833C3.84189 15.8833 0.5 12.6281 0.5 8.64771C0.5 4.6673 3.84189 1.41211 8 1.41211C12.1581 1.41211 15.5 4.6673 15.5 8.64771Z"
                        stroke="url(#paint0_linear_6595_16603)"
                        stroke-opacity="0.4"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_b_6595_16603"
                        x="-200"
                        y="-199.088"
                        width="416"
                        height="415.471"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="100" />
                        <feComposite
                            in2="SourceAlpha"
                            operator="in"
                            result="effect1_backgroundBlur_6595_16603"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_backgroundBlur_6595_16603"
                            result="shape"
                        />
                    </filter>
                    <linearGradient
                        id="paint0_linear_6595_16603"
                        x1="8"
                        y1="16.3833"
                        x2="8"
                        y2="-1.98874"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#FD366E" />
                        <stop offset="1" stop-color="#FD366E" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        {/if}

        {#if step !== total}
            <div class="line"></div>
        {/if}
    </div>
    <div class="content">
        <div>
            <Badge variant="secondary" size="xs" {content} />
        </div>

        <slot />
    </div>
</div>

<style lang="scss">
    .container {
        display: flex;
        width: 100%;
    }
    .indicator {
        // width: var(--icon-size-s, 16px);
        width: 14px;
        margin-inline-end: var(--space-8);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-block-start: calc(var(--font-size-xs) / 2);
        position: relative;
    }
    .line {
        // position: absolute;
        // outline: 1px solid red;
        width: 1px;
        height: 100%;
        background-color: var(--color-border-neutral);
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }
</style>
