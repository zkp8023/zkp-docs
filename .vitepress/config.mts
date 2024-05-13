import { defineConfigWithTheme } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import escookConfig from '@escook/vitepress-theme/config'
import { nav, sidebar, socialLinks } from './configs'

export default defineConfigWithTheme ({
  title: '给我一个div',
  // base: '/docs/',
  srcDir: 'guide',
  // outDir: '../dist',
  metaChunk: true,
  lastUpdated: true,
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
      text: '在gitee上编辑',
    },
    // confetti: false,
    musicBall: {
      list: [
        {
          name: 'a place nearby',
          src: '/docs/nearby.mp3',
        },
        // {
        //   name: 'flower dance',
        //   src: 'http://m801.music.126.net/20240508112638/6ca06de1b610b3116bc2594453067ebb/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/29521701633/054e/269e/228b/aa5ae665123186c9a37fd854217825d6.mp3',
        // },
        // {
        //   name: '城南花已开',
        //   src: 'http://ws.stream.qqmusic.qq.com/M500004FuPTN0e7m7x.mp3?guid=10000&vkey=100D0A2AA2E794F0CE704FE182E3F8C7E8EE3A44A662BBAEB08087FE1159137F2A3342C153B5C70FED8FE84506AA4E93CB51A84A5D2A0002&uin=&fromtag=120042',
        // },
        // {
        //   name: 'until you',
        //   src: 'https://sr-sycdn.kuwo.cn/620f9d9be3de0c26208627aa963f333d/663aec11/resource/n2/89/56/529354544.mp3',
        // },
      ],
      autoplay: true,
    },
  },
  head: [['link', { rel: 'icon', href: '/docs/lufei.png' }]],

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
