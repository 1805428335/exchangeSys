<!--
 * @Author: your name
 * @Date: 2020-11-19 12:03:30
 * @LastEditTime: 2020-11-19 15:18:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\lyout\compoent\menuBar.vue
-->
<template>
  <div class="menus menuLink">
    <div class="menusList" ref="menusList">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="flag">
      </hamburger>
      <el-menu
        class="menuslll"
        mode="vertical"
        :router="false"
        ref="elMenu"
        :show-timeout="150"
        default-active="00"
        :collapse="isCollapse"
        :unique-opened="true"
        background-color="#fafafa"
        text-color="#505599">
        <template v-for="(item,index) in permission_routers">
          <el-submenu :index="String(index)"
                      :key="index">
            <template slot="title">
              <i v-if="item.meta.icon" :class="'iconfont ' + item.icon"></i>
              <i v-else class="el-icon-wallet"></i>
              <span class="menu" :title="item.meta.title">{{item.meta.title}}</span>
            </template>
            <template v-for="(child,i) in item.children">
                <el-menu-item-group :key="i">
                  <el-menu-item
                    @click="handleRouter(child)"
                    :class="defaultUrl === child.path ? 'is-route-active' : 'is-route-close'"
                    :index="index+''+i">
                    <template slot="title">
                      <i v-if="child.meta.icon" :class="'iconfont ' + child.meta.icon"></i>
                      <span class="menu" :title="child.meta.title">{{child.meta.title}}</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import Auth from 'util/auth';
  import {constantRouterMap} from 'router/index.js'; // 自己配置的静态路由


  export default {
    components: {
      hamburger (resolve) {
        require(['./hamburger.vue'], resolve);
      }
    },
    computed: {
      isCollapse () {
        return this.$store.state.diaLog.sidebarOpen;
      }
    },
    data () {
      return {
        uniqueOpened: false,
        permission_routers: [],
        defaultUrl: '',
        flag: false,
        menuFlag: true
      };
    },
    created () {
      const routerMap = this.$clone(constantRouterMap).filter(v => v.isMenuShow);
      this.setRouter(this.setRouterData(routerMap));
    },
    methods: {
      setRouterData (arr) {
        const routeData = [];
        if (!arr.length) {
          return arr;
        } else {
          for (const i in arr) {
            const item = arr[i];
            const obj = {
              path: '',
              component: 'Layout',
              name: item.name,
              meta: {
                title: item.resName,
                name: item.resName,
                isCached: item.isCached,
                icon: item.icon
              },
              children: []
            };
            routeData.push(obj);
            for (const j in item.children) {
              const child = item.children[j];
              if (child.isMenuShow) {
                child.component = child.path;
                child.path = child.path;
                child.name = child.name;
                child.meta = {};
                child.meta.title = child.resName;
                child.meta.name = child.resName;
                child.meta.isCached = child.isCached;
                child.meta.icon = child.icon;
                routeData[i].children.push(child);
              }
            }
          }
          return routeData;
        }
      },
      setRouter (arr) {
        if (arr.length === 0) return;
        this.permission_routers = this.$clone(arr);
        this.getPath();
      },
      getPath () {
        this.defaultUrl = this.$route.path;
      },
      toggleSideBar () {
        this.flag = !this.flag;
        this.$store.commit('diaLog/SET_SLIDEBAROPEN', this.flag);
      },
      // 路由跳转
      handleRouter (item) {
        this.$router.push(`/${item.name}`);
      }
    },
    watch: {
      '$route': 'getPath'
    },
    mounted () {
      const userInfo = Auth.hasUserInfo() || '';
      this.getPath();
    }
  };
</script>
<style lang="scss" scoped>
  .menus {
    background: #f5f5f5;
    position: relative;
    .tooltip{
      padding-right: 10px;
      // box-sizing: border-box;
    }
    .logo {
      width: 100%;
      height: 50px;
      padding: 0 5px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      line-height: 50px;
      text-align: center;
      color: white;
      background-color: rgb(48, 65, 86);
    }
    .menusList {
      width: 100%;
      height: 100%;
      position: relative;
      .menuslll {
        position: absolute;
        top: 40px;
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        bottom: 0;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .setClose {
      position: absolute;
      top: 50%;
      right: -32px;
      z-index: 99;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      i {
        font-size: 20px;
      }
    }
  }
</style>
