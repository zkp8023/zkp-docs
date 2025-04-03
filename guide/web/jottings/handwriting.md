## 1. call,apply,bind

:::details 点击查看
```js
Function.prototype.myCall = function (ctx, ...args) {
  // 传入的context为undefined或null,则设置为全局对象（浏览器中为window）
  ctx = ctx || window
  // 给context对象添加一个独有的属性,将当前调用call的函数设置为该属性的值
  const key = Symbol('key')
  ctx[key] = this // myCall方法作为待执行函数的方法调用,此时myCall中的this就是待执行的这个方法

  const res = ctx[key](...args)
  Reflect.deleteProperty(ctx, key)
  return res
}

/**
 * apply 接收的第二个参数为数组或类数组
 */
Function.prototype.myApply = function (context, argsArray) {
  context = context || window
  const key = Symbol('key')
  context[key] = this
  let result
  // 判断是否传入了参数数组
  if (argsArray && argsArray.length > 0) {
    // 将参数数组展开传递给函数，并将结果保存下来
    result = context[key](...argsArray)
  }
  else {
    // 如果没有传入参数数组，则直接调用函数
    result = context[key]()
  }
  // 删除临时添加的属性
  delete context[key]
  // 返回函数执行的结果
  return result
}

/**
 * bind 方法返回一个新的函数，该函数的 this 绑定到传入的 context 对象，其余参数将作为新函数的参数，
 * 调用该函数会立即执行并返回结果。如果是通过new调用则忽略绑定的this，直接new原函数。
 */

Function.prototype.myBind = function (context, ...args) {
  const That = this
  return function Bound(...innerArgs) {
    const params = args.concat(innerArgs)
    // 当通过 new 关键字调用绑定函数时，直接new 原函数,忽略this绑定
    if (new.target)
      return new That(params)

    return That.myApply(context, params)
    // return That.apply(context, params);
  }
}
```
:::

## 2. new
:::details 点击查看
```js
function myNew(Constructor, ...args) {
  // 1.创建一个新的空对象
  //   2. 绑定该对象的原型为构造函数的原型
  const newObj = Object.create(Constructor.prototype)

  // 3.调用构造函数并将内部this指向新创建的对象
  const result = Constructor.call(newObj, ...args)

  // 4.构造函数如果返回值是一个对象，则返回该对象，否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : newObj
}
```
:::

## 3. 请求重试
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
