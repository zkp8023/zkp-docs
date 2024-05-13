# 一些资料

<script setup>
import { githubList , books , gitList,weekly, otherList } from './navs/resource'
</script>

## 1. github
<CardList :cardList="githubList" />

## 2. 周刊
<CardList :cardList="weekly" />

## 3. books
<CardList :cardList="books" />

## 4. git
<CardList :cardList="gitList" />

## 5. other
<CardList :cardList="otherList" />
