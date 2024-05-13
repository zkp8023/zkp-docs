<script setup lang="ts">
// 记录鼠标点击事件初始时得鼠标位置合初始宽度
let flag: boolean
let startWidth,
  startX
// 获取元素函数
const $ = (tag: string) => document.querySelector(tag)
let leftContainer: HTMLDivElement
const mouseMoveHandle = (e: MouseEvent) => {
  if (flag)
    leftContainer!.style.width = `${e.clientX - startX + startWidth}px`
}
const mouseupHandle = () => {
  flag = false
  document.removeEventListener('mousemove', mouseMoveHandle)
  document.removeEventListener('mouseup', mouseupHandle)
}
onMounted(() => {
  leftContainer = $('.left') as HTMLDivElement
  console.log('$(\'.target\')', $('.target'))
  // @ts-expect-error
  $('.target')!.onmousedown = (e: MouseEvent) => {
    console.log('e', e)
    startWidth = leftContainer.getBoundingClientRect().width
    console.log('startWidth', startWidth)
    startX = e.clientX
    flag = true
    document.addEventListener('mousemove', mouseMoveHandle)
    document.addEventListener('mouseup', mouseupHandle)
  }
})
</script>

<template>
  <div class="flex container">
    <div class="left relative h-full max-w-400px min-w-200px w300px flex items-center justify-center bg-sky" resize>
      <img src="@/assets/lbxx.jpg" class="display is-align-center h-200px w-200px rounded-50%" alt="">
      <i class="target" />
    </div>
    <div class="flex-1 bg-violet-500" />
  </div>
</template>

<style scoped lang="scss">
.container {
   @apply wh-full;
   .target{
    @apply cursor-col h-full bg-[#f00] top-0 right-0 w-5px absolute block;
   }

}
.left{
  min-width: 200px;
}
</style>
