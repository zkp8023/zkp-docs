<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue'
/**
 *
 * @param el 需要拖拽的元素 设置绝对定位
 */
const dragEl = (el: HTMLElement) => {
  if (!el)
    return

  let flag = false
  let x = 0
  let y = 0
  const parent = el.offsetParent as HTMLElement || document
  const move = (e: MouseEvent) => {
    if (!flag)
      return
    const left = e.clientX - x
    const top = e.clientY - y
    /**
     * 限定当前元素活动在其父级元素内
     *  当前元素的第一个带定位祖先减去当前元素的宽高
     */
    // 元素垂直水平方向的可活动范围
    const w = parent.offsetWidth - el.offsetWidth
    const h = parent.offsetHeight - el.offsetHeight
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
    // el.removeEventListener('mousedown', down)
    document.removeEventListener('mousemove', move)
  }
  el.addEventListener('mousedown', down)
  // 鼠标弹起事件绑定在文档上,防止鼠标移出当前元素跟随
  document.addEventListener('mouseup', up)

  // 卸载清除事件
  onUnmounted(() => {
    el.removeEventListener('mousedown', down)
  })
}

onMounted(() => {
  const drag = document.querySelector('.drag') as HTMLDivElement
  dragEl(drag)
})
</script>

<script lang="ts">
export default {
  name: 'DragElement',
}
</script>

<template>
  <div class="wraper w-full h-500px bg-sky relative">
    <div ref="drag" class="drag absolute size-80px text-white fcc bg-red cur-p select-none">
      给我一个div
    </div>
  </div>
</template>
