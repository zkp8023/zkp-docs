/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import viteCompression from 'vite-plugin-compression2'
import { COMPRESSION } from '../constant'

export const ConfigCompressPlugin = () => {
  if (COMPRESSION) {
    return viteCompression({
      deleteOriginalAssets: true,
    })
  }
  return []
}
