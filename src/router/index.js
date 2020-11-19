/*
 * @Author: your name
 * @Date: 2020-07-13 09:00:27
 * @LastEditTime: 2020-11-19 17:06:27
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
    },
    // 币币交易
    {
      path: '',
      name: 'currencyTransaction',
      resName: '币币交易',
      isMenuShow: true,
      component: Layout,
      children: [
        {
          isMenuShow: true,
          path: '/tradeBenchmarking',
          component: _import('currencyTransaction/tradeBenchmarking/tradeBenchmarking'),
          name: 'tradeBenchmarking',
          resName: '交易对标',
          meta: {title: '交易对标', metaName: 'tradeBenchmarking', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/currencyIntroduction',
          component: _import('currencyTransaction/currencyIntroduction/currencyIntroduction'),
          name: 'currencyIntroduction',
          resName: '币种简介',
          meta: {title: '币种简介', metaName: 'currencyIntroduction', isCached: true}
        },
        {
          isMenuShow: false,
          path: '/currencyIntroductionEdit/:type/:id',
          component: _import('currencyTransaction/currencyIntroduction/currencyIntroductionEdit'),
          name: 'currencyIntroductionEdit',
          resName: '币种简介编辑',
          meta: {title: '币种简介编辑', metaName: 'currencyIntroductionEdit', lastRouterName: 'currencyIntroduction', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/commissionOrder',
          component: _import('currencyTransaction/commissionOrder/commissionOrder'),
          name: 'commissionOrder',
          resName: '委托订单',
          meta: {title: '委托订单', metaName: 'commissionOrder', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/transactionRecord',
          component: _import('currencyTransaction/transactionRecord/transactionRecord'),
          name: 'transactionRecord',
          resName: '成交记录',
          meta: {title: '成交记录', metaName: 'transactionRecord', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/transactionFee',
          component: _import('currencyTransaction/transactionFee/transactionFee'),
          name: 'transactionFee',
          resName: '交易手续费',
          meta: {title: '交易手续费', metaName: 'transactionFee', isCached: true}
        },
        {
          isMenuShow: true,
          path: '/robot',
          component: _import('currencyTransaction/robot/robot'),
          name: 'robot',
          resName: '机器人',
          meta: {title: '机器人', metaName: 'robot', isCached: true}
        }
      ]
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes: constantRouterMap
});

export default router;
