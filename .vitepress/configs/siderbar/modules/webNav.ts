import type { DefaultTheme } from 'vitepress'

const plugins: DefaultTheme.SidebarItem = {
  text: '插件',
  collapsed: false,
  items: [
    { text: 'vue', link: '/webNav/plugins/vue-plugins' },
    { text: 'react', link: '/webNav/plugins/react-plugins' },
    { text: '动画', link: '/webNav/plugins/animate-plugins' },
    { text: '其他', link: '/webNav/plugins/other' },
  ],
}
const others: DefaultTheme.SidebarItem = {
  text: '其他',
  collapsed: false,
  items: [
    { text: '官网', link: '/webNav/official-website' },
    { text: '工具', link: '/webNav/tools' },
    { text: '文章', link: '/webNav/article' },
    { text: '开源项目', link: '/webNav/openSource' },
  ],
}

export default [
  {
    text: 'Css',
    link: '/webNav/css',
  },
  {
    text: 'Js、Ts',
    link: '/webNav/javaScript',
  },
  {
    text: '资料',
    link: '/webNav/resource',
  },
  // 插件
  plugins,
  others,
]
