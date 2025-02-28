<script lang="ts">
    /**
     * The gap between the stack items.
     * none: 0 | xxxs: 2px | xxs: 4px | xs: 6px | s: 8px | m: 12px | l: 16px | xl: 20px | xxl: 32px | xxxl: 40px
     */
    export let gap: 'none' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';

    export let start: number = 1;
    export let end: number = 2;
    export let breakpoint: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' = 's';
</script>

<div
    class="grid-fraction"
    style:--p-grid-gap={`var(--gap-${gap})`}
    style:--p-grid-start-size={`${start}fr`}
    style:--p-grid-end-size={`${end}fr`}
    data-breakpoint={breakpoint}
>
    <slot />
</div>

<style lang="scss">
    @use '../../scss/_breakpoints' as *;

    .grid-fraction {
        display: grid;
        grid-template-columns: var(--p-grid-start-size) var(--p-grid-end-size);
        grid-auto-rows: 1fr;
        gap: var(--p-grid-gap);

        & > * {
            overflow: hidden;
        }

        &[data-breakpoint='xs'] {
            @media (max-width: $breakpoint-xs) {
                grid-template-columns: 1fr;
            }
        }
        &[data-breakpoint='s'] {
            @media (max-width: $breakpoint-s) {
                grid-template-columns: 1fr;
            }
        }
        &[data-breakpoint='m'] {
            @media (max-width: $breakpoint-m) {
                grid-template-columns: 1fr;
            }
        }
        &[data-breakpoint='l'] {
            @media (max-width: $breakpoint-l) {
                grid-template-columns: 1fr;
            }
        }
        &[data-breakpoint='xl'] {
            @media (max-width: $breakpoint-xl) {
                grid-template-columns: 1fr;
            }
        }
        &[data-breakpoint='xxl'] {
            @media (max-width: $breakpoint-xxl) {
                grid-template-columns: 1fr;
            }
        }
    }
</style>
