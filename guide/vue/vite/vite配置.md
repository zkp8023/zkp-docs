## vite 常用配置

```typescript
// 安装@types/node
// 也可以使用process.cwd() 代表程序执行目录，也就是项目根目录
import path from 'path'
const resolve = (dir: string) => path.resolve(__dirname, dir);
export default defineConfig(({ command, mode }) => {
  return {
  //  项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
   root: './',// 默认process.cwd()
   base: './',// 开发或生产环境服务的公共基础路径
   publicDir: resolve('public'),// 静态资源路径
   mode: 'production', // 指定mode，会覆盖掉serve和build默认的mode
   cacheDir: 'node_modules/.vite',// 默认vite缓存路径
   logLevel: 'warn',// 控制台输出的级别，error|info|silent|warn 默认 info 那么所有的日志都会打印出来
   esbuild：{
        jsxFactory: 'h',
        jsxFragment: 'Fragment' 以上为自定义JSX
        // ESbuild会被应用在 ts、jsx、tsx 文件，以下选项对要处理的文件类型进行配置
        include：string | RegExp | (string | RegExp)[]
        exclude：string | RegExp | (string | RegExp)[]
        jsxInject:`import React from 'react'`// 自动为每一个被 ESbuild 转换的文件注入内容
    }
   clearScreen: true,// 控制台是否清屏，最好不要设置，设置会屏蔽掉一些关键终端信息
   envDir: '',// 加载存放.env文件的目录
   envPrefix: 'VITE_',// 默认VITE_， 设置环境变量的前缀
   appType: 'spa',// 应用种类 spa | mpa | custom
   assetsInclude: [''],// 支持的其他类型文件都可以在这里找到
   plugins: [vue(),checker({typescript:true})],
   css:{},
   resolve: {
       alias: {
         "@": resolve('src'),// 简化引用路径，用@代替
       },
       dedupe: [],// 强制Vite始终将列出的依赖项解析为同一副本（从项目根目录）
       conditions: [],// 解析pageage.json中情景导出时的其他允许条件，如exports字段中的import和require为情景
       mainFields: [],// 解析包的入口点时尝试的字段列表
       extensions: [],// 导入时想要省略的扩展名列表
       preserveSymlinks: false,//
    },
  },
  json: {
      namedExports: true,// 是否支持从.json文件中进行按名导入
      stringify: false,// 导入的json转换为export default JSON.parse("...")
  },
  // 服务器相关
  server:{
    ....
    //服务器代理
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:2022',
          // changeOrigin: true,// 代理时，host默认浏览器的host，为true，host为target的值
          // rewrite:path=>path.replace(/^\/adc/,'')  // 重写url路径
         }
       }
   ...
  },
  build: {
  manifest: false,// 是否生成一个 manifest.json 的文件在assets目录下
  target: 'modules',
  outDir: mode === 'staging' ? 'bundle' : 'dist',
  modulePreload: true,// 是否动态引入polyfill，需要引入兼容性相关的文件
  assetsDir: 'assets',// 指定打包生成静态资源的存放路径
  assetsInlineLimit: 4096,// 默认4kb 配置图片编译base64时大小，大于以原文件引入，小于会直接编译
  chunkSizeWarningLimit: 500,// 打包文件超大小警告显示，默认500kbs
  emptyOutDir: true,// 构建时是否清空OutDir，再把新构建的文件放进去
  watch: [''], // 监听文件变化，如果启动build不会退出程序,
  sourcemap:false,// 构建后是否生成 source map 文件
  ....
},
  ssr:{},// 服务器渲染配置
  preview:{},// 预览生产环境配置
  worker:{},// worker线程相关配置
  optimizeDeps:{},// 依赖优化配置
})
```
