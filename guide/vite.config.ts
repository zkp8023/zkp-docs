import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { demoblockVitePlugin } from 'vitepress-theme-demoblock'
import viteCompression from 'vite-plugin-compression2'

export default defineConfig(() => {
  return {
    plugins: [
      Unocss(),
      ViteImageOptimizer(),
      demoblockVitePlugin(),
      viteCompression({
        deleteOriginalAssets: true,
      }),
    ],
    resolve: {
      alias: {
        '@/ex': '../examples/',
        '@img': './images/',
      },
    },
    build: {
      minify: 'esbuild' as const,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          /**
           * FIX: 下面的代码分包配置,开启器本地搜素后生产打包会报错: import MarkJS from './lib/mark'
           *  Cannot use import statement outside a module
           */
          // manualChunks(id) {
          //   if (id.includes('node_modules'))
          //     return 'vender'
          // },
        },
      },
    },
    server: {
      port: 8023,
      // open: true,
      host: true,
    },
  }
})