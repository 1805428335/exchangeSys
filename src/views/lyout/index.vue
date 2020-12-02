<!--
 * @Author: your name
 * @Date: 2020-09-02 11:25:48
 * @LastEditTime: 2020-11-19 16:43:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project_web\src\views\lyout\index.vue
-->
<template>
  <div class="lyoutWrap"
    v-loading="contentLoading.status"
    :element-loading-text="contentLoading.text"
    :element-loading-background="contentLoading.bgcolor">
    <headNavigation>
    </headNavigation>
    <div class="content">
      <menuBar class="sidebar-container" :class="isCollapse?'sidebar-container1':''">
      </menuBar>
      <div class="constant" :class="isCollapse?'isCollapse':''" v-if="isRouterAlive">
        <tag-nav class="tagNav">
        </tag-nav>
        <web-main class="main">
        </web-main>
      </div>
    </div>

    <!--token 失效的对话框-->
    <el-dialog
      :visible.sync="isToken"
      :show-close="false"
      title="提示"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      top="35vh" width="30%">
      <div class="NoToken">
        <p>
          <i class="el-icon-warning"></i>
          <span>当前会话已超时，请重新登录</span>
        </p>
        <el-button type="primary" size="small" @click="changetoLogin">
          登录
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import menuBar from './compoent/menuBar.vue';
  import webMain from './compoent/webMain.vue';
  import tagNav from './compoent/tagNav.vue';
  import Auth from 'util/auth';
  import Utils from 'util/index.js';

  export default {
    name: 'index',
    components: {
      menuBar, webMain, tagNav
    },
    provide () {
      return {
        reloadPage: this.reloadPage // 局部刷新
      };
    },
    data () {
      return {
        isRouterAlive: true
      };
    },
    computed: {
      isCollapse () {
        return this.$store.state.diaLog.sidebarOpen;
      },
      isToken () {
        return this.$store.state.user.overdueToken;
      },
      contentLoading () {
        return this.$store.state.diaLog.contentLoading;
      },
      tagNavList() {
        return this.$store.state.tagNav.cachedPageList;
      }
    },
    methods: {
      // 刷新方法
      reloadPage () {
        this.isRouterAlive = false;
        // 该方法会在dom更新后执行
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },
      changetoLogin () {
        Utils.commonUtil.resetVuex(); // 清楚store数据
        Auth.reLogin();
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped lang="scss">
  .lyoutWrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .content {
      flex: 100%;
      display: flex;
      height: calc(100% - 65px);
      max-height: calc(100% - 65px);
      .constant {
        flex: auto;
        width: calc(100% - 220px);
        height: 100%;
        &.isCollapse {
          width: calc(100% - 64px);
        }
        .tagNav {
          height: 46px;
          width: 100%;
        }
        .main {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          height: calc(100% - 46px);
        }
      }
    }
  }

  .NoToken {
    padding: 40px;
    p {
      margin-bottom: 40px;
      color: red;
    }
  }
  .sidebar-container {
    height: 100%;
    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;
    flex: 0 0 220px !important;
  }
  .sidebar-container1 {
    width: 64px !important;
    min-width: 64px !important;
    max-width: 64px !important;
    flex: 0 0 64px !important;
  }
</style>
