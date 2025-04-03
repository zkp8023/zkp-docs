import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '代码段',
    collapsed: false,
    items: [
      { text: 'javaScript', link: '/web/jottings/code-snippets/javaScript' },
      { text: 'feature', link: '/web/jottings/code-snippets/feature' },
      { text: '手写', link: '/web/jottings/handwriting' },
    ],
  },
  {
    text: '杂项',
    collapsed: false,
    items: [
      { text: '面试', link: '/web/jottings/interview-blog' },
      { text: '事件循环', link: '/web/jottings/sundry/eventloop' },
      { text: 'sourceCode', link: '/web/jottings/sundry/sourceCode/reactivity' },
    ],
  },
] as DefaultTheme.SidebarItem[]
