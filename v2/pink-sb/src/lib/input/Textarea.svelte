<script lang="ts">
    import Base from './Base.svelte';
    export let id: string;
    export let name: string;
    export let label: string;
    export let placeholder: HTMLTextAreaElement['placeholder'] = '';
    export let disabled: HTMLTextAreaElement['disabled'] = false;
    export let value: HTMLTextAreaElement['value'] = '';
    export let rows: HTMLTextAreaElement['rows'] = 4;
    export let cols: HTMLTextAreaElement['cols'] = 50;
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
