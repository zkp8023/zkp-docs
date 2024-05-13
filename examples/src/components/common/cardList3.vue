<!-- eslint-disable vue/dot-location -->
<script setup lang="ts">
interface IProps {
  cardList: ICard2[]
  classes?:string
}

defineProps<IProps>()
// 卡片默认src
const handleJump = (src?: string) => {
 src && window.open(src)
}

</script>
<script lang="ts">
export default {
  name:'CardList3'
}
</script>

<template>
  <div class="cardList">
    <div
      v-for="card in cardList"
      :key="card.name"
      :class="['card-item',card.name?'visible':'invisible', classes]"
      @click="handleJump(card.zhSrc || card.src)"
    >
      <img :src="card.img" alt="" class="size-70">
      <div>
        <p>{{ card.name }}</p>
        <p class="text-(neutral-400) hover:(text-neutral-600)" v-if="card.enSrc"  @click="handleJump(card.enSrc)">英文地址</p>
        <p class="text-(neutral-400) hover:(text-neutral-600)" v-if="card.zhSrc"  @click.stop="handleJump(card.zhSrc)">中文地址</p>
        <p class="text-#8E8CB9">{{ card.desc }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.cardList {
  @apply flex flex-wrap justify-between gap-30px;
  background-color: #9499ff;
  padding: 10px;
}
.card-item {
  @apply fcc flex-[31%] gap15 h130px border-(1px solid #fff) p10 cur-p font-700
  rounded-15px text-(primary_light 14 center) transition-all duration-400 o-hidden bg-truegray-100 dark:(bg-truegray-800 text-truegray-200);
  // background: rgba(217, 217, 217, 0.58);
  // border: 1px solid white;
  // box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  background: rgba(209,50,50,0.5);
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
border: 1px solid rgba(209,50,50,0.25);
  &:hover{
    border: 1px solid #9499ff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.01) translateY(-1px);
  }
}

</style>
