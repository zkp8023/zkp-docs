<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import type { IFormSchema } from './types'
const props = withDefaults(defineProps<IProps>(), {
  footer: false,
  modelData: () => ({}),
})

interface IProps {
  schema: IFormSchema
  modelData?: Record<string, any>
  footer?: boolean
}
defineOptions({
  name: 'Form',
})
// 表单绑定字段对象
const model = ref(props.modelData || {})
const formRef = ref<FormInstance | null>(null)
defineExpose({
  model,
  formRef,
})
// 联动列展示条件
const currentItemRender = (item, model) => {
  if (!item.render)
    return true
  else return item.render(model, item)
}
</script>

<template>
  <el-form ref="formRef" class="size-full" v-bind="schema.form" :model="model">
    <el-row class="relative">
      <template v-for="item in schema.items" :key="item.formItem.prop">
        <!-- 自定义列内容 -->
        <el-col v-if="item.slot" :span="item.formItem.span">
          <slot :name="item.slot" v-bind="{ item, model }" />
        </el-col>
        <!-- 配置表单内容,新增，编辑，详情 -->
        <el-col v-else-if="currentItemRender(item, model)" :span="item.formItem.span" class="relative">
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
