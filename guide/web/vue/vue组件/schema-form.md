# element-plus表单
不支持自动按需导入实现,按需导入组件库`component :is` 和 `resolveComponent`会识别不到
- 使用全局导入
- 按需导入时需要将表单用到的组件全局注册
## 1. 配置表单参数类型
:::details 点击展开
```typeScript
// 表单配置类型
import type { FormItemProps, FormProps ,RowProps } from 'element-plus'
import type { CSSProperties } from 'vue'

/**
 * 表单配置名称 直接在组件库中截取el后半部分
 *  preview 为详情或预览，指定表单控件类型为preview后不会展示表单控件
 */
export type ElType = 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'upload' |
'transfer' | 'preview'

/**
 * 传递给表单控件组件(如el-input)的属性
 */
export interface IAttrs {
  style?: CSSProperties // el-input这些组件的样式
  class?: string // el-input这些组件的类名
  typeName?: ElType // 使用组件的名称
  slots?: string[] // 给el-input这些组件的插槽如suffix previx （参照组件库当前组件插槽名即可）
  child?: IAttrs & { options: any[] } // 嵌套组件需指定 如 el-select el-radio-group
  [k: string]: any
}
// 传递给el-from-item属性 其他属性参照组件库
export interface IFormItem extends FormItemProps {
  span: number // 表单项栅格占位份数
  style: CSSProperties // // el-form-item样式
  class: string // el-form-item类名
  // 自定义el-form-item下面的内容插槽名,没有封装el-upload这种，可使用自定义插槽
  slot: string

  [k: string]: any
}
/**
 * 自定义扩展表单项类型
 */
export interface IColumn {
  formItem: Partial<IFormItem>
  attrs: IAttrs
  /**
  *  自定义列的插槽名 内容回被渲染在  <el-col span=24> 被渲染在这里</el-col>
  *  可以渲染如表单分组标题内容等 或者插入其他元素
  */
  readonly slot?: string
  // render函数，返回布尔值决定当前列是否展示 model:表单绑定的数据，item当前列数据
  render?: (model: any, item: IColumn) => boolean
}
export interface IFormSchema {
  // 传入detail字段，整体为详情展示
  form: Partial<FormProps & { detail?: boolean }>
  items: IColumn[]
  rowProps?: Partial<RowProps>
}


```
:::
## 2. Form组件实现
基于`component`动态组件和属性透传封装公共`Form`组件

- 根据配置文件生成表单
- 支持新增，编辑，详情非表单组件信息展示
- 支持表单联动，条件渲染

:::details 点击查看
```vue
<script setup lang="tsx">
import type { FormInstance } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { ref ,computed } from 'vue'
import type { IColumn, IFormSchema } from './types'
interface IProps {
  schema: IFormSchema
  modelData?: Record<string, any>
  footer?: boolean
}
// 函数组件类型
type FC<T> = FunctionalComponent<T>
const props = withDefaults(defineProps<IProps>(), {
  footer: false,
  modelData: () => ({}),
})

defineOptions({
  name: 'Form',
})
// 表单绑定字段对象 需要使用computed 不然重新赋值丢失响应
const model = computed(()=> props.modelData || {})
// const model = ref(props.modelData || {})
const formRef = ref<FormInstance | null>(null)
defineExpose({
  model,
  formRef,
})
// 联动列展示条件 返回tsx
const currentItemRender: FC<{ item: IColumn; model: any }> = (props, { slots }) => {
  const { item, model } = props
  const slot = slots.default
  return !item.render ? slot!() : item.render(model, item) ? (slot!()) : ''
}
</script>

<template>
  <el-form ref="formRef" class="size-full" v-bind="schema.form" :model="model">
    <el-row class="relative" v-bind="schema.rowProps">
      <template v-for="item in schema.items" :key="item.formItem.prop">
        <!-- 自定义列内容 -->
        <el-col v-if="item.slot" :span="item.formItem.span">
          <slot :name="item.slot" v-bind="{ item, model }" />
        </el-col>
        <!-- 配置表单内容,新增，编辑，详情 -->
        <currentItemRender v-else :item="item" :model="model">
          <el-col :span="item.formItem.span" class="relative">
            <!-- 非嵌套组件内容 -->
            <el-form-item v-if="!item.attrs.child" v-bind="item.formItem">
              <!-- el-form-item下的配置内容 -->
              <el-col v-if="!item.formItem.slot">
                <!-- 详情，预览 item.attrs.typeName === 'preview'  form配置里有detail，整体详情展示 formItem中的slot仍然生效 -->
                <el-col v-if="item.attrs.typeName === 'preview' || schema.form.detail">
                  <!-- 不是直接展示信息，使用插槽自定义 -->
                  <div v-if="item.attrs.slots && item.attrs.slots.length">
                    <template v-for="slot in item.attrs.slots" :key="slot">
                      <slot :name="slot" v-bind="{ item, model }" />
                    </template>
                  </div>
                  <!-- 直接展示信息 -->
                  <div v-else v-bind="item.attrs">{{ model[item.formItem.prop as string] }}</div>
                </el-col>
                <!-- 新增，编辑 -->
                <component
                  :is="`el-${item.attrs.typeName}`"
                  v-else
                  v-bind="item.attrs"
                  v-model="model[item.formItem.prop as string]"
                  style="width:100%"
                >
                  <!-- 给内部组件的插槽内容  如el-input中的  prefix suffix插槽 -->
                  <template v-for="slot in item.attrs.slots" :key="slot" #[slot]="data">
                    <slot :name="slot" v-bind="{ item, model, data }" />
                  </template>
                </component>
              </el-col>
              <!-- el-form-item下的完全自定义插槽内容 如使用el-upload等等 -->
              <el-col v-else>
                <slot :name="item.formItem.slot" v-bind="{ item, model }" />
              </el-col>
            </el-form-item>
            <!-- 处理嵌套的组件 如radio-group el-select等 -->
            <el-form-item v-if="item.attrs.child && item.attrs.child.options" v-bind="item.formItem">
              <!-- el-form-item下的配置内容 -->
              <el-col v-if="!item.formItem.slot">
                <!-- 详情 预览 -->
                <el-col v-if="item.attrs.typeName === 'preview' || schema.form.detail">
                  <!-- 需要自定义预览时的内容，如图片展示等 -->
                  <div v-if="item.attrs.slots && item.attrs.slots.length">
                    <template v-for="slot in item.attrs.slots" :key="slot">
                      <slot :name="slot" v-bind="{ item, model }" />
                    </template>
                  </div>
                  <!-- 直接展示的文本内容 -->
                  <div v-else v-bind="item.attrs">{{ model[item.formItem.prop as string] }}</div>
                </el-col>
                <!-- 新增，编辑 -->
                <component
                  :is="`el-${item.attrs.typeName}`"
                  v-else
                  v-bind="item.attrs"
                  v-model="model[item.formItem.prop as string]"
                  style="width:100%"
                >
                  <template v-for="slot in item.attrs.slots" :key="slot" #[slot]="data">
                    <slot :name="slot" v-bind="{ item, model, data }" />
                  </template>
                  <component
                    :is="`el-${item.attrs.child.typeName}`"
                    v-for="(option, i) in item.attrs?.child?.options"
                    :key="i"
                    v-bind="option"
                  />
                </component>
              </el-col>
              <!-- el-form-item下的完全自定义插槽内容 如使用el-upload等等 -->
              <el-col v-else>
                <slot :name="item.formItem.slot" v-bind="{ item, model }" />
              </el-col>
            </el-form-item>
          </el-col>
        </currentItemRender>
      </template>
      <!-- 表单操作插槽 可通过operation插槽直接自定义 但需要在props种传入footer属性,
      或者不添加footer属性，使用自定义列实现
      -->
      <el-col v-if="footer">
        <slot name="operation" v-bind="{ model }" />
      </el-col>
    </el-row>
  </el-form>
</template>



```

:::
## 3. 使用示例

<DemoBlock><FormExample /></DemoBlock>

## 4. 示例代码

:::details
:::code-group
```vue [form-example.vue]
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import From from './form.vue'
import { useFormConfig } from './formConfig'
defineOptions({
  name: 'FormExample',
})
const { formScema, modelData } = useFormConfig()
const AppForm = ref<{ formRef: FormInstance; model: any }>()

// 表单提交
const submitHandle = (model: any) => {
  if (!AppForm.value)
    return
  console.log('AppForm.value', AppForm.value)
  console.log('model', model)
  // 表单校验
  AppForm.value.formRef.validate().then(() => {
    alert(JSON.stringify(model))
  }).catch(err => {
    console.warn('err', err)
  })
}
</script>

<template>
  <!-- <pre>{{ AppForm?.model }}</pre> -->
  <From ref="AppForm" :scema="formScema" footer :model-data="modelData">
    <!-- 自定义列，可以每个自定义列指定不同的插槽名分别书写，也可以使用一样的插槽名，通过item里的字段去判断展示不同内容 -->
    <template #userInfo="{ item }">
      <h5 class="mb20px">{{ item.attrs.title }}</h5>
    </template>
    <!-- 用户爱好和其他信息的自定义列 -->
    <template #custom="{ item }">
      <h5 class="mb20px">
        {{ item.formItem.title }}
        <b v-if="item.formItem.otherInfo">~{{ item.formItem.otherInfo }} ~</b>
      </h5>
    </template>
    <!-- 给el-input这些组件的插槽 如果不同的表单控件有相同的插槽名称
        可判断formItem中的prop字段显示不同的内容 -->
    <template #prefix="{ item }">
      <span v-if="item.formItem.prop === 'username'">{{ item.formItem.prop }}</span>
      <span v-if="item.formItem.prop === 'password'">{{ item.formItem.prop }}</span>
    </template>
    <template #age="{ model }">
      {{ model.age }}
    </template>
    <template #default="{ item }">
      <!-- 上传组件使用默认插槽，因为其他组件可能也会有默认插槽，所以提前通过prop判断 -->
      <el-button v-if="item.formItem.prop === 'fileList'" type="primary">上传一张帅照</el-button>
    </template>
    <template #operation="{ model }">
      <div class="fcc">
        <el-button type="primary" @click="submitHandle(model)">提交(看控制台)</el-button>
      </div>
    </template>
  </From>
  <!-- </div> -->
</template>

<style lang="scss">
h5{
  margin: 0 0 20px 0 !important;
}
</style>

```

```ts [formConfig.ts]
// 上传文件组件变化的事件
import { ElMessage, type UploadFile, type UploadFiles } from 'element-plus'
import { ref } from 'vue'
import type { IFormSchema } from '@/components/form/types'
export const useFormConfig = () => {
  const modelData = ref<any>({ age: '这是详情或预览展示的age属性值' })
  // 上传文件变化
  const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    console.log('uploadFile', uploadFile)
    console.log('uploadFiles', uploadFiles)
    if (uploadFiles.length >= 2)
      ElMessage.error('一张就够了')
    modelData.value.avatar = uploadFile
  }
  const cityOptions = [
    {
      value: '湖北省',
      label: '湖北省',
      children: [
        {
          value: '武汉市',
          label: '武汉市',
          children: [
            {
              value: '黄陂区',
              label: '黄陂区',
            },
          ],
        },
      ],
    },
  ]
  // 表单配置
  const formScema = ref<IFormSchema>({
    // 传递给el-form的属性 model可以不用给
    form: {
      labelWidth: '100px',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      },
    },
    items: [
      // 用户信息自定义列 最外层传递slot属性
      {
        slot: 'userInfo',
        formItem: {},
        attrs: { title: '用户信息 :' },
      },
      {
        // 传递给el-form-item的配置
        formItem: {
          label: '用户名',
          span: 12,
          prop: 'username',
        },
        // 传递给表单控件的属性
        attrs: {
          class: 'userInput',
          typeName: 'input',
          // 传递给el-input的插槽名数组（插槽名称参照组件库）
          slots: ['prefix', 'suffix'],
        },
      },
      {
        formItem: {
          label: '密码',
          span: 12,
          prop: 'password',
        },
        attrs: {
          typeName: 'input',
          type: 'password',
          slots: ['prefix'],
        },
      },
      // 用户爱好自定义列
      {
        slot: 'custom',
        formItem: { title: '用户爱好 :' },
        attrs: {},
      },
      {
        formItem: {
          span: 12,
          prop: 'hobby',
          label: '爱好-联动 :',
        },
        attrs: {
          typeName: 'select',
          placeholder: '请选择',
          child: {
            typeName: 'option',
            options: [
              { label: '篮球', value: 1 },
              { label: '足球', value: 2 },
              { label: '乒乓', value: 3 },
            ],
          },
        },
      },

      {
        formItem: {
          prop: 'time',
          label: '时间',
          span: 12,
        },
        attrs: {
          typeName: 'date-picker',
        },
      },
      /**
       * 联动列，指定render函数，返回boolean来指定当前列是否显示
       * item:当前列    model：表单绑定的数据
       * */
      {
        formItem: {
          label: '这是什么爱好？',
          labelWidth: 120,
          prop: 'hobbyName',
        },
        attrs: {
          typeName: 'input',
          placeholder: '这是爱好选了足球才展示的输入框',
        },
        // render函数 返回当前列显示的条件
        render: (model, item) => model.hobby === 2,
      },
      // 其他信息自定义列
      {
        slot: 'custom',
        formItem: {
          title: '其他信息自定义列 :',
          otherInfo: '其他信息自定义列才有的',
          // labelWidth: 100,
        },
        attrs: {},
      },
      {
        formItem: {
          prop: 'city',
          label: '地址',
          span: 12,
        },
        attrs: {
          typeName: 'cascader',
          options: cityOptions,
          placeholder: '你住哪里',
        },
      },
      // 嵌套类型的组件需要传递child属性
      {
        formItem: {
          span: 12,
          prop: 'type',
          label: '复选框',
          labelWidth: 80, // 单独指定表单项的label宽度
        },
        attrs: {
          typeName: 'checkbox-group',
          child: {
            typeName: 'checkbox',
            options: [
              { label: '吃饭' },
              { label: '睡觉' },
              { label: '打豆豆' },
            ],
          },
        },
      },

      {
        slot: 'custom',
        formItem: { title: '详情展示时 :' },
        attrs: {},
      },
      {
        formItem: {
          label: '使用itemType=preview :',
          labelWidth: 180,
          prop: 'age',
        },
        /**
         *  指定typeName：'preview',直接展示信息，不用el-input这些控件,如需自定义展示:
         * 可指定attrs ：{slots:[自定义展示的插槽名数组]}，
         * 还可以直接指定forItem的slot 来自定义渲染
         */
        attrs: { typeName: 'preview', style: { fontSize: '20px' } },
      },
      // 展示详情还可以直接使用formItem插槽
      {
        formItem: {
          label: '使用formItem插槽 :',
          labelWidth: 160,
          prop: 'age',
          slot: 'age',
        },
        attrs: {},
      },
      {
        slot: 'custom',
        formItem: { title: '上传头像 : ' },
        attrs: {},
      },
      // 上传文件el-upload比较特殊  双向绑定是通过v-model:file-list来的，可以使用上传事件来拿到上传的文件
      // 或者直接使用formItem选项的插槽来直接书写el-upload
      {
        formItem: {
          prop: 'fileList',
          label: '头像',
        },
        attrs: {
          typeName: 'upload',
          listType: 'picture-card',
          autoUpload: false,
          onChange: fileChange,
          slots: ['default'],
        },
      },
    ],
  })
  return { formScema, modelData }
}

```
:::

## 5. tsx实现的Form组件
:::details
```tsx
import type { FunctionalComponent, Slots } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IColumn, IFormSchema } from './types'

type FC<T> = FunctionalComponent<T>

// 表单绑定数据
export default defineComponent({
  props: ['schema', 'modelData'],
  setup(props, context) {
    // console.log('props', props)
    const model = computed(()=> props.modelData || {})
    // const model = ref(props.modelData || {})
    const formRef = ref<FormInstance | null>(null)
    // expose 给父组件暴露属性
    context.expose({
      model,
      formRef,
    })
    // 处理插槽 将具名插槽处理为作用域插槽 添加参数
    const handleSlots = <T, P> (slots: Slots, props: T, model: P) => {
      return Object.entries(slots).reduce((acc, [k, v]) => {
        return (acc[k] = () => v!({ item: props, model }), acc)
      }, {})
    }
    // 根据typeName渲染不同的组件
    const renderPutItem: FC<IColumn> = (props, { slots }) => {
      const { formItem, attrs } = props
      const com = resolveComponent(`el-${attrs.typeName}`)
      // 是否有child 嵌套组件类型 如 el-slelct el-checkbox-group
      const childCom = attrs.child ? resolveComponent(`el-${attrs.child?.typeName}`) : null
      return (<>
            {
              !childCom
                ? attrs.slots?.length
                //  没有嵌套组件，还需判断是否需要插槽，不然没传插槽的组件无内容
                  ? (<com v-model={model.value[formItem.prop as string]} {...attrs}>{ slots }</com>)
                  : <com v-model={model.value[formItem.prop as string]} {...attrs} />
                // 有嵌套组件 循环嵌套组件
                : (<com v-model={model.value[formItem.prop as string]} {...attrs}>
                      { attrs.child?.options.map(it => (<childCom {...it} />)) }
                    </com>)
            }
          </>)
    }

    // 表单绑定数据
    const renderPut: FC<IColumn> = (props, ctx) => {
      // 处理插槽，把当前数据传递给作用域插槽
      const slotss = handleSlots(ctx.slots, props, model)
      return renderPutItem(props, { ...ctx, slots: slotss })
    }

    // 渲染表单项
    const renderItems: FC<IColumn & { detail?: boolean }> = (props, ctx) => {
      const { slots } = ctx
      const { formItem, attrs, detail } = props
      return (
    <>
      <el-form-item {...formItem}>
        {
          formItem.slot
            ? (<el-col>
                {slots[formItem.slot] && slots[formItem.slot]!({ item: props, model: model.value })}
              </el-col>)
            : (<el-col>
              {/* 详情还是编辑 attrs.typeName === 'preview'，使详情和编辑可以不同展示，
              detail：在不传preview的情况下 使用详情展示，
              */}
                {(attrs.typeName === 'preview' || detail) ? <div class='detailInfo'>{model.value[formItem.prop as string]}</div> : renderPut(props, ctx)}
              </el-col>)
            }
      </el-form-item>
    </>
      )
    }
    // 联动渲染列 根据传入列数组的render函数返回值确定是否需要渲染
    const hasRender: FC<{ item: IColumn; model: any }> = (props, ctx) => {
      const { item, model } = props
      const slot = ctx.slots.default
      return (<>
            {item.render ? (item.render(model.value, item) ? slot!() : '') : slot!()}
         </>)
    }
    // 渲染列
    const renderCols: FC<IFormSchema> = (props, ctx) => {
      const { slots } = ctx
      const { items, form } = props
      return (
    <>
      {items.map((item) => {
        return (
        <hasRender item={item} model={model} >
             <el-col span={item.formItem.span}>
              {/* 判断有无自定义列，有就显示传入具名的插槽，没有就渲染el-form-item */}
              {item.slot ? (slots[item.slot] && slots[item.slot]!({ item, model: model.value })) : renderItems({ ...item, detail: form.detail }, ctx)}
            </el-col>
        </hasRender>
        )
      })}
    </>
      )
    }
    // 渲染表单
    const SchemaForm: FC<{ schema: IFormSchema }> = (props, ctx) => {
      const { form , rowProps} = props.schema
      return (
        <el-form {...form} model={model} ref={formRef}>
          <el-row {...rowProps}>{renderCols(props.schema, { ...ctx, slots: context.slots })}</el-row>
        </el-form>
      )
    }
    return () => <SchemaForm schema={props.schema} />
  },
})

```

:::

## 6. tsx和模板实现的Form组件
使用方法和使用纯模板实现的`form`一致
:::details
```vue
<script setup lang='tsx'>
/**
 * 使用tsx配合模板实现的表单
 */
import type { FunctionalComponent, Slots } from 'vue'
import type { FormInstance } from 'element-plus'
import { useSlots } from 'vue'
import type { IColumn, IFormSchema } from './types'
type FC<T> = FunctionalComponent<T>
const props = defineProps <{
  schema: IFormSchema
  model: Record<string, any>
}> ()
const slots = useSlots()

// 表单绑定数据
const model = computed(()=> props.modelData || {})
const formRef = ref<FormInstance | null>(null)
defineExpose({
  model,
  formRef,
})
// 处理插槽 将具名插槽处理为作用域插槽 添加参数
const handleSlots = <T, P> (slots: Slots, props: T, model: P) => {
  return Object.entries(slots).reduce((acc, [k, v]) => {
    return (acc[k] = () => v!({ item: props, model }), acc)
  }, {})
}
// 根据typeName渲染不同的组件
const renderPutItem: FC<IColumn> = (props, { slots }) => {
  const { formItem, attrs } = props
  const com = resolveComponent(`el-${attrs.typeName}`)
  // 是否有child 嵌套组件类型 如 el-slelct el-checkbox-group
  const childCom = attrs.child ? resolveComponent(`el-${attrs.child?.typeName}`) : null
  return (<>
     {
       !childCom
         ? attrs.slots?.length
         //  没有嵌套组件，还需判断是否需要插槽，不然没传插槽的组件无内容
           ? (<com v-model={model.value[formItem.prop as string]} {...attrs}>{ slots }</com>)
           : <com v-model={model.value[formItem.prop as string]} {...attrs} />
         // 有嵌套组件 循环嵌套组件
         : (<com v-model={model.value[formItem.prop as string]} {...attrs}>
              { attrs.child?.options.map(it => (<childCom {...it} />)) }
            </com>)
     }
  </>)
}

// 表单绑定数据
const renderPut: FC<IColumn> = (props, ctx) => {
  // 处理插槽，把当前数据传递给作用域插槽
  const slotss = handleSlots(ctx.slots, props, model.value)
  return renderPutItem(props, { ...ctx, slots: slotss })
}

// 渲染表单项
const renderItems: FC<IColumn & { detail?: boolean }> = (props, ctx) => {
  const { slots } = ctx
  const { formItem, attrs, detail } = props
  return (
    <>
      <el-form-item {...formItem}>
        {
          formItem.slot
            ? (<el-col>
                {slots[formItem.slot] && slots[formItem.slot]!({ item: props, model: model.value })}
              </el-col>)
            : (<el-col>
              {/* 详情还是编辑 attrs.typeName === 'preview'，使详情和编辑可以不同展示，
              detail：在不传preview的情况下 使用详情展示，attrs中的class会传入这里
              */}
                {(detail || attrs.typeName === 'preview') ? <div class='detailInfo' {...attrs} >{model.value[formItem.prop as string]}</div> : renderPut(props, ctx)}
              </el-col>)
            }
      </el-form-item>
    </>
  )
}
// 联动渲染列 根据传入列数组的render函数返回值确定是否需要渲染
const hasRender: FC<{ item: IColumn; model: any }> = (props, ctx) => {
  const { item, model } = props
  const slot = ctx.slots.default
  return (<>
      {item.render ? (item.render(model.value, item) ? slot!() : '') : slot!()}
  </>)
}
// 渲染列
const renderCols: FC<IFormSchema> = (props, ctx) => {
  const { slots } = ctx
  const { items, form } = props
  return (
    <>
      {items.map((item) => {
        return (
        <hasRender item={item} model={model} >
             <el-col span={item.formItem.span}>
              {/* 判断有无自定义列，有就显示传入具名的插槽，没有就渲染el-form-item */}
              {item.slot ? (slots[item.slot] && slots[item.slot]!({ item, model: model.value })) : renderItems({ ...item, detail: form.detail }, ctx)}
            </el-col>
        </hasRender>
        )
      })}
    </>
  )
}
interface ISchemaFormProps {
  schema: IFormSchema
  model?: Record<string, any>
}
// 渲染表单
const SchemaForm: FC<ISchemaFormProps> = (props, ctx) => {
   const { schema } = props
  return (
      <el-row {...schema.rowProps}>{renderCols(schema, { ...ctx, slots })}</el-row>
  )
}
</script>

<template>
  <!-- <div>
    <pre>{{ model }}</pre>
  </div> -->
  <el-form ref="formRef" v-bind="schema.form" :model="model">
    <SchemaForm :schema="schema" :model-data="model"/>
  </el-form>
</template>

```
:::


## 7. 一些问题

### 7.1 插槽优先级
:::tip
除了底部有一个`operation`的插槽，其余插槽都由配置文件自定义指定，<br>
<br>
**配置的插槽在使用的时候都可以拿到当前列对象`item`，和表单数据绑定对象`model`**
<br>
**配置组件库插槽时(`attrs : {slots : ['file']}`)，会拿到组件库给的插槽数据`data`**
```vue
<template #custom = "{item , model}">
   <div v-if="item.xxx">{{model}}</div>
   <div v-if="item.xxx">{{model}}</div>
</template>

<!-- 上传文件组件 file插槽给的数据data中包含了当前上传的文件 -->
<template #file = "{item,model,data}">
   ......
</template>
```
:::
```ts
[
    {
        /**
         * 最外层的优先级最高 插槽内容会被渲染在：<el-col> 内容在这里  </el-col>
         * 指定了最外层的插槽后 内层插槽和属性配置均不会生效，但是在作用域插槽的值可以拿到当前列配置 item
         * 和表单绑定对象 model,需要渲染文本和属性什么的可以放在formItem和attrs对象中，使用的时候就可以直接用了
         */
        slot: 'custom'
        /**
         * 优先级第二，插槽内容会被渲染在
         * <el-col>
         *   <el-form-item> 内容在这里 </el-form-item>
         * </el-col>
         */
        formItem: { slot:'custom' },
        /**
         * 等级最低，这里的插槽是给el组件的 如el-input的prefix等
         */
        attrs: { typeName:'input' , slots:['custom'] },
    }
]
```

### 7.2 使用插槽

每个`item`配置项都可以单独指定不同名的插槽单独书写内容，也可以定义相同的名字，在插槽内部拿到`item`当前列的配置对象后根据配置对象中的字段来判断如何展示内容:<br />
下面的模板中同一个`custom`插槽根据条件不同展示不同内容，<b style="color:red">内容放在配置中，在插槽里获取</b>

```vue
<template #custom="{ item }">
    <span v-if="item.formItem.prop === 'xxxx'">{{ item.formItem.title }}</span>
    <b v-if="item.formItem.prop === 'xxxx'">~{{ item.attrs.otherInfo }} ~</b>
</template>
```

### 7.3 详情和编辑
:::danger 详情和编辑时:
需要传递`modelData`属性: 当前表单的字段信息（如列表中某一条数据的所有信息，此时`modelData`中的字段需要跟配置项中的各个`prop`对应）
```vue
<!-- modelData从接口获取或其他 -->
 <template>
   <Form :model-data="modelData"></Form>
 </template>
```

:::


<hr />

#### 1.详情时需要展示的是纯文本类的信息
此时不需要使用`el-input`这些组件展示时：指定`attrs`中的`typeName`为`preview`
```ts
 [
    {
        formItem:{prop: 'username' , label : '用户名'},
        attrs:{ typeName:'preview' }
    }
 ]
```
#### 2. 详情时展示非简单文本
1.  同时指定`typeName`和`slots`,在模板中拿到`item`和`model`自定义内容渲染
```ts
 [
    {
        formItem:{prop: 'avatar' , label : '用户头像'},
        attrs:{ typeName:'preview' ,slots : ['avatar']}
    }
 ]
```
2.展示非文本时还可以通过指定 `formItem`中的插槽来实现
 ```ts
 [
    {
        formItem:{ prop: 'avatar' , label : '用户头像' ，slot:'avatar'},
        // attrs:{ typeName:'preview' ,slots : ['avatar']}
    }
 ]
```
#### 3. 需要全部展示文本
全部展示详情，可以在`form`配置中传入`detail`字段 , `detail`配置优先级低于 `formItem`中的`slot`
```ts
const formScema = ref<IFormSchema>({
  form : {
    detail: true // [!code ++]
    //  ....
  },
  items :[
    {
      formItem :{ slot:'xxx' }, // 这里会显示slot插槽内容，不受 detail影响
      attrs:{ }
    },
    {
      formItem :{ prop:'yyy' },  // 这一项会直接显示详情内容
      attrs:{ slots:['xxx','vvv']}
    }
  ]
})
```
