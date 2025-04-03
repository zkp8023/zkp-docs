import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Api',
    collapsed: false,
    items: [
      { text: 'IntersectionObserver', link: '/web/javaScript/Api/IntersectionObserver' },
      { text: 'ResizeObserver', link: '/web/javaScript/Api/ResizeObserver' },
      { text: 'MutationObserver', link: '/web/javaScript/Api/MutationObserver' },
    ],
  },
  {
    text: '视窗尺寸位置',
    collapsed: false,
    items: [
      { text: 'window视图', link: '/web/javaScript/sizePosition/window视图' },
      { text: 'element元素视图', link: '/web/javaScript/sizePosition/element元素视图' },
      { text: '鼠标位置', link: '/web/javaScript/sizePosition/鼠标位置' },
    ],
  },
  {
    text: '事件',
    collapsed: false,
    items: [
      { text: '拖拽', link: '/web/javaScript/event/拖拽事件' },
    ],
  },
  {
    text: '其他',
    collapsed: false,
    items: [
      { text: '迭代器和生成器', link: '/web/javaScript/other/iterator-generator' },
      { text: 'js树形结构', link: '/web/javaScript/other/js树形结构' },
    ],
  },

] as DefaultTheme.SidebarItem[]
