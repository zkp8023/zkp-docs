/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'
export const AutoRegistryComponents = () => {
  return Components({
    // 自定义可自动导入的文件夹目录 默认src/components
    dirs: ['src/components'],
    dts: 'types/components.d.ts',
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), AntDesignVueResolver()],
  })
}
