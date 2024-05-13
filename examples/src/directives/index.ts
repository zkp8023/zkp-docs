import type { App } from 'vue'
import { setupSortableDirective } from './sortable'
import { setupIntersectionDirective } from './intersection'
import { setupResizeDirective } from './resize'
import { setupDragElement } from './dragElement'

export const setupDirectives = (app: App) => {
  // 拖拽指令
  setupSortableDirective(app)
  // 监听元素可见指令
  setupIntersectionDirective(app)
  // 监听元素尺寸变化指令
  setupResizeDirective(app)
  // 拖拽元素
  setupDragElement(app)
}
