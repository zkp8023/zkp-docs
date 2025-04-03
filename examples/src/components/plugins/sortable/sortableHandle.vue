<script setup lang="ts">
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
import { onMounted, reactive, ref } from 'vue'

const options = reactive<SortableOptions>({
  animation: 300,
  handle: '.myHandle',
  // draggable: '.item',
  filter: '.filter',
})
onMounted(() => {
  const container = document.querySelector('#sortableHandle') as HTMLElement
  Sortable.create(container, options)
})
const items = ref(['item1', 'item2', 'item3', 'item4'])
</script>

<script lang="ts">
export default {
  name: 'SortableHandle',
}
</script>

<template>
  <ul id="sortableHandle" class="flex gap-10px">
    <li v-for="it in items" :key="it" class="item text-12px">
      <span>拖拽 {{ it }}</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle rounded-3px bg-red p3px">手柄</span>
    </li>
    <li class="filter text-12px">
      <span>filter</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle rounded-3px bg-red p3px">手柄</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul li {
  @apply h100px leading-100px rounded-5px
   text-center flex-1 bg-sky list-none
   cursor-pointer select-none ;
  margin-top: 0 !important;
  span{
    flex: 1;
  }
}
</style>
