// 上传文件组件变化的事件
import { ElMessage, type UploadFile, type UploadFiles } from 'element-plus'
import { ref } from 'vue'
import type { IFormSchema } from './components/form/element-plus/types'
export const useFormConfig = () => {
  const modelData = ref<any>({ age: '这是详情或预览展示的age属性值' })
  // 上传文件变化
  const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    // console.log('uploadFile', uploadFile)
    // console.log('uploadFiles', uploadFiles)
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
  const formShcema = ref<IFormSchema>({
    // rowProps: { gutter: 50 },
    // 传递给el-form的属性 model可以不用给
    form: {
      // detail: true,
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
          style: { width: '100%' },
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
  return { formShcema, modelData }
}
