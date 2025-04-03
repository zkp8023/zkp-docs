# 一些css代码块

## 1. 动态高度过渡
<DemoBlock><DynamicHeight /></DemoBlock>

::: code-group
```html [html]
<button>hover</button>
  <div class="demo">
    <div class="content">
      <p>给我一个div</p>
      <p>给我一个div</p>
      <p>给我一个div</p>
      <p>给我一个div</p>
      <p>给我一个div</p>
      <p>给我一个div</p>
      <p>给我一个div</p>
      <!-- ..... -->
    </div>
  </div>
```
```css [css]
.demo{
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition:all .5s;
  background-color: skyblue;
}
.content {
  min-height: 0;
}
button:hover+.demo{
  grid-template-rows: 1fr;
}
```

:::