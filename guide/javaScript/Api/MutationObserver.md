# [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
>`MutationObserver` 接口提供了监视对 DOM 树所做更改的能力

## 1. MutationObserver构造函数
:::warning
创建并返回一个新的观察器，它会在触发指定 `DOM` 事件时，调用指定的回调函数。`MutationObserver` 对 `DOM` 的观察不会立即启动；而必须先调用 `observe()` 方法来确定，要监听哪一部分的 `DOM` 以及要响应哪些更改。
:::
```ts
const observer = new MutationObserver(callback)
```
### 1.1 MutationObserver构造函数参数

`callback(mutationList, observer)` :<br />
一个回调函数，每当被**指定的节点或子树以及配置项**有 `DOM` 变动时会被调用。<br />

两个参数：<br />
   - `mutationList`:描述所有被触发改动的 `MutationRecord` 对象数组.<br />

   - `observer` : 调用该函数的 `MutationObserver` 对象(构造函数的实例对象)

## 2.MutationObserver实例
> 一个可以监听目标元素触发指定`DOM`事件的新的`MutationObserver` 实例。调用自身的observe() 方法开始监听指定目标。

**实例方法:**<br />

<b style="color:red;">1. observe(target[, options])</b>

**参数:**<br />
    1. `target`: `DOM` 树中的一个要观察变化的 `DOM` `Node` (可能是一个 `Element`)，或者是被观察的子节点树的根节点
    2. `options`:
此对象的配置项描述了 `DOM` 的哪些变化应该报告给 `MutationObserver` 的 `callback`。

   `options` 的属性如下：

| 属性                            | 说明                                                                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **subtree(可选)**               | 当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target。默认值为 false。        |
| **childList(可选)**             | 当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。   |
| **attributes(可选)**            | 当为 true 时观察所有监听的节点属性值的变化。默认值为 true，当声明了 attributeFilter 或 attributeOldValue，默认值则为 false。 |
| **attributeFilter(可选)**       | 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。                                         |
| **attributeOldValue(可选)**     | 当为 true 时，记录上一次被监听的节点的属性变化；可查阅监听属性值了解关于观察属性变化和属性值记录的详情。默认值为 false。     |
| **characterData(可选)**         | 当为 true 时，监听声明的 target 节点上所有字符的变化。默认值为 true，如果声明了 characterDataOldValue，默认值则为 false      |
| **characterDataOldValue(可选)** | 当为 true 时，记录前一个被监听的节点中发生的文本变化。默认值为 false                                                         |

:::danger 注意
当调用 `observe()` 时，`childList`、`attributes` 和 `characterData` 中，必须有一个参数为 `true`。否则会抛出 `TypeError` 异常。
:::

<b style="color:red;">2. disconnect()</b>

>告诉观察者停止观察变动

<b style="color:red;">3. takeRecords()</b>

>返回已检测到但尚未由观察者的回调函数处理的所有匹配 DOM 更改的列表，使变更队列保持为空。此方法最常见的使用场景是在断开观察者之前立即获取所有未处理的更改记录，以便在停止观察者时可以处理任何未处理的更改。

```ts{12-18}
const targetNode = document.querySelector("#someElement");
const observerOptions = {
  childList: true,
  attributes: true
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);

/* 准备停止监听器 此时抓取未处理的变更记录传递给回调继续执行完成 */

const mutations = observer.takeRecords();

if (mutations) {
  callback(mutations);
}
/**确保变更记录全部处理完成了 取消监听 */
observer.disconnect();

```
:::tip
代码中第 12-18 行抓取了所有未处理的变更记录，然后调用回调，并将变更记录列表传递给回调，以保证所有变更记录都被处理。这是在调用 `disconnect()` 之前完成的，以便停止观察 DOM。
:::

## 3.MutationRecord对象

>每个 `MutationRecord` 都代表一个独立的 `DOM` 变化，在每次随 `DOM` 变化调用 `MutationObserver`构造函数的回调函数时，一个相应的 `MutationRecord` 会被作为参数，传递给回调函数(`callback`中的`mutationList`参数)。

| 属性                 | 说明                                                                                                                                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | 如果是属性变化，则返回 "attributes"； 如果是 `characterData` 节点变化，则返回 "characterData"； 如果是子节点树 `childList` 变化，则返回 "childList"                                                                                                                                                                        |
| `target`             | 根据 `type`，返回变化所影响的节点。 对于属性 `attributes` 变化，返回属性变化的节点。 对于 `characterData` 变化，返回 `characterData` 节点。 对于子节点树 `childList` 变化，返回子节点变化的节点                                                                                                                            |
| `addedNodes`         | 返回被添加的节点。 如果没有节点被添加，则该属性将是一个空的 `NodeList`。                                                                                                                                                                                                                                                   |
| `removedNodes`       | 返回被移除的节点。 如果没有节点被移除，则该属性将是一个空的 `NodeList`。                                                                                                                                                                                                                                                   |
| `previousSibling`    | 返回被添加或移除的节点之前的兄弟节点，或者 `null`。                                                                                                                                                                                                                                                                        |
| `nextSibling`        | 返回被添加或移除的节点之后的兄弟节点，或者 `null`。                                                                                                                                                                                                                                                                        |
| `attributeName`      | 返回被修改的属性的属性名，或者 `null`。                                                                                                                                                                                                                                                                                    |
| `attributeNamespace` | 返回被修改属性的命名空间，或者 `null`。                                                                                                                                                                                                                                                                                    |
| `oldValue`           | 返回值取决于`type` 。 对于属性 `attributes` 变化，返回变化之前的属性值。 对于 `characterData` 变化，返回变化之前的数据。 对于子节点树 `childList` 变化，返回 `null`。**注意，如果要让这个属性起作用，在相应的 实例调用 observe 方法式的options配置对象中，attributeOldValue 或者 characterDataOldValue 必须设置为 true。** |

:::tip [useMutationObserver](https://vueuse.org/core/useMutationObserver/#usemutationobserver)
vue中的hooks库VueUse对`MutationObserver`进行了封装,vue项目可使用[useMutationObserver](https://vueuse.org/core/useMutationObserver/#usemutationobserver)
:::