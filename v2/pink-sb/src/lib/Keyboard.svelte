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
    export let multiple = false;
</script>

<kbd data-multiple={multiple}>{key}</kbd>

<style lang="scss">
    kbd {
        display: flex;
        width: var(--icon-size-l);
        height: var(--icon-size-l);
        padding: var(--space-1);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap-none);
        flex-shrink: 0;

        border-radius: 6px;
        background: var(--color-overlay-on-neutral);

        &[data-multiple] {
            width: auto;
            padding: var(--space-1) var(--space-2);
        }
    }
</style>
