# as const 断言
as const 被称为 **const 类型断言**，const 类型断言告诉编译器，要将这个表达式推断为最具体的类型，如果不使用它的话，编译器会使用默认的类型推断行为，**可能会把表达式推断为更通用的类型**

## 1.常量const

const声明的**原始变量**本身为常量,不可被更改,所以在typeScript中会被类型推断为具体的值:
```typeScript
// a的类型推断为字面量类型 1
const a = 1
// b被推断为 string
let b = 'zkp'
```

## 2. 使用 as const收窄类型
强大的类型推断让`typeScript`写起来没有那么恶心,但有时推断的结果太过于通用,类型过于广泛,某些情况下可以使用 as const断言让类型更为具体:
```typeScript
const arr = [123, 'zkp'] // (string | number)[]
let a = arr[0] // string | number
a = 456
a = '456'
```
如上代码,理想中的变量a应该是`number`类型,但变量a可以被赋值为两种类型的值,原因是arr被推断为了宽泛的`(string | number)[]` 类型,所以得到的`arr[0]`被推断为了`string | number`的联合类型

```typeScript
// 此时对arr的操作是允许的
const arr = [123, 'zkp'] as const  // readonly [123, "zkp"] 此时arr被断言为了元祖类型
let a = arr[0] // 123
a = 456 // 不能将类型“456”分配给类型“123”
```
**利用as const封闭对象**
```typeScript
/**
 * person对象的类型被推断为:
 * {
 *   name: string;
 *   age: number;
 *  }
 */
const person = {
  name: 'zkp',
  age: 11,
}
person.name = 'yh' // Ok
person.age = 18    // OK

/**
 * person对象的类型被推断为: 此时person对象所有属性不可更改
 *   {
 *    readonly name: string;
 *    readonly age: number;
 *  }
 */
const person = {
  name: 'zkp',
  age: 11,
} as const

// 对象本身 以及内部的属性都不可修改
person.name = 'yh' // 无法为“name”赋值，因为它是只读属性。ts(2540)
person.age = 18    // 无法为“age”赋值，因为它是只读属性。ts(2540)
person = 'zkp' //  无法分配到 "person" ，因为它是常数。
```
