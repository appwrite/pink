<script>
    import Base from './Base.svelte';
    /**
     * The unique identifier of the input.
     * @type {string}
     */
    export let id;
    /**
     * The name of the input.
     * @type {string}
     */
    export let name;
    /**
     * The label of the input.
     * @type {string}
     */
    export let label;
    /**
     * The value of the input.
     * @type {string}
     */
    export let value;
    /**
     * The number of rows of the textarea.
     * @type {number}
     */
    export let rows = 4;
    /**
     * The number of columns of the textarea.
     * @type {number}
     */
    export let cols = 50;
    /**
     * The placeholder of the input.
     * @type {string}
     */
    export let placeholder = '';
    /**
     * The placeholder of the input.
     * @type {boolean}
     */
    export let disabled = false;
</script>

<Base {id} {label}>
    <textarea {id} {name} {disabled} {placeholder} {rows} {cols} bind:value />
</Base>

<style lang="scss">
    @use '$scss/mixins/transitions';

    @mixin typography {
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }

    textarea {
        @include transitions.common;
        border-radius: 4px;
        border: 1px solid #d8d8db;
        background: #fff;
        padding: 12px;

        &::placeholder {
            color: #c3c3c6;
        }

        &:hover {
            border: 1px solid #c3c3c6;
        }

        &:focus {
            box-shadow:
                0px 0px 0px 1px #00a7c3,
                0px 0px 0px 4px rgba(0, 167, 195, 0.25);
        }

        &:disabled {
            background: #fff;
        }
    }
</style>
