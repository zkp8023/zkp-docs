# class类
[js中类的用法](https://es6.ruanyifeng.com/#docs/class)很详细的教程
>`typeScript`完全支持js中的类功能,并提供了类型注解和其他语法，允许你表达类与其他类型之间的关系
```ts
// 创建一个空类
class Person {}
```
定义类的同时，相当于定义了一个相同名称的接口,可以直接将类当做一个类型去使用

```typescript
class Person {
    name = '给我一个div'
    constructor() {
        // ...
    }
    getName() {
        return this.name
    }
}
// 使用类接口
const obj: Person = {
    name: 'zkp',
    getName: () => {
        return ''
    }
}
```
## 1.类成员
:::tip typeScript类成员
1. 构造函数
2. 类属性(字段)
3. 类方法
4. 存取器(getter/setter)
5. 索引签名
:::

### 1.1 构造函数constructor()
>`constructor()`是类的默认方法,跟普通函数非常类似，你可以使用带类型注解的**参数、默认值、重载**等。
>通过new命令生成对象实例时，程序会自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加,该方法中的this指向当前实例对象。
```ts
class Point {
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
```
```ts
class Point {
  // Overloads
  constructor(x: number, y: string)
  constructor(s: string)
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```
:::warning 类构造函数签名与函数签名之间也有一些区别
- 构造函数不能有类型参数（泛型,也就是`constoctor`不能是泛型函数），这些属于外层的类声明。
- 构造函数不能有返回类型注解(不能显示声明该函数的返回值)，因为总是返回类实例类型
:::
### 1.2 类实例属性
类实例属性申明的几种方式:
#### 1.  声明属性在constructor中指定初始值
>[strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)选项控制了类字段是否需要在构造函数里初始化,在开启的情况下,没有初始值的实例属性声明需要在`constructor`中指定初始值
```ts
/* 没有指定初始值报错 */
class Person {
  name: string // [!code error]  属性“name”没有初始化表达式，且未在构造函数中明确赋值。ts(2564)
}

/* 在constructor 中指定初始值 */
class Person {
  name: string
  constructor() {
    this.name = 'zkp'// [!code ++]
  }
}
```
:::danger 注意
这种情况下实例属性需要在构造函数自身进行初始化。`TypeScript` 并不会分析构造函数里你调用的方法，进而判断初始化的值，因为一个派生类也许会覆盖这些方法并且初始化成员失败：
```ts
class Person {
  name: string // [!code error]  属性“name”没有初始化表达式，且未在构造函数中明确赋值。ts(2564)
  constructor() {
    this.setName('zkp')
  }

  // 实例方法
  setName(name: string) {
    this.name = name
  }
}
```
:::
:::tip
如果就想直接声明初始值,也不想在constructor中实例化,可以使用明确的非空断言 `!`
```ts
class Person {
  name!: string
}
```
:::
#### 2. 属性默认值:
```ts
class Person {
  // 声明属性的同时进行默认值初始化
  name: string = 'zkp'
  age: number = 11
  constructor() {
    /*  */
  }
}
const p = new Person()
console.log('p', p) // Person { name: 'zkp', age: 11 }
```
:::tip 以上默认值添加属性是可以利用类型推论省去声明属性时的类型注解
就像 `const` `、let` 和 `var` ，一个类属性的初始值会被用于推断它的类型:
```ts
class Person {
  name = 'zkp'
  age = 11
  constructor() {
    /*  */
  }
}
const p = new Person()
p.age = '12' // [!code error] 不能将类型“string”分配给类型“number”。ts(2322)
```
:::

### readonly 只读属性

> 属性可以添加一个 `readonly `前缀修饰符，这会阻止在构造函数之外的赋值。
>
> ```typescript
> class Person {
>   /*只能在contructor中赋值age属性*/
>     readonly age: number
>     constructor(newAge: number) {
>         this.age = newAge
>     }
> }
> const p = new Person(9999)
> console.log('p', p)
> p.age = 999 // [!code error] 无法为“age”赋值，因为它是只读属性。ts(2540)
>
> /*通过实例方法写入也是不允许的：*/
> class Person {
>     readonly age: number
>     constructor(newAge: number) {
>         this.age = newAge
>     }
>     setAge(age: number) {
>         this.age = age // [!code error] 无法为“age”赋值，因为它是只读属性。ts(2540)
>     }
> }
> ```

### 实例方法

> 类中的函数属性被称为方法。方法跟函数、构造函数一样，使用相同的类型注解。

```typescript
class Person {
    age = 12

    getName(age:number):void{
        this.age = age
    }
}
```

在一个方法体内，它依然可以通过 `this`. 访问实例属性和其他的方法。

### getter/setter

类中的存取器：

```typescript
/**
 * Person类的myAge属性添加存取器
 */
class Person {
    age = 99
    get myAge(): number {
        return this.age
    }
    set myAge(val) {
        this.age = val
    }
}
```

:::danger `TypeScript` 对存取器有一些特殊的推断规则：

<br/>

- 如果 `get` 存在而 `set `不存在，属性会被自动设置为 `readonly`
- 如果 `setter `参数的类型没有指定，它会被推断为 `getter `的返回类型
- `getters `和 `setters `必须有相同的成员可见性(在下面)

:::

## 2.类继承

`TypeScript` 同样支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类(基类)，继承它的类称为子类（派生类）。

### 1.extends语句

类可以 `extend `一个基类。一个派生类有基类除**私有成员**外所有的属性和方法，还可以定义额外的成员。

`TypeScript `一次只能继承一个类，不支持继承多个类，但 `TypeScript `支持多重继承（A 继承 B，B 继承 C）。

在派生类使用`extends`关键字继承基类的时候，需在派生类的`constructor`中使用`super()`,来调用基类的`constructor`,可以查看-->[JavaScript中的类继承](https://es6.ruanyifeng.com/#docs/class-extends)

<br/>

```typescript
 class Person {
    name: string
    age: number
    constructor(name: string = 'zkp', age: number = 12) {
        this.name = name
        this.age = age
    }
    setAge(val: number) {
        this.age = val
    }
}
class ZKP extends Person {
    constructor() {
        // 调用父类constructor()
        // 相当于 Person.prototype.constructor.call(this)
        super()
    }
    say() {
        // 调用父类方法
        super.setAge(999)
    }
}

const p = new ZKP()
console.log('p', p)  //  { name: 'zkp', age: 12 }
p.setAge(22)
console.log('p', p) //  { name: 'zkp', age: 22 }
p.say()
console.log('p', p) //  { name: 'zkp', age: 999 }
```

<br/>

:::tip **super关键字**

`super`关键字在子类的使用中，既可以当作函数使用，也可以当作对象使用。

- `super`作为函数调用时，代表父类的构造函数。`ES6 `要求，子类的构造函数必须执行一次`super()`函数。
- 作为对象使用时：
  1. 在普通方法中（实例方法）使用super,那么super指向的是父类的原型对象，
  2. 在静态方法中（类自己的方法）使用super,那么他指向父类（另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。）

:::

### 2. implements语句(类实现接口)

:::tip

在`typeScript`中，`class`在创建的时候`typeScript`会默认创建一个同名接口来定义整个类的类型，这也是可以直接使用类名作为类型使用的原因，也可以自定义一个接口来规定类的形状，

 `implements `语句用来检查一个类是否满足一个特定的 `interface`。如果一个类没有正确的实现(`implement`)它，`TypeScript `会报错

:::

```typescript

interface IPerson {
    name: string
    age: number
    say?: () => void
}
// Person类在实现的时候没有满足接口的形状
class Person implements IPerson {
    name = 'zkp'
    age = '666' // [!code error] 不能将类型“string”分配给类型“number”。
    // say方法可选
    say() {
        console.log('this.age', this.age)
    }
}
```

**一个类实现多个接口：**
**格式:** class 类名 implements 接口1,接口2
```typescript
interface IAge {
    age: number
}
interface IName {
    name: string
}
class Person implements IAge, IName {
    name = 'zkp'
    age = 999
}
```

<br/>

### 3.接口继承类

接口可以描述类的形状,同样的类也可以被接口所继承,因为类在创建的时候默认就创建了一个同名接口,所以接口继承类用关键字`extends`
```ts
class Person {
  name!: string
  age!: number
}
/* 接口IPerson 继承自Person */
interface IPerson extends Person {
  hobby: string[]
}
const p: IPerson = {
  name: '',
  age: 999,
  hobby: ['pingpong']
}
```
### 4.类同时实现接口和继承类
一个类同时继承另外一个类和实现一个接口的时候,类的继承需要在`implements`关键字的签名
```ts
class Person {
  name!: string
  age!: number
}
type s = { sex: string }
interface IHobby extends s {
  hobby: string[]
}

class Zkp extends Person implements IHobby {
  name!: string
  age!: number
  hobby!: string[]
  sex!: string
}
```
## 3.成员可见性
`TypeScript`提供了控制某个方法或者属性是否对类以外的代码可见的关键字:。
:::info 访问修饰符
- `public`: 修饰的属性或方法是公有的，可以在任何地方被访问到，默认情况下所有的属性和方法就是 `public` 的
- `private`: 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` : 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的
:::
### 1. public
```ts
class Person {
  public name = 'zkp'
  public getName() {
    console.log('this.name', this.name) // zkp
  }
}
const p = new Person()
/* 属性和方法在外部是可以访问的 */
p.getName()
console.log('p.name', p.name) // zkp
```
声明类的时候实例的属性和方法默认就是public

### 2. protected
:::code-group
```ts [外部不可访问]
class Person {
  protected name = 'zkp'
  protected getName() {
    console.log('this.name', this.name) // zkp
  }
}
const p = new Person()
/* 属性和方法在外部不允许访问 */
p.getName() // [!code error] 属性“getName”受保护，只能在类“Person”及其子类中访问。
console.log('p.name', p.name) // 属性“name”受保护，只能在类“Person”及其子类中访问
```
```ts [子类和自身可访问]
class Person {
  protected name = 'zkp'
  protected getName() {
    console.log('this.name', this.name) // zkp
  }
}

class Zkp extends Person {
  constructor() {
    super()
    // 派生类中访问父类的受保护属性
    console.log('this.name', this.name) // zkp
  }
}
```
:::
### 3. private
```ts
class Person {
  private name = 'zkp'
  protected getName() {
    console.log('this.name', this.name) // zkp
  }
}

class Zkp extends Person {
  constructor() {
    super()
    // 派生类中访问父类的受保护属性
    console.log('this.name', this.name) // [!code error] 属性“name”为私有属性，只能在类“Person”中访问。
    console.log('this.getName', this.getName)
  }
}
```
### 4. 简写添加属性
当类中的属性是直接通过构造函数传入赋值,并且没有做额外的操作,这时候省略属性的声明和初始化,在传入的参数前面加上任意一个属性修饰符 : `private`,`protected`,`public`,`readonly`
```ts
class Person {
  // names属性声明式从构造函数初始化,并且没有额外操作,可在constructor函数参数前添加修饰符,修饰符效果一致
  constructor(public name: string) {
  }
}
const p = new Person('zkp')
console.log('p.name', p.name) // 'zkp'

/** 以上写法相当于: */
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
const p = new Person('zkp')
console.log('p.name', p.name)
```

## 4. 静态成员 staic
在类中使用`static`修饰符声明静态成员,静态成员跟类实例没有关系，只能通过类本身访问到
```ts
class Person {
  static myName = 'zkp'
}
const p = new Person()
console.log('Person.myName', Person.myName) // zkp
/* 实例不能访问静态成员属性 */
console.log('p.myName', p.myName) // [!code error] 属性“myName”在类型“Person”上不存在。你的意思是改为访问静态成员“Person.myName”吗?
```
静态成员同样可以使用 `public` `protected` 和 `private` 这些可见性修饰符：
```ts
class Person {
  protected static myName = 'zkp'
}
class Zkp extends Person {
  constructor() {
    super()
    console.log('Zkp.myName', Zkp.myName) // zkp
  }
}
console.log('Zkp.myName', Zkp.myName) // [!code error] 属性“myName”受保护，只能在类“Person”及其子类中访问。
```
静态成员也可以被继承：
```ts
class Person {
  static myName = 'zkp'
}
class Zkp extends Person {
  constructor() {
    super()
    console.log('Zkp.myName', Zkp.myName) // zkp
  }
}
const p = new Zkp()
```

## 5.泛型类
> 类跟接口一样，也可以写泛型。当使用 new 实例化一个泛型类，它的类型参数的推断跟函数调用是同样的方式：
```ts
class Person<T> {
  myName: T
  constructor(val: T) {
    this.myName = val
  }
}
const p = new Person<string>('zkp') // typeof p = Person<string>
/**
 * 当使用 new 实例化一个泛型类，它的类型参数的推断跟函数调用是同样的方式,
 * 利用该类型推断,实例化类的时候不需要指定类型
 */

// p1实例化的时候没有传入类型 但依然被正确 的推导出了类型 Person<string>
const p1 = new Person('yh')
```
>泛型类同样支持类型约束和默认值:
```ts
class Person<T extends { hobby: string[] }> {
  hobby: T
  constructor(val: T) {
    this.hobby = val
  }
}
const p = new Person({ hobby: ['pingpong'] })
```
:::danger 注意点
静态成员不能使用泛型参数
```ts
class Person<T extends { hobby: string[] }> {
  static hobby: T // [!code error] 静态成员不能引用类类型参数。
}
const p = new Person()
```
:::
## 6.类表达式
>类表达式跟类声明非常类似，唯一不同的是类表达式不需要一个名字，尽管我们可以通过绑定的标识符进行引用：
```ts
const someClass = class<Type> {
  content: Type
  constructor(value: Type) {
    this.content = value
  }
}

const m = new someClass('Hello, world')
// const m: someClass<string>
```

## 7.抽象类 (abstract)
:::info 抽象类
`TypeScript` 中，类、方法、属性都可以是抽象的,使用`abstract`修饰符来定义抽象类和抽象属性及方法。

抽象方法或者抽象字段是不提供实现的(定义抽象字段的时候只能定义类型,不能去实现他)。这些成员必须存在在一个抽象类中，这个抽象类也**不能直接被实例化**。

抽象类的作用是作为子类的基类，让子类实现所有的抽象成员。当一个类没有任何抽象成员，他就会被认为是具体的
:::
```ts
abstract class Person {
  // abstract name: string = '9' [!code error] 抽象字段只能被定义,不能去实现
  abstract myName: string
  abstract setName(val: string): void
  /* 普通类 */
  getName() {
    console.log('this.name', this.myName)
  }
}
/* 用子类去继承抽象类 */
class Zkp extends Person {
  // 实现抽象属性
  myName = 'zkp'
  /* 实现抽象方法 */
  setName(val: string): void {
    console.log('this.name', this.myName)
  }
}
const p1 = new Zkp()
console.log('p1.myName', p1.myName)
p1.getName() // 调用继承自抽象类的普通方法
p1.setName('yh')

// const p = new Person() // [!code error] 无法创建抽象类的实例。
```
:::danger 注意点
抽象类中定义了几个抽象属性和抽象方法 那么子类在继承他的时候就必须实现几个,缺一个都不行
:::
:::tip 抽象类的理解(至少目前是这么理解的)
1. 抽象类的作用是供子类继承
2. 抽象类从某种意义上来说是用来描述类的形状的,类似于给子类规定了必须有的东西,就像我们抽取公共逻辑封装成函数一样
3. 抽象类相当于工具,他不能直接被实例化,只能被子类继承,去实例化子类
4. 抽象类中也可以有普通方法和属性,他们可以被子类继承并直接使用
:::
