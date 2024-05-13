import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '基础',
    items: [
      { text: 'css', link: '/css/css布局/grid布局' },
      { text: 'javaScript', link: '/javaScript/Api/IntersectionObserver' },
      { text: 'typeScript', link: '/typeScript/type/typeScript基础类型' },
      { text: 'git', link: '/git/git' },
    ],
  },
  {
    text: '框架',
    items: [
      { text: 'vue', link: '/vue/vite/vite项目' },
      { text: 'react', link: '/react/index' },
    ],
  },
  {
    text: '其他',
    items: [
      {
        text: '杂项',
        items: [
          { text: '导航', link: '/webNav/official-website' },
          { text: '插件', link: '/plugins/sortable' },
          { text: '记录', link: '/jottings/code-snippets/javaScript' },
        ],
      },
    ],
  },
]
