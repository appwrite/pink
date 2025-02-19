<script lang="ts">
    import Done from './done.svg';
    import { Badge, Layout } from '$lib/index.js';
    import StepIndicator from '$lib/step/StepIndicator.svelte';
    export let state: 'previous' | 'current' | 'next';
    export let noLine: boolean = false;
    export let shortLine: boolean = false;
    export let hideBadge: boolean = false;
    export let hideActiveTopLine: boolean = false;
    export let hideActiveBottomLine: boolean = false;
</script>

<Layout.Stack direction="row" gap="xl"
    ><div class="indicator-container">
        <Layout.Stack
            direction="column"
            gap="none"
            justifyContent="space-between"
            alignItems="center"
        >
            <StepIndicator variant={state === 'current' ? 'active' : 'idle'} />
            {#if !noLine}
                <div class="indicator-line" />
                {#if state === 'current'}
                    {#if !hideActiveTopLine}<div
                            class="indicator-line-active-top"
                            class:shortline={shortLine}
                        />{/if}
                    {#if !hideActiveBottomLine}<div
                            class="indicator-line-active-bottom"
                            class:shortline={shortLine}
                        />{/if}
                {/if}
            {/if}
        </Layout.Stack>
    </div>
    <div class="content">
        {#if hideBadge}
            <slot />
        {:else}
            <Layout.Stack direction="column" gap="s" alignItems="flex-start">
                <div class="badge" class:active-badge={state === 'current'}>
                    <Badge
                        variant="secondary"
                        content={state === 'next' ? 'Next' : state === 'current' ? 'Now' : `Done`}
                    >
                        <div slot="start">
                            {#if state === 'previous'}<img src={Done} alt="" />{/if}
                        </div>
                    </Badge>
                </div>
                <slot />
            </Layout.Stack>
        {/if}
    </div>
</Layout.Stack>

<style lang="scss">
    .indicator-container {
        min-width: var(--base-16, 16px);
    }
    :global(.indicator-container > div) {
        height: 100%;
    }
    .indicator-line {
        background-color: var(--color-bgcolor-neutral-tertiary, #ededf0);
        width: 1px;
        flex-grow: 1;
    }
    .content {
        width: 100%;
        padding-bottom: var(--base-48, 48px);
    }

    .indicator-line-active-top {
        width: 1px;
        background: linear-gradient(to top, #fd366e 0%, rgba(253, 54, 110, 0) 100%);
        height: 100px;
        position: absolute;
        margin-block-start: calc(-1 * (var(--base-96, 96px) + var(--base-2, 2px)));
    }
    .indicator-line-active-bottom {
        width: 1px;
        background: linear-gradient(to bottom, #fd366e 0%, rgba(253, 54, 110, 0) 100%);
        height: 100px;
        position: absolute;
        margin-block-start: var(--base-16, 16px);
    }
    .shortline {
        height: 40px;
    }
    .indicator-line-active-top.shortline {
        margin-block-start: calc(-1 * (var(--base-40, 40px) - var(--base-1, 1px)));
    }
    :global(.badge img) {
        width: 20px;
        height: 20px;
        display: flex;
        margin-inline-end: var(--gap-xxs, 4px);
    }
    .badge {
        margin-block-start: calc(-1 * var(--base-10, 10px));
    }
    .active-badge {
        margin-block-start: calc(-1 * var(--base-6, 6px));
    }
</style>
