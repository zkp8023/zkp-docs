/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
// import { ConfigVisualizerConfig } from './visualizer'
// import { ConfigCompressPlugin } from './compress'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // unocss
    Unocss(),
    // compression(),
    // 提供https证书
    // VitePluginCertificate({
    //   source: 'coding',
    // }) as PluginOption,
  ]

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents())

  // 自动按需引入依赖
  vitePlugins.push(AutoImportDeps())

  // 开启.gz压缩  rollup-plugin-gzip
  // vitePlugins.push(ConfigCompressPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))

  // rollup-plugin-visualizer
  // vitePlugins.push(ConfigVisualizerConfig())

  // vitePlugins.push(ConfigImageminPlugin())

  return vitePlugins
}
