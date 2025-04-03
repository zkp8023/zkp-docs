import type { DefaultTheme } from 'vitepress'

export default [
  {
    text: 'Git',
    collapsed: false,
    items: [
      { text: 'git学习笔记', link: '/web/git/git.md' },
      { text: 'git常用命令', link: '/web/git/gitcmd' },
    ],
  },
  {
    text: 'Git问题',
    collapsed: false,
    items: [
      { text: 'git忽略文件不生效', link: '/web/git/gitignore忽略文件不生效' },
    ],
  },
] as DefaultTheme.SidebarItem[]
