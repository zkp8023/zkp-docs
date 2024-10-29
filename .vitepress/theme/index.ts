import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import escookTheme from '@escook/vitepress-theme'
import { useComponents } from './useComponents'
// 2. 导入配套的 CSS 样式（此步骤不能省略）
import '@escook/vitepress-theme/style.css'
// 自定义样式
import './style/index.css'

export default {
  ...DefaultTheme,
  extends: escookTheme,
  Layout: () => {
    return h(escookTheme.Layout, null, {
      // 'nav-bar-content-before': () => h(Player),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp: async (ctx) => {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
  },
} satisfies Theme
