<script lang="ts">
    export let columns: number;

    export let columnsS = columns;
    export let columnsXS = columnsS;
    export let columnsXXS = columnsXS;

    export let columnsL = columns;
    export let columnsXL = columnsL;
    export let columnsXXL = columnsXL;

    export let gap: 'none' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';
    export let rowGap: 'none' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' =
        gap;
</script>

<div
    class="grid"
    style:--columns-xxs={columnsXXS}
    style:--columns-xs={columnsXS}
    style:--columns-s={columnsS}
    style:--columns={columns}
    style:--columns-l={columnsL}
    style:--columns-xl={columnsXL}
    style:--columns-xxl={columnsXXL}
    style:--p-column-gap={`var(--gap-${gap})`}
    style:--p-row-gap={`var(--gap-${rowGap})`}
>
    <slot />
</div>

<style lang="scss">
    @use '../../scss/_breakpoints' as *;
    .grid {
        --p-columns: var(--columns);
        display: grid;
        grid-template-columns: repeat(var(--p-columns), 1fr);
        gap: var(--p-column-gap);
        row-gap: var(--p-row-gap);

        @media (max-width: $breakpoint-xs) {
            --p-columns: var(--columns-xxs);
        }
        @media (min-width: $breakpoint-xs) {
            --p-columns: var(--columns-xs);
        }

        @media (min-width: $breakpoint-s) {
            --p-columns: var(--columns-s);
        }
        @media (min-width: $breakpoint-m) {
            --p-columns: var(--columns);
        }
        @media (min-width: $breakpoint-l) {
            --p-columns: var(--columns-l);
        }

        @media (min-width: $breakpoint-xl) {
            --p-columns: var(--columns-xl);
        }

        @media (min-width: $breakpoint-xxl) {
            --p-columns: var(--columns-xxl);
        }
    }
</style>
