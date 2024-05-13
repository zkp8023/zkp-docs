# interface

> TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述

 <b style="color:#f00">interface来定义一种约束，让数据的结构满足约束的格式。一般用于定义对象类型,也可以定义函数和数组</b>

## 1.接口基本使用
> 使用`interface`来定义对象的**形状**(对象具有哪些特征和行为)
```typeScript
// 定义IPerson接口
interface IPerson {
    name: string
    age: number
    say: () => void
}
//  使用IPerson接口对 对象zkp的形状进行约束 zkp对象中的属性不能少也不能多
//  必须符合接口IPerson的定义
const zkp:IPerson = {
    name: 'zkp',
    age: 11,
    say() {
        console.log('给我一个div')
    }
}
```

## 2.可选属性 ?
> 有时我们希望不要完全匹配一个形状，那么可以用可选属性,可选属性的含义是该属性可以不存在

**格式:**   属性名?: 属性值

```typeScript
interface IPerson {
  name: string
  age?: number  // age为可选属性
}
// OK
const zkp: IPerson = {
  name: 'zkp',
}
// Ok
const yh: IPerson = {
  name: 'yh',
  age: 18
}
```
此时可选的属性可以没有  但**仍然不允许添加未定义的属性**:
```typeScript
interface IPerson {
  name: string
  age?: number  // age为可选属性
}
/**
 * 报错:
 * 不能将类型“{ name: string; hobby: string[]; }”分配给类型“IPerson”。
 * 对象字面量只能指定已知属性，并且“hobby”不在类型“IPerson”中
 */
const zkp: IPerson = {
  name: 'zkp',
  hobby:['swimming']
}

```
## 3.索引签名-任意属性
> 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
```typeScript
interface IPerson {
  readonly name: string
  age?: number
  /**
   * key:string 代表为string的任意属性  any代表任意属性值的类型
   * 注意点:在interface中其他属性的类型 必须是任意属性值类型的子类型:
   * 上面的number和string类型都是any的子类型
   */
  [key: string]: any  //定义索引签名
}
const zkp: IPerson = {
  name: 'zkp',
  age: 11,
  //  可以声明很多属性
  hobby: ['swimming'],
  xxx: 'hello'
}
/**
 *
 */
```
**注意点:**

1. <b style=color:#646cff;> 在interface中其他属性的类型 必须是任意属性值类型的子类型! ! ! ! !</b>
2. <b style=color:#646cff;> [key: string]:any 中的key代表属性的类型 只能是string 或者 number 当为number的时候表明这个接口定义的是数组或者类数组</b>

```typeScript
// 这是定义了一个数组类型 可以理解为数组也是对象 但是数组的key是他的索引,是数字类型的
interface IP {
  [k: number]: any
}
const arr: IP = [2, 'zkp']
```
## 4.索引签名-接口数组
> 利用索引签名 可以使用`interface`定义数组和类数组

```typeScript
interface IPerson {
  // 此时索引签名定义的键必须为number 在js和ts中键名为数字的对象只有数组和类数组
  [key: number]: any
}
// error
const obj: IPerson = {
  a: 9, //不能将类型“{ a: number; }”分配给类型“IPerson”。
}

// OK
const obj: IPerson = [1, 'zkp', 2, true]

// OK
const obj: IPerson = {
  0: 1,
  2: 'zkp',
  8: true,
}
```
## 5.调用签名-接口函数
> 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
>
> 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型
```typeScript
// 接口定义调用签名实现函数接口
interface ISing {
  (name: string, val: string | number): void
}
const sing: ISing = (name: string, val: string | number) => {
  console.log(`${name}在说${val}`)
}
sing('zkp', 'lg好帅')
```
**使用调用签名可以给函数定义额外的属性:**
```typeScript
interface ISing {
  (name: string, val: string | number): void
  age: number
}
const sing: ISing = (name: string, val: string | number) => {
  console.log(`${name}在说${val}`)
}
// 属性age的实现写在外面
sing.age = 9
```
## 6.只读属性 readonly
> 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

**格式:** readonly 属性名: 属性值
```typeScript
interface IPerson {
  readonly name: string
  age?: number
}
const zkp: IPerson = {
  name: 'zkp',
  age: 11,
}
zkp.name = 'yh' // 无法为“name”赋值，因为它是只读属性。ts(2540)
```
使用 `readonly` 并不意味着一个值就完全是不变的，亦或者说，内部的内容是不能变的。`readonly` 仅仅表明属性本身是不能被重新写入的。上面的代码中使用了readonly只代表zkp对象中的name属性不可变

## 7.接口继承
- 接口继承就是说接口可以通过其他接口来扩展自己。
- Typescript 允许接口继承多个接口。继承的接口之间使用逗号分割
- 继承使用关键字 extends

```typeScript
interface IAnimal {
  loveliness: boolean
}
interface ISmall {
  small?: true
}
// ICat类型继承自 IAnimal和 ISmall类型
interface ICat extends IAnimal , ISmall {
  // ICat类型自己的属性 say
  say(val: string): void
}
// 此时cat对象中必须同时包含ICat,IAnimal中的所有属性,因为这两个类型的属性都不是可选的
// 还可以包含ISmall类型中的small属性,这个是可选的 ,可以没有
const cat: ICat = {
  say(val) {
    console.log('val', val)
  },
  loveliness: true,
  small: true
}

```
<b style="color:#f00;">同名的接口声明不会报错,后面的声明会默认继承前面的声明</b>

```typeScript
interface IPerson {
  name: string
}
// 这个IPerson默认继承了上面声明的IPerson
interface IPerson {
  age: number
}
// 这里实现接口 IPerson的时候,对象必须同时包含name和age属性,因为他们都不是可选的
const zkp: IPerson = {
  name: 'zkp',
  age: 11,
}
```