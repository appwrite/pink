<script lang="ts">
    import ActiveIndicator from './active-indicator.svg';
    import Done from './done.svg';
    export let state: 'previous' | 'current' | 'next';
    export let noLine: boolean = false;
    export let shortLine: boolean = false;
</script>

<div class="stepitem" class:noline={noLine} class:shortline={shortLine}>
    {#if state === 'previous' || state === 'next'}
        <div class="dot-inactive" />
    {:else if state === 'current'}
        <div class="dot-active">
            <img src={ActiveIndicator} alt="Active" />
        </div>
    {/if}
    <div class="badge">
        {#if state === 'next'}
            Next
        {:else if state === 'current'}
            Now
        {:else}
            <img src={Done} alt="Done icon" /> <span>Done</span>
        {/if}
    </div>
    <div class="step-content">
        <slot />
    </div>
</div>

<style lang="scss">
    .stepitem {
        padding: 24px 29px;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            background-color: var(--color-light-neutral-10, #ededf0);
            width: 1px;
            height: 100%;
            margin-left: -30px;
            z-index: -2;
        }
    }

    .stepitem.noline::before {
        display: none;
    }

    .stepitem.shortline::before {
        height: calc(100% - 50px);
    }

    .dot-inactive {
        width: 7px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: var(--color-light-neutral-10, #ededf0);
        margin-left: -33px;
        position: absolute;
    }

    .dot-active {
        width: 16px;
        height: 17px;
        position: absolute;
        margin-left: -37px;
        margin-top: -3px;
        background-color: var(--color-bgcolor-neutral-primary);
    }

    .dot-active::before {
        content: '';
        width: 1px;
        height: 80px;
        background: linear-gradient(
            to bottom,
            rgba(253, 54, 110, 0) 0%,
            rgba(253, 54, 110, 1) 50%,
            rgba(253, 54, 110, 0) 100%
        );
        margin-left: 7px;
        position: absolute;
        margin-top: -30px;
        z-index: -1;
    }

    .badge {
        display: inline-flex;
        min-width: 40px;
        padding: 2px 6px;
        justify-content: center;
        align-items: center;
        gap: 4px;

        color: var(--mid-neutrals-60, #6c6c71);

        border-radius: 4px;
        border: 1px solid var(--color-light-neutral-10, #ededf0);
        background: var(--color-light-neutral-5, #fafafb);
        position: absolute;
        margin-top: -8px;
        margin-bottom: 16px;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .step-content {
        margin-top: 30px;
    }
</style>
