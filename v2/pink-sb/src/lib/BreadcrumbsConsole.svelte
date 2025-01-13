<script lang="ts">
    import { createMenubar, melt } from '@melt-ui/svelte';
    import { Badge, Icon, BottomSheet, type SheetMenu } from '$lib/index.js';
    import { IconChevronDown, IconChevronRight, IconPlus } from '@appwrite.io/pink-icons-svelte';
    import { onMount } from 'svelte';

    type Project = {
        name: string;
        $id: string;
        isSelected: boolean;
    };
    type Organization = {
        name: string;
        $id: string;
        tierName: string;
        isSelected: boolean;
        projects: Array<Project>;
    };

    const {
        elements: { menubar },
        builders: { createMenu }
    } = createMenubar();

    const {
        elements: {
            trigger: triggerOrganizations,
            menu: menuOrganizations,
            item: itemOrganizations,
            separator: separatorOrganizations
        },
        builders: { createSubmenu: createSubmenuOrganizations, createMenuRadioGroup }
    } = createMenu();

    const {
        elements: { radioGroup: radioGroupOrganizations }
    } = createMenuRadioGroup({});

    const {
        elements: { subMenu: subMenuOrganizations, subTrigger: subTriggerOrganizations }
    } = createSubmenuOrganizations();

    const {
        elements: {
            trigger: triggerProjects,
            menu: menuProjects,
            item: itemProjects,
            separator: separatorProjects
        }
    } = createMenu();

    export let organizations: Organization[];
    export let createProjectFunction: () => void;
    const selectedOrg = organizations.find((organization) => organization.isSelected);
    const selectedProject = selectedOrg?.projects.find((project) => project.isSelected);

    let isSmallViewport = false;
    let organisationBottomSheetOpen = false;
    let projectsBottomSheetOpen = false;

    const organizationsBottomSheet: SheetMenu = {
        top: {
            items: [
                {
                    name: 'Organization settings',
                    onClick: () => {
                        location.href = `/console/organization-${selectedOrg?.$id}/settings`;
                    }
                }
            ]
        },
        bottom: {
            items: [
                {
                    name: 'Switch organization',
                    trailingIcon: IconChevronRight,
                    subMenu: {
                        top: {
                            title: 'Switch Organization',
                            items: organizations.map((organization) => ({
                                name: organization.name,
                                onClick: () => {
                                    location.href = `/console/organization-${organization?.$id}`;
                                }
                            }))
                        },
                        bottom: {
                            items: [
                                {
                                    name: 'Create organization',
                                    leadingIcon: IconPlus,
                                    onClick: () => {
                                        location.href = `/console/create-organization`;
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    };
    let projectsBottomSheet: SheetMenu;
    $: projectsBottomSheet = {
        top: {
            title: 'Switch project',
            items: !selectedOrg
                ? []
                : selectedOrg.projects.map((project) => ({
                      name: project.name,
                      onClick: () => {
                          location.href = `/console/project-${project.$id}/overview`;
                      }
                  }))
        },
        bottom: {
            items: [
                {
                    name: 'Create project',
                    trailingIcon: IconPlus,
                    onClick: createProjectFunction
                }
            ]
        }
    };

    onMount(() => {
        if (window) {
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            const updateViewport = () => (isSmallViewport = mediaQuery.matches);

            // Initial check
            updateViewport();

            // Listen for changes
            mediaQuery.addEventListener('change', updateViewport);

            return () => {
                // Cleanup listener
                mediaQuery.removeEventListener('change', updateViewport);
            };
        }
    });
</script>

<div use:melt={$menubar}>
    <span class="breadcrumb-separator">/</span>

    {#if !isSmallViewport}
        <button
            type="button"
            class="trigger"
            use:melt={$triggerOrganizations}
            aria-label="Open organizations tab"
        >
            <span class="orgNameProject">{selectedOrg?.name ?? 'Organization'}</span>
            <span class="not-mobile"
                ><Badge variant="secondary" content={selectedOrg?.tierName ?? ''} /></span
            >
            <Icon icon={IconChevronDown} size="s" />
        </button>
    {:else}
        <button
            type="button"
            class="trigger"
            on:click={() => {
                organisationBottomSheetOpen = true;
            }}
            aria-label="Open organizations tab"
        >
            <span class="orgNameProject">{selectedOrg?.name ?? 'Organization'}</span>
            <span class="not-mobile"
                ><Badge variant="secondary" content={selectedOrg?.tierName ?? ''} /></span
            >
            <Icon icon={IconChevronDown} size="s" />
        </button>
    {/if}

    <div class="menu" use:melt={$menuOrganizations}>
        <div
            class="item"
            use:melt={$itemOrganizations}
            on:m-click={() => {
                location.href = `/console/organization-${selectedOrg?.$id}/settings`;
            }}
        >
            Organization settings
        </div>
        <div class="separator" use:melt={$separatorOrganizations} />
        <div class="item switch-org" use:melt={$subTriggerOrganizations}>
            Switch organization
            <div class="rightSlot"><Icon icon={IconChevronRight} size="s" /></div>
        </div>
        <div class="menu subMenu" use:melt={$subMenuOrganizations}>
            <div use:melt={$radioGroupOrganizations}>
                {#each organizations as organization}
                    <div
                        class="item"
                        use:melt={$itemOrganizations}
                        on:m-click={() => {
                            location.href = `/console/organization-${organization?.$id}`;
                        }}
                    >
                        {organization.name}
                    </div>
                {/each}
                <div class="separator" use:melt={$separatorOrganizations} />
                <div class="item" use:melt={$itemOrganizations}>
                    <div class="leftSlot"><Icon icon={IconPlus} size="s" /></div>
                    Create organization
                </div>
            </div>
        </div>
    </div>

    <span class="breadcrumb-separator">/</span>

    {#if selectedOrg && selectedProject}
        {#if !isSmallViewport}
            <button
                type="button"
                class="trigger"
                use:melt={$triggerProjects}
                aria-label="Open projects tab"
            >
                <span class="orgNameProject">{selectedProject.name}</span>
                <Icon icon={IconChevronDown} size="s" />
            </button>
        {:else}
            <button
                type="button"
                class="trigger"
                on:click={() => {
                    projectsBottomSheetOpen = true;
                }}
                aria-label="Open projects tab"
            >
                <span class="orgNameProject">{selectedProject.name}</span>
                <Icon icon={IconChevronDown} size="s" />
            </button>
        {/if}

        <div class="menu" use:melt={$menuProjects}>
            {#each selectedOrg.projects as project}
                <div
                    class="item"
                    use:melt={$itemProjects}
                    on:m-click={() => {
                        location.href = `/console/project-${project.$id}`;
                    }}
                >
                    {project.name}
                </div>
            {/each}
            <div class="separator" use:melt={$separatorProjects} />
            <div class="item" use:melt={$itemProjects} on:m-click={createProjectFunction}>
                <div class="leftSlot"><Icon icon={IconPlus} size="s" /></div>
                Create project
            </div>
        </div>
    {/if}
</div>
<BottomSheet.Menu bind:isOpen={organisationBottomSheetOpen} menu={organizationsBottomSheet}
></BottomSheet.Menu>
<BottomSheet.Menu bind:isOpen={projectsBottomSheetOpen} menu={projectsBottomSheet}
></BottomSheet.Menu>

<style lang="scss">
    .menu {
        display: flex;
        flex-direction: column;
        outline: none !important;
        min-width: 220px;
        border-radius: 12px;
        border: 1px solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
        z-index: 20;

        /* box-shadow/neutral/L */
        box-shadow:
            -2px 8px 16px 0px rgba(0, 0, 0, 0.02),
            -2px 20px 24px 0px rgba(0, 0, 0, 0.02);
    }

    .not-mobile {
        display: none;

        @media (min-width: 768px) {
            display: block;
        }
    }

    .subMenu {
        min-width: 220px;
        margin-inline: -4px;
        margin-block: -4px;
    }

    .item {
        position: relative;
        user-select: none;
        border-radius: 0.125rem;
        z-index: 20;
        outline: none;
        display: flex;
        align-items: center;
        cursor: default;

        margin: 0 4px;
        padding: var(--space-3, 6px) var(--space-4, 8px) var(--space-3, 6px) var(--space-5, 10px);
        color: var(--color-fgcolor-neutral-secondary, #56565c);

        /* Desktop/Body M 400 */
        font-family: var(--font-family-sansserif, Inter);
        font-size: var(--font-size-S, 14px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
        letter-spacing: -0.063px;
    }

    .orgNameProject {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 60px;

        @media (min-width: 390px) {
            max-width: 95px;
        }

        @media (min-width: 390px) {
            max-width: 105px;
        }

        @media (min-width: 800px) {
            max-width: 125px;
        }

        @media (min-width: 1024px) {
            max-width: 150px;
        }
    }

    .item:first-of-type {
        margin-top: 4px;
    }
    .item:last-of-type,
    .switch-org {
        margin-bottom: 4px;
    }

    .item[data-highlighted] {
        border-radius: var(--border-radius-S, 8px);
        background: var(--color-overlay-neutral-hover, rgba(25, 25, 28, 0.03));
    }
    .trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-1, 2px) var(--space-2, 4px);
        gap: var(--space-2, 4px);
        margin: 0 var(--space-5, 10px) 0 var(--space-5, 10px);

        transition: color 0.2s ease;

        color: var(--color-fgcolor-neutral-primary, #2d2d31);
        border-radius: var(--corner-radius-medium, 8px);

        cursor: default;
        /* Body text/level 2 Regular */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
    }

    .trigger:hover {
        background: var(--color-overlay-neutral-hover, rgba(25, 25, 28, 0.03));
    }

    .trigger[data-highlighted] {
        outline: none;
        background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
    }

    .trigger[data-highlighted]:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--color-bgcolor-neutral-secondary, #f4f4f7);
    }

    .trigger:focus {
        z-index: 30;
        box-shadow:
            var(--shadow-offsetx-0, 0px) var(--shadow-offsety-0, 0px) 0 2px
                var(--color-bgcolor-neutral-default, #fafafb),
            0 0 0 4px var(--color-border-focus, #818186);
    }
    .separator {
        margin: 5px 0;
        height: 1px;
        background-color: var(--color-border-neutral);
    }

    .rightSlot {
        margin-left: auto;
        padding-left: 1.25rem;
        display: flex;
    }
    .leftSlot {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: var(--space-4, 8px);
    }
    .breadcrumb-separator {
        color: var(--color-fgcolor-neutral-tertiary, #97979b);
    }
</style>
