# window视图
## 1. innerWidth、innerHeight
 >  <b style="color:red;">window.innerWidth</b> 返回以像素为单位的窗口的内部**宽度**。如果垂直滚动条存在，则这个属性将包括它的宽度。
-----
 > <b style="color:red;">window.innerHeight</b> 返回以像素为单位的窗口的内部**高度**。如果垂直滚动条存在，则这个属性将包括它的宽度。
 ::: tip
- **只读属性**
- 宽度包含滚动条宽度(如果存在)
- 返回值**不带**单位(值是以px为单位的纯数字)
:::
<DemoBlock><a-image :preview="true" src="/images/javaScript/window-inner.png" /></DemoBlock>

## 2.outerWidth 、outerHeight
 > <b style="color:red;">window.outerWidth 和 window.outerHeight</b> 表示整个浏览器的宽高（以像素为单位），包括侧边栏（如果存在）、窗口镶边（Window Chrome）和窗口调正边框，包含调试窗及浏览器边框。
----
:::tip
- **只读属性**
- 宽度包含滚动条宽度(如果存在)
- 返回值**不带**单位(值是以px为单位时的纯数字)
:::
<DemoBlock><a-image :preview="true" src="/images/javaScript/window-outer.png" /></DemoBlock>

## 3. screenLeft、screenTop、screenX、screenY

 > <b style="color:red;">Window.screenLeft</b> 是一个只读属性，它返回浏览器左边框到左边屏幕边缘的 CSS 像素数。
 :::tip
 - **只读属性**
 - 返回值**不带**单位(值是以px为单位时的纯数字)
 :::
 - ----
 > <b style="color:red;">Window.screenTop</b>只读属性返回垂直距离，单位是 CSS 像素，从用户浏览器的上边界到屏幕最顶端。
 :::tip
  - **只读属性**
 - 返回值**不带**单位(值是以px为单位时的纯数字)
:::

    **备注：** screenLeft 和 screenTop 只是 Window.screenX,window.screenY 属性的别名，最初只被 IE 浏览器所支持。现在主流的浏览器都已支持该属性,他们的表现一样

<DemoBlock><a-image :preview="true" src="/images/javaScript/window-screen.png" /></DemoBlock>

## 4. scrollX、scrollY、pageXOffset、pageYOffset

 ><b style="color:red;">Window.scrollX</b> 返回文档/页面水平方向滚动的像素值。

 ><b style="color:red;">Window.scrollY</b> 返回文档在垂直方向已滚动的像素值。
:::tip
 - 都是**只读属性**
 - 都是**像素数**
 - 返回值有小数(可能会有很长的小数...)
:::
<DemoBlock><a-image :preview="true" src="/images/javaScript/window-scroll.png" /></DemoBlock>

## 5. 总结
|      属性       |          说明          |
| :-------------: | :--------------------: |
| **innerWidth**  | 浏览器可视窗口内层宽度 |
| **innerHeight** | 浏览器可视窗口内层高度 |
| **outerWidth**  | 浏览器网页视口外层宽度 |
| **outerHeight** | 浏览器网页视口外层高度 |
| **screenLeft**  |   浏览器距屏幕左边距   |
|  **screenTop**  |   浏览器距屏幕上边距   |
|   **scrollX**   | 当前页面卷去的水平距离 |
|   **scrollY**   | 当前页面卷去的垂直距离 |
| **pageXOffset** |      同`scrollX`       |
| **pageYOffset** |      同`scrollY`       |
|   **screenX**   |     同`screenLeft`     |
|   **screenY**   |     同`screenTop`      |
