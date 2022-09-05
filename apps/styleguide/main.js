import './main.css';
import '@aw-labs/ui/src/_index.scss';

Catalog.render({
  title: '@appwrite/ui',
  logoSrc: '/logo.svg',
  theme: {
    pageHeadingBackground: '#f02e65'
  },
  pages: [
    {
      path: '/',
      title: 'Introduction',
      src: 'intro.md'
    },
    {
      path: '/typography',
      title: 'Typography',
      src: 'typography.md'
    },
    {
      title: 'Foundation',
      pages: [
        {
          path: '/foundation/colors',
          title: 'Colors',
          src: 'foundation/colors.md'
        },
        {
          path: '/foundation/border-radius',
          title: 'Border Radius',
          src: 'foundation/border-radius.md'
        },
        {
          path: '/foundation/shadows',
          title: 'Shadows',
          src: 'foundation/shadows.md'
        },
        {
          path: '/foundation/icons',
          title: 'Icons',
          src: 'foundation/icons.md'
        }
      ]
    },
    {
      title: 'Elements',
      pages: [
        {
          path: '/elements/avatar',
          title: 'Avatar',
          src: 'elements/avatar.md'
        },
        {
          path: '/elements/box',
          title: 'Box',
          src: 'elements/box.md'
        },
        {
          path: '/elements/button',
          title: 'Buttons',
          src: 'elements/button.md'
        },
        {
          path: '/elements/card',
          title: 'Cards',
          src: 'elements/card.md'
        },
        {
          path: '/elements/checkbox',
          title: 'Checkbox',
          src: 'elements/checkbox.md'
        },
        {
          path: '/elements/radio',
          title: 'Radio',
          src: 'elements/radio.md'
        },
        {
          path: '/elements/switch',
          title: 'Switch',
          src: 'elements/switch.md'
        },
        {
          path: '/elements/input',
          title: 'Input - default',
          src: 'elements/input.md'
        },
        {
          path: '/elements/input-with-options',
          title: 'Input - Icons',
          src: 'elements/input-with-options.md'
        },
        {
          path: '/elements/input-action',
          title: 'Input - Action',
          src: 'elements/input-action.md'
        },
        {
          path: '/elements/search',
          title: 'Input - Search',
          src: 'elements/search.md'
        },
        {
          path: '/elements/password',
          title: 'Input - Password',
          src: 'elements/password.md'
        },
        {
          path: '/elements/file',
          title: 'Input - File',
          src: 'elements/file.md'
        },
        {
          path: '/elements/tags-input',
          title: 'Input - Tags Input',
          src: 'elements/tags-input.md'
        },
        {
          path: '/elements/select',
          title: 'Input - Select',
          src: 'elements/select.md'
        },
        {
          path: '/elements/link',
          title: 'Link',
          src: 'elements/link.md'
        },
        {
          path: '/elements/tooltip',
          title: 'Tooltip',
          src: 'elements/tooltip.md'
        },
        {
          path: '/elements/image-item',
          title: 'Image Item',
          src: 'elements/image-item.md'
        },
        {
          path: '/elements/table',
          title: 'Table',
          src: 'elements/table.md'
        },
        {
          path: '/elements/tag',
          title: 'Tags',
          src: 'elements/tag.md'
        },
        {
          path: '/elements/helper',
          title: 'Helper',
          src: 'elements/helper.md'
        },
        {
          path: '/elements/logo',
          title: 'Logo',
          src: 'elements/logo.md'
        },
        {
          path: '/elements/container',
          title: 'Container',
          src: 'elements/container.md'
        },
        {
          path: '/elements/loader',
          title: 'Loader',
          src: 'elements/loader.md'
        }
      ]
    },
    {
      title: 'Components',
      pages: [
        {
          path: '/components/alert',
          title: 'Alert',
          src: 'components/alert.md'
        },
        {
          path: '/components/alert-sticky',
          title: 'Alert Sticky',
          src: 'components/alert-sticky.md'
        },
        {
          path: '/components/modal',
          title: 'Modal',
          src: 'components/modal.md'
        },
        {
          path: '/components/pagination',
          title: 'Pagination',
          src: 'components/pagination.md'
        },
        {
          path: '/components/side-nav',
          title: 'Side Nav',
          src: 'components/side-nav.md'
        },
        {
          path: '/components/tabs',
          title: 'Tabs',
          src: 'components/tabs.md'
        },
        {
          path: '/components/drop-tabs',
          title: 'Drop Tabs',
          src: 'components/drop-tabs.md'
        },
        {
          path: '/components/inline-links',
          title: 'Inline Links',
          src: 'components/inline-links.md'
        },
        {
          path: '/components/drop-list',
          title: 'Drop List',
          src: 'components/drop-list.md'
        },
        {
          path: '/components/list',
          title: 'List',
          src: 'components/list.md'
        },
        {
          path: '/components/collapsible',
          title: 'Collapsible',
          src: 'components/collapsible.md'
        },
        {
          path: '/components/upload-file-box',
          title: 'Upload File Box',
          src: 'components/upload-file-box.md'
        },
        {
          path: '/components/upload-box',
          title: 'Upload Box',
          src: 'components/upload-box.md'
        },
        {
          path: '/components/upload-image',
          title: 'Upload Image',
          src: 'components/upload-image.md'
        },
        {
          path: '/components/file-preview',
          title: 'File Preview',
          src: 'components/file-preview.md'
        },
        {
          path: '/components/sessions',
          title: 'Sessions',
          src: 'components/sessions.md'
        },
        {
          path: '/components/switch-box',
          title: 'Switch Box',
          src: 'components/switch-box.md'
        },
        {
          path: '/components/bucket',
          title: 'Bucket',
          src: 'components/bucket.md'
        },
        {
          path: '/components/form',
          title: 'Form',
          src: 'components/form.md'
        }
      ]
    },
    /*{
      title: 'Grids',
      pages: [
        {
          path: '/grids/grid-with-side',
          title: 'Grid With Side',
          src: 'grids/grid-with-side.md'
        },
        {
          path: '/grids/grid-box',
          title: 'Grid Box',
          src: 'grids/grid-box.md'
        },
        {
          path: '/grids/inner-grid',
          title: 'Inner Grid',
          src: 'grids/inner-grid.md'
        }
      ]
    }*/
  ]
}, document.getElementById('catalog'));

const body = document.querySelector('body');
const toggle = document.querySelector('#catalog-theme-toggle > input');
toggle.addEventListener('change', () => {
  body.classList.toggle('theme-dark')
});
