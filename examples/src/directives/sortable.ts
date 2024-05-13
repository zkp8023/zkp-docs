import type { App, Directive, DirectiveBinding } from 'vue'
import type { SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'

// 全局拖拽指令 v-sortable
export const setupSortableDirective = (app: App) => {
  const sortable: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<SortableOptions>) {
      Sortable.create(el, {
        animation: 300,
        ...binding.value,
      })
    },
    unmounted() {
      console.log('99')
    },
  }
  app.directive('sortable', sortable)
}
