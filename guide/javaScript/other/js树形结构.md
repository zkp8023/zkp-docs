# js 树形结构操作

:::demo

```vue
<script setup lang="ts">
const treeData = [
  {
    id: '1',
    name: '测试1',
    pid: '0',
    children: [
      {
        id: '11',
        name: '测试11',
        pid: '1',
        children: [
          {
            id: '111',
            name: '测试111',
            pid: '11',
            children: [
              {
                id: '1111',
                name: '测试1111',
                pid: '111'
              },
              {
                id: '1112',
                name: '测试1112',
                pid: '111'
              }
            ]
          },
          {
            id: '112',
            name: '测试112',
            pid: '11',
            children: [
              {
                id: '1121',
                name: '测试1121',
                pid: '112'
              }
            ]
          },
          {
            id: '113',
            name: '测试113',
            pid: '11'
          }
        ]
      },
      {
        id: '12',
        name: '测试12',
        pid: '1',
        children: [
          {
            id: '121',
            name: '测试121',
            pid: '12'
          }
        ]
      },
      {
        id: '13',
        name: '测试13',
        pid: '1'
      },
      {
        id: '14',
        name: '测试14',
        pid: '1'
      }
    ]
  },
  {
    id: '2',
    name: '测试2',
    pid: '0',
    children: [
      {
        id: '21',
        name: '测试21',
        pid: '2',
        children: [
          {
            id: '211',
            name: '测试211',
            pid: '21'
          },
          {
            id: '212',
            name: '测试212',
            pid: '21'
          }
        ]
      },
      {
        id: '22',
        name: '测试22',
        pid: '2'
      }
    ]
  }
]
</script>

<template>
  <p style="color: #9370DB">
    测试树形数据
  </p>
</template>
```

:::

## 1.树形数据扁平化

### 1.1 深度遍历,利用 `arr.concat()`

> 最后生成项带有完整的 children

```ts
const treeToArr = (tree) => {
  return tree.reduce((acc, item) => {
    /**
    不需要生成项中带有完整的children
return acc.concat({ id: item.id, pid: item.pid, name: item.name }, Array.isArray(item.children) ? treeToArr(item.children) : [])
     */
    return acc.concat(item, Array.isArray(item.children) ? treeToArr(item.children) : [])
  }, [])
}

//  简洁模式:

const treeToArr = tree =>
  tree.reduce((acc, item) => acc.concat(item, Array.isArray(item.children) ? treeToArr(item.children) : []), [])
```

### 1.2 深度优先遍历

> 生成的项不带 children

```ts
/**
 * func:(item)=>需要item中的什么就返回什么
 */
const flatTree = <T extends { children?: T[] }>(tree: T[], func: (val: T) => T) => {
  return tree.reduce<T[]>((acc, it) => {
    acc.push(func(it))
    it.children && acc.push(...flatTree(it.children, func))
    return acc
  }, [])
}
const res = flatTree(tree, item => ({ id: item.id, path: item.path }))
```

### 1.3 广度优先遍历

```ts
const treeToArr = (data) => {
  let queue = []
  const result = []
  // 生成一份拷贝,下方用到了shift()
  queue = queue.concat(JSON.parse(JSON.stringify(data)))
  while (queue.length) {
    const firstItem = queue.shift()
    if (firstItem.children) {
      queue = queue.concat(firstItem.children)
      // 添加完当前项删除当前项的children
      Reflect.deleteProperty(firstItem, 'children')
    }
    result.push(firstItem)
  }
  return result
}
```

## 2.扁平数据树形化

:::demo

```vue
<script setup>
const data = [
  { id: '1', name: '测试1', pid: '0' },
  { id: '2', name: '测试2', pid: '0' },
  { id: '11', name: '测试11', pid: '1' },
  { id: '12', name: '测试12', pid: '1' },
  { id: '13', name: '测试13', pid: '1' },
  { id: '14', name: '测试14', pid: '1' },
  { id: '21', name: '测试21', pid: '2' },
  { id: '22', name: '测试22', pid: '2' },
  { id: '111', name: '测试111', pid: '11' },
  { id: '112', name: '测试112', pid: '11' },
  { id: '113', name: '测试113', pid: '11' },
  { id: '121', name: '测试121', pid: '12' },
  { id: '211', name: '测试211', pid: '21' },
  { id: '212', name: '测试212', pid: '21' },
  { id: '1111', name: '测试1111', pid: '111' },
  { id: '1112', name: '测试1112', pid: '111' },
  { id: '1121', name: '测试1121', pid: '112' }
]
</script>

<template>
  <p style="color: #9370DB">
    测试扁平数据
  </p>
</template>
```

:::

### 2.1 双循环

```ts
/**
 * filter实现
 * @params pid:顶级节点  "0"
 */
function dataToTree(data, pid) {
  const _data = JSON.parse(JSON.stringify(data))
  return _data.filter((p) => {
    const arr = _data.filter(c => p.id === c.pid)
    arr.length && (p.children = arr)
    return p.pid === pid
  })
}

/**
 * reduce 实现
 */
function dataToTree(data) {
  return data.reduce((acc, it, i, arr) => {
    it.children = arr.filter(v => v.pid === it.id)
    // 当前项没有父级
    if (it.pid === '0')
      acc.push(it)
    return acc
  }, [])
}
```

### 2.2 循环递归

```ts
/**
 * @params pid:顶级节点  "0"
 */
function dataToTree(data, pid) {
  const list = data.filter(it => it.pid === pid)
  list.forEach((it) => {
    it.children = dataToTree(data, it.id)
  })
  return list
}
```

### 2.3 map 映射

```ts
function dataToTree(data) {
  const map = {}
  return dataList.reduce((acc, item) => {
    if (!item.children)
      item.children = []
    map[item.id] = item
    if (map[item.pid])
      map[item.pid].children.push(map[item.id])
    else
      acc.push(map[item.id])

    return acc
  }, [])
}
```

## 3.搜索树结构

### 3.1 根据条件搜索节点

#### 循环查找1
> 根据条件搜索节点,可单独返回当前节点,或当前节点以及所有子节点
```ts
export const searchTree = <T extends { children?: T[] }>(tree: T[], callback: (val: T) => boolean) => {
  let queue: T[] = [] // 循环栈
  const result: T[] = [] // 查找的结果(如果只需要返回符合条件的第一项,可不需要这个,并解开下方注释)
  queue = queue.concat(JSON.parse(JSON.stringify(tree)))
  while (queue.length) {
    const firstItem = queue.shift() as T
    if (firstItem && firstItem?.children)
      queue = queue.concat(firstItem.children)

    // if (callback(firstItem)) return firstItem   //返回符合条件的第一项
    if (callback(firstItem))
      result.push(firstItem) // 返回所有符合条件的项组成的数组
  }
  return result
}

// 方式2  查找条件自己决定 查找id为'21'的节点
console.log(
  'dataToTree(data)',
  searchTree(treeData, data => data.id === '21')
)
```
#### 循环查找2
```ts
export const findNode = <T extends { children?: T[] }>(tree: T[], callback: (item: T) => boolean): T | null => {
  const stack = [...JSON.parse(JSON.stringify(tree))] // 初始化栈，将根节点及其父节点压入栈中
  while (stack.length > 0) {
    const node = stack.shift() as T // 取出栈顶元素及其父节点
    if (callback(node)) {
      // 如果当前节点满足条件，返回其父节点
      return node
    }
    if (node.children) {
      // 如果当前节点有子节点，将子节点及其父节点压入栈中
      stack.push(...node.children)
    }
  }
  return null
}
```

#### 递归查找
返回第一项符合条件的节点
```typescript
 const findNode = <T extends { children?: T[] }>(tree: T[], func: (val: T) => boolean): T | null => {
  for (const node of tree) {
    if (func(node)) return node
    if (node.children) {
      const res = findNode(node.children, func)
      if (res) return res
    }
  }
  return null
}
```

### 3.2 根据条件向上搜索节点

#### 递归(模糊查找)
> 根据条件搜索返回符合条件第一个父节点
```ts
export const findParenrNode = <T extends { children?: T[] }>(tree: T[], callback: (item: T) => boolean, parent: T | null = null): T | null => {
  for (const item of tree) {
    if (callback(item))
      return parent
    if (item.children) {
      const res = findParenrNode(item.children, callback, item)
      if (res)
        return res
    }
  }
  return null
}
```
> 返回符合条件的所有父节点数组(**模糊查找**)
```ts
/**
 * 根据条件向上查找节点
 * @param tree 树
 * @param func 条件函数
 * @param path 返回的节点数组
 * @returns 查找到的节点树
 */
type FindType = <T extends { children?: T[] }>(tree: T[], callback: (v: T) => boolean, path?: T[]) => T[]
export const treeFindPath: FindType = (tree, callback, path = []) => {
  if (!tree)
    return []
  for (const data of tree) {
    if (callback(data))
      path.push(data)
    data.children && treeFindPath(data.children, callback, path)
  }
  return path
}
```

#### 循环(模糊查找)
> 返回符合条件的第一个父节点

```ts
export const findParenrNode = <T extends { children?: T[] }>(tree: T[], callback: (item: T) => boolean) => {
  // 初始化栈，将根节点及其父节点压入栈中 最好使用CloneDeep函数
  const stack = [...JSON.parse(JSON.stringify(tree))]
  while (stack.length > 0) {
    const node: T & { parent?: T } = stack.shift() // 取出栈顶元素及其父节点
    if (callback(node)) {
      // 如果当前节点满足条件，返回其父节点
      return node.parent
    }
    if (node.children) {
      // 如果当前节点有子节点，将子节点及其父节点压入栈中
      for (const child of node.children) {
        stack.push({ ...child, parent: node })
      }
    }
  }
  return null
}
```

> 返回符合条件的所有父节点数组(**模糊查找**)
```ts
type FindType = <T extends { children?: T[] }>(tree: T[], callback: (v: T) => boolean, path?: T[]) => T[]
const treeFindPath: FindType = (tree, callback, path = []) => {
  // 初始化栈，将根节点及其父节点压入栈中 最好使用CloneDeep函数
  const stack = [...JSON.parse(JSON.stringify(tree))]
  while (stack.length > 0) {
    const node = stack.shift() // 取出栈顶元素及其父节点
    if (callback(node)) {
      // 如果当前节点满足条件，返回其父节点
      path.push(node)
    }
    if (node.children) {
      stack.push(...node.children)
    }
  }
  return path
}
```

#### 递归精确查找
> 返回符合条件的所有父节点数组(**唯一值精确查找**)
```ts
// 根据当前节点唯一值查找所有父节点
type FindType = <T extends { key: string, children?: T[] }>(tree: T[], key: T['key'], path?: T[]) => T[] | undefined
export const treeFindPath: FindType = (tree, key, path = []) => {
  if (!tree)
    return
  for (const item of tree) {
    if (item.key === key) {
      path.unshift(item)
      return path
    }
    if (item.children) {
      const result = treeFindPath(item.children, key, path)
      if (result) {
        // 追加父节点
        path.unshift(item)
        return path
      }
    }
  }
}
```