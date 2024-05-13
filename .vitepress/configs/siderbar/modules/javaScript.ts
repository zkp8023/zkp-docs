import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Api',
    collapsed: false,
    items: [
      { text: 'IntersectionObserver', link: '/javaScript/Api/IntersectionObserver' },
      { text: 'ResizeObserver', link: '/javaScript/Api/ResizeObserver' },
      { text: 'MutationObserver', link: '/javaScript/Api/MutationObserver' },
    ],
  },
  {
    text: '视窗尺寸位置',
    collapsed: false,
    items: [
      { text: 'window视图', link: '/javaScript/sizePosition/window视图' },
      { text: 'element元素视图', link: '/javaScript/sizePosition/element元素视图' },
      { text: '鼠标位置', link: '/javaScript/sizePosition/鼠标位置' },
    ],
  },
  {
    text: '事件',
    collapsed: false,
    items: [
      { text: '拖拽', link: '/javaScript/event/拖拽事件' },
    ],
  },
  {
    text: '其他',
    collapsed: false,
    items: [
      { text: '迭代器和生成器', link: '/javaScript/other/iterator-generator' },
      { text: 'js树形结构', link: '/javaScript/other/js树形结构' },
    ],
  },

] as DefaultTheme.SidebarItem[]
