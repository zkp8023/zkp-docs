// 动画
export const animationList: ICard2[] = [
  {
    name: 'GSAP',
    desc: '超强的前端动画库,拖拽,文字,滚动,各种相关插件',
    img: '/docs/images/plugins/gsap.png',
    src: 'https://gsap.com/docs/v3/Installation',
  },
  {
    name: 'animXYZ',
    desc: '好用的动画库,支持vue2,vue3,react,实时调试',
    img: '/docs/images/plugins/AnimXYZ.svg',
    src: 'https://animxyz.com/docs#the-basics',
  },

  {
    name: 'animejs',
    desc: '好用的动画库,演示效果很清楚',
    img: '/docs/images/plugins/anime.svg',
    imgStyle: { width: '150px' },
    src: 'https://animejs.com/documentation/#delay',
  },
  {
    name: 'react-spring',
    desc: '构建交互式、数据驱动和动画 UI 组件的库,适用react',
    img: '/docs/images/plugins/react-spring.svg',
    src: 'https://www.react-spring.dev/docs/getting-started',
  },
  {
    name: 'Framer Motion',
    desc: '简单,强大的 React 运动库',
    img: '/docs/images/plugins/framer-motion.jpg',
    src: 'https://www.framer.com/motion/introduction/',
  },
  {
    name: 'popmotion',
    desc: '为framer motion提供支持的动画库',
    img: '/docs/images/plugins/popmotion.svg',
    src: 'https://popmotion.io/',
  },
  {
    name: 'barba.js',
    desc: 'barba.js 页面过渡动画',
    img: '/docs/images/plugins/barba.png',
    src: 'https://barba.js.org/docs/getstarted/intro/',
  },
  {
    name: 'AutoAnimate',
    desc: '零配置的嵌入式动画实用程序',
    img: '/docs/images/plugins/autoAnimate.svg',
    src: 'https://auto-animate.formkit.com/#usage',
    tooltip: '简单易用,支持vue,react等多框架',
  },
  {
    name: 'Proton 粒子动画',
    desc: '轻量级且功能强大的 Javascript 粒子动画库',
    img: '/docs/images/plugins/proton.svg',
    imgStyle: { width: '150px' },
    src: 'https://drawcall.github.io/Proton/#examples',
  },
  {
    name: 'tsParticles 粒子动画',
    desc: '非常强大的粒子动画库',
    img: '/docs/images/plugins/tsParticles.png',
    imgStyle: { width: '150px' },
    src: 'https://particles.js.org/',
    tooltip: '适配多框架以及原生javaScript,多个预设(可单独下载预设使用)',
  },
  {
    name: 'canvas-confetti五彩纸屑',
    desc: 'canvas-confetti五彩纸屑粒子',
    imgStyle: { width: '150px' },
    src: 'https://www.kirilv.com/canvas-confetti/',
    tooltip: '作为了tsParticles其中一个预设,也可以单独引入使用',
  },
  {
    name: 'svg.js',
    desc: '用于操作 SVG 和制作动画的轻量级库。',
    img: '/docs/images/plugins/svgJs.png',
    src: 'https://svgjs.dev/docs/3.0/',
  },

]

export const cssAnimationList: ICard2[] = [
  {
    name: 'animate.css',
    desc: '一些css animation',
    img: '/docs/images/plugins/animate-css.png',
    src: 'https://animate.style/',
  },
  {
    name: 'animista css的各种动画',
    desc: '动画调试 , 动画效果 , text动画',
    img: '/docs/images/plugins/animista.svg',
    src: 'https://animista.net/play/basic',
  },
]

animationList.forEach((it) => {
  it.style = {
    flex: '45%',
    justifyContent: 'start',
  }
})

cssAnimationList.forEach((it) => {
  it.style = {
    flex: '45%',
    justifyContent: 'center',
  }
})