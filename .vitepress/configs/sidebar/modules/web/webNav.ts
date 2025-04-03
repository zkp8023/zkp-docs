import type { DefaultTheme } from 'vitepress'

const plugins: DefaultTheme.SidebarItem = {
  text: '插件',
  collapsed: false,
  items: [
    { text: 'vue', link: '/web/webNav/plugins/vue-plugins' },
    { text: 'react', link: '/web/webNav/plugins/react-plugins' },
    { text: '动画', link: '/web/webNav/plugins/animate-plugins' },
    { text: '其他', link: '/web/webNav/plugins/other' },
  ],
}
const others: DefaultTheme.SidebarItem = {
  text: '其他',
  collapsed: false,
  items: [
    { text: '官网', link: '/web/webNav/official-website' },
    { text: '工具', link: '/web/webNav/tools' },
    { text: '文章', link: '/web/webNav/article' },
    { text: '开源项目', link: '/web/webNav/openSource' },
  ],
}

export default [
  {
    text: 'Css',
    link: '/web/webNav/css',
  },
  {
    text: 'Js、Ts',
    link: '/web/webNav/javaScript',
  },
  {
    text: '资料',
    link: '/web/webNav/resource',
  },
  // 插件
  plugins,
  others,
]
