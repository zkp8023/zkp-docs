<script setup lang='ts'>
import { onMounted } from 'vue'
onMounted(() => {
  const wraper = document.querySelector('.wraper')
  const drag = document.querySelector('.drag')
  // 监听dragover事件  让拖拽元素可以在此被释放 并添加样式
  wraper?.addEventListener('dragover', (e) => {
    e.preventDefault()
    wraper.classList.add('active')
  })
  wraper?.addEventListener('dragleave', (e) => {
    wraper.classList.remove('active')
  })
  wraper?.addEventListener('drop', () => {
    wraper.appendChild(drag as Node)
    wraper.classList.remove('active')
  })
})
</script>
<script lang="ts">
export default {
  name: 'DragSimple',
}
</script>

<template>
  <div class="container flex justify-around h500px">
    <span
      class="drag block w100px h100px text-([#fff] 16px)
     bg-red-300 m-auto text-center cursor-pointer"
      draggable="true"
    >
      一个div
    </span>
    <div class="wraper w300px h300px bg-blue-400 m-auto">
      给我一个div
    </div>
  </div>
</template>

<style scoped lang='scss'>
// 拖拽到目标元素的时候添加样式
.active{
  transition: all .3s;
  transform: scale(1.2);
  background-color: greenyellow;
}
</style>
