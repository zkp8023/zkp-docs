import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Git',
    collapsed: false,
    items: [
      { text: 'git学习笔记', link: '/git/git' },
      { text: 'git常用命令', link: '/git/gitcmd' },
    ],
  },
  {
    text: 'Git问题',
    collapsed: false,
    items: [
      { text: 'git忽略文件不生效', link: '/git/gitignore忽略文件不生效' },
    ],
  },
] as DefaultTheme.SidebarItem[]
