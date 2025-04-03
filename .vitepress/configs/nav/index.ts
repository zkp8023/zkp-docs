import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '基础',
    items: [
      { text: 'css', link: '/web/css/css布局/grid布局' },
      { text: 'javaScript', link: '/web/javaScript/Api/IntersectionObserver' },
      { text: 'typeScript', link: '/web/typeScript/type/typeScript基础类型' },
      { text: 'git', link: '/web/git/git' },
    ],
  },
  {
    text: '框架',
    items: [
      { text: 'vue', link: '/web/vue/vite/vite项目' },
      { text: 'react', link: '/web/react/index' },
    ],
  },
  {
    text: '其他',
    items: [
      {
        text: '杂项',
        items: [
          { text: '导航', link: '/web/webNav/official-website' },
          { text: '插件', link: '/web/plugins/sortable' },
          { text: '记录', link: '/web/jottings/code-snippets/javaScript' },
        ],
      },
    ],
  },
]
