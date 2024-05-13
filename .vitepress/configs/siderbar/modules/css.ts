import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '布局',
    collapsed: false,
    items: [{ text: 'grid布局', link: '/css/css布局/grid布局.md' }],
  },
  {
    text: '效果',
    collapsed: false,
    items: [{ text: '拖拽分栏', link: '/css/css效果/拖拽分栏.md' }],
  },
  {
    text: '一些css',
    collapsed: false,
    items: [{ text: 'css代码块', link: '/css/css代码块/index.md' }],
  },
] as DefaultTheme.SidebarItem[]
