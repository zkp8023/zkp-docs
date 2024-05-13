<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import LoadingCom from '../common/loading.vue'

const values = ref(5)
const flag = ref(false)
const observe = ref<IntersectionObserver>()
const target = ref<HTMLDivElement>()
const root = ref()
const stopHandle = () => {
  flag.value = !flag.value
  const status = flag.value ? '已停止监听' : '已开启监听'
  message.warn(status)
  flag.value ? observe.value?.unobserve(target.value!) : observe.value?.observe(target.value!)
}
onMounted(() => {
  // 创建observer实例配置对象 可以不传
  const options: IntersectionObserverInit = {
    root: root.value, // 目标元素所在的根元素
    // threshold: 0.1, //阀值 目标元素出现在root中到达 10%时执行callback
  }
  const callback: IntersectionObserverCallback = (entries, observer) => {
    // console.log('entries', entries) // 被监听的IntersectionObserverEntry对象数组
    // console.log('observer', observer) // 当前的监听实例对象
    entries.forEach((it) => {
      // 模拟延迟加载
      setTimeout(() => {
        if (it.isIntersecting) {
          values.value += 5
          message.success('加载数据成功')
        }
      }, 500)
    })
  }
  // 创建IntersectionObserver实例对象
  observe.value = new IntersectionObserver(callback, options)
  // 监听目标元素 可监听多个
  observe.value.observe(target.value!)
})
</script>

<script lang="ts">
export default {
  name: 'IntersectionObserver',
}
</script>

<template>
  <div>
    <el-button type="primary" mb20px @click="stopHandle">
      {{ flag ? '开启监听' : '停止监听' }}
    </el-button>
    <ul ref="root">
      <li v-for="it in values" :key="it">
        给我一个div {{ it }}
      </li>
      <div ref="target" class="target">
        <!-- 加载动画 -->
        <LoadingCom />
      </div>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  @apply w-full h400px bg-primary_light m-auto px10px overflow-auto;

  li {
    @apply fcc h80px mt15px bg-sky;
  }

  li:first-child~li {
    margin-top: 15px;
  }

  .target {
    @apply wfull fcc mt20px;
  }
}
</style>
