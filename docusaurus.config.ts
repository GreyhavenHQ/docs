import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Greyhaven Docs',
  tagline: 'Sandbox and proxy tools for running semi-trusted commands safely',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.greywall.io',
  baseUrl: '/',

  organizationName: 'GreyhavenHQ',
  projectName: 'greyhaven-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/GreyhavenHQ/greywall/edit/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/greyhaven-social.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Greyhaven',
        src: 'img/greyheaven-logo.svg',
        srcDark: 'img/greyheaven-logo-dark.svg',
        href: 'https://greyhaven.co',
        target: '_self',
        width: 160,
        height: 40,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'greywallSidebar',
          position: 'left',
          label: 'Greywall',
        },
        {
          type: 'docSidebar',
          sidebarId: 'greyproxySidebar',
          position: 'left',
          label: 'Greyproxy',
        },
        {
          href: 'https://github.com/GreyhavenHQ/greywall',
          label: 'Greywall on GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/GreyhavenHQ/greyproxy',
          label: 'Greyproxy on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Greywall',
          items: [
            {label: 'Quickstart', to: '/greywall/quickstart'},
            {label: 'Configuration', to: '/greywall/configuration'},
            {label: 'AI Agents', to: '/greywall/agents'},
          ],
        },
        {
          title: 'Greyproxy',
          items: [
            {label: 'Overview', to: '/greyproxy'},
            {label: 'Configuration', to: '/greyproxy/configuration'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub — Greywall',
              href: 'https://github.com/GreyhavenHQ/greywall',
            },
            {
              label: 'GitHub — Greyproxy',
              href: 'https://github.com/GreyhavenHQ/greyproxy',
            },
            {
              label: 'greyhaven.co',
              href: 'https://greyhaven.co',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Greyhaven. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
