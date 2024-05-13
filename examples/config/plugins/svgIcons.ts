/**
 * @name SvgIconsPlugin
 * @description 加载SVG文件，自动引入
 */
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export const ConfigSvgIconsPlugin = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
