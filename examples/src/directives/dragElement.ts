import type { App, Directive } from 'vue'

export const setupDragElement = (app: App) => {
  let flag = false
  let x = 0
  let y = 0
  const dragElement: Directive = {
    mounted(el: HTMLElement) {
      const parent = el.offsetParent as HTMLElement || document
      // 元素垂直水平方向的可活动范围
      const w = parent.offsetWidth - el.offsetWidth
      const h = parent.offsetHeight - el.offsetHeight
      const move = (e: MouseEvent) => {
        if (!flag)
          return
        const left = e.clientX - x
        const top = e.clientY - y

        // 限定范围核心代码
        const lf = Math.min(Math.max(0, left), w)
        const tp = Math.min(Math.max(0, top), h)
        el.style.left = `${lf}px`
        el.style.top = `${tp}px`
      }
      const down = (e: MouseEvent) => {
        flag = true
        x = e.offsetX
        y = e.offsetY
        // 清除上次的事件
        document.addEventListener('mousemove', move)
      }

      const up = () => {
        flag = false
        document.removeEventListener('mousemove', move)
      }
      el.addEventListener('mousedown', down)
      // 鼠标弹起事件绑定在文档上,防止鼠标移出当前元素跟随
      document.addEventListener('mouseup', up)
    },
  }
  app.directive('dragElement', dragElement)
}
