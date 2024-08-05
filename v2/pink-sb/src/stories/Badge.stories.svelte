<script context="module" lang="ts">
    import { Badge } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Badge',
        component: Badge,
        args: {
            content: 'Badge'
        },
        argTypes: {
            variant: {
                options: ['primary', 'secondary', 'accent'],
                control: { type: 'select' }
            },
            type: {
                options: ['success', 'warning', 'error', undefined],
                control: { type: 'select' }
            },
            size: {
                options: ['small', 'medium'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Badge {...args} />
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Primary - success" args={{ variant: 'primary', type: 'success' }} />
<Story name="Primary - warning" args={{ variant: 'primary', type: 'warning' }} />
<Story name="Primary - error" args={{ variant: 'primary', type: 'error' }} />
<Story name="Primary - small" args={{ variant: 'primary', size: 'small' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Secondary - success" args={{ variant: 'secondary', type: 'success' }} />
<Story name="Secondary - warning" args={{ variant: 'secondary', type: 'warning' }} />
<Story name="Secondary - error" args={{ variant: 'secondary', type: 'error' }} />
<Story name="Secondary - small" args={{ variant: 'secondary', size: 'small' }} />
<Story name="Accent" args={{ variant: 'accent' }} />
<Story name="Accent - small" args={{ variant: 'accent', size: 'small' }} />
