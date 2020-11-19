<!--
 * @Author: your name
 * @Date: 2020-06-05 13:48:27
 * @LastEditTime: 2020-11-19 13:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_portal\src\views\login\loginFooter.vue
-->
<template>
  <footer class="center">
    <p class="midFont smallFont" id="footItem1"></p>
    <p class="midFont smallFont" id="footItem">交易所</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
a{
  color: white;
  text-decoration:none;
}
footer {
  // padding-top: 12px;
  .footerWrap {
    ul {
      li {
        display: inline-block;
        a {
          color: white;
        }
      }
    }
  }
  p {
    // margin-top: 10px;
    color: white !important;
    line-height: 24px;
    img {
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }
}
</style>
