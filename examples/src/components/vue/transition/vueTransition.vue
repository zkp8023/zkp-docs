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
  name: 'VueTransition',
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
.v-enter-from,
.v-leave-to{
  opacity: 0;
  // 从右边滑走   需要改成左边需改成  -100%
  transform:translateX(v-bind(val));
}

.v-enter-active,
.v-leave-active{
  transition: all .5s;
}
</style>
