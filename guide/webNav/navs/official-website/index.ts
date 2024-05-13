//  官网地址
export { taobaoComs, TencentComs, bytedanceComs, otherComs } from './ui-components'
export { otherOfficial } from './others'
export { toolsList } from './tools'

// vue
export const vueList: ICard2[] = [
  {
    name: 'Vue',
    img: '/images/official/Vue.svg',
    src: 'https://cn.vuejs.org/guide/quick-start.html',
  },
  {
    name: 'Nuxt',
    img: '/assets/images/official/nuxt.svg',
    enSrc: 'https://nuxt.com/',
    zhSrc: 'https://www.nuxt.com.cn/',
  },

  {
    name: 'VueUse',
    img: '/assets/images/official/vueuse.svg',
    src: 'https://vueuse.org/guide/',
  },
  {
    name: 'Vue-Router',
    img: '/assets/images/official/Vue.svg',
    src: 'https://router.vuejs.org/zh/guide/',
  },
  {
    name: 'Vuex',
    img: '/assets/images/official/Vue.svg',
    src: 'https://vuex.vuejs.org/zh/installation.html',
  },
  {
    name: 'Pinia',
    img: '/assets/images/official/pinia.svg',
    src: 'https://pinia.vuejs.org/zh/getting-started.html',
  },
  {
    name: 'Vue Macros',
    img: '/assets/images/official/macros-vue.svg',
    src: 'https://vue-macros.dev/zh-CN/',
    tooltip: '探索更多宏和语法糖到 Vue 中',
  },

  {
    name: 'Vue-Request',
    img: '/assets/images/official/vue-request.png',
    src: 'https://www.attojs.com/guide/introduction.html',
  },
  {
    name: 'Vue-i18n',
    img: '/assets/images/official/vue-i18n.svg',
    src: 'https://vue-i18n.intlify.dev/',
  },

  {
    name: 'uniapp',
    img: '/assets/images/official/uni-app.svg',
    src: 'https://zh.uniapp.dcloud.io',
  },
  {
    name: 'Tresjs',
    img: '/assets/images/official/tres.svg',
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
    img: '/assets/images/official/React.svg',
    enSrc: 'https://react.dev/',
    // enSrc: 'https://react.docschina.org',
    zhSrc: 'https://react.nodejs.cn/',
    desc: '',
  },

  {
    name: 'React-Router6',
    img: '/assets/images/official/react-router.svg',
    enSrc: 'https://reactrouter.com/en/6.20.0/docs/en/v6',
    zhSrc: 'https://baimingxuan.github.io/react-router6-doc/route/route.html',
  },
  {
    name: 'Umijs',
    img: '/assets/images/official/umijs.png',
    src: 'https://umijs.org/docs/introduce/introduce',
  },
  {
    name: 'Pmndrs.docs',
    img: '/assets/images/official/Zustand.png',
    imgStyle: { width: '75px' },
    src: 'https://docs.pmnd.rs/',
    desc: 'Zustand , Jotai , Valtio...',
    tooltip: 'react社区相关生态,动画,各种流派状态管理...',
  },
  {
    name: 'SWR',
    img: '/assets/images/official/swr.svg',
    imgStyle: { width: '75px' },
    src: 'https://swr.nodejs.cn/',
    desc: 'react请求库',
    tooltip: '用于数据请求的 React 钩子',
  },
  {
    name: 'react-use',
    img: '/assets/images/official/React.svg',
    src: 'https://streamich.github.io/react-use/?path=/story/components-usekey--demo',
    desc: 'react-hooks',
  },
  {
    name: 'ahooks',
    img: '/assets/images/official/ahooks.svg',
    imgStyle: { width: '90px' },
    src: 'https://ahooks.gitee.io/zh-CN/guide',
    desc: 'react-hooks',
  },
  {
    name: 'React Redux',
    img: '/assets/images/official/Redux.svg',
    enSrc: 'https://react-redux.js.org/introduction/getting-started',
    zhSrc: 'https://redux.nodejs.cn/',
    desc: '',
  },
  {
    name: 'Redux-Toolkit',
    img: '/assets/images/official/Redux.svg',
    src: 'https://redux-toolkit.js.org/usage/usage-guide',
    desc: '',
  },
  {
    name: 'Recoil',
    img: '/assets/images/official/Recoil.svg',
    imgStyle: { width: '90px' },
    src: 'https://recoiljs.org/zh-hans/docs/introduction/core-concepts/',
    desc: '',
  },
  {
    name: 'mobx',
    img: '/assets/images/official/mobx.png',
    zhSrc: 'https://cn.mobx.js.org/',
    otherStr: 'https://mobx.nodejs.cn/',
    otherStrDesc: '社区中文',
    tooltip: 'react响应流派状态管理库',
  },
  {
    name: 'React Native',
    img: '/assets/images/official/React.svg',
    enSrc: 'https://reactnative.dev/docs/environment-setup',
    zhSrc: 'https://rn.nodejs.cn/',
    desc: '',
  },
  {
    name: 'React-Navigation',
    img: '/assets/images/official/React-Navigation.svg',
    src: 'https://reactnavigation.org/docs/getting-started/',
    tooltip: 'React Native 应用程序的路由和导航',
  },
  // @ts-expect-error
  {},
  // @ts-expect-error
  {},
]
export const electronList: ICard2[] = [
  {
    name: 'Electron',
    img: '/assets/images/official/electron.svg',
    zhSrc: 'https://www.electronjs.org/zh/docs/latest/',
    otherStr: 'https://electron.nodejs.cn/',
    otherStrDesc: '社区中文',
  },
  {
    name: 'Electron Forge',
    img: '/assets/images/official/electron.svg',
    src: 'https://www.electronforge.io/',
    desc: '快速构建 Electron 项目',
    tooltip: '打包和分发 Electron 应用程序的一体化工具',
  },
  {
    name: 'electron-vite-vue',
    img: '/assets/images/official/electron-vite-vue.svg',
    src: 'https://electron-vite.github.io/',
    desc: 'electron+vite',
    tooltip: 'electron、vite方案',
  },
  {
    name: 'electron-vite',
    img: '/assets/images/official/electron-vite.svg',
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
    img: '/assets/images/official/sass.svg',
    enSrc: 'https://sass-lang.com/documentation/',
    zhSrc: 'https://sass.nodejs.cn/documentation/',
    desc: '',
  },
  {
    name: 'Less',
    img: '/assets/images/official/less.png',
    imgStyle: { width: '80px', height: '50px' },
    enSrc: 'https://lesscss.org/',
    zhSrc: 'https://less.nodejs.cn/',
    desc: '',
  },
  {
    name: 'UnoCss',
    img: '/assets/images/official/unocss.svg',
    imgStyle: { width: '55px', height: '55px' },
    enSrc: 'https://unocss.dev/interactive/',
    zhSrc: 'https://unocss.nodejs.cn/guide/',
    tooltip: '配置灵活,简单,好用的原子css引擎',
    desc: '即时原子 CSS 引擎',
  },
  {
    name: 'Tailwind CSS',
    img: '/assets/images/official/tailwindcss.svg',
    enSrc: 'https://tailwindcss.com/docs/installation',
    zhSrc: 'https://tailwind.nodejs.cn/docs/installation',
    tooltip: '功能强大的原子化css框架',
    desc: '',
  },
  {
    name: 'Windi CSS',
    img: '/assets/images/official/windicss.svg',
    enSrc: 'https://windicss.org/',
    zhSrc: 'https://cn.windicss.org/guide/',
    tooltip: '官网已停止维护',
    desc: '',
  },
  {
    name: 'Bootstrap',
    img: '/assets/images/official/Bootstrap.svg',
    enSrc: 'https://getbootstrap.com/',
    zhSrc: 'https://bootstrap.nodejs.cn/',
    desc: '',
  },
  {
    name: 'styled components',
    img: '/assets/images/official/styledcomponents.svg',
    enSrc: 'https://styled-components.com/',
    zhSrc: 'https://styled-components.nodejs.cn/',
    desc: 'css in js',
  },
  {
    name: 'styleX',
    img: '/assets/images/official/styleX.svg',
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
    img: '/assets/images/official/iconfont.svg',
    imgStyle: { width: '120px' },
    src: 'https://www.iconfont.cn/',
    desc: '阿里图标库',
  },
  {
    name: 'Yesicon',
    img: '/assets/images/official/yesicon.svg',
    src: 'https://yesicon.app/',
    desc: '20万+图标',
  },
  {
    name: 'iconify',
    img: '/assets/images/official/iconify.svg',
    src: 'https://iconify.design/docs/icon-components/vue/',
    otherStr: 'https://icones.netlify.app/',
    otherStrDesc: '镜像地址',
    desc: '在unplugin-icons中有介绍',
  },
  {
    name: 'IconPark',
    img: '/assets/images/official/iconpark.svg',
    imgStyle: { width: '120px', height: '60px' },
    src: 'https://iconpark.oceanengine.com/official',
    desc: '字节图标库',
  },

  {
    name: 'Emoji 表情大全',
    desc: '很全的Emoji',
    img: '/assets/images/tools/emoji.svg',
    src: 'https://www.emojiall.com/zh-hans',
  },
  {
    name: 'SearchEmoji',
    desc: '好多Emoji',
    img: '/assets/images/official/searchEmoji.png',
    src: 'https://searchemoji.app/zh-hans',
  },
]

// library
export const libraryList: ICard2[] = [
  {
    name: 'TypeScript',
    img: '/assets/images/official/typeScript.svg',
    enSrc: 'https://www.typescriptlang.org/',
    zhSrc: 'https://ts.nodejs.cn/',
  },
  {
    name: 'axios',
    img: '/assets/images/official/axios.svg',
    imgStyle: { width: '100px' },
    enSrc: 'https://axios-http.com/docs/intro',
    zhSrc: 'https://axios.nodejs.cn/docs/intro',
  },
  {
    name: 'Lodash',
    img: '/assets/images/official/lodash.png',
    src: 'https://www.lodashjs.com/',
  },
  {
    name: 'Day.js',
    img: '/assets/images/official/dayjs.svg',
    src: 'https://day.js.org/',
    otherStr: 'https://dayjs.gitee.io/docs/zh-CN/installation/installation',
    otherStrDesc: '国内镜像',
    tooltip: '轻量级处理时间和日期的 JavaScript 库',
  },
  {
    name: 'Unplugin',
    img: '/assets/images/official/unplugins.svg',
    src: 'https://unplugin.unjs.io/guide/',
    tooltip: '为各种构建工具提供统一插件系统的库',
  },
  {
    name: 'Mock.js',
    img: '/assets/images/official/mockjs.svg',
    src: 'http://mockjs.com/examples.html',
  },
]

// 鸿蒙
export const harmonyList: ICard2[] = [
  {
    name: 'OpenHarmony',
    img: '/assets/images/official/openHarmony.png',
    imgStyle: { width: '130px', height: '40px' },
    src: 'https://docs.openharmony.cn/',
  },
  {
    name: 'HarmonyOS',
    img: '/assets/images/official/harmony-os.svg',
    imgStyle: { width: '120px', height: '50px' },
    src: 'https://developer.huawei.com/consumer/cn/doc/',
  },
  // @ts-expect-error
  {},
]
