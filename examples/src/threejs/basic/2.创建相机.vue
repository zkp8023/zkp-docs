<script setup lang='ts'>
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } from 'three'

const scene = new Scene()
const geomatry = new BoxGeometry(100, 100, 100)
const material = new MeshBasicMaterial({
  color: 'red',
})
const mesh = new Mesh(geomatry, material)
mesh.position.set(0, 10, 0)
scene.add(mesh)

// 创建相机
//  canvas画布的宽高
const width = 500
const height = 200
/**
 * 创建一个相机 传入 fov:视角(看的角度) aspect: 画布宽高比 near:近端面距离相机的距离 far:远端面距离相机的距离
 */
const camera = new PerspectiveCamera(75, width / height, 1, 2000)
// 相机在坐标系中的位置
camera.position.set(200, 200, 200)
// 设置相机对准哪里看 可以是坐标系中的任意一点  这里设置成对准场景中的物体的坐标
// camera.lookAt(0,0,0) // 观察坐标原点
// camera.lookAt(0, 10, 0) // 观察y轴上的一点
// 观察场景中的物体
camera.lookAt(mesh.position)
</script>

<template>
  <div class="">
    给我一个div
  </div>
</template>

<style scoped lang='scss'>
</style>
