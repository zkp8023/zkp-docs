<script setup lang='ts'>
import { ref } from 'vue'
const show = ref(true)
</script>

<script lang="ts">
export default {
  name: 'TransitionAnimateThird',
}
</script>

<template>
  <div class="overflow-hidden">
    <a-button mb20px mr20px @click="show = !show">
      点击过渡
    </a-button>
    <!-- 使用第三方动画 -->
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__backOutUp"
    >
      <h1 v-show="show" class="bg-sky text-[#f00]!">
        给我一个div
      </h1>
    </transition>
  </div>
</template>
