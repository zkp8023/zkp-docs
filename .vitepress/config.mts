import { defineConfigWithTheme } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import escookConfig from '@escook/vitepress-theme/config'
import { nav, sidebar, socialLinks } from './configs'

export default defineConfigWithTheme ({
  title: '给我一个div',
  srcDir: 'guide',
  // outDir: '../dist',
  metaChunk: true,
  lastUpdated: false, // 是否显示最后更新时间
  extends: escookConfig,
  themeConfig: {
    search: {
      provider: 'local',
      // options: {
      //   detailedView: false,
      //   // apiKey: '763aa4f4f23caef295c4433ca76ce6a2',
      //   // indexName: 'zkpDocs',
      //   // appId: 'VSNNG7UFXS',
      // },
      // 本地搜索配置项
      options: {
        // detailedView: auto, //默认auto 是否搜索时预览
        // disableQueryPersistence: true, // 禁用搜索结果保留,第一次搜索关闭之后第二次打开还在
        translations: {
          button: {
            buttonText: '搜索文档',
          },
          modal: {
            displayDetails: '切换详情',
            resetButtonTitle: '重置',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    siteTitle: '给我一个div', // 文档标题
    logo: '/lufei.png',
    lastUpdatedText: '上次更新',
    sidebar,
    nav,
    outline: {
      level: 'deep',
      // label: '当前页',
    },
    socialLinks,
    editLink: {
      pattern: 'https://gitee.com/z-k-p/docs/tree/master/packages/docs/guide/:path',
      text: 'github',
    },
    musicBall: {
      list: [
        {
          name: 'a place nearby',
          src: '/nearby.mp3',
        },
      ],
      autoplay: false,
    },
  },
  head: [['link', { rel: 'icon', href: '/lufei.png' }]],

  markdown: {
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'one-dark-pro' },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '注意',
      infoLabel: '信息',
      detailsLabel: '点击查看',
    },
    toc: { level: [1, 2] },
    config: (md) => {
      // @ts-expect-error
      md.use(demoBlockPlugin)
    },
  },
})
