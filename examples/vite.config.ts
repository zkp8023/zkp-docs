import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createVitePlugins } from './config/plugins'
import { VITE_PORT } from './config/constant'
import proxy from './config/proxy'

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  console.log('mode', mode)
  console.log('command', command)
  const isBuild = command === 'build'
  const viteEnv = loadEnv(mode, process.cwd())
  console.log('viteEnv', viteEnv)
  return {
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: {
        '@': './src',
      },
    },
    build: {
      assetsInlineLimit: 1024 * 20,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id: string) {
            if (id.includes('node_modules'))
              return 'vender'
          },
        },
      },
    },
    css: {
      devSourcemap: !isBuild,
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: true, // IP配置，支持从IP启动
      proxy,
    },
    // optimizeDeps: {
    //   include: ['ant-design-vue', 'element-plus', 'sortablejs', 'animate.css', 'vue3-seamless-scroll'],
    // },
  }
})
