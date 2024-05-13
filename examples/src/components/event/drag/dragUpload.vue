<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
const fileList = ref<File[]>()
onMounted(() => {
  const wraper = document.querySelector('.dragWraper')

  // 在dragover事件中阻止事件默认行为 才能释放被拖拽元素
  wraper?.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  wraper?.addEventListener('drop', (e) => {
    // 拖拽文件到浏览器会自动打开文件  这里阻止默认打开
    e.preventDefault()
    // 这里直接打印事件对象可能看不到files里面有东西
    console.log('e', e)
    // @ts-expect-error
    fileList.value = e.dataTransfer.files
    // 这样打印就有了
    console.log('files', fileList.value)
  })
})
const clickHandle = () => {
  message.error('别点,去拖文件...')
}
</script>
<script lang="ts">
export default {
  name: 'DragUpload',
}
</script>

<template>
  <div
    class="dragWraper bg-[#eee]
    w500px h200px mt-20px m-auto
    f-c-c flex-col cursor-pointer"
    @click="clickHandle"
  >
    <div class="text-(50px blue-500)">
      +
    </div>
    <div class="text-blue mt10px">
      拖拽一个文件来试试
    </div>
    <div v-for="file in fileList" :key="file.name" class="text-[#f00] mt10px">
      {{ file.name }}
    </div>
  </div>
</template>
