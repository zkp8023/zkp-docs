<script setup lang='ts'>
import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const width = 400
const height = 400
const scene = new Scene()
const geometry = new BoxGeometry(100, 100, 100)
const material = new MeshBasicMaterial({
  color: 'skyblue',
  transparent: true,
  opacity: 0.7,
})
const mesh = new Mesh(geometry, material)
// mesh.position.set(0, 0, 0)
scene.add(mesh)

// 创建并添加辅助坐标系 参数:坐标系的尺寸(线的长度)
const axes = new AxesHelper(100)
scene.add(axes)

const camare = new PerspectiveCamera(45, width / height, 0.1, 2000)
camare.position.set(300, 300, 300)
camare.lookAt(mesh.position)

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
renderer.render(mesh, camare)

onMounted(() => {
  document.querySelector('.demo')?.appendChild(renderer.domElement)
})
</script>

<template>
  <div class="demo" />
</template>

<style scoped lang='scss'>
</style>
