<script context="module" lang="ts">
    import { Step } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Step',
        component: Step
    };
</script>

<Story name="Multiple steps">
    <Step.List>
        <Step.Item state="previous"
            ><div>
                <p>
                    Cras bibendum, erat id commodo rhoncus, justo mi porttitor ex, sit amet lacinia
                    sem ipsum et tellus. Curabitur quis maximus sem. Nullam vel ullamcorper nunc, a
                    maximus metus. Integer varius, nibh vitae interdum commodo, lectus enim rhoncus
                    magna, nec ultricies erat massa nec risus. Nunc non elit tortor. Phasellus porta
                    lectus a semper rhoncus. Donec quis pretium dolor. Morbi lobortis turpis velit,
                    quis rutrum ipsum eleifend eu. Duis pretium sem at magna dapibus interdum.
                    Praesent bibendum ornare consectetur. Orci varius natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus. Fusce finibus nisi vitae odio
                    scelerisque laoreet.
                </p>
            </div></Step.Item
        >
        <Step.Item state="previous" hideBadge={true}
            ><div>
                <p>
                    Curabitur ac neque viverra, vestibulum turpis nec, rutrum dolor. Etiam sit amet
                    est justo. Nam vestibulum lacinia quam sit amet maximus. Etiam sit amet
                    tristique ligula. Praesent sagittis nibh eget neque elementum commodo. Proin ac
                    orci turpis. Quisque quis erat id lectus fermentum porttitor non ut nunc.
                    Aliquam ornare mi nec mi vestibulum, eget fringilla eros consequat.
                </p>
            </div></Step.Item
        >
        <Step.Item state="current"
            ><div>
                <p>
                    Nulla nisl dolor, pellentesque in porttitor at, gravida quis neque. Donec nec
                    turpis ac erat egestas convallis. Vivamus vel mi in ligula elementum viverra.
                    Phasellus malesuada turpis at turpis elementum suscipit. Sed non arcu nibh.
                    Etiam placerat ornare lectus, eu tempus augue sagittis eu. Proin iaculis, dui a
                    euismod eleifend, diam elit viverra est, vitae ornare mi urna vel ante. Duis
                    rutrum tempor mi.
                </p>
            </div></Step.Item
        >
        <Step.Item state="next" noLine={true}
            ><div>
                <p>
                    Nullam at quam pharetra, dignissim erat non, pharetra eros. Ut vitae magna
                    commodo, pretium risus at, elementum enim. Cras erat lectus, aliquet vel sem
                    eget, tristique aliquam justo. Praesent et leo aliquam, bibendum turpis eget,
                    egestas enim. Maecenas ac interdum ex, ac aliquet magna. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia curae
                </p>
            </div></Step.Item
        >
    </Step.List>
</Story>

<Story name="One steps">
    <Step.List>
        <Step.Item state="current" shortLine={true}>
            <div>
                <p>
                    Cras bibendum, erat id commodo rhoncus, justo mi porttitor ex, sit amet lacinia
                    sem ipsum et tellus. Curabitur quis maximus sem. Nullam vel ullamcorper nunc, a
                    maximus metus. Integer varius, nibh vitae interdum commodo, lectus enim rhoncus
                    magna, nec ultricies erat massa nec risus. Nunc non elit tortor. Phasellus porta
                    lectus a semper rhoncus. Donec quis pretium dolor. Morbi lobortis turpis velit,
                    quis rutrum ipsum eleifend eu. Duis pretium sem at magna dapibus interdum.
                    Praesent bibendum ornare consectetur. Orci varius natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus. Fusce finibus nisi vitae odio
                    scelerisque laoreet.
                </p>
            </div></Step.Item
        >
    </Step.List>
</Story>

<style>
    p:not(:last-child) {
        margin-bottom: 12px;
    }
</style>
