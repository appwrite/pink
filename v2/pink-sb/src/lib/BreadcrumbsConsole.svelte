<script lang="ts">
    import { createMenubar, melt } from '@melt-ui/svelte';
    import { Badge, Icon } from '$lib/index.js';
    import { IconChevronDown, IconChevronRight, IconPlus } from '@appwrite.io/pink-icons-svelte';

    type Project = {
        name: string;
        id: string;
        isSelected: boolean;
    };
    type Organization = {
        name: string;
        id: string;
        tier: 'tier-0' | 'tier-1' | 'tier-2' | 'auto-1';
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
    const selectedOrg = organizations.find((organization) => organization.isSelected);
    const selectedProject = selectedOrg.projects.find((project) => project.isSelected);
</script>

<div use:melt={$menubar}>
    /
    <button
        type="button"
        class="trigger"
        use:melt={$triggerOrganizations}
        aria-label="Open organizations tab"
    >
        <span>{selectedOrg.name}</span>
        <Badge variant="secondary" content={'Starter'} />
        <Icon icon={IconChevronDown} size="s" />
    </button>

    <div class="menu" use:melt={$menuOrganizations}>
        <div
            class="item"
            use:melt={$itemOrganizations}
            on:m-click={() => console.log('goto settings')}
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
                        on:m-click={() => console.log(`switch to ${organization.name}`)}
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

    /

    {#if selectedProject}
        <button
            type="button"
            class="trigger"
            use:melt={$triggerProjects}
            aria-label="Open projects tab"
        >
            {selectedProject.name}
            <Icon icon={IconChevronDown} size="s" />
        </button>

        <div class="menu" use:melt={$menuProjects}>
            {#each selectedOrg.projects as project}
                <div
                    class="item"
                    use:melt={$itemProjects}
                    on:m-click={() => console.log(`switch to ${project.name}`)}
                >
                    {project.name}
                </div>
            {/each}
            <div class="separator" use:melt={$separatorProjects} />
            <div
                class="item"
                use:melt={$itemProjects}
                on:m-click={() => console.log(`Create project`)}
            >
                <div class="leftSlot"><Icon icon={IconPlus} size="s" /></div>
                Create project
            </div>
        </div>
    {/if}
</div>

<style>
    .menu {
        display: flex;
        flex-direction: column;
        outline: none !important;
        min-width: 220px;
        border-radius: 12px;
        border: 1px solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);

        /* box-shadow/neutral/L */
        box-shadow:
            -2px 8px 16px 0px rgba(0, 0, 0, 0.02),
            -2px 20px 24px 0px rgba(0, 0, 0, 0.02);
    }

    .subMenu {
        min-width: 220px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
        font-family: var(--font-family-sansSerif, Inter);
        font-size: var(--font-size-S, 14px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
        letter-spacing: -0.063px;
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
        background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
    }

    .item[data-disabled] {
        color: #d3d3d3;
    }
    .trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.75rem;
        gap: var(--space-2, 4px);

        transition: color 0.2s ease;

        color: var(--color-fgcolor-neutral-primary, #2d2d31);
        border-radius: var(--corner-radius-medium, 8px);
    }

    .trigger:hover {
        background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
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
        box-shadow: 0 0 0 2px var(--color-overlay-button-secondary-hover, rgba(25, 25, 28, 0.04));
    }

    .trigger {
        cursor: default;
        /* Body text/level 2 Regular */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
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
</style>
