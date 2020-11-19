<!--
 * @Author: your name
 * @Date: 2020-11-19 12:03:30
 * @LastEditTime: 2020-11-19 15:08:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\lyout\compoent\tagNav.vue
-->
<template>
  <div class='tag-nav'>
    <scroll-bar ref='scrollBar'>
      <router-link ref='tag' tag='div' class='tag-nav-item left midFont'
                   :title='item.title'
                   :class="isActive(item) ? 'active' : ''"
                   v-for="(item, index) in tagNavList"
                   :id="IsRouteTo(item) ? '' : 'first'"
                   @contextmenu.prevent.native='openMenu(item,$event,index)'
                   :to='item.path' :key='index'>
        <span>{{item.title}}</span>
        <span class='el-icon-close' :class="isActive(item) ? 'active' : ''" v-show='IsRouteTo(item)' @click.prevent.stop='closeTheTag(item, index)'></span>
      </router-link>
    </scroll-bar>
    <ul v-show='visible' :style="{left:left+'px',top:top+'px'}" class='contextmenu'>
      <li v-show="selectedTag.name!=='home'" @click='closeTheTag(selectedTag,selectIndex)'>
        关 闭
      </li>
      <li @click='refreshSelectedTag(selectedTag)' v-show='isActive(selectedTag)'>
        刷 新
      </li>
      <li @click='closeOthersTags(selectedTag)'>
        关闭其他
      </li>
      <li v-show="selectedTag.name!=='home'" @click='closeAllTags'>
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script>
  import ScrollBar from './scrollBar.vue';
  import {mapActions} from 'vuex';
  import Auth from 'util/auth';

  const Base64 = require('js-base64').Base64;

  export default {
    inject: ['reload'],
    data () {
      return {
        defaultPage: '/home/first',
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        selectIndex: '',
        permission_routers: [],
        processType: ''
      };
    },

    computed: {
      tagNavList () {
        return this.$store.state.tagNav.cachedPageList;
      },
      autoClosePage () {
        return this.$store.state.tagNav.autoClosePage;
      },
      RouteTitle () {
        return this.$store.state.tagNav.RouteTitle;
      },
      type () {
        const params = this.$route.params;
        return params && params.type ? this.$base64.decode(this.$route.params.type) : 'undo';
      }
    },
    created () {
      this.setCurrentPage();
    },
    mounted () {
      this.addTagNav();
      this.closePage();
    },
    watch: {
      $route (newVal, oldVal) {
        this.addTagNav();
        this.setCurrentPage();
      },
      tagNavList: {
        handler () {
          console.log(this.tagNavList, 'tagNavList');
          this.scrollToCurTag();
        },
        deep: true
      },
      visible (value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu);
        } else {
          document.body.removeEventListener('click', this.closeMenu);
        }
      }
    },
    methods: {
      ...mapActions({
        refresh: 'tagNav/delCachedView',
        delOthersViews: 'tagNav/delOthersViews',
        delAllViews: 'tagNav/delAllViews'
      }),
      getCommonlyMeuns (routers) {
        routers.forEach(route => {
          if (route.flg === '1') {
            this.permission_routers.push(route);
          }
          if (route.children && route.children.length) {
            this.getCommonlyMeuns(route.children);
          }
        });
      },
      // 存取 当前页面
      setCurrentPage () {
        this.$store.commit('tagNav/SET_CURRENT_PAGE', this.$route);
      },
      IsRouteTo (item) {
        return item.path !== '/home';
      },
      generateRoute () {
        if (this.$route.name) {
          let obj = localStorage.getItem('RouteTitle');
          obj = obj ? JSON.parse(obj) : '';
          if (obj.name && this.$route.name === obj.name) {
            this.$route.meta.loadRouteName = obj.loadRouteName;
            this.$route.meta.translateType = obj.translateType;
            this.$route.meta.isMenu = false;
          } else {
            this.$route.meta.isMenu = true;
          }
          return this.$route;
        }
        return false;
      },
      isActive (item) {
        return item.path === this.$route.path;
      },
      addTagNav () {
        const route = this.generateRoute();
        if (!route) {
          return false;
        }
        this.$store.commit('tagNav/addTagNav', route);
      },
      closeTheTag (item, index) {
        // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
        // 如果没有前一个Tag，则加载默认页面
        this.$store.commit('tagNav/removeTagNav', item);
        if (this.$route.name === item.name) {
          if (index) {
            this.$router.push(this.tagNavList[index - 1].path);
          } else {
            this.$router.push(this.defaultPage);
            if (this.$route.path === '/home') {
              this.addTagNav();
            }
          }
        }
      },
      // 滚动
      scrollToCurTag () {
        const scrollBarTimeOut = setTimeout(() => {
          if (this.$refs.scrollBar) {
            this.$refs.scrollBar.scrollToCurTag();
          }
          clearTimeout(scrollBarTimeOut);
        }, 1000);

      },
      closePage () {
        if (this.autoClosePage) {
          const index = this.tagNavList.findIndex(item => {
            return item.name === this.autoClosePage.name;
          });
          this.$store.commit('tagNav/removeTagNav', this.autoClosePage);
          if (this.$route.path === this.autoClosePage.path) {
            if (index) {
              this.$router.push(this.tagNavList[index - 1].path);
            } else {
              this.$router.push(this.defaultPage);
              if (this.$route.path === '/home') {
                this.addTagNav();
              }
            }
          }
        }
      },
      // 刷新
      refreshSelectedTag (view) {
        this.reload();
      },
      // 关闭其他
      closeOthersTags (selectedTag) {
        this.delOthersViews(selectedTag).then(() => {
          this.scrollToCurTag();
        });
        if (this.isActive(selectedTag)) return;
        this.$router.push(selectedTag.path);

      },
      // 关闭所有
      closeAllTags () {
        this.delAllViews();
        this.$router.push('/home');
      },
      openMenu (tag, e, index) {
        const menuMinWidth = 105;
        const offsetLeft = this.$el.getBoundingClientRect().left;// container margin left
        const offsetWidth = this.$el.offsetWidth;// container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const left = e.clientX - offsetLeft + 15;// 15: margin right
        if (left > maxLeft) {
          this.left = maxLeft;
        } else {
          this.left = left;
        }
        this.top = e.clientY - 40;

        this.visible = true;
        this.selectedTag = tag;
        this.selectIndex = index;
      },
      closeMenu () {
        this.visible = false;
      }
    },
    components: {
      ScrollBar
    }
  };
</script>

<style scoped lang='scss'>
  @import '../style/TagNav.scss';
</style>
