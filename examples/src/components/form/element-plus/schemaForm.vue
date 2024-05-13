<script setup lang='tsx'>
/**
 * 使用tsx配合模板实现的表单
 */
import type { FunctionalComponent, Slots } from 'vue'
import type { FormInstance } from 'element-plus'
import { useSlots , computed , ref, defineProps, defineExpose, resolveComponent } from 'vue'
import type { IColumn, IFormSchema } from './types'
type FC<T> = FunctionalComponent<T>
const props = defineProps <{
  schema: IFormSchema
  modelData: Record<string, any>
}> ()
const slots = useSlots()

// 表单绑定数据
const model = computed(() => props.modelData || {})
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
  <div>
    <pre>{{ model }}</pre>
  </div>
  <el-form ref="formRef" v-bind="schema.form" :model="model">
    <SchemaForm :schema="schema" :model-data="model" />
  </el-form>
</template>
