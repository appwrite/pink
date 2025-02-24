<script lang="ts">
    export let columns: number;

    export let columnsS = columns;
    export let columnsXS = columnsS;
    export let columnsXXS = columnsXS;

    export let columnsL = columns;
    export let columnsXL = columnsL;
    export let columnsXXL = columnsXL;

    export let gap: 'none' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';
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
    style:--p-stack-gap={`var(--gap-${gap})`}
>
    <slot />
</div>

<style lang="scss">
    .grid {
        --p-columns: var(--columns);
        display: grid;
        grid-template-columns: repeat(var(--p-columns), 1fr);
        gap: var(--p-stack-gap);

        @media (max-width: 360px) {
            --p-columns: var(--columns-xxs);
        }
        @media (min-width: 360px) {
            --p-columns: var(--columns-xs);
        }

        @media (min-width: 768px) {
            --p-columns: var(--columns-s);
        }
        @media (min-width: 1024px) {
            --p-columns: var(--columns);
        }
        @media (min-width: 1280px) {
            --p-columns: var(--columns-l);
        }

        @media (min-width: 1440px) {
            --p-columns: var(--columns-xl);
        }

        @media (min-width: 1728px) {
            --p-columns: var(--columns-xxl);
        }
    }
</style>
