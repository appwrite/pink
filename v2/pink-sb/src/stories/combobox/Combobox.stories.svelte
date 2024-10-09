<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Combobox } from '$lib/combobox/index.js';

    export const meta: MetaProps = {
        title: 'Components/Combobox',
        component: Combobox,
        args: {
            placeholder: 'Placeholder',
            disabled: false,
            label: 'My combobox',
            options: [
                { key: 'RU', value: 'Russia' },
                { key: 'CA', value: 'Canada' },
                { key: 'US', value: 'United States' },
                { key: 'CN', value: 'China' },
                { key: 'BR', value: 'Brazil' },
                { key: 'AU', value: 'Australia' },
                { key: 'IN', value: 'India' },
                { key: 'AR', value: 'Argentina' },
                { key: 'KZ', value: 'Kazakhstan' },
                { key: 'DZ', value: 'Algeria' },
                { key: 'CD', value: 'Democratic Republic of the Congo' },
                { key: 'SA', value: 'Saudi Arabia' },
                { key: 'MX', value: 'Mexico' },
                { key: 'ID', value: 'Indonesia' },
                { key: 'SD', value: 'Sudan' },
                { key: 'LY', value: 'Libya' },
                { key: 'IR', value: 'Iran' },
                { key: 'MN', value: 'Mongolia' },
                { key: 'PE', value: 'Peru' },
                { key: 'TD', value: 'Chad' },
                { key: 'NE', value: 'Niger' },
                { key: 'AO', value: 'Angola' },
                { key: 'ML', value: 'Mali' },
                { key: 'ZA', value: 'South Africa' },
                { key: 'CO', value: 'Colombia' },
                { key: 'ET', value: 'Ethiopia' },
                { key: 'BO', value: 'Bolivia' },
                { key: 'MA', value: 'Morocco' },
                { key: 'EG', value: 'Egypt' },
                { key: 'TZ', value: 'Tanzania' },
                { key: 'NG', value: 'Nigeria' },
                { key: 'VE', value: 'Venezuela' },
                { key: 'PK', value: 'Pakistan' },
                { key: 'NA', value: 'Namibia' },
                { key: 'MO', value: 'Mozambique' },
                { key: 'TR', value: 'Turkey' },
                { key: 'CL', value: 'Chile' },
                { key: 'ZM', value: 'Zambia' },
                { key: 'MM', value: 'Myanmar' },
                { key: 'AF', value: 'Afghanistan' },
                { key: 'SS', value: 'South Sudan' },
                { key: 'FR', value: 'France' },
                { key: 'SO', value: 'Somalia' },
                { key: 'CF', value: 'Central African Republic' },
                { key: 'UA', value: 'Ukraine' },
                { key: 'MG', value: 'Madagascar' },
                { key: 'BW', value: 'Botswana' },
                { key: 'KE', value: 'Kenya' },
                { key: 'YE', value: 'Yemen' },
                { key: 'TH', value: 'Thailand' }
            ]
        },
        argTypes: {
            placeholder: {
                control: { type: 'text' }
            },
            disabled: {
                control: { type: 'boolean' }
            },
            options: {
                control: false
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <div style="width: 320px">
        <Combobox {...args} />
    </div>
</Template>

<Story name="Default" />
