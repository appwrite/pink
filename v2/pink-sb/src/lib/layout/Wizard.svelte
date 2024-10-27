<section class="wizard">
    <div class="wizard-container">
        <header>
            <slot name="header" />
        </header>
        <main>
            <slot />
        </main>
        <aside>
            <slot name="aside" />
        </aside>
        <footer></footer>
    </div>
</section>

<style lang="scss">
    .wizard {
        display: block;
        min-block-size: 100dvh;
        padding-inline: var(--space-10);
        background-color: var(--color-bgcolor-neutral-primary);

        &-container {
            max-inline-size: 1440px;
        }
        header {
            position: sticky;
            z-index: 1;
            inset-block-start: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-block-start: 2rem;
            padding-block-end: 1rem;
            background-color: var(--color-bgcolor-neutral-primary);
            // @media (min-width: 768px) {
            //     border: var(--border-width-s, 1px) solid var(--color-border-neutral);
            // }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            padding-block: 2rem;
            border-block-start: 1px solid var(--color-border-neutral);
            background-color: var(--color-bgcolor-neutral-primary);
        }
    }
</style>
