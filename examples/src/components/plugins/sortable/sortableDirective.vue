<script setup lang="ts">
import { ref } from 'vue'
const items = ref(['item1', 'item2', 'item3', 'item4'])
</script>

<script lang="ts">
export default {
  name: 'SortableDirective',
}
</script>

<template>
  <ul id="sortableDirective" v-sortable="{ handle: '.myHandle', filter: '.filter' }" class="flex gap-10px">
    <li v-for="it in items" :key="it" class="text-12px item">
      <span>拖拽 {{ it }}</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle bg-red rounded-3px p3px">手柄</span>
    </li>
    <li class="text-12px filter">
      <span>filter</span>
      <!-- 这是拖拽手柄 -->
      <span class="myHandle bg-red rounded-3px p3px">手柄</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul li {
  @apply h100px leading-100px rounded-5px
   text-center flex-1 bg-sky list-none
   cursor-pointer select-none ;
  margin-top: 0 !important;
}
</style>
