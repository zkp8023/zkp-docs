<script setup lang='ts'>
import { ref } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
const targetRef = ref<HTMLDivElement | null>(null)
// 设置宽高 可用于canvas宽高 和相机设置宽高比
const width = 600
const height = 300
// 1. 创建 场景
const scene = new Scene()
const geometry = new BoxGeometry(100, 100, 100)
const materail = new MeshBasicMaterial({
  color: 'red',
})
const mesh = new Mesh(geometry, materail)
mesh.position.set(0, 0, 0)
scene.add(mesh)

// 2. 创建相机
const camera = new PerspectiveCamera(75, width / height, 2, 1000)
camera.position.set(300, 300, 300)
camera.lookAt(mesh.position)

// 3. 创建渲染器
const renderer = new WebGLRenderer()
//  设置canvas画布的大小
renderer.setSize(width, height)
//  告诉渲染器渲染那个场景,使用哪个相机
renderer.render(scene, camera)

onMounted(() => {
  targetRef.value!.appendChild(renderer.domElement)
})
</script>

<template>
  <div ref="targetRef" class="container size-full">
    给我一个div
  </div>
</template>

<style scoped lang='scss'>
</style>
