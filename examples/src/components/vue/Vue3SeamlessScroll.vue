<script setup lang="ts">
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
const value = ref(true)
const list = ref([
  {
    title: 'Vue3.0 无缝滚动组件展示数据第1条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第2条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第3条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第4条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第5条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第6条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第7条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第8条',
    date: Date.now(),
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第9条',
    date: Date.now(),
  },
])
</script>

<script lang="ts">
export default {
  name: 'Vue3SeamlessScroll',
}
</script>

<template>
  <a-button type="primary" @click="value = !value">
    {{ value ? 'STOP' : 'START' }}
  </a-button>
  <vue3-seamless-scroll v-model="value" class="scroll" :list="list" hover>
    <div v-for="(item, index) in list" :key="index" class="item">
      <span>{{ item.title }}</span>
      <span>{{ item.date }}</span>
    </div>
  </vue3-seamless-scroll>
</template>

<style>
.scroll {
  height: 270px;
  width: 500px;
  margin: 100px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>
