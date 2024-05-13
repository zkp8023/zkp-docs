<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const target = ref()
const height = ref()
const width = ref()

const callback: ResizeObserverCallback = (entries) => {
  entries.forEach((it) => {
    const { blockSize, inlineSize } = it.borderBoxSize[0]
    height.value = blockSize
    width.value = inlineSize
  })
}
const resizeObserve = new ResizeObserver(callback)
onMounted(() => {
  resizeObserve.observe(target.value)
})
</script>

<script lang="ts">
export default {
  name: 'ResizeObserver',
}
</script>

<template>
  <div
    ref="target"
    class="target"
  >
    <p max-full w-full>
      给我一个div
    </p>
    <p>width:{{ width }}</p>
    <p>height:{{ height }}</p>
  </div>
</template>

<style scoped lang="scss">
.target{
  @apply size-full max-w-full max-h-700 m-auto f-col text-(center 18px) bg-red-300 border-(10px solid blue) p20 resize overflow-hidden
}
</style>
