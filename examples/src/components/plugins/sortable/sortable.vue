<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'

const options = reactive<SortableOptions>({
  animation: 300,
})
onMounted(() => {
  const container = document.querySelector('#dragbleContainer') as HTMLElement
  Sortable.create(container, options)
})
const items = ref(['item1', 'item2', 'item3', 'item4'])
</script>

<script lang="ts">
export default {
  name: 'SortableBasicDemo',
}
</script>

<template>
  <ul id="dragbleContainer" class="flex gap-10px">
    <li v-for="it in items" :key="it" class="text-12px">
      拖拽 {{ it }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul li {
  @apply h100px leading-100px rounded-5px text-center flex-1 bg-sky list-none cursor-pointer select-none;
  margin-top: 0 !important;
}
</style>
