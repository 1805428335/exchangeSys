<!--
 * @Author: your name
 * @Date: 2020-06-28 09:08:48
 * @LastEditTime: 2020-11-19 12:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_basicconfiguration-施工云企业信息及配置\src\components\global\noData\noData.vue
-->
<template>
  <div>
    <img class="data-pic" :src="require('assets/images/public/no-data.png')" alt="">
  </div>
</template>

<script>
  export default {
    name: 'no-data'
  };
</script>

<style scoped>
.no-data{
    color: rgb(144, 147, 153);
    font-size: 12px;
    text-align: center;
}
</style>
