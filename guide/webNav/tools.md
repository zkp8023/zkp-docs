# 一些工具

<script setup>
    import { toolList , other , codeTools , codeGround } from './navs/tools'
</script>

## 1. 编程
<!-- :::details 点击查看 -->
<CardList2 :cardList="codeTools"/>
<!-- ::: -->

## 2. 代码演练
<CardList2 :cardList="codeGround"/>

## 3. 工具集
<CardList2 :cardList="toolList"/>

## 4. 其他
<CardList2 :cardList="other"/>
