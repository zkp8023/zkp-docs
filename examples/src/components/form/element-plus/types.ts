// 表单配置类型
import type { FormItemProps, FormProps, RowProps } from 'element-plus'
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
