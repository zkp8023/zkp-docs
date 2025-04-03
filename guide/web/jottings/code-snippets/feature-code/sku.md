:::details 点击查看
:::code-group
```vue [Sku.vue]
<script setup lang="ts">
import type { Goods, ISpec, Sku, SpecValue } from './types'
defineOptions({
  name: 'Sku',
})

const props = defineProps<{
  goodsInfo: Goods
  skuId?: string // 传入skuId时回显选中效果
}>()

const emit = defineEmits<{
  (e: 'change', sku: Sku): void // 所有规格都有被选中后触发传出当前sku
}>()

type PathType = Record<string, string[]> // 路径字典类型

// 获取当前数组子集
function getSubsets<T>(arr: T[]) {
  return arr.reduce((acc: T[][], item: T) => acc.concat(acc.map((k: T[]) => k.concat(item))), [[]])
}

// 拼接字典key的分隔符
const spliter = '-'

/**
 * 生成路径字典,判断是否禁用使用
 * @param skus sku数组
 * @returns 路径字典
 */
const getPathMap = (skus: Sku[]) => {
  // 筛选出有效sku: 库存不为0的sku
  const validSkus = skus.filter(sku => sku.inventory)
  // 路径字典对象
  const pathMap: PathType = {}
  validSkus.forEach((sku) => {
    // 找出每个sku中的组合数组
    const skuArr = sku.specs.map(spec => spec.valueName)
    // 获取当前sku组合数组的幂集并生添加到路径字典中
    const powerSet = getSubsets(skuArr)
    // console.log('powerSet', powerSet)
    powerSet.forEach((it) => {
      const key = it.join(spliter)
      // pathMap[key] ? pathMap[key].push(sku.id) : (pathMap[key] = [sku.id])
      if (pathMap[key])
        pathMap[key].push(sku.id)

      else
        pathMap[key] = [sku.id]
    })
  })
  return pathMap
}
const pathMap = getPathMap(props.goodsInfo?.skus)

/**
 * 获取当前选中的按钮
 * @param specs 规格数组
 * @returns 已选中的按钮数组
 */
const getSelected = (specs: ISpec[]) => {
  return specs.reduce<string[]>((acc, spec) => {
    // 当前每一规格中选中的按钮
    const selectedItem = spec.values.find(val => val.selected)
    acc.push(selectedItem ? selectedItem.name : '')
    return acc
  }, [])
}
/**
 * 根据全部选中的规格来找到对应的sku,全部选中的时候 路径字典中对应的key值数组里只有唯一的一项
 * @param skus 商品sku信息
 * @param selectedVals 已全部选中规格的数组
 * @param pathMap 路径字典
 * @returns 对应的sku
 */
const getSelectedSku = (skus: Sku[], selectedVals: string[], pathMap: PathType) => {
  const key = selectedVals.join(spliter)
  const sku = skus.find(sku => sku.id === pathMap[key][0])
  return sku
}

/**
 *
 * @param specs 规格数组
 * @param pathMap 路径字典
 */
const updateStatus = (specs: ISpec[], pathMap: PathType) => {
  // 遍历规格行
  specs.forEach((spec, index) => {
    // 获取选中的按钮数组
    const selectedVals = getSelected(specs)
    // 遍历规格中的所有按钮
    for (const val of spec.values) {
      // 当前规格行中的按钮替换掉已选中按钮去路径字典中检查是否有对应的skuid 有的话可点击,没有就禁用
      selectedVals[index] = val.name
      // 剔除掉假值(当前规格排没有选中的项)
      const key = selectedVals.filter(it => it).join(spliter)
      val.disabled = !pathMap[key]
    }
  })
}
/**
 * 点击切换选中状态 并设置其他按钮的禁用状态
 * @param spec 当前规格行
 * @param it 当前按钮
 */
const handleSelect = (spec: ISpec, it: SpecValue) => {
  // 当前按钮已禁用
  if (it.disabled)
    return
  // 当前已选中,取消选中
  if (it.selected) {
    it.selected = false
  }
  else {
    // 当前未选中 取消其他项选中
    spec.values.forEach(val => val.selected = false)
    it.selected = true
  }

  // 每次点击都判断所有按钮的可点击状态
  updateStatus(props.goodsInfo.specs, pathMap)

  // 判断是否所有规格已经选中完成,选中完成之后根据选择的规格找到对应的sku,并传递给父组件
  const selectedVals = getSelected(props.goodsInfo.specs)
  // 选中的按钮数组集合等于所有规格数组的长度说明选择了所有
  const isValid = selectedVals.filter(v => v).length === props.goodsInfo.specs.length
  if (isValid) {
    const sku = getSelectedSku(props.goodsInfo.skus, selectedVals, pathMap)
    console.log('已全部选择,对应的sku信息:', sku)
    sku && emit('change', sku)
  }
}

/**
 * 根据传入的skuId默认选中规格按钮
 * @param goodsInfo 商品信息
 * @param skuId 默认选中的skuId
 */
const initSelected = (goodsInfo: Goods, skuId: string) => {
  // 在所有sku中找到符合的sku
  const sku = goodsInfo.skus.find(sku => sku.id === skuId)
  if (!sku)
    return

  // 遍历规格,让相应的规格按钮默认选中
  goodsInfo.specs.forEach((spec, i) => {
    // spec.values.forEach(val => val.selected = false)
    const initVal = spec.values.find(val => val.name === sku.specs[i].valueName)
    initVal && (initVal.selected = true)
  })
}
// 有传入skuId则初始化默认选中
props.skuId && initSelected(props.goodsInfo, props.skuId)
// 初始化禁用
updateStatus(props.goodsInfo.specs, pathMap)
</script>

<template>
  <div class="flex-col gap30">
    <div v-for="(spec, index) in goodsInfo?.specs" :key="index">
      <dl class="flex gap10">
        <dt>{{ spec.name }}</dt>
        <template v-for="it in spec.values" :key="it">
          <dd
            v-if="it.picture"
            :class="{ selected: it.selected, disabled: it.disabled }"
            @click="handleSelect(spec, it)"
          >
            <img :src="it.picture" class="h40px w40px">
          </dd>

          <dd
            v-else
            :class="{ selected: it.selected, disabled: it.disabled }"
            @click="handleSelect(spec, it)"
          >
            {{ it.name }}
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style scoped lang="scss">
dd {
  @apply border-(1 dashed #ccc) cursor-pointer p-10px select-none;
  &.selected {
    border: 2px solid #f00;
  }
  &.disabled {
    background: #ccc;
  }
}
</style>
```
```json
{
  "msg": "操作成功",
  "result": {
    "id": "3994483",
    "specs": [
      {
        "name": "颜色",
        "values": [
          {
            "name": "枫叶红",
            "picture": "https://yanxuan-item.nosdn.127.net/b2a8809892fdf8a5003887025452e020.png",
            "desc": "卫衣/毛衫-销售属性颜色-枫叶红-规格属性图片"
          },
          {
            "name": "草木绿",
            "picture": "https://yanxuan-item.nosdn.127.net/0c6c7b6064b5663611c381626a205777.png",
            "desc": "卫衣/毛衫-销售属性颜色-草木绿-规格属性图片"
          },
          {
            "name": "月光白",
            "picture": "https://yanxuan-item.nosdn.127.net/df471281a398df6feee63fbbceaf205d.png",
            "desc": "卫衣/毛衫-销售属性颜色-月光白-规格属性图片"
          },
          {
            "name": "雪樱粉",
            "picture": "https://yanxuan-item.nosdn.127.net/7a7493e04de29dc981b744a96421869c.png",
            "desc": "卫衣/毛衫-销售属性颜色-雪樱粉-规格属性图片"
          }
        ]
      },
      {
        "name": "尺码",
        "values": [
          {
            "name": "140cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-140cm-规格属性图片"
          },
          {
            "name": "130cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-130cm-规格属性图片"
          },
          {
            "name": "160cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-160cm-规格属性图片"
          },
          {
            "name": "150cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-150cm-规格属性图片"
          },
          {
            "name": "165cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-165cm-规格属性图片"
          },
          {
            "name": "120cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-120cm-规格属性图片"
          },
          {
            "name": "110cm",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性尺码-110cm-规格属性图片"
          }
        ]
      },
      {
        "name": "颜色",
        "values": [
          {
            "name": "枫叶红",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性颜色-枫叶红-规格属性图片"
          },
          {
            "name": "草木绿",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性颜色-草木绿-规格属性图片"
          },
          {
            "name": "月光白",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性颜色-月光白-规格属性图片"
          },
          {
            "name": "雪樱粉",
            "picture": null,
            "desc": "卫衣/毛衫-销售属性颜色-雪樱粉-规格属性图片"
          }
        ]
      }
    ],
    "skus": [
      {
        "id": "300239451",
        "skuCode": "300239451",
        "price": "219.00",
        "oldPrice": "219.00",
        "inventory": 5033,
        "specs": [
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "110cm"
          },
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "110cm"
          }
        ]
      },
      {
        "id": "300239452",
        "skuCode": "300239452",
        "price": "219.00",
        "oldPrice": "219.00",
        "inventory": 8939,
        "specs": [
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "120cm"
          },
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "120cm"
          }
        ]
      },
      {
        "id": "300239453",
        "skuCode": "300239453",
        "price": "219.00",
        "oldPrice": "219.00",
        "inventory": 7749,
        "specs": [
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "130cm"
          },
          {
            "name": "颜色",
            "valueName": "草木绿"
          },
          {
            "name": "尺码",
            "valueName": "130cm"
          }
        ]
      }

    ]
  }
}
```
:::
