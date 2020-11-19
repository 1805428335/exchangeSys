/*
 * @Author: your name
 * @Date: 2020-07-13 09:00:27
 * @LastEditTime: 2020-11-19 15:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_unit\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

const Layout = () => import('views/lyout/index.vue');
const _import = require(`router/_import_${process.env.NODE_ENV}`); // 获取组件的方法

Vue.use(VueRouter);

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: _import('login/login')
    },
    // 后台数据维护
    {
      path: '',
      name: 'backDataMaintain',
      resName: '后台数据维护',
      isMenuShow: true,
      component: Layout,
      children: [
        {
          path: '/home',
          component: _import('home/home'),
          name: 'home',
          resName: '首页',
          meta: {title: '首页', metaName: 'home', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/defaultRouter',
          component: _import('defaultRouter/defaultRouter'),
          name: 'defaultRouter',
          resName: '敬请期待',
          meta: {title: '敬请期待', metaName: 'defaultRouter', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/userManagement',
          component: _import('backDataMaintain/userManagement/userManagement'),
          name: 'userManagement',
          resName: '用户管理',
          meta: {title: '用户管理', metaName: 'userManagement', isCached: true}
        }
      ]
    },
    // 审核中心
    {
      path: '',
      name: 'auditCenter',
      resName: '审核中心',
      isMenuShow: true,
      component: Layout,
      children: [
        {
          isMenuShow: true,
          path: '/withdrawMoney',
          component: _import('auditCenter/withdrawMoney/withdrawMoney'),
          name: 'withdrawMoney',
          resName: '提币预审',
          meta: {title: '提币预审', metaName: 'withdrawMoney', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/withdrawalAudit',
          component: _import('auditCenter/withdrawalAudit/withdrawalAudit'),
          name: 'withdrawalAudit',
          resName: '提币审核',
          meta: {title: '提币审核', metaName: 'withdrawalAudit', isCached: true}
        }
      ]
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes: constantRouterMap
});

export default router;
