# 其他插件

<script setup>
    import {  fileOperation ,formPlugins,otherPlugins ,canvasList  ,videoPlugins ,echartsList,scroll ,flow , images,storageList ,editorList,tableList ,tooltipList ,dragList }from '../navs/plugins/other-plugins'
</script>

## 1. 富文本
<CardList2 :cardList="editorList"/>

## 2. 文件操作
<CardList :cardList="fileOperation"/>

## 3. 图片
<CardList :cardList="images"/>

## 4. 滚动
<CardList :cardList="scroll"/>

## 5. 表单和校验
<CardList :cardList="formPlugins"/>

## 6. canvas
<CardList :cardList="canvasList"/>

## 7. 视频播放
<CardList :cardList="videoPlugins"/>

## 8. 可视化
- [antv官网](https://antv.antgroup.com/)
- [chart.js](https://chart.nodejs.cn/)
- [echarts官网](https://echarts.apache.org/handbook/zh/get-started/)和社区:
<CardList :cardList="echartsList"/>

## 9. 流程图
<CardList :cardList="flow"/>

## 10. 存储
<CardList :cardList="storageList"/>

## 11. 表格
 <CardList :cardList="tableList"/>

## 12. tooltip,message提示
<CardList :cardList="tooltipList"/>

## 13. drag & drop
<CardList :cardList="dragList"/>

## 13. 其他
<CardList :cardList="otherPlugins"/>