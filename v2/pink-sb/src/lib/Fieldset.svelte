<script lang="ts">
    export let legend: string;
</script>

<fieldset>
    <legend><span>{legend}</span></legend>
    <div class="content"><slot /></div>
</fieldset>

<style>
    fieldset {
        border-radius: var(--border-radius-s, 8px);
        border: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
    }

    legend {
        position: relative;
        margin-left: var(--space-6, 12px);
    }

    span {
        padding: 0 var(--space-2, 4px);
        font-family: var(--font-family-sansserif, inter);
        font-size: var(--font-size-XS, 12px);
        font-style: normal;
        font-weight: 400;
        line-height: 130%; /* 15.6px */
        letter-spacing: -0.12px;
    }

    .content {
        margin: 16px 16px 20px 16px;
    }
</style>
