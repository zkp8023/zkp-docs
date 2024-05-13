<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import From from './form.vue'
import { useFormConfig } from './formConfig'
const { formShcema, modelData } = useFormConfig()
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
<script lang="ts">
export default {
  name: 'FormExample',
}
</script>

<template>
  <!-- <pre>{{ AppForm?.model }}</pre> -->
  <From ref="AppForm" :schema="formShcema" footer :model-data="modelData">
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
      {{ model.age }}99
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
