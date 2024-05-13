<!-- eslint-disable vue/dot-location -->
<script setup lang="ts">
import Github from '../../assets/hub.svg'

interface IProps {
  cardList: ICard2[]
}

defineProps<IProps>()
// 卡片默认src
const handleJump = (src?: string) => {
  src && window.open(src)
}
</script>

<script lang="ts">
export default {
  name: 'CardList2',
}
</script>

<template>
  <div class="cardList">
    <div
      v-for="card in cardList"
      :key="card.name"
      :style="card.style"
      class="card-item" :class="[card.name ? 'visible' : 'invisible']"
      @click="handleJump(card.zhSrc || card.src)"
    >
      <a-tooltip
        :title="card.tooltip"
        color="#535bf2"
        class="wh-full fcc gap15"
      >
        <!-- <Popper hover arrow placement="top"  content="This is the Popper content 🍿"> -->
        <img
          :src="card.img || Github"
          alt=""
          :class="card.img ? 'size-60' : 'size-50'"
          :style="card.imgStyle"
        >

        <div>
          <p text-16 font-700>
            {{ card.name }}
          </p>
          <span
            v-if="card.enSrc"
            class="mr10 text-(violet-400) hover:(text-violet-600)"
            @click="handleJump(card.enSrc)"
          >
            英文地址
          </span>
          <span
            v-if="card.zhSrc"
            class="text-(violet-400) hover:(text-violet-600)"
            @click.stop="handleJump(card.zhSrc)"
          >
            中文地址
          </span>
          <p
            v-if="card.otherStr"
            class="text-(violet-400) hover:(text-violet-600)"
            @click.stop="handleJump(card.otherStr)"
          >
            {{ card.otherStrDesc }}
          </p>
          <p class="desc truncate text-(#8E8CB9)" :title="card.desc">
            {{ card.desc }}
          </p>
        </div>
      </a-tooltip>
      <!-- </Popper> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
:global(.ant-tooltip-content){
  opacity: 0.8;
}
@media (max-width:500px){
 .card-item img {
  display: none !important;
 }
}
.cardList {
  @apply flex flex-wrap justify-between gap-30px;
}
.card-item {
  @apply flex-[31%]  h120 border-(1px solid #ccc) px15 cur-p
  rounded-15px text-(primary_light 13 center) transition-all duration-400 o-hidden bg-warmgray-50 dark:(bg-truegray-800 text-truegray-200);
  // background: rgba(217, 217, 217, 0.58);
  // border: 1px solid white;
  box-shadow: 2px 2px 7px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  &:hover {
    border: 1px solid #9499ff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.01) translateY(-1px);
  }
  .desc {
    text-align: center;
    white-space: pre-wrap;
  }
}
</style>
