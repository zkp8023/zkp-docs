<script setup lang='ts'>
import { AxesHelper, BoxGeometry, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const width = 500
const height = 500
const scene = new Scene()
const geometry = new BoxGeometry(100, 100, 100)
const materail = new MeshLambertMaterial({
  transparent: true,
  opacity: 0.7,
  color: 'skyblue',
})
const mesh = new Mesh(geometry, materail)
mesh.position.set(0, 0, 0)
const light = new PointLight('#fff', 1)
light.position.set(200, 200, 200)
const light1 = new PointLight('#fff')
light1.position.set(-200, -200, -200)
const axes = new AxesHelper(150)
scene.add(mesh, axes, light, light1)
const camera = new PerspectiveCamera(50, width / height, 1, 2000)
camera.position.set(300, 300, 300)
camera.lookAt(mesh.position)

const renderer = new WebGLRenderer()
// 先设置尺寸再来渲染
renderer.setSize(width, height)
renderer.render(scene, camera)
onMounted(() => {
  document.querySelector('.demo')?.append(renderer.domElement)
})
// 创建相机控制器实例 监听相机变化事件 重新渲染场景
const orbitControl = new OrbitControls(camera, renderer.domElement)
orbitControl.addEventListener('change', () => {
  // console.log('camera.position', camera.position)
  renderer.render(scene, camera)
})
</script>

<template>
  <div class="demo">
    给我一个div
  </div>
</template>
