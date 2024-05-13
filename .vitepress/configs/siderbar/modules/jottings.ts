import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '代码段',
    collapsed: false,
    items: [
      { text: 'javaScript', link: '/jottings/code-snippets/javaScript' },
      { text: 'feature', link: '/jottings/code-snippets/feature' },
      { text: '手写', link: '/jottings/handwriting' },
    ],
  },
  {
    text: '杂项',
    collapsed: false,
    items: [
      { text: '面试', link: '/jottings/interview-blog' },
      { text: '事件循环', link: '/jottings/sundry/eventloop' },
      { text: 'sourceCode', link: '/jottings/sundry/sourceCode/reactivity' },
    ],
  },
] as DefaultTheme.SidebarItem[]
