<!--
 * @Author: zhangkaipeng
 * @LastEditTime: 2022-12-16 14:05:54
 * @LastEditors: 章凯鹏
 * @Description:
-->

# grid 布局

### 弹性布局(flex)和 网格布局(grid)

- FIex 布局是轴线布局，只能指定项目针对轴线的位置，一维布局
- Grid 布局将容器划分为行和列，生成单元格，指定项目所在的单元格，二维布局

## 1.基本概念

1. **容器 :** 采用网格布局的元素称为容器
2. **项目 :** 容器内部采用网格定位的直接子元素，称为项目
3. **行 :** 两条相邻水平网格线之间的区域
4. **列 :** 两条相邻垂直网格线之间的区域
5. **单元格 :** 行和列交叉的区域

## 2.容器属性

### `display`

- `display` 定义一个元素为网格布局 `{ display : grid; }` 或 `{ display : inline-grid }`

### `grid-template-columns` 和 `grid-template-rows` 列宽、行高

- `grid-template-columns`: 定义列宽和列数
- `grid-template-rows`: 定义行高和行数 ,

```css
/* 定义一个三列,三行的网格,行高和列宽都为200px */

div {
  display: grid;
  grid-template-columns: 200px 200px 200px; // 33.33% 33.33% 33.33%
  grid-template-rows: 200px 200px 200px; // 33.33% 33.33% 33.33%
}
```

- 列宽和行高的属性值:可以是固定单位,也可以是百分比,或以下介绍的各种属性值,比较类似

#### 1. repeat()函数

可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值(重复值也可以是重复某种个模式)。

```css
/* 定义一个三列,三行的网格,行高和列宽都为200px */

div {
  display: grid;
  /* 重复三次, 重复值为200px */
  grid-template-columns: repeat(3, 200px);

  /* 重复模式 : grid-template-coumns :repeat(2, 100px 200px)  效果如下:*/
  /* grid-template-coumns : 100px 200px 100px 200px */
  grid-template-rows: 200px 200px 200px; // 33.33% 33.33% 33.33%
}
```

#### 2. auto-fill 关键字：

表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。 `grid-template-columns: repeat(auto-fill,200px)` 表示列宽是
200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素 <img src="/images/css/auto-fill.gif"/>

```css
div {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(3, 200px);
}
```

#### 3. fr 单位：网格容器中可用空间的一等份

`grid-template-columns: 200px 1fr 2fr` 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和
2/3 <img src="/images/css/fr.gif"/>

```css
div {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  grid-template-rows: repeat(3, 200px);
}
```

#### 4. minmax() 函数

给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两
个参数，分别为最小值和最大值。 `grid-template-columns: 1fr 1fr minmax(300px, 2fr)` ，第三个列宽最少也是要 300px，但是最
大不能大于第一第二列宽的两倍。 <img src="/images/css/minmax.gif"/>

```css
div {
  display: grid;
  grid-template-columns: 200px 1fr minmax(300px, 2fr);
  grid-template-rows: repeat(3, 200px);
}
```

#### 5. auto 关键字

由浏览器决定长度。`grid-template-columns: 200px auto 200px` 表示第一第三列为 200px，中间由浏览器决定长度，
<img src="/images/css/auto.gif"/>

```css
div {
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: repeat(3, 200px);
}
```

### `gap` `row-gap` `column-gap` 网格间距

`grid-gap` `grid-row-gap` `grid-column-gap` 已被启用 但是目前还是能生效

```css
div {
  display: grid;
  gap: 10px 20px;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
}
```

- `row-gap`:行间距
- `column-gap` :列间距
- `gap` 简写形式 <DemoBlock> <a-image :preview="true"  src="/images/css/gap.png"/> </DemoBlock>
