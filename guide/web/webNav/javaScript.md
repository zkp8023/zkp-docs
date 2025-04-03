<!--
 * @Author: zhangkaipeng
 * @LastEditTime: 2022-12-02 16:30:46
 * @LastEditors: 章凯鹏
 * @Description:
-->

## 1. javaScript
<script setup>
    import { jsNavs,jsResource,algorithm } from './navs/javaScript'
    import { typeScript } from './navs/typeScript'
</script>

<CardList :cardList="jsNavs"/>

## 2. 算法
<CardList :cardList="algorithm"/>

## 3. js资源
<CardList :cardList="jsResource"/>

## 4. [TypeScript](https://ts.nodejs.cn/)
<CardList :cardList="typeScript"/>
