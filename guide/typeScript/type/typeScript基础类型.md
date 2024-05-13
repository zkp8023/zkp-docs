# TypeScript常见类型
## 1.number
> 支持十六进制、十进制、八进制和二进制；
```typeScript
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```
## 2.string
```typeScript
//普通声明
let a: string = '123'

//也可以使用es6的字符串模板
let str: string = `dddd${a}`
```
## 3.boolean类型
<b style="color:red;">注意，使用构造函数 Boolean 创造的对象不是布尔值：</b>
```typeScript
//这样会报错 事实上 new Boolean() 返回的是一个 Boolean 对象
let createdBoolean: boolean = new Boolean(1)
```
```typeScript
let createdBoolean: Boolean = new Boolean(1)
```

```typeScript
let booleand: boolean = true //可以直接使用布尔值

let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
```
## 4.void空值类型
> JavaScript 没有空值（Void）的概念，不过可以使用void()函数来得到undefined，void()函数接收的任意值最终都会返回undefiend,他与undefined值本身的区别是`undefined`并不是一个js中的关键字，所以可以作为对象的属性名，为防止不必要的问题，如果确定需要undefined可以使用void(0)来代替
在 TypeScript 中，可以用 `void` 表示<mark>没有任何返回值</mark>的函数
```typeScript
function voidFn(): void {
    console.log('test void')
}
```
`void`也可以定义undefined 和 null类型
```typeScript
let u: void = undefined
let n: void = null;
```
## 5.null 和 undefined
默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给其他类型。
```typeScript
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me");
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined

```
:::danger 注意：
如果在 tsconfig.json 指定了 `strictNullChecks:true`或者`strict:true` ，null 和 undefined只能赋值给它们各自的类型,其中undefined可以赋值给void类型，但是null不可以
:::

```typeScript
// 开启了strict：true 或者 strictNullChecks:true

const a:void = undefined //可以赋值

const b:void = null //  报错 null不能赋值给void
```

## 6. never
一些函数从来不返回值：
```ts
/**
 * fail函数在执行中抛出了一个错误对象 程序会终止执行,所以它不会有返回值(返回不可能的值)
 *
 */
function fail(msg: string): never {
  throw new Error(msg)
}
```
`never` 类型表示一个值不会再被观察到 (observed)。

作为一个返回类型时，它表示这个函数会丢一个异常，或者会结束程序的执行。

当 TypeScript 确定在联合类型中已经没有可能是其中的类型的时候，`never` 类型也会出现：
```ts
function fn(x: string | number) {
  if (typeof x === 'string') {
    // do something
  }
  else if (typeof x === 'number') {
    // do something else
  }
  else {
    // 这个分支已经没有东西了...
    x // has type 'never'!
  }
}
```
## 7. object,Object,{}
### 7.1 Object
:::tip
Object类型是所有 Object 类的实例的类型。原型链顶层就是 Object，所以值类型和引用类型最终都指向 Object，所以在TypeScript中Object他包含所有类型。就可以等于任何一个值
它由以下两个接口来定义：
- Object 接口定义了 Object.prototype 原型对象上的属性；
- ObjectConstructor 接口定义了 Object 类的属性。
:::

Object是一个对象，但是是包含了js原始的所有公用的功能:
:::details typeof Object
```ts
interface Object {
  /** The initial value of Object.prototype.constructor is the standard built-in Object constructor. */
  constructor: Function
  /** Returns a string representation of an object. */
  toString: () => string
  /** Returns a date converted to a string using the current locale. */
  toLocaleString: () => string
  /** Returns the primitive value of the specified object. */
  valueOf: () => Object
  /**
   * Determines whether an object has a property with the specified name.
   * @param v A property name.
   */
  hasOwnProperty: (v: PropertyKey) => boolean
  /**
   * Determines whether an object exists in another object's prototype chain.
   * @param v Another object whose prototype chain is to be checked.
   */
  isPrototypeOf: (v: Object) => boolean
  /**
   * Determines whether a specified property is enumerable.
   * @param v A property name.
   */
  propertyIsEnumerable: (v: PropertyKey) => boolean
}
```
:::

:::details typeof ObjectConstructor
```ts
interface ObjectConstructor {
  /** Invocation via `new` */
  new(value?: any): Object
  /** Invocation via function calls */
  (value?: any): any
  readonly prototype: Object
  getPrototypeOf: (o: any) => any
  // ···
}
declare let Object: ObjectConstructor
```
:::

```ts
// 这个类型是跟原型链有关的原型链顶层就是 Object，所以值类型和引用类型最终都指向 Object，所以在TypeScript中Object他包含所有类型。就可以等于任何一个值
// 1.数字类型
const a: Object = 123
// 字符串类型
const b: Object = '给我一个div'
// 数组类型
const c: Object = [1, 520]
// 对象类型
const d: Object = { name: 'zkp' }
// any或者function
const e: Object = () => '鹏哥好帅'

// ...
```

### 7.2 object
这个特殊的类型 `object` 可以表示任何不是原始类型（primitive）的值 (string、number、bigint、boolean、symbol、null、undefined)。

:::danger 注意
 JavaScript 中，函数就是对象，他们可以有属性，在他们的原型链上有 Object.prototype，并且 instanceof Object。你可以对函数使用 Object.keys 等等。由于这些原因，在 TypeScript 中，函数也被认为是 object。
:::

```ts
const a: object = { name: '给我一个div' } // OK
const b: object = [1, 2, 3] // OK
const c: object = () => { } // OK
/**
 *  以下将原始类型赋值给object类型都将抛出错误
 */
const d: object = 6 // [!code error]
const e: object = '7' // [!code error]
const f: object = undefined // [!code error]
const g: object = null // [!code error]
const h: object = true // [!code error]
const i: object = 10n // [!code error]
const j: object = Symbol('zkp') // [!code error]
```
:::danger 注意:
1. object类型默认可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过 JavaScript 的原型链隐式地使用，但是如果在object中重写了原型链中的属性或者方法，那么会直接覆盖，不受原型链上的影响！
2. object类型可以定义对象,但是不会自动抽取对象中的属性,访问object类型对象中的**非共有属性或方法会抛错**
```ts
const a: object = {
  name: 'zkp',
  // 重写 Object上的toString方法 如果是Object类型 重写会报错
  toString: () => {
    console.log('zkp')
  },
}
console.log('a.toString()', a.toString()) // OK
console.log('a.valueOf()', a.valueOf()) // OK
console.log(a.name) // [!code error] 类型“object”上不存在属性“name”。ts(2339)
```
:::

### 7.3 {} 空对象
空类型：{}。它描述了一个没有成员的对象，在typeScript中可以有以下方式生成空类型：
1. 没有声明变量类型，但是初始值为{}:
   ```ts
   const obj = {}
   ```
2. 直接声明变量类型为{}
   ```ts
   let obj: {}
   ```
:::tip
试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误；但是，你仍然可以使⽤在 Object 类型上定义的所有属性和⽅法，这些属性和⽅法可通过 JavaScript 的原 型链隐式地使⽤：
:::

```ts
let obj: {}
obj = undefined // [!code error] Error:不能将类型“undefined”分配给类型“{}”。ts(2322)
obj = 'a'
obj = {
  a: 'hell oworld',
  b: 1,
  c: true,
  toString() {
    return 123
  }
}
console.log(obj)
/*
{
  "a": "hell oworld",
  "b": 1,
  "c": true
}
*/
console.log(obj.toString()) // 123;
```
### 7.4 总结
对于`Object`、`object`和`{}`，三者都可以使⽤在 `Object` 类型上定义的所有属性和⽅法，这些属性和⽅法可通过 JavaScript 的原 型链隐式地使⽤；并且都不能被赋值为`undefined`、`null`类型；

**Object vs object**:

1. 两者原型上属性方法重写表现不一致；
2. object类型值表示⾮原始类型，Object类型值可以为原始类型；
3. Object可以通过new来定义类型；

**Object vs {}:**

1. 两者类型值可以为原始类型；
2. 两者原型上属性方法重写表现不一致；
3. Object可以通过new来定义类型；

**object vs {}：**

1. 两者原型上属性方法重写表现一致；
2. object类型值表示⾮原始类型，{} 类型值可以为原始类型；

## 8.symbol类型
自ECMAScript 2015起，`symbol`成为了一种新的原生类型，就像number和string一样
symbol类型的值是通过Symbol构造函数创建的，可以传递参做为唯一标识 只支持 `string` 和 `number`类型的参数
```typeScript
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```
**Symbol的值是唯一的:**
```typeScript
const s1 = Symbol()
const s2 = Symbol()
// s1 === s2 =>false
```
**用作对象属性的键:**
```typeScript
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"
```
**使用symbol定义的属性，是不能通过如下方式遍历拿到的：**
```typeScript
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: 'zkp',
   [symbol2]: 'yh',
}
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```
**获取Symbol属性的两种方式：**

```typeScript
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

**内置的一些Symbol:**
- <b style="color:red;">Symbol.hasInstance</b>
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

- <b style="color:red;">Symbol.isConcatSpreadable</b>
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

- <b style="color:red;">Symbol.iterator</b>
方法，被for-of语句调用。返回对象的默认迭代器。[迭代器和生成器](/javaScript/other/iterator-generator.md)

- <b style="color:red;">Symbol.match</b>
方法，被String.prototype.match调用。正则表达式用来匹配字符串。

- <b style="color:red;">Symbol.replace</b>
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

- <b style="color:red;">Symbol.search</b>
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

- <b style="color:red;">Symbol.species</b>
函数值，为一个构造函数。用来创建派生对象。

- <b style="color:red;">Symbol.split</b>
方法，被String.prototype.split调用。正则表达式来用分割字符串。

- <b style="color:red;">Symbol.toPrimitive</b>
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

- <b style="color:red;">Symbol.toStringTag</b>
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

- <b style="color:red;">Symbol.unscopables</b>
对象，它自己拥有的属性会被with作用域排除在外。

## 9. bigint
> bigint可以表示任意大的整数，通常用来支持number无法表示的数字。
```typeScript
let big:bigInt = 100n
```
虽然 number 和 bigint 都表示数字，但是这两个类型不兼容。
```typeScript
let big: bigint =  100n;
let num: number = 6;
big = num; // 不能将类型“number”分配给类型“bigint”
num = big; // 不能将类型“bigint”分配给类型“number”
```
## 10.any 和 unknown 顶级类型
1. `any`表示没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型
```typeScript
/**
 * any类型就跟原生的是一样的，能够给任意的类型进行定义，所以在在 TypeScript 中，
 * 任何类型都可以被归为 any 类型。
 * 这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型 )。
 */
let anys:any = "zkp"
anys = []
anys = 18
anys = {}
anys = Symbol('666')
```
2. `unknow`表示暂时还不知道是什么类型，同样是顶级类型,任何类型都可以赋值非`unknow`类型
```typeScript
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK
```
**any和unknow的区别：**
1. any既可以作为父类型(他本来就是顶级类型)，也可以作为子类型，但是unknow作为子类型的时候只能赋值给自己或者any类型

```typeScript
    // unknow不能作为子类型赋值给非unknow和any的类型
    const a: unknown = 123
    let b = 'zkp'
    b = a // 不能将类型“unknown”分配给类型“string”

    // unknow只能作为any和unknow的子类型
    const x: unknown = 12
    let y: any = 'zkp'
    y = x // OK

    // any可以作为任意类型的子类型
    const c:any = 123
    let d = 'zkp'
    d = c  // OK
```
2. any类型的对象在获取不存在的属性时不会报错，但是unknow不允许
```typeScript
const obj: any = {
  name: 'zkp',
  age: 11,
}
console.log('obj.hobby', obj.hobby)  //不会提前报错

// unknow类型的对象访问不存在的属性
const obj2: unknow = {
  name: 'zkp',
  age: 11,
}
console.log('obj.hobby', obj.hobby) //  “obj”的类型为“未知”。ts(18046)
```