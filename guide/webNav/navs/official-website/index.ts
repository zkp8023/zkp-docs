//  官网地址
export { taobaoComs, TencentComs, bytedanceComs, otherComs, crossPlatform } from './ui-components'
export { otherOfficial } from './others'
export { toolsList } from './tools'

// vue
export const vueList: ICard2[] = [
  {
    name: 'Vue',
    img: '/images/official/Vue.svg',
    zhSrc: 'https://cn.vuejs.org/guide/quick-start.html',
    enSrc: 'https://vuejs.org/',
  },
  {
    name: 'Nuxt',
    img: '/images/official/nuxt.svg',
    enSrc: 'https://nuxt.com/',
    zhSrc: 'https://www.nuxt.com.cn/',
  },

  {
    name: 'VueUse',
    img: '/images/official/vueuse.svg',
    enSrc: 'https://vueuse.org/guide/',
    zhSrc: 'https://vueuse.pages.dev/guide/',
  },
  {
    name: 'Vue-Router',
    img: '/images/official/Vue.svg',
    src: 'https://router.vuejs.org/zh/guide/',
  },
  {
    name: 'Vuex',
    img: '/images/official/Vue.svg',
    src: 'https://vuex.vuejs.org/zh/installation.html',
  },
  {
    name: 'Pinia',
    img: '/images/official/pinia.svg',
    src: 'https://pinia.vuejs.org/zh/getting-started.html',
  },
  {
    name: 'Vue Macros',
    img: '/images/official/macros-vue.svg',
    src: 'https://vue-macros.dev/zh-CN/',
    tooltip: '探索更多宏和语法糖到 Vue 中',
  },

  {
    name: 'Vue-Request',
    img: '/images/official/vue-request.png',
    src: 'https://www.attojs.com/guide/introduction.html',
  },
  {
    name: 'Vue-i18n',
    img: '/images/official/vue-i18n.svg',
    src: 'https://vue-i18n.intlify.dev/',
  },

  {
    name: 'uniapp',
    img: '/images/official/uni-app.svg',
    src: 'https://zh.uniapp.dcloud.io',
  },
  {
    name: 'Tresjs',
    img: '/images/official/tres.svg',
    src: 'https://docs.tresjs.org/zh/',
    imgStyle: { width: '110px' },
    desc: 'Vue + Three.js',
    tooltip: '使用vue语法开发3D场景',
  },
  // @ts-expect-error
  {},
]

// react
export const reactList: ICard2[] = [
  {
    name: 'React',
    img: '/images/official/React.svg',
    enSrc: 'https://react.dev/',
    // enSrc: 'https://react.docschina.org',
    zhSrc: 'https://react.nodejs.cn/',
    desc: '',
  },
  {
    name: 'Next.js',
    img: '/images/official/nextjs.svg',
    enSrc: 'https://nextjs.org/',
    // enSrc: 'https://react.docschina.org',
    zhSrc: 'https://next.nodejs.cn/docs',
  },

  {
    name: 'React-Router6',
    img: '/images/official/react-router.svg',
    enSrc: 'https://reactrouter.com/en/6.20.0/docs/en/v6',
    zhSrc: 'https://baimingxuan.github.io/react-router6-doc/route/route.html',
  },
  {
    name: 'Umijs',
    img: '/images/official/umijs.png',
    src: 'https://umijs.org/docs/introduce/introduce',
  },
  {
    name: 'Pmndrs.docs',
    img: '/images/official/Zustand.png',
    imgStyle: { width: '75px' },
    src: 'https://docs.pmnd.rs/',
    desc: 'Zustand , Jotai , Valtio...',
    tooltip: 'react社区相关生态,动画,各种流派状态管理...',
  },
  {
    name: 'SWR',
    img: '/images/official/swr.svg',
    imgStyle: { width: '75px' },
    src: 'https://swr.nodejs.cn/',
    desc: 'react请求库',
    tooltip: '用于数据请求的 React 钩子',
  },
  {
    name: 'react-use',
    img: '/images/official/React.svg',
    src: 'https://streamich.github.io/react-use/?path=/story/components-usekey--demo',
    desc: 'react-hooks',
  },
  {
    name: 'ahooks',
    img: '/images/official/ahooks.svg',
    imgStyle: { width: '90px' },
    src: 'https://ahooks.js.org/zh-CN',
    desc: 'react-hooks',
  },
  {
    name: 'React Redux',
    img: '/images/official/Redux.svg',
    enSrc: 'https://react-redux.js.org/introduction/getting-started',
    zhSrc: 'https://redux.nodejs.cn/',
    desc: '',
  },
  {
    name: 'Redux-Toolkit',
    img: '/images/official/Redux.svg',
    src: 'https://redux-toolkit.js.org/usage/usage-guide',
    desc: '',
  },
  {
    name: 'Recoil',
    img: '/images/official/Recoil.svg',
    imgStyle: { width: '90px' },
    src: 'https://recoiljs.org/zh-hans/docs/introduction/core-concepts/',
    desc: '',
  },
  {
    name: 'mobx',
    img: '/images/official/mobx.png',
    zhSrc: 'https://cn.mobx.js.org/',
    otherStr: 'https://mobx.nodejs.cn/',
    otherStrDesc: '社区中文',
    tooltip: 'react响应流派状态管理库',
  },
  {
    name: 'React Native',
    img: '/images/official/React.svg',
    enSrc: 'https://reactnative.dev/docs/environment-setup',
    zhSrc: 'https://rn.nodejs.cn/',
    desc: '',
  },
  {
    name: 'React-Navigation',
    img: '/images/official/React-Navigation.svg',
    src: 'https://reactnavigation.org/docs/getting-started/',
    tooltip: 'React Native 应用程序的路由和导航',
  },
  // @ts-expect-error
  {},
]
export const electronList: ICard2[] = [
  {
    name: 'Electron',
    img: '/images/official/electron.svg',
    zhSrc: 'https://www.electronjs.org/zh/docs/latest/',
    otherStr: 'https://electron.nodejs.cn/',
    otherStrDesc: '社区中文',
  },
  {
    name: 'Electron Forge',
    img: '/images/official/electron.svg',
    src: 'https://www.electronforge.io/',
    desc: '快速构建 Electron 项目',
    tooltip: '打包和分发 Electron 应用程序的一体化工具',
  },
  {
    name: 'electron-vite-vue',
    img: '/images/official/electron-vite-vue.svg',
    src: 'https://electron-vite.github.io/',
    desc: 'electron+vite',
    tooltip: 'electron、vite方案',
  },
  {
    name: 'electron-vite',
    img: '/images/official/electron-vite.svg',
    src: 'https://cn.electron-vite.org/',
    desc: 'electron+vite',
    tooltip: 'electron、vite另一个方案',
  },
  // @ts-expect-error
  {},
  // @ts-expect-error
  {},
]

// css
export const cssList: ICard2[] = [
  {
    name: 'Sass',
    img: '/images/official/sass.svg',
    enSrc: 'https://sass-lang.com/documentation/',
    zhSrc: 'https://sass.nodejs.cn/documentation/',
    desc: '',
  },
  {
    name: 'Less',
    img: '/images/official/less.png',
    imgStyle: { width: '80px', height: '50px' },
    enSrc: 'https://lesscss.org/',
    zhSrc: 'https://less.nodejs.cn/',
    desc: '',
  },
  {
    name: 'UnoCss',
    img: '/images/official/unocss.svg',
    imgStyle: { width: '55px', height: '55px' },
    enSrc: 'https://unocss.dev/interactive/',
    zhSrc: 'https://unocss.nodejs.cn/guide/',
    tooltip: '配置灵活,简单,好用的原子css引擎',
    desc: '即时原子 CSS 引擎',
  },
  {
    name: 'Tailwind CSS',
    img: '/images/official/tailwindcss.svg',
    enSrc: 'https://tailwindcss.com/docs/installation',
    zhSrc: 'https://tailwind.nodejs.cn/docs/installation',
    tooltip: '功能强大的原子化css框架',
    desc: '',
  },
  {
    name: 'Windi CSS',
    img: '/images/official/windicss.svg',
    enSrc: 'https://windicss.org/',
    zhSrc: 'https://cn.windicss.org/guide/',
    tooltip: '官网已停止维护',
    desc: '',
  },
  {
    name: 'Bootstrap',
    img: '/images/official/Bootstrap.svg',
    enSrc: 'https://getbootstrap.com/',
    zhSrc: 'https://bootstrap.nodejs.cn/',
    desc: '',
  },
  {
    name: 'styled components',
    img: '/images/official/styledcomponents.svg',
    enSrc: 'https://styled-components.com/',
    zhSrc: 'https://styled-components.nodejs.cn/',
    desc: 'css in js',
  },
  {
    name: 'styleX',
    img: '/images/official/styleX.svg',
    src: 'https://stylexjs.com/docs/learn/',
    desc: 'css in js',
  },
  // @ts-expect-error
  {},
]

// icon
export const iconList: ICard2[] = [
  {
    name: 'Iconfont',
    img: '/images/official/iconfont.svg',
    imgStyle: { width: '120px' },
    src: 'https://www.iconfont.cn/',
    desc: '阿里图标库',
  },
  {
    name: 'Yesicon',
    img: '/images/official/yesicon.svg',
    src: 'https://yesicon.app/',
    desc: '20万+图标',
  },
  {
    name: 'iconify',
    img: '/images/official/iconify.svg',
    src: 'https://iconify.design/docs/icon-components/vue/',
    otherStr: 'https://icones.netlify.app/',
    otherStrDesc: '镜像地址',
    desc: '在unplugin-icons中有介绍',
  },
  {
    name: 'svg-viewer',
    img: '/images/official/svg-viewer.svg',
    src: 'https://www.svgviewer.dev/',
    desc: 'svg图标编辑下载',
  },
  {
    name: 'IconPark',
    img: '/images/official/iconpark.svg',
    imgStyle: { width: '120px', height: '60px' },
    src: 'https://iconpark.oceanengine.com/official',
    desc: '字节图标库',
  },

  {
    name: 'Emoji 表情大全',
    desc: '很全的Emoji',
    img: '/images/tools/emoji.svg',
    src: 'https://www.emojiall.com/zh-hans',
  },
  {
    name: 'SearchEmoji',
    desc: '好多Emoji',
    img: '/images/official/searchEmoji.png',
    src: 'https://searchemoji.app/zh-hans',
  },
  // @ts-expect-error
  {},
  // @ts-expect-error
  {},
]

// library
export const libraryList: ICard2[] = [
  {
    name: 'TypeScript',
    img: '/images/official/typeScript.svg',
    enSrc: 'https://www.typescriptlang.org/',
    zhSrc: 'https://ts.nodejs.cn/',
  },
  {
    name: 'axios',
    img: '/images/official/axios.svg',
    imgStyle: { width: '100px' },
    enSrc: 'https://axios-http.com/docs/intro',
    zhSrc: 'https://axios.nodejs.cn/docs/intro',
  },
  {
    name: 'Alova.js',
    img: '/images/official/alova.svg',
    desc: '下一代请求工具',
    src: 'https://alova.js.org/zh-CN/tutorial/getting-started/introduce',
    tooltip: '貌似很强大的一个请求库',
  },
  {
    name: 'Lodash',
    img: '/images/official/lodash.png',
    src: 'https://www.lodashjs.com/',
  },
  {
    name: 'Day.js',
    img: '/images/official/dayjs.svg',
    src: 'https://day.js.org/zh-CN',
    // otherStr: 'https://dayjs.gitee.io/docs/zh-CN/installation/installation',
    // otherStrDesc: '国内镜像',
    desc: '好用轻量的时间日期js库',
  },
  {
    name: 'Unplugin',
    img: '/images/official/unplugins.svg',
    src: 'https://unplugin.unjs.io/guide/',
    tooltip: '为各种构建工具提供统一插件系统的库',
  },
  {
    name: 'Mock.js',
    img: '/images/official/mockjs.svg',
    src: 'http://mockjs.com/examples.html',
  },
  {
    name: 'luch request',
    src: 'https://www.quanzhan.co/luch-request/',
    desc: '基于Promise开发的uni-app跨平台请求库',
  },
  // @ts-expect-error
  {},
]

// 鸿蒙
export const harmonyList: ICard2[] = [
  {
    name: 'OpenHarmony',
    img: '/images/official/openHarmony.png',
    imgStyle: { width: '130px', height: '40px' },
    src: 'https://docs.openharmony.cn/',
  },
  {
    name: 'HarmonyOS',
    img: '/images/official/harmony-os.svg',
    imgStyle: { width: '120px', height: '50px' },
    src: 'https://developer.huawei.com/consumer/cn/doc/',
  },
  // @ts-expect-error
  {},
]
