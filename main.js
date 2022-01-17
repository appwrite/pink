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
      title: 'Components',
      pages: [
        {
          path: '/components/button',
          title: 'Button',
          src: 'components/button.md'
        },
        {
          path: '/components/input',
          title: 'Input',
          src: 'components/input.md'
        }
      ]
    }
  ]
}, document.getElementById('catalog'));