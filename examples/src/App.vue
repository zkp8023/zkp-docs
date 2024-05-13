<script setup lang='ts'>
function deco(str: string) {
  return function <T>(this: T, target: new (...args: any[]) => T) {
    target.prototype.show = function (this: T) {
      console.log('this', this)
    }
    target.prototype.h = str
  }
}

function decoSay(a, b, c) {
  console.log('a===Demo.prototype', a === Demo.prototype)
  console.log('a', a)
  console.log('b', b)
  console.log('c', c)
}

function decoProp(x, y) {
  console.log('x', x)
  console.log('y', y)
}

@deco('hello')
class Demo {
  name: string
  @decoProp
  static sProp = 999

  constructor(name: string) {
    this.name = name
  }

  @decoSay
  say() {
    console.log(99)
  }
}
const d = new Demo('zkp')
console.log('d.name', d.name)
// d.say()
</script>

<template>
  <div class="">
    给我一个div
  </div>
</template>

<style scoped lang='scss'>
</style>