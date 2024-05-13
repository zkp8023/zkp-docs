<script setup lang='ts'>
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three'
// 1.场景 创建一个场景
const scene = new Scene()

/**
 * 在场景中添加物体(模型)   物体包括: 1.几何体 2.材质
 */
// 1.创建一个几何体 长方体 BoxGeometry(长,宽,高,...)
const geomatry = new BoxGeometry(100, 100, 100)

// 2.材质 几何体的外观(材质)
const material = new MeshBasicMaterial({
  color: '#f00', // 红色材质
})

// 3. 创建物体 这里创建一个网格模型表示物体 模型中包含了几何体和材质(几何体和材质描述当前是个什么样的模型)
const mesh = new Mesh(geomatry, material)
// 设置物体坐标系位置 并 添加物体到场景中
mesh.position.set(0, 10, 0)
scene.add(mesh)
</script>

<template>
  <div class="">
    给我一个div
  </div>
</template>

<style scoped lang='scss'>
</style>
