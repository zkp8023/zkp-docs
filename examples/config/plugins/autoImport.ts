/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'types/auto-imports.d.ts',
    imports: [
      'vue',
      'pinia',
      'vue-router',
      '@vueuse/core',
      {
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
    ],
    resolvers: [
      ElementPlusResolver(),
      AntDesignVueResolver(),
    ],
    eslintrc: {
      // 解决自动导入和eslint冲突
      enabled: true,
      // 指定解决文件
      // filepath: '../../types/.eslintrc-auto-import.json',
    },
  })
}
