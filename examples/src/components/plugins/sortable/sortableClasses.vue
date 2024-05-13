<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'

const options = reactive<SortableOptions>({
  animation: 300,
  handle: '.myHandle',
  ghostClass: 'ghostClass',
  dragClass: 'dragClass', // 拖拽影子的css 类名  只有开始拖拽才生效
  // chosenClass: 'chosenClass', // 被选中项的css 类名
})
onMounted(() => {
  const container = document.querySelector('#sortableClasses') as HTMLElement
  Sortable.create(container, options)
})
const items = ref(['item1', 'item2', 'item3', 'item4'])
</script>

<script lang="ts">
export default {
  name: 'SortableClasses',
}
</script>

<template>
  <ul id="sortableClasses" class="flex gap-10px">
    <li v-for="it in items" :key="it" class="text-12px">
      拖拽 {{ it }}
      <!-- 这是拖拽手柄 -->
      <span class="myHandle bg-red rounded-3px p3px">拖拽手柄</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul li {
  @apply h100px leading-100px rounded-5px text-center flex-1 bg-sky list-none cursor-pointer select-none;
  margin-top: 0 !important;
}
.ghostClass{
  background: #9499ff;
}
.chosenClass{
  background: #f00;
}
.dragClass{
  background: blue;
}
</style>
