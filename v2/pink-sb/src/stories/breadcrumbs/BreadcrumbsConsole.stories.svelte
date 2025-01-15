<script context="module" lang="ts">
    import { BreadcrumbsConsole } from '$lib';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Breadcrumbs/Console',
        component: BreadcrumbsConsole,
        args: {
            organizations: [
                {
                    name: 'Alpha Corp',
                    $id: 'org-001',
                    tierName: 'Free',
                    isSelected: true,
                    projects: [
                        {
                            name: 'Alpha Project A',
                            $id: 'proj-001',
                            isSelected: true
                        },
                        {
                            name: 'Alpha Project B',
                            $id: 'proj-002',
                            isSelected: false
                        },
                        {
                            name: 'Alpha Project C',
                            $id: 'proj-003',
                            isSelected: false
                        }
                    ]
                },
                {
                    name: 'Beta Group',
                    $id: 'org-002',
                    tierName: 'Pro',
                    isSelected: false,
                    projects: [
                        {
                            name: 'Beta Project X',
                            $id: 'proj-004',
                            isSelected: false
                        },
                        {
                            name: 'Beta Project Y',
                            $id: 'proj-005',
                            isSelected: false
                        }
                    ]
                },
                {
                    name: 'Gamma Inc.',
                    $id: 'org-003',
                    tierName: 'Scale',
                    isSelected: false,
                    projects: []
                },
                {
                    name: 'Delta LLC',
                    $id: 'org-004',
                    tierName: 'Education',
                    isSelected: false,
                    projects: [
                        {
                            name: 'Delta Project Z',
                            $id: 'proj-006',
                            isSelected: false
                        }
                    ]
                }
            ]
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <BreadcrumbsConsole {...args} />
</Template>

<Story name="Console" />
