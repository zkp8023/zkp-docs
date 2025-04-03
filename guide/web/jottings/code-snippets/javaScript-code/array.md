### 1.1. 对象数组去重
:::details
:::code-group
```ts [data]
interface Item {
  name?: string
  age?: number
  id: number
}
const arr: Item[] = [
  { name: '给我一个div', age: 10, id: 1 },
  { name: 'yh', age: 12, id: 2 },
  { name: 'zhy', age: 6, id: 3 },
  { name: 'yh', age: 13, id: 2 },
  { name: '给我一个div', age: 15, id: 1 },
]
```
```ts [使用空对象]
const unique = (arr: Item[], key = 'id') => {
  const obj = {}
  return arr.reduce<Item[]>((acc, item) => {
    return (obj[item[key]] || (obj[item[key]] = true && acc.push(item)), acc)
  }, [])
}
```

```ts [使用Map]
const unique = (arr: Item[], key = 'id') => {
  const map = new Map()
  return arr.reduce<Item[]>((acc, item) => {
    !map.has(item[key]) && acc.push(item)
    map.set(item[key], item)
    return acc
  }, [])
}
```
:::

### 1.2. 多维数组扁平化
---

:::details
:::code-group
```ts [es6 flat]
const flatten = (arr: any[]) => arr.flat(Number.POSITIVE_INFINITY)
```

```ts [reduce]
/**
 *
 * @param arr 要扁平化的数组
 * @param deep 扁平深度,默认扁平一层
 */
const flatten = (arr: any[], deep = 1) => {
  if (deep <= 0)
    return arr
  return arr.reduce<any[]>((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item, deep - 1) : item)
  }, [])
}
```

```ts [堆栈 stack 避免递归]
/**
 *
 * @param arr 要扁平化的数组
 * @param deep 扁平深度,默认扁平一层
 */
function flatten(arr, deep = 1) {
  const stack = [...arr]
  const res: any[] = []
  let index = 0 // 记录出栈的索引
  while (deep-- > 0 && stack.length) {
    // 使用 shift 从 stack 中取出并移除值
    const next = stack.shift()
    /**
     * 是数组 推回栈内  不是数组  在原索引位置插入元素
     */
    Array.isArray(next) ? stack.push(...next) : res.splice(index++, 0, next)
  }
  return [...stack, ...res]
}
```
```ts [while/some]
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```
:::