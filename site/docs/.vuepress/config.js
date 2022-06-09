const navConfig = require('./nav-config');
const sidebarConfig = require('./sidebar-config');

module.exports = {
  base: '/infra/docs/hxmui-doc',
  description: '同花顺移动端 Vue 组件',
  head: [
    ['meta', {
      name: 'theme-color',
      content: '#e93030'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }]
  ],
  themeConfig: {
    logo: 'http://testm.10jqka.com.cn/jpage/sjq/logo.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: navConfig,
    sidebar: sidebarConfig
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}