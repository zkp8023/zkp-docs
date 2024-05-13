<script setup lang='ts'>
import { ref } from 'vue'
const show = ref(true)
const val = ref('100%')
// 左滑
const handleLeft = () => {
  show.value = !show.value
  val.value = '-100%'
}
// 右滑
const handleRight = () => {
  show.value = !show.value
  val.value = '100%'
}
</script>

<script lang="ts">
export default {
  name: 'TransitionAnimate',
}
</script>

<template>
  <div class="overflow-hidden">
    <a-button mb20px mr20px @click="handleRight">
      点击右滑
    </a-button>
    <a-button @click="handleLeft">
      点击左滑
    </a-button>
    <transition>
      <h1 v-show="show" class="bg-sky text-[#f00]!">
        给我一个div
      </h1>
    </transition>
  </div>
</template>

<style scoped lang='scss'>
/* 定义动画 */
@keyframes move {
  from{
    // 开始状态
    opacity: 0;
    transform: translateX(v-bind(val));
  }to{
    // 结束状态
    opacity: 1;
    transform: translateX(0);
  }
}
/* 在过程类名中使用动画 */
.v-enter-active{
  animation: move .5s;
}
.v-leave-active{
  /* 离开时动画翻转 */
  animation: move .5s reverse;
}
</style>
