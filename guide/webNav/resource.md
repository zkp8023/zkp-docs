# 一些资料

<script setup>
import { githubList , books , gitList, weekly, otherList, operationList } from './navs/resource'
</script>

## 1. github
<CardList :cardList="githubList" />

## 2. weekly
<CardList :cardList="weekly" />

## 3. books
<CardList :cardList="books" />

## 4. operation
<CardList :cardList="operationList" />

## 5. git
<CardList :cardList="gitList" />

## 6. other
<CardList :cardList="otherList" />
