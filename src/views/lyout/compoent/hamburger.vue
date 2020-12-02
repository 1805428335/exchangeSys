<template>
  <div class="hamburger">
    <div class="hamburger_item">
      <el-tooltip class="item" effect="dark" :content=" isActive? '关闭' : '展开'" placement="left">
        <i  @click="toggleClick" :class="isActive?'el-icon-s-fold':'el-icon-s-unfold'"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  };
</script>

<style scoped lang="scss">
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 40px;
    text-align: center;
    border-right: solid 1px #e6e6e6;
    padding: 0 18px;
    box-sizing: border-box;
    transform-origin: 50% 50%;
    background-color: rgb(255, 255, 255);
    .hamburger_item{
      height: 30px;
      margin: auto;
      background-color: #eeeeee;
      border-radius: 3px;
      margin-top: 5px;
    }
  }

i{
  font-size: 18px;
  color: #fafafa;
  cursor: pointer;
  line-height: 30px;
  transform: rotate(90deg);
  &.active{
    transform: rotate(0deg);
  }
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
