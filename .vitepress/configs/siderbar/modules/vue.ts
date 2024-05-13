import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'vite',
    collapsed: false,
    items: [
      { text: '环境变量和模式', link: '/vue/vite/环境变量和模式' },
      { text: 'vite项目', link: '/vue/vite/vite项目' },
      { text: 'vite配置', link: '/vue/vite/vite配置' },
    ],
  },
  {
    text: 'vue',
    collapsed: false,
    items: [
      { text: 'unplugin-icons', link: '/vue/vue/unplugin-icons' },
      { text: 'unocss', link: '/vue/vue/unocss' },
      { text: 'vue-tsx', link: '/vue/vue/vue-tsx' },
      { text: 'hooks', link: '/vue/vue/hooks' },
      { text: 'i18n', link: '/vue/vue/i18n' },
    ],
  },
  {
    text: '组件',
    collapsed: false,
    items: [
      { text: 'transition', link: '/vue/vue组件/transition' },
      { text: 'schema-form', link: '/vue/vue组件/schema-form' },
    ],
  },
  {
    text: '组件库',
    collapsed: false,
    items: [{ text: 'antd定制主题', link: '/vue/组件库/antd定制主题' }],
  },
] as DefaultTheme.SidebarItem[]
