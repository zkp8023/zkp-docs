<script lang="ts">
export default {
  name: 'CssDrag',
}
</script>

<template>
  <div class="relative flex h-400px  overflow-auto">
    <div class="left">
      <!-- 隐藏在最下面的 设置热size的元素,值露出克拖拽的一部分 -->
      <div class="resize-bar" />
      <!-- 自定义拖拽线的样式,挡住resize元素漏出的那部分 -->
      <div class="resize-line" />
      <!-- 侧栏的内容 绝对定位 宽高撑满 -->
      <div class="inner absolute left-0 top-0  size-full p20px">
        <!-- 这里写内容 -->
        <h1>给我一个div给我一个div</h1>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="right bg-red-400 flex-1 text-center p-20px">
      <h1>主体内容</h1>
    </div>
  </div>
</template>

<style scoped lang='scss'>
/* 定义可拖拽的宽度 */
$dragWidth:5px;

.left{
  position: relative;
  background: var(--primary-light);
}
.resize-bar  {
  resize: horizontal;
  overflow: scroll;
  /* 限定可拖拽的最大宽度 */
  max-width: 500px;
  min-width: 200px;
  position: relative;
  top: 0;
  right: -$dragWidth;  //给负值,让可拖拽的滚动条漏出来

  // resize元素右下角的那个三角 跟滚动条是一样的,设置滚动条宽度就是设置可拖拽三角的宽度
  &::-webkit-scrollbar{
    width: $dragWidth;
    height: 400px;
  }
  /* 这是那个三角,但是设置这个没用 */
  // &::-webkit-resizer{
  //   cursor: pointer;
  // }
}
/* 拖拽线,宽度跟上面resize-bar的宽度保持一致就好 */
.resize-line {
  position: absolute;
  top: 0;
  right:-$dragWidth; //给负值,正好盖住可拖拽的那个滚动条,就自定义拖拽线的样式
  width: $dragWidth;
  height: 100%;
  pointer-events: none;
  background: red;
}
</style>
