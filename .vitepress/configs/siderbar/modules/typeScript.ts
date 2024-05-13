import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: '类型',
    collapsed: false,
    items: [
      { text: 'TypeScript常见类型', link: '/typeScript/type/typeScript基础类型' },
      { text: 'never,null,undefined', link: '/typeScript/type/never类型' },
      { text: 'as const断言', link: '/typeScript/type/as-const' },
      { text: 'interface接口类型', link: '/typeScript/type/interface接口类型' },
      { text: '函数类型', link: '/typeScript/type/函数类型' },
      { text: 'enums枚举', link: '/typeScript/type/enum枚举' },
      { text: 'class类', link: '/typeScript/type/class类' },
    ],
  },
  {
    text: '其他',
    collapsed: false,
    items: [
      { text: '条件类型', link: '/typeScript/advance/条件类型' },
      { text: '内置工具类型', link: '/typeScript/advance/工具类型' },
      { text: '装饰器', link: '/typeScript/advance/装饰器' },
      { text: '类型守卫', link: '/typeScript/advance/类型守卫' },
    ],
  },
  {
    text: '文件',
    collapsed: false,
    items: [
      { text: 'tsconfig.json', link: '/typeScript/file/配置文件' },
    ],
  },
] as DefaultTheme.SidebarItem[]
