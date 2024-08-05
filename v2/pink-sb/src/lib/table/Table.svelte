<div role="table">
    {#if $$slots.header}
        <div role="row">
            <slot name="header" />
        </div>
    {/if}
    <slot />
</div>

<style lang="scss">
    [role='table'] {
        display: flex;
    }

    [role='row'] {
        display: flex;
    }
</style>
