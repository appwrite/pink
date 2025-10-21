<script lang="ts" context="module">
    export const SpecialCharacter = {
        Command: '⌘',
        Option: '⌥',
        Left: '←',
        Right: '→',
        Up: '↑',
        Down: '↓'
    };
</script>

<script lang="ts">
    export let key: string;
    export let size: 's' | 'm' = 'm';
    export let autoWidth: boolean = false;
</script>

<kbd class:m={size === 'm'} class:s={size === 's'} class:autoWidth>{key}</kbd>

<style lang="scss">
    kbd {
        display: flex;
        padding: var(--space-1);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap-none);
        flex-shrink: 0;

        border-radius: 6px;
        background: var(--overlay-on-neutral);

        &.s {
            width: var(--icon-size-m);
            height: var(--icon-size-m);
        }

        &.m {
            width: var(--icon-size-l);
            height: var(--icon-size-l);
        }
    }
    .autoWidth {
        width: fit-content !important;
        padding-inline: var(--space-3);
    }
</style>
