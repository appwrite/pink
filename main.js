import './src/_index.scss';

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
      title: 'Elements',
      pages: [
        {
          path: '/elements/button',
          title: 'Button',
          src: 'elements/button.md'
        },
        {
          path: '/elements/input',
          title: 'Input',
          src: 'elements/input.md'
        }
      ]
    },
    {
      title: 'Components',
      pages: [
        {
          path: '/components/upload-box',
          title: 'Upload Box',
          src: 'components/upload-box.md'
        },
        {
          path: '/components/upload-image',
          title: 'Upload Image',
          src: 'components/upload-image.md'
        }
      ]
    }
  ]
}, document.getElementById('catalog'));