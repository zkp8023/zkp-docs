import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '类型',
    collapsed: false,
    items: [
      { text: 'TypeScript常见类型', link: '/web/typeScript/type/typeScript基础类型' },
      { text: 'never,null,undefined', link: '/web/typeScript/type/never类型' },
      { text: 'as const断言', link: '/web/typeScript/type/as-const' },
      { text: 'interface接口类型', link: '/web/typeScript/type/interface接口类型' },
      { text: '函数类型', link: '/web/typeScript/type/函数类型' },
      { text: 'enums枚举', link: '/web/typeScript/type/enum枚举' },
      { text: 'class类', link: '/web/typeScript/type/class类' },
    ],
  },
  {
    text: '其他',
    collapsed: false,
    items: [
      { text: '条件类型', link: '/web/typeScript/advance/条件类型' },
      { text: '内置工具类型', link: '/web/typeScript/advance/工具类型' },
      { text: '装饰器', link: '/web/typeScript/advance/装饰器' },
      { text: '类型守卫', link: '/web/typeScript/advance/类型守卫' },
    ],
  },
  {
    text: '文件',
    collapsed: false,
    items: [
      { text: 'tsconfig.json', link: '/web/typeScript/file/配置文件' },
    ],
  },
] as DefaultTheme.SidebarItem[]
