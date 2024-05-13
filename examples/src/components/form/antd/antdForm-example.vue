<script setup lang='ts'>
import { useFormConfig } from './formConfig'
import AntdForm from './components/form/antd/antdForm.vue'
// 表单配置
const { modelData, formShcema } = useFormConfig()
const scemaFormRef = ref()
</script>

<template>
  <div class="p20 overflow-auto h100vh">
    <div>
      <pre>{{ modelData }}</pre>
    </div>
    <AntdForm ref="scemaFormRef" :model-data="modelData" :schema="formShcema">
      <template #userInfo="{ item }">
        <h3 class="mb20">{{ item?.attrs?.title }} </h3>
      </template>
      <template #custom="{ item }">
        <h3 class="mb20">{{ item?.formItem?.title }} <b v-if="item.formItem.otherInfo">{{ item.formItem.otherInfo }}</b> </h3>
      </template>
      <template #prefix="{ item }">
        <span v-if="item.formItem.name === 'username'">{{ item.attrs.title }}</span>
      </template>
      <template #suffix="{ item }">
        <span v-if="item.formItem.name === 'password'">给密码框的后缀</span>
      </template>
      <template #age="{ model }">
        {{ model.age }}99
      </template>
      <template #default="{ item }">
        <a-button v-if="item.formItem.name === 'fileList'" type="primary">上传一张帅照</a-button>
      </template>
    </AntdForm>
  </div>
</template>
