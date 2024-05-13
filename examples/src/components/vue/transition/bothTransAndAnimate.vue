<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(true)
</script>

<script lang="ts">
export default {
  name: 'BothTransAndAnimate',
}
</script>

<template>
  <div>
    <a-button mb20px @click="isShow = !isShow">
      切换动画
    </a-button>
    <!-- 当动画事件和过渡事件设置不一致的时候可能会产生意想不到的bug  会强行执行完过渡和动画
      设置type属性为animation或者transition 代表以哪个的时间为准
     也可以设置:duration='2000'属性,表示不管是动画还是过渡都在两秒内执行完,还可以写成对象形式 :
     :duration='{enter:2000,leave:1000}'  进入的时候2秒 退出的时候1秒
      -->
    <!-- type="animation" -->
    <transition appear type="animation">
      <h1 v-show="isShow" class="bg-sky text-[#f00]">
        给我一个div
      </h1>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
main {
  font-size: 30px;
  font-weight: 700;
}
@keyframes move {
  from {
      transform: translateX(-100%);
  }
  to {
      transform: translateX(0%);
  }
}
//动画时间和过渡时间设置不一致 , 会强行执行过渡和动画
.v-enter-active {
  animation: move 1s linear;
  transition: 3s linear;
}
.v-leave-active {
  animation: move 1s linear reverse;
  transition: 3s linear;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
