/**
 * iconify icon支持
 */
import Icons from 'unplugin-icons/vite'
export const ConfigIcons = () => {
  return Icons({
    scale: 1.8, // 缩放 单位em 配置了但是没变化  不知道为啥 项目中还是改为1比较好
    defaultStyle: '', // icon默认的样式  display:inline-block; margin:20px;
    defaultClass: '', // 给icon添加默认的类名
    compiler: 'vue3', // 'vue2', 'vue3', 'jsx'  解析图标模式
    jsx: 'react', // 'react' or 'preact'  jsx支持 可以不要 就用默认的
  })
}
