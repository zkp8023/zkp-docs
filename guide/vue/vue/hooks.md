# hooks

## 1. useFetch
`vueuse`中的[useAsyncState](https://vueuse.org/core/useAsyncState/)更好
:::details 点击查看
::: code-group
```ts [useFetch.ts]
import type { UnwrapRef } from 'vue'
import { ref } from 'vue'

// 定义API函数的类型
interface APIFunction<M = any, N = any> {
  (params: M): Promise<N>
}
/**
 *
 * @param apiFunction 请求函数
 * @returns
 * data:请求函数返回结果(Ref),
 * loading:请求加载中状态,
 * error:请求错误对象,
 * excute(params:请求函数所需参数) -- 调用excute执行请求函数
 */
export function useFetch<P = any, R = any>(apiFunction: APIFunction<P, R>) {
  const data = ref<R | null>(null)
  const error = ref<any | null>(null)
  const loading = ref(false)

  // 执行器函数,调用请求函数,并返回成功结果
  const excute = async (params?: P) => {
    loading.value = true
    try {
      data.value = await apiFunction(params as NonNullable<P>) as UnwrapRef<R>
      return data.value
    }
    catch (err: any) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    excute,
  }
}


```
```vue [demo.vue] 
<script setup lang='ts'>
import { ref } from 'vue'
import axios from 'axios'
import { useFetch } from './hooks'
const fetchData = async () => {
  const res = await axios.get<string>('url')
  return res
}
const btnFetch = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('98989')
    }, delay)
  })
}
const { loading, excute, data } = useFetch(fetchData)
const { loading: btnLoading, excute: btnHandle } = useFetch(btnFetch)
const handle = async () => {
  const res = await excute().then(res => {
    console.log('res44444', res)
  })
}
const visible = ref(true)
</script>

<template>
  <div class="trans-c">
    <a-modal v-model:visible="visible">
      <a-spin :spinning="loading">
        <a-button :loading="btnLoading" type="primary" @click="handle">fetch</a-button>
        <a-button type="primary" @click="btnHandle(9)">按钮</a-button>
      </a-spin>
    </a-modal>
  </div>
</template>
```
:::

## 2. useEcharts

::: tip
[effectScope()](https://cn.vuejs.org/api/reactivity-advanced.html#effectscope)创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理
:::

:::details 点击查看
::: code-group
```ts [useEcharts.ts]
import { nextTick, effectScope, onScopeDispose, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart, GaugeChart, LineChart, PictorialBarChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts';

// 三方插件
import 'echarts-liquidfill'  //水球图插件
import 'echarts-gl' // 3d 图插件
import { Bar3DChart } from 'echarts-gl/charts' // 3d柱状图插件
import { Grid3DComponent } from 'echarts-gl/components' //3d组件

// 导入series配置类型
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption
} from 'echarts/charts';

// 导入常用组件配置类型
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption
} from 'echarts/components';

// 导入常用组件,在配置中要使用相应组件需要先导入并注册
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { useElementSize } from '@vueuse/core';
import { useThemeStore } from '@/store';

 // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>;
// 注册要使用的组件
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
	CanvasRenderer,
	// 额外的插件
	Bar3DChart,
	Grid3DComponent
]);

/**
 * Echarts hooks函数
 * @param options - 图表配置
 * @param needClear - 是否需要在更新配置时重新渲染整个图形(不传递相当于组合更新,不会清除再创建)
 * @param renderFun - 图表渲染函数(自定义渲染)
 * @description 按需引入图表组件，没注册的组件需要先引入
 */
export function useEcharts(
	options: Ref<ECOption> | ComputedRef<ECOption>,
	needClear?:boolean,
  renderFun?: (chartInstance: echarts.ECharts) => void
) {
	// 全局主题统一设置
  const theme = useThemeStore();

  const chartRef = ref<HTMLElement>();

  const initialSize = { width: 0, height: 0 };
  const { width, height } = useElementSize(chartRef, initialSize);

  let chart: echarts.ECharts | null = null;

	// 渲染前提: 需要有布局宽高的真实dom
	function canRender() {
		if ([initialSize.width, initialSize.height].includes(0)) {
			throw new Error('Creating ECharts requires layout width and height')
		}
    return true
    // return initialSize.width > 0 && initialSize.height > 0;
  }

  function isRendered() {
    return Boolean(chartRef.value && chart);
  }

   function update(updateOptions: ECOption) {
    if (isRendered()) {
      // 有自定义渲染函数 执行自定义渲染函数
      if (renderFun) { 
        renderFun(chart!)
       }
      else {
        // 组件更新的时候,是否需要全部重新渲染
        needClear && chart?.clear()
        chart!.setOption({ ...updateOptions })
      }
    }
  }

  async function render() {
    if (chartRef.value) {
      const chartTheme = theme.darkMode ? 'dark' : 'light';
      await nextTick();
			chart = echarts.init(chartRef.value, chartTheme);
			// 有自定义渲染函数就执行自定义渲染
      if (renderFun) {
        return renderFun(chart);
      }
      update(options.value);
    }
  }

  function resize() {
    chart?.resize();
	}

// 销毁当前chart
  function destroy() {
    chart?.dispose();
  }
// 切换主题
  function updateTheme() {
    destroy();
    render();
  }
/**
 * 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理
 */
  const scope = effectScope();

	scope.run(async () => {
		/**
		 * chartRef未挂载到dom 如chartRef未挂载,下面的watch未执行,所以这个判断放这里
		 */
    await nextTick()
		if (!chartRef.value) {
      throw new Error('chartRef has not been mounted to dom yet')
		}

		// 监听dom尺寸变化
    watch([width, height], ([newWidth, newHeight]) => {
      initialSize.width = newWidth;
      initialSize.height = newHeight;
      if (newWidth === 0 && newHeight === 0) {
        // 节点被删除 将chart置为空
        chart = null;
      }
      if (canRender()) {
        if (!isRendered()) {
          render();
        } else {
          resize();
        }
      }
		});

   // 配置项变化则更新
    watch(
      options,
      newValue => {
        update(newValue);
      },
      { deep: true }
    );
			// 监听主题变化
    watch(
      () => theme.darkMode,
      () => {
        updateTheme();
      }
    );
  });
//  销毁并停止所有监听及计算属性
  onScopeDispose(() => {
    destroy();
    scope.stop();
  });

  return {
    chartRef
  };
}

```
```vue [demo.vue 使用示例]
<script setup lang='ts'>
import { ref } from 'vue'
import type { ECOption } from '@/hooks/useEcharts'
import { useEcharts } from '@/hooks/useEcharts'

const data = ref([120, 200, 150, 80, 70, 110, 130])
const options = ref<ECOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: data.value,
      type: 'bar',
    },
  ],
})

// 模拟实时更新数据
setInterval(() => {
  data.value[0] = data.value[0] + 5
}, 2000)

// 每次数据更新, 第一根柱子就地递增
const { chartRef } = useEcharts(options)

// 每次数据更新, 整个图表重新渲染
// const { chartRef } = useEcharts(options, true)

/**
 * 传入自定义渲染函数,每次数据更新,会执行customRender函数
 */
// function customRender(chart: EchartsInstance) {
//   chart.setOption(options.value)
// }
// const { chartRef } = useEcharts(options, false, customRender)

</script>

<template>
  <div ref="chartRef" class="container w500 h500" />
</template>
```

:::
## 3. useClickOutSide

:::details 点击查看
::: code-group
```ts [useClickOutSide.ts]
import { onMounted, onUnmounted, ref } from 'vue'

/**
 *
 * @param domRef 要监听的dom对象ref引用
 * @param callback 点击触发在目标对象外时的回调
 * @returns { isClickOutSide } 是否目标外点击
 */
function useClickOutside(domRef, callback?: (e: MouseEvent) => void) {
  const isClickOutSide = ref(false)
  // 在document对象注册点击事件,需要指顶在捕获阶段触发,不然目标节点的某个父节点祖师冒泡的话,不能触发函数
  onMounted(() => {
    document.addEventListener('click', handleClickOutside, true)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside, true)
  })

  function handleClickOutside(event: MouseEvent) {
    if (!domRef.value)
      throw new Error('domRef has not been mounted to dom yet')

    if (!domRef.value.contains(event.target)) {
      isClickOutSide.value = true
      callback && callback(event)
    }
    else {
      isClickOutSide.value = false
    }
  }

  return {
    isClickOutSide,
  }
}

```
```vue [demo.vue] 
<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue'
import { useClickOutSide } from '@/hooks/useClickOutSide'
function handle(e) {
  console.log('在元素外面点击了')
}
const dom = ref<HTMLElement | null>()
const { isClickOutSide } = useClickOutside(dom, handle)
</script>

<template>
  <div ref="dom" class="container">
    <div class="inner" @click.stop>
      <div class="in">
        <button @click.stop>
          点击
        </button>
      </div>
    </div>
  </div>
  <h1 v-if="isClickOutSide">
    在container元素外点击才看得见的h1
  </h1>
</template>
```
:::