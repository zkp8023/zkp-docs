# element元素视图

> 基于一系列的属性可以获取到盒子的一些样式(“组合样式”), 没必要再基于 getComputedStyle 获取每一部分的样
> 式自己去计算了，对于获取某些样式来讲是比较快捷的获取的结果直接 <span style="color:#f00">不带单位</span>`，属于**纯数
> 字**，可以直接进行数学运算了获取的结果是一个整数(哪怕 style 样式中的集合属性为小数)，这样会存在 1PX 以内的误差

## 1.client

```js
clientWidth：可视区域的宽度(内容的宽度 + 左右padding)

clientHeiht: 可视区域的高度(内容的高度 + 上下padding)

clientTop:   上边框的高度

clientLeft:  左边框的宽度

// 如果盒子设定了固定的高度，内容超过这个设定的高度（内容溢出），不论是否设置溢出隐藏
//  (overflow:hidden),获取的结果是不变的，还是根据设置的高度来决定
```

## 2.scroll

```js
scrollwidth:
/**
 * 在内容没有溢出的情况下，和clientwidth是相同的，但是在有内容溢出的情况下，获取的结果是
 * 真实内容的宽度（包含溢出的内容）+ 左 padding(一般应用于在有内容溢出的情况下，获取真实的大小)
 */

scrollHeight:
/**
 * 在内容没有溢出的情况下，和clientHeight是相同的，但是在有内容溢出的情况下，获取
 * 的结果是真实内容的高度（包含溢出的内容）+ 上 padding
 * 获取的结果是一个约等于的值：在不同浏览器或者是否设置overflow:hidden情况下，获取的结果都是不同的
 */

scro1LTop:   滚动条卷去的高度 (可读写)
scrollLeft:  滚动条卷去的宽度 (可读写)
最小值：0
最大值：页面真实宽高(scrollwidth/scrollHeight) - 屏幕可视区宽高(clientwidth/clientHeight)

判断用户是否滚动到底部:
element.scrollHeight - element.scrollTop === element.clientHeight
```

## 3.offset

```js
// 没有滚动条的情况下:offsetWidth = clientWidth + 左右border
offsetWidth: 内容区域宽度 + 左右padding + 左右border

// 没有滚动条的情况下:offsetHeight = clientHeight + 左右border
offsetHeight: 内容区域高度 + 上下padding + 上下border

offsetParent: 返回最近一级的带有定位的父级元素

offsetLeft: 相对于offsetParent左边界的偏移量

offsetTop: 相对于offsetParent上边界的偏移量
```

## 4.getBoundingClientRect()

getBoundingClientRect() 方法放回一组元素的左、上、右及下分别相对浏览器可视窗口的位置的集合 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)。
<img src="/assets/images/javaScript/getBoundingClientRect.png">

```js
const foo = document.getElementById('foo')
const fooBoundingRect = ele.getBoundingClientRect()
console.log(foo)
// 输出内容如下：
DOMRect = {
  top: 100,
  left: 100,
  right: 200, // => (left + width)
  bottom: 200, // => (top + height)
  width: 100,
  height: 100,
  x: 100,
  y: 100,
}
```
:::info 说明：
- top：元素左上角距浏览器可视区域顶端的距离
- left：元素左上角距浏览器可视区域左端的距离
- bottom：元素右下角距浏览器可视区域的顶端的距离
- right：元素右下角距浏览器可视区域的左端的距离
- width：元素宽度（包括内容、边距和边框）
- height：元素高度（包括内容、边距和边框）
:::

## 5.getClientRects()
> 返回一个包含多个矩形的集合
与`getBoundingClientRect`区别:
- 获取到的结果是多个[DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)类数组集合
- 获取**块盒**的`DOMRect`时结果第一项与`getBoundingClientRect`一致
- 获取**不换行的行盒**的`DOMRect`时结果第一项与`getBoundingClientRect`一致
- 获取**换行的行盒**的`DOMRect`时与会存在多个,每一行文本都是一个`DOMRect`
:::tip
这里外层元素为`span`获取到的是多个`DOMRect`的集合,如果替换成`p`标签,拿到的是只有一个`DOMRect`的集合
```html
 <span>
    123 <br />
    456 <br />
    789 <br />
 </span>
```
:::
