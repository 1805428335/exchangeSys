<!--
 * @Author: your name
 * @Date: 2020-06-28 09:08:48
 * @LastEditTime: 2020-07-25 15:33:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_basicconfiguration-施工云企业信息及配置\src\components\global\editTitle\editTitle.vue
-->
<template>
  <div class="edit-title">
    <div class="title">
      {{title}}
      <span class="be-careful" v-if="titleTips">
        {{titleTips}}
      </span>
    </div>
    <div class="set">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-title',
    props: {
      title: {
        type: String,
        default: ''
      },
      titleTips: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped lang="scss">
  .edit-title {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #eee;
    padding: 0 0px 10px 0;
    margin-bottom: 10px;
    .title {
      float: left;
      font-size: 16px;
      &:before {
        content: '';
        display: inline-block;
        height: 24px;
        position: relative;
        top: 6px;
        padding-left: 10px;
        border-left: 4px solid #409eff;
      }
    }
    .be-careful{
      font-size: 12px;
      color: #f73535;
    }
    .set {
      float: right;
    }
  }
</style>
