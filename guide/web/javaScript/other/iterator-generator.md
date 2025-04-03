# 迭代器和生成器

## iterator

### 1.1 iterator

> 遍历器（Iterator）为各种不同的数据结构提供统一的接口访问机制。任何数据结构只要部署 Iterator 接口，即无须初始化集合，以
> 及索引的变量，而是使用迭代器对象的 next 方法，依次返回集合的下一项值，便于逐项处理该数据结构的所有成员，偏向程序化
>
> - itrator 接口供 for...of..使用

### 1.2 迭代器

> 迭代器是带有特殊接口的对象。含有一个 next() 方法，调用后返回一个包含两个属性的对象，分别是 value（表示属性值） 和
> done（表示迭代是否完成）。当迭代完成后，即 done 属性为 true 时，调用 next() 无效

### 1.3 迭代器协议

> 迭代器对象不是新的语法或新的内置对象，而一种协议[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)，所有遵守这个协议的对象，都可以称之为迭代
> 器。即包含 next 方法，调用 next 返回一个对象

- `{value:当前值，done:是否迭代完成}`

### 1.4 内置可迭代对象

原生具备 Iterator 接口的数据结构：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

### 1.5 对象部署 itrator

#### 1.5.1 普通函数实现

```js
const obj = {
  a: 1,
  b: 2
}
obj[Symbol.iterator] = function () {
  let index = 0
  const items = Object.values(this)
  return {
    next() {
      if (index < items.length)
        return { value: items[index++], done: false }
      else return { value: undefined, done: true }
    }
  }
}
for (const v of obj)
  console.log('v', v) // v 1  v 2

// ...扩展运算符内部调用的是数据结构的iterator接口
console.log('[...obj]', [...obj]) // [1 ,2]
```

### 1.5.2 generator 实现

```js
const obj = {
  a: 1,
  b: 2
}
// function * (){} 生成器函数
obj[Symbol.iterator] = function* () {
  let index = 0
  const items = Object.values(this)
  while (index < items.length) yield items[index++]
}
for (const v of obj)
  console.log('v', v) // v 1  v 2

// ...扩展运算符内部调用的是数据结构的iterator接口
console.log('[...obj]', [...obj]) // [1 , 2]
```

## generator 生成器

```js
/**
 * generator生成器函数, 返回一个迭代器对象,带*号的函数,可以暂停的函数
 */
function* generator() {
  yield 1
  yield 2
  yield 3
  // return 6
}
/**
 * generator执行后返回迭代器,调用迭代器的next方法, next()方法调用会执行generator函数,
 * 直到遇见yield关键字或者return
 * 就暂停执行函数,返回{value:***,done:***} yield 后面表达式的值作为value的值,
 * 再次调用next(),函数恢复执行,
 * 直到遇见下一个yield关键字 done属性表示当前的函数是否执行完毕
 */

const o = generator()
console.log(o.next()) // { value: 1, done: false }
console.log(o.next()) // { value: 2, done: false }
console.log(o.next()) // { value: 3, done: false }
// { value: undefined, done: true } 函数中return的值,如果没有写return 或者return为空,就是undefined
console.log(o.next())

// next方法调用传递参数,next传递的参数会作为上一次yield的最终结果
function* generator1(params) {
  const x = yield params
  const y = yield x
  return x + y
}
const ite = generator1('zkp')
console.log(ite.next()) // {value:1,done:false}
console.log(ite.next(10)) // {value:10,done:false}  这里的参数10将会作为x的值
console.log(ite.next(20)) // {value:30,done:true}   这里的参数20将会作为y的值
console.log(ite.next(30)) // {value:undefined,done:true}   已经执行完毕

// generator应用,给普通对象添加遍历器接口
const obj = {
  name: 'zkp',
  age: 32
}
obj[Symbol.iterator] = function* fn() {
  const values = Object.entries(this)
  for (const [k, v] of values)
    yield [k, v]
}
for (const [k, v] of obj)
  console.log(k, v)
  /**
   * name zkp
   * age 32
   */
```
