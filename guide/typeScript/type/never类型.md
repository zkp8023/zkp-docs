# undefined，null ,void ,never

## 1.undefined,null

**`undefined`和`null`既可以表示类型，也可以表示值**.

作为值时：

> `undefined`用于描述**这里有值**，但是个空值，这个值就是`undefined` <br />
>
> `null`表现得比`undefined`更加空白，用于描述这里没有值，将来可能会有...

作为类型时：

`null `与 `undefined `类型都是有具体意义的类型。也就是说，它们作为类型时，表示的是一个有意义的具体类型值。这两者在没有开启 `strictNullChecks` 检查的情况下，会被视作其他任意类型的子类型，

## 2.void

1. `javaScript`中的`void`经常用来得到准确的`undefined`(因为目前undefined并不是关键字，可能被直接生命为变量名或者对象的键名等等..)值  ，而`void 0 ` 或 `void(0)` 或者`void(随便是啥)`都会返回`undefined`
2. `typeScript`中的`void`用来表示没有`return`或者没有显示`return`一个值的函数的返回值：
   ```typescript
   function fn1() {}

   function fn2() {
     return
   }
   function fn3() {
     return undefined
   }
   /*
   fn1 和 fn2 一个没有retrun  一个没有显示的return一个值 返回值均为void类型
   fn3显示的return 一个 undefined 他的返回值才是undefined
   */
   ```

## 3.never

> `never`表示一个**不可能存在的类型**，在`typeScript`类型系统中，`never` 类型被称为 `Bottom Type`，是整个类型系统层级中最底层的类型。和 `null`、`undefined `一样，它是所有类型的子类型，但只有 `never `类型的变量能够赋值给另一个 `never `类型变量。

### 3.1 never和void相比

1. `void`可以表示没有具体返回值的函数的返回值的类型，有点类似于null类型，描述这里什么都没有
2. `never`则更加底层和空白，描述这里压根就不可能的类型，它甚至不包括空的类型，严格来说，`never `类型不携带任何的类型信息，因此会在联合类型中被直接移除: 如下：
   ```typescript
   type a = never | string | number | boolean
   // 鼠标放置在类型a上，发现a的类型成为了：type a = never | string | number | boolean
   ```

### 3.2 never穷尽性检查

由于只有`never`类型可以赋值给`never`类型，所以可以利用这一点做类型穷尽检查（在编译阶段就能检查所有可能的情况）

**需求**：根据不同类型对所有的情况做不同的分支处理：

```typescript
declare const strOrNumOrBool: string | number | boolean;

// 对类型的所有情况做了不同的处理，最后不符合条件就抛出一个错误
if (typeof strOrNumOrBool === "string") {
    console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
    console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
    console.log("bool!");
} else {
    throw new Error(`Unknown input type: ${strOrNumOrBool}`);
}
```

以上代码 ，对每个分支进行了不同的处理，但这种写法只能在运行时才能发现问题，此时如果在`strOrNumOrBool`联合类型中再加一种或几种类型，也得不到编译提示...

由于 `TypeScript` 强大的类型分析能力，每经过一个 `if` 语句处理，`strOrNumOrBool` 的类型分支就会减少一个（因为已经被对应的 `typeof` 处理过）。
而在最后的 `else` 代码块中，它的类型只剩下了 `never` 类型，即一个无法再细分、本质上并不存在的虚空类型。
在这里，我们可以利用只有 never 类型能赋值给 never 类型这一点，来巧妙地分支处理检查：

```typescript
declare const strOrNumOrBool: string | number | boolean;

// 对类型的所有情况做了不同的处理，最后不符合条件就抛出一个错误
if (typeof strOrNumOrBool === "string") {
    console.log("str!");
} else if (typeof strOrNumOrBool === "number") {
    console.log("num!");
} else if (typeof strOrNumOrBool === "boolean") {
    console.log("bool!");
} else {

      /**
     * strOrNumOrBool: string | number | boolean,
     * 到达这个分支的时候strOrNumOrBool类型已经是never了  所以他可以赋值给一个never类型的值
     */
    const error: never = strOrNumOrBool
    throw new Error(`Unknown input type: ${error}`);
}
```

以上代码，如果此时`strOrNumOrBool`的类型增加或者减少都会造成编译错误提示，因为此时`else`分支里就不是never类型了
是不能赋值给never类型的值的！
