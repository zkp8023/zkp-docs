<script setup lang='ts'>
import { AxesHelper, BoxGeometry, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three'

const width = 500
const height = 500
const scene = new Scene()
const geometry = new BoxGeometry(100, 100, 100)
//  设置光源需要添加受光源控制的材质
const matertail = new MeshLambertMaterial({
  color: 'red',
  transparent: true,
  opacity: 0.8,
})
const mesh = new Mesh(geometry, matertail)
const axes = new AxesHelper(200)
// 创建两个光源 添加到场景中
const light = new PointLight('#fff', 1)
light.position.set(200, 0, 200)
const light1 = new PointLight('#fff', 1)
light1.position.set(400, 200, 300)
scene.add(mesh, axes, light, light1)

const camera = new PerspectiveCamera(50, width / height, 1, 2000)
camera.position.set(200, 200, 200)
camera.lookAt(mesh.position)

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)
onMounted(() => {
  document.querySelector('.demo')?.append(renderer.domElement)
})
</script>

<template>
  <div class="demo">
    给我一个div
  </div>
</template>

<style scoped lang='scss'>
</style>
