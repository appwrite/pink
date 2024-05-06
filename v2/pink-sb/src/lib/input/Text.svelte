<script lang="ts">
    import Base from './Base.svelte';
    export let id: string;
    export let name: string;
    export let label: string;
    export let disabled: boolean = false;
    export let value: string | null = null;
    export let placeholder: string | null = null;
</script>

<Base {id} {label}>
    <input {id} {name} {disabled} {placeholder} bind:value type="text" />
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

    input {
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
