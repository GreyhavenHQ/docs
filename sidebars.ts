import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  greywallSidebar: [
    {type: 'doc', id: 'greywall/index', label: 'Overview'},
    {type: 'doc', id: 'greywall/quickstart', label: 'Quickstart'},
    {type: 'doc', id: 'greywall/why-greywall', label: 'Why Greywall?'},

    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        {type: 'doc', id: 'greywall/concepts', label: 'Concepts'},
        {type: 'doc', id: 'greywall/learning-mode', label: 'Learning Mode'},
        {type: 'doc', id: 'greywall/agents', label: 'AI Agent Integration'},
        {type: 'doc', id: 'greywall/import-claude', label: 'Import from Claude Code'},
        {
          type: 'category',
          label: 'Recipes',
          collapsed: true,
          items: [
            {type: 'doc', id: 'greywall/recipes/index', label: 'Overview'},
            {type: 'doc', id: 'greywall/recipes/npm-install', label: 'npm install'},
            {type: 'doc', id: 'greywall/recipes/pip-poetry', label: 'pip / poetry'},
            {type: 'doc', id: 'greywall/recipes/git-clone', label: 'git clone'},
            {type: 'doc', id: 'greywall/recipes/ci', label: 'CI Jobs'},
          ],
        },
        {type: 'doc', id: 'greywall/troubleshooting', label: 'Troubleshooting'},
        {type: 'doc', id: 'greywall/faq', label: 'FAQ'},
      ],
    },

    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        {type: 'doc', id: 'greywall/cli-reference', label: 'CLI Reference'},
        {type: 'doc', id: 'greywall/configuration', label: 'Configuration'},
        {type: 'doc', id: 'greywall/templates', label: 'Config Templates'},
        {type: 'doc', id: 'greywall/platform-support', label: 'Platform Support'},
        {type: 'doc', id: 'greywall/linux-security-features', label: 'Linux Security Features'},
        {type: 'doc', id: 'greywall/security-model', label: 'Security Model'},
        {type: 'doc', id: 'greywall/architecture', label: 'Architecture'},
        {type: 'doc', id: 'greywall/library', label: 'Go Library'},
        {type: 'doc', id: 'greywall/benchmarking', label: 'Benchmarking'},
        {type: 'doc', id: 'greywall/testing', label: 'Testing'},
      ],
    },

    {type: 'doc', id: 'greywall/contributing', label: 'Contributing'},
  ],

  greyproxySidebar: [
    {type: 'doc', id: 'greyproxy/index', label: 'Overview'},
    {type: 'doc', id: 'greyproxy/quickstart', label: 'Quickstart'},
    {type: 'doc', id: 'greyproxy/using-with-greywall', label: 'Using with Greywall'},

    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        {type: 'doc', id: 'greyproxy/architecture', label: 'How It Works'},
        {type: 'doc', id: 'greyproxy/dashboard', label: 'Dashboard'},
        {type: 'doc', id: 'greyproxy/rules', label: 'Rules Reference'},
        {type: 'doc', id: 'greyproxy/troubleshooting', label: 'Troubleshooting'},
      ],
    },

    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        {type: 'doc', id: 'greyproxy/cli-reference', label: 'CLI Reference'},
        {type: 'doc', id: 'greyproxy/configuration', label: 'Configuration'},
        {type: 'doc', id: 'greyproxy/api', label: 'REST API'},
      ],
    },
  ],
};

export default sidebars;
