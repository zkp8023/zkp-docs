import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'vite',
    collapsed: false,
    items: [
      { text: '环境变量和模式', link: '/web/vue/vite/环境变量和模式' },
      { text: 'vite项目', link: '/web/vue/vite/vite项目' },
      { text: 'vite配置', link: '/web/vue/vite/vite配置' },
    ],
  },
  {
    text: 'vue',
    collapsed: false,
    items: [
      { text: 'unplugin-icons', link: '/web/vue/vue/unplugin-icons' },
      { text: 'unocss', link: '/web/vue/vue/unocss' },
      { text: 'vue-tsx', link: '/web/vue/vue/vue-tsx' },
      { text: 'hooks', link: '/web/vue/vue/hooks' },
      { text: 'i18n', link: '/web/vue/vue/i18n' },
    ],
  },
  {
    text: '组件',
    collapsed: false,
    items: [
      { text: 'transition', link: '/web/vue/vue组件/transition' },
      { text: 'schema-form', link: '/web/vue/vue组件/schema-form' },
    ],
  },
  {
    text: '组件库',
    collapsed: false,
    items: [{ text: 'antd定制主题', link: '/web/vue/组件库/antd定制主题' }],
  },
] as DefaultTheme.SidebarItem[]
