<script setup>
import { vueList,reactList ,taobaoComs,TencentComs ,bytedanceComs ,otherComs ,cssList,toolsList ,otherOfficial ,iconList,libraryList,electronList,harmonyList ,crossPlatform } from './navs/official-website'
</script>

# 常用官网

## 1. Tools
<CardList2 :cardList="toolsList"/>

##  2. Frame

### 1. Harmony
<br />
<CardList2 :cardList="harmonyList"/>

### 2. Vue
<br />
<CardList2 :cardList="vueList"/>

###  3. React
<br />
<CardList2 :cardList="reactList"/>

### 3. Electron
<br />
<CardList2 :cardList="electronList"/>

##  3. Css
<CardList2 :cardList="cssList"/>

##  4. Components

###  Alibaba
<br />

<CardList2 :cardList="taobaoComs"/>

###  Tencent
<br />

<CardList2 :cardList="TencentComs"/>

###  Bytedance
<br />

<CardList2 :cardList="bytedanceComs"/>

###  Cross-Platform
<br />

<CardList2 :cardList="crossPlatform"/>

###  Others
<br />

<CardList2 :cardList="otherComs"/>

## 5. Icon
<br />
<CardList2 :cardList="iconList"/>

## 6. Libraries
<CardList2 :cardList="libraryList"/>

## 7. Others
<CardList2 :cardList="otherOfficial"/>
