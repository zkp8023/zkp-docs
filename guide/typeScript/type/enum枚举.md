# enum枚举

> 枚举是 `TypeScript `为数不多的功能之一，它不是 `JavaScript` 的类型级扩展,枚举允定义一组命名常量。 使用枚举可以更轻松地记录意图或创建一组不同的案例,可以理解枚举就是一个字典,类似`JavaScript`中的对象，可以使用 <b style="color:red;">"."</b> 或者 <b style="color:red;">"[]"</b>来访问枚举成员,同样的，枚举也支持解构..

在`typescript `中使用 <b style="color:red;">enum</b>关键字来定义枚举

```typescript

enum PERSON {
  MAN,
  WOMAN
}

console.log( PERSON.MAN )  // .访问枚举成员
console.log(PERSON['WOMAN']) // []访问枚举成员
const { MAN , WOMAN } = PERSON  // 枚举解构
```

## 1.数字枚举（默认枚举）

### 1.1 不指定取值

> 在不指定枚举成员取值时，默认会被赋值为从 0 开始递增的数字

```typescript
enum NUMS {
  ONE,
  TWO,
  THREE
}
console.log('NUMS.ONE', NUMS.ONE); // 0
console.log('NUMS.TWO', NUMS.TWO); // 1
console.log('NUMS.THREE', NUMS.THREE); // 2

```

### 1.2 手动赋值

> 手动指定取值时，成员的值就是指定的值，

```typescript
enum NUMS {
  ONE = 10,
  TWO = 20,
  THREE = 30
}
console.log('NUMS.ONE', NUMS.ONE); // 10
console.log('NUMS.TWO', NUMS.TWO); // 20
console.log('NUMS.THREE', NUMS.THREE); // 30
```

> 只有部分指定时,从指定值后面开始递增

```typescript
enum NUMS {
  ONE,
  TWO = 1.5,
  THREE
}
console.log('NUMS.ONE', NUMS.ONE); // 0
console.log('NUMS.TWO', NUMS.TWO); // 1.5
console.log('NUMS.THREE', NUMS.THREE); // 2.5
```

### 2.3 取计算值和常量

> 数字枚举在定义值时，可以使用计算值和常量。但是要注意，如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值，这里不能使用默认的递增值了

```typescript
// 初始值为变量
let a = 5
enum NUMS {
    ONE,     // 0
    TWO = a, // 5
    THREE,   // [code error] 枚举成员必须具有初始化表达式。ts(1061)
}

// 初始值为计算值
const getNum = () => 100
enum NUMS {
  ONE,
  TWO = getNum (),
  THREE  // [code error] 枚举成员必须具有初始化表达式。ts(1061)
}
```

<br/>

## 3. 字符串枚举

> `TypeScript `将定义值是字符串字面量的枚举称为字符串枚举，字符串枚举值**要求每个字段的值都必须是字符串字面量，或者是该枚举值中另一个字符串枚举成员**：

<br/>

```typescript
enum NUMS {
    ONE = 'one',
    TWO = 'two',
    THREE = TWO  // 使用当前枚举值中的另一个字符串枚举成员
}

const { ONE, TWO } = NUMS

console.log('NUMS.ONE', ONE)  // one
console.log('NUMS.TWO', TWO)  // two
console.log('NUMS.THREE', NUMS.THREE) //two
```

:::danger

这里的其他枚举成员指的是同一个枚举值中的枚举成员，因为字符串枚举不能使用常量或者计算值，所以不能使用其他枚举值中的成员。

:::

## 4. 异构枚举

> 当前枚举的成员值中既包含数字有包含字符串

```typescript
enum NUMS {
    ONE = 1,  // 取值数字
    TWO = 'two', // 取值字符串
}
```

:::danger

异构枚举中，取值字符串的成员后面紧跟的各个成员必须指定初始值，不能使用默认递增，同上数字枚举使用计算值和常量的效果

:::

```typescript
enum NUMS {
    ONE = 1,
    TWO = 'two',
    THREE,  // [!code error] error: 枚举成员必须具有初始表达式
}
```

## 5. 反向映射

> 定义枚举类型的值时，可以通过` Enum['key']` 或者 `Enum.key` 的形式获取到对应的值 `value`。`TypeScript `还支持反向映射(根据`value`来获取`key`)，但是反向映射只支持数字枚举，不支持字符串枚举

```typescript
enum NUMS {
    ONE = 1,
    TWO = 2,
    THREE = 3
}
// key--> value
const { ONE, TWO } = NUMS
console.log('NUMS.ONE', ONE)
console.log('NUMS.TWO', TWO)
console.log('NUMS.THREE', NUMS.THREE)

// value-->key
console.log('NUMS[NUMS.ONE]', NUMS[NUMS.ONE])  // ONE
console.log('NUMS[NUMS.TWO]', NUMS[NUMS.TWO])  // TWO
console.log('NUMS[NUMS.THREE]', NUMS[NUMS.THREE])  // THREE

```

:::danger

反向映射只支持数字枚举，不支持字符串枚举

```typescript
enum NUMS {
    ONE = 1,
    TWO = 'two',
    THREE = 6
}

console.log('NUMS[NUMS.ONE]', NUMS[NUMS.ONE]) // [code success] ONE
console.log('NUMS[NUMS.TWO]', NUMS[NUMS.TWO]) // [code error] 元素隐式具有 "any" 类型，因为索引表达式的类型不为 "number"。ts(7015)
```

:::

> `TypeScript` 中定义的枚举，编译之后其实是一个对象，生成的代码中，枚举类型被编译成一个对象，它包含了正向映射（ key-> value）和反向映射（ value -> key）。

上面代码的编译结果：

```typescript
// 编译的结果
var NUMS;
(function (NUMS) {
    NUMS[NUMS["ONE"] = 1] = "ONE";
    NUMS[NUMS["TWO"] = 2] = "TWO";
    NUMS[NUMS["THREE"] = 3] = "THREE";
})(NUMS || (NUMS = {}));

// 跟下面一样的效果 编译后将key和value的正反关系放入一个对象中
{
  ONE: 1,
  TWO: 2,
  THREE: 3,
  1: 'ONE',
  2: 'TWO',
  3: 'THREE'
}
```

<br/>

## 6.常量枚举

> 在`TypeScript`中，定义了枚举值之后，编译成 `JavaScript `的代码会创建一个对应的对象，这个对象可以在程序运行时使用。但是有时使用枚举只是为了让程序可读性好，并不需要编译后的对象，这就减少了一些编译后的代码量。可以使用`const enum`(常量枚举)，在定义枚举的语句之前加上`const`关键字，这样编译后的代码不会创建这个对象，只是会从枚举里拿到相应的值进行替换：

```typescript
// 普通枚举
enum NUMS {
    ONE = 1,
}
// 常量枚举
const enum CONST_NUM {
    ONE = 3
}

const a = NUMS.ONE

const b = CONST_NUM.ONE

编译后：
var NUMS;
(function (NUMS) {
    NUMS[NUMS["ONE"] = 1] = "ONE";
})(NUMS || (NUMS = {}));

var a = NUMS.ONE;  // 从编译后的对象中取值

var b = 3 /* CONST_NUM.ONE */;  // 并没有编译 CONST_NUM 只是声明了变量b 然后替换值
```

:::danger

在使用常量枚举之后就不要进行其他操作了 ，只去用到定义的值就可以了，因为经过编译之后压根就没有这个对象，例如上面的代码做反向取值操作的话，目前typescript版本并没有识别错误，但是在runtime时会报错：

```typescript
const c = CONST_NUM['3'] // 运行之后---> CONST_NUM is not defined
```

<br/>

:::

## 7.枚举合并

> 同名枚举会合并，但是在所有同名枚举中只有其中一个的第一个成员能省略初始值

```typescript
num NUMS {
    ONE,
}
enum NUMS {
    TWO,  // [code error] 在包含多个声明的枚举中，只有一个声明可以省略其第一个枚举元素的初始化表达式。ts(2432)
    THREE
}
enum NUMS {
    FOUR  // [code error] 在包含多个声明的枚举中，只有一个声明可以省略其第一个枚举元素的初始化表达式。ts(2432)
}

// 处理：给以上另外两个NUMS枚举第一个成员定义初始值就行
```