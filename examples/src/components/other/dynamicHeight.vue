<script lang="ts">
export default {
  name: 'DynamicHeight',
}
</script>

<template>
  <a-button type="primary">hover me</a-button>
  <div class="demo">
    <div class="content">
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
      <p>89899</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo{
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition:all .5s;
  background-color: skyblue;
}
.content {
  min-height: 0;
  p{
    text-align: center;
    &:nth-child(2n){
      background-color: #ccc;
    }
  }
}
button:hover+.demo{
  grid-template-rows: 1fr;
}
</style>
