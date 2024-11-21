<script context="module" lang="ts">
    import { DirectoryPicker } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/DirectoryPicker',
        component: DirectoryPicker,
        args: {
            isLoading: false,
            directories: [
                {
                    id: '1',
                    title: 'Root',
                    fullPath: '/',
                    fileCount: 5,
                    thumbnailUrl: 'https://example.com/thumbnails/root.png',
                    children: [
                        {
                            id: '1-1',
                            title: 'Folder A with a very long name',
                            fullPath: '/FolderA',
                            fileCount: 3,
                            thumbnailUrl: 'https://appwrite.io/images/logos/appwrite.svg',
                            children: [
                                {
                                    id: '1-1-1',
                                    title: 'SubFolder A1',
                                    fullPath: '/FolderA/SubFolderA1',
                                    fileCount: 2,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderA1.png',
                                    children: []
                                },
                                {
                                    id: '1-1-2',
                                    title: 'SubFolder A2',
                                    fullPath: '/FolderA/SubFolderA2',
                                    fileCount: 1,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderA2.png',
                                    children: [
                                        {
                                            id: '1-1-2-1',
                                            title: 'SubSubFolder A2-1',
                                            fullPath: '/FolderA/SubFolderA2/SubSubFolderA2-1',
                                            fileCount: 0,
                                            thumbnailUrl:
                                                'https://example.com/thumbnails/subSubFolderA2-1.png',
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '1-2',
                            title: 'Folder B',
                            fullPath: '/FolderB',
                            fileCount: 7,
                            thumbnailUrl: 'https://example.com/thumbnails/folderB.png',
                            children: [
                                {
                                    id: '1-2-1',
                                    title: 'SubFolder B1',
                                    fullPath: '/FolderB/SubFolderB1',
                                    fileCount: 0,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderB1.png',
                                    children: []
                                },
                                {
                                    id: '1-2-2',
                                    title: 'SubFolder B2',
                                    fullPath: '/FolderB/SubFolderB2',
                                    fileCount: 4,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderB2.png',
                                    children: [
                                        {
                                            id: '1-2-2-1',
                                            title: 'SubSubFolder B2-1',
                                            fullPath: '/FolderB/SubFolderB2/SubSubFolderB2-1',
                                            fileCount: 2,
                                            thumbnailUrl:
                                                'https://example.com/thumbnails/subSubFolderB2-1.png',
                                            children: [
                                                {
                                                    id: '1-2-2-1-1',
                                                    title: 'SubSubSubFolder B2-1-1',
                                                    fullPath:
                                                        '/FolderB/SubFolderB2/SubSubFolderB2-1/SubSubSubFolderB2-1-1',
                                                    fileCount: 0,
                                                    thumbnailUrl:
                                                        'https://example.com/thumbnails/subSubSubFolderB2-1-1.png',
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '3-1',
                            title: 'Folder C',
                            fullPath: '/FolderC',
                            fileCount: 3,
                            thumbnailUrl: 'https://example.com/thumbnails/folderC.png',
                            children: [
                                {
                                    id: '3-1-1',
                                    title: 'SubFolder C1',
                                    fullPath: '/FolderC/SubFolderC1',
                                    fileCount: 2,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderC1.png',
                                    children: []
                                },
                                {
                                    id: '3-1-2',
                                    title: 'SubFolder C2',
                                    fullPath: '/FolderC/SubFolderC2',
                                    fileCount: 1,
                                    thumbnailUrl: 'https://example.com/thumbnails/subFolderC2.png',
                                    children: [
                                        {
                                            id: '3-1-2-1',
                                            title: 'SubSubFolder C2-1',
                                            fullPath: '/FolderC/SubFolderA2/SubSubFolderAC-1',
                                            fileCount: 0,
                                            thumbnailUrl:
                                                'https://example.com/thumbnails/subSubFolderAC-1.png',
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
</script>

<div class="wrapper">
    <Story name="Default" let:args>
        <DirectoryPicker {...args} />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 100%;
    }
</style>
