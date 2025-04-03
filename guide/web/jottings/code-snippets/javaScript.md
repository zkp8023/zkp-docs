## 1. Array
<!-- @include: ./javaScript-code/array.md-->

## 2. 异步串行
:::details
:::code-group
```ts [tasks.ts]
export type Tasks = (() => Promise<any>)[]

const tasks = [
  () => new Promise(resolve => setTimeout(() => {
    console.log('1', 1)
    resolve(1)
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('2', 2)
    resolve(2)
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('3', 3)
    resolve(3)
  }, 1000))
]
```
```ts [Promise/reduce]
import type { Tasks } from './tasks'

function asyncSerial(tasks: Tasks) {
  return tasks.reduce<Promise<any>>((p, task) => p.then(task), Promise.resolve())
}
```
```ts [async/await] {5}
import type { Tasks } from './tasks'

async function asyncSerial(tasks: Tasks) {
  const results = []
  // 不能使用forEach forEach不支持异步等待
  for (const task of tasks) { // [!code error]
    results.push(await task())
  }
  return results
}
```
:::

## 3. 异步并行
:::details
:::code-group
```ts [tasks.ts]
export type Tasks = (() => Promise<any>)[]

export const tasks = [
  () => new Promise(resolve => setTimeout(() => {
    console.log('1', 1)
    resolve(1)
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('2', 2)
    resolve(2)
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('3', 3)
    resolve(3)
  }, 1000))
]
```
```ts [Promise]
import { type Tasks, tasks } from './tasks'

function asyncParallel(tasks: Tasks) {
  return Promise.all(tasks.map(task => task()))
}

asyncParallel(tasks).then((res) => {
  console.log('res', res) // 输出可能为: [1, 2, 3]，但顺序可能不同，取决于任务完成的时间
})
```

```ts [async/await]
import { type Tasks, tasks } from './tasks'

async function asyncParallel(tasks) {
  const results = await Promise.all(tasks.map(task => task()))
  return results
}

asyncParallel(tasks).then((res) => {
  console.log('res', res) // 输出可能为: [1, 2, 3]，但顺序可能不同，取决于任务完成的时间
})
```
:::

## 4. 异步并发控制 [async-pool](https://github.com/rxaviers/async-pool)：

:::details 查看代码
::: code-group
```ts [es7版本] {29,30}
/**
 * @param poolLimit 需要同时发送请求的数量
 * @param iterable 一个数组，可以是url，也可以是每个请求得其他参数，数组的每一项会传递iteratorFn
 * @param iteratorFn 对数组的每一项做操作的函数，异步函数，真正发请求的函数
 * @returns 全部请求完成之后的结果
 */
async function asyncPool(poolLimit, iterable, iteratorFn) {
  const ret = [] // 保存所有异步任务
  const executing = new Set() // 保存正在执行的任务

  for (const item of iterable) {
    /**
     * 包装成promise,防止传入的不是异步函数
     * iteratorFn(item, iterable),iterable参数如果不需要页可以不用传递过去
     */
    const p = Promise.resolve().then(() => iteratorFn(item, iterable))
    // 添加任务到任务池 , 此时被添加的任务还没有执行,Promise状态为pending
    ret.push(p)
    executing.add(p)
    // 清理函数,正在执行的任务池中有完成的任务就清理出去
    const clean = () => executing.delete(p)
    // 当前的任务Promise执行完成之后(不管已经成功或者失败),从正在执行的任务池中清理出去
    p.then(clean).catch(clean)
    /**
     * 并发控制核心: 如果任务池中的任务数量大于等于限制,就等待其中一个任务完成,
     * 此时循环代码会跳出,等待Promise状态变为fulfilled,然后继续执行下一个循环,
     * 感觉这里应该用Promise.any比较合理
     */
    if (executing.size >= poolLimit)
      await Promise.race(executing)
  }
  // 返回所有的结果Promise  感觉这里应该用Promise.allSettled
  return Promise.all(ret)
}
```
```ts [es9版本]
async function* asyncPool(concurrency, iterable, iteratorFn) {
  const executing = new Set()
  async function consume() {
    const [promise, value] = await Promise.race(executing)
    executing.delete(promise)
    return value
  }
  for (const item of iterable) {
    const promise = (async () => await iteratorFn(item, iterable))().then(
      value => [promise, value]
    )
    executing.add(promise)
    if (executing.size >= concurrency)
      yield await consume()
  }
  while (executing.size)
    yield await consume()
}
```

```ts [demo.ts]
import asyncPool from './asyncPool'

// 模拟请求函数
function getAsyncValue(i) {
  return new Promise((resolve) => {
    // 这里同时打印的数量不超过asyncPool poolLimit参数
    console.log('i', i)
    setTimeout(() => {
      resolve(i)
    }, 1000)
  })
}
async function handle() {
  // 每次同时发2个请求
  const result = await asyncPool(2, [1, 2, 3, 4, 5, 6, 7, 8, 9], getAsyncValue)
  console.log('result', result)
}
handle()
```
:::

## 5. 请求重试
:::details
```ts {6}
async function foo(callback: Promise<any>, limit = 3) {
  // const promise = Promise.resolve().then(() => callBack())
  for (let i = 0; i <= limit; i++) {
    try {
      // callBack成功 退出函数跳出循环
      return await callBack()
      // return await promise;
    }
    catch (err) {
      // callBack失败 继续下一次循环
      console.log('err', err)
      // 到达限定重试次数
      if (i === limit)
        throw err
    }
  }
}
```
:::
