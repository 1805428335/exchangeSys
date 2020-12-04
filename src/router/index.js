/*
 * @Author: your name
 * @Date: 2020-07-13 09:00:27
 * @LastEditTime: 2020-11-20 11:50:06
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
      // {
      //   isMenuShow: true,
      //   path: '/defaultRouter',
      //   component: _import('defaultRouter/defaultRouter'),
      //   name: 'defaultRouter',
      //   resName: '敬请期待',
      //   meta: {title: '敬请期待', metaName: 'defaultRouter', isCached: true}
      // },
      {
        isMenuShow: true,
        path: '/userManagement',
        component: _import('backDataMaintain/userManagement/userManagement'),
        name: 'userManagement',
        resName: '用户管理',
        meta: {title: '用户管理', metaName: 'userManagement', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/userManagementEdit/:type/:id',
        component: _import('backDataMaintain/userManagement/userManagementEdit'),
        name: 'userManagementEdit',
        resName: '用户管理编辑',
        meta: {
          title: '用户管理编辑',
          metaName: 'userManagementEdit',
          lastRouterName: 'userManagement',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/roleManagement',
        component: _import('backDataMaintain/roleManagement/roleManagement'),
        name: 'roleManagement',
        resName: '角色管理',
        meta: {title: '角色管理', metaName: 'userManagement', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/roleManagementEdit/:type/:id',
        component: _import('backDataMaintain/roleManagement/roleManagementEdit'),
        name: 'roleManagementEdit',
        resName: '角色管理编辑',
        meta: {
          title: '角色管理编辑',
          metaName: 'roleManagementEdit',
          lastRouterName: 'roleManagement',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/roleDistribution',
        component: _import('backDataMaintain/roleDistribution/index'),
        name: 'roleDistribution',
        resName: '角色分配',
        meta: {title: '角色分配', metaName: 'roleDistribution', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/roleAuth',
        component: _import('backDataMaintain/roleAuth/index'),
        name: 'roleAuth',
        resName: '角色授权',
        meta: {title: '角色授权', metaName: 'roleAuth', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/mine',
        component: _import('backDataMaintain/mine/index'),
        name: 'mine',
        resName: '个人中心',
        meta: {title: '个人中心', metaName: 'mine', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/app',
        component: _import('backDataMaintain/app/index'),
        name: 'app',
        resName: 'APP更新',
        meta: {title: 'APP更新', metaName: 'app', isCached: true}
      }
    ]
  },
  // 基础数据
  {
    path: '',
    name: 'basicData',
    resName: '基础数据',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/userManagements',
        component: _import('basicData/userManagements/index'),
        name: 'userManagements',
        resName: '用户管理',
        meta: {title: '用户管理', metaName: 'userManagements', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/userInformation',
        component: _import('basicData/userInformation/index'),
        name: 'userInformation',
        resName: '用户信息',
        meta: {title: '用户信息', metaName: 'userInformation', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/maleChainCurrency',
        component: _import('basicData/maleChainCurrency/index'),
        name: 'maleChainCurrency',
        resName: '公链币种',
        meta: {title: '公链币种', metaName: 'maleChainCurrency', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/addressTheLibrary',
        component: _import('basicData/addressTheLibrary/index'),
        name: 'addressTheLibrary',
        resName: '地址库',
        meta: {title: '地址库', metaName: 'addressTheLibrary', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/transactionPrice',
        component: _import('basicData/transactionPrice/index'),
        name: 'transactionPrice',
        resName: '交易限价',
        meta: {title: '交易限价', metaName: 'transactionPrice', isCached: true}
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
        component: _import('auditCenter/withdrawMoney/index'),
        name: 'withdrawMoney',
        resName: '提币预审',
        meta: {title: '提币预审', metaName: 'withdrawMoney', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/withdrawalAudit',
        component: _import('auditCenter/withdrawalAudit/index'),
        name: 'withdrawalAudit',
        resName: '提币审核',
        meta: {title: '提币审核', metaName: 'withdrawalAudit', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/otc',
        component: _import('auditCenter/otc/index'),
        name: 'otc',
        resName: 'OTC申诉',
        meta: {title: 'OTC申诉', metaName: 'otc', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/feedback',
        component: _import('auditCenter/feedback/index'),
        name: 'feedback',
        resName: '留言反馈',
        meta: {title: '留言反馈', metaName: 'feedback', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/realNameAudit',
        component: _import('auditCenter/realNameAudit/index'),
        name: 'realNameAudit',
        resName: '实名审核',
        meta: {title: '实名审核', metaName: 'realNameAudit', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/onlineAudit',
        component: _import('auditCenter/onlineAudit/index'),
        name: 'onlineAudit',
        resName: '在线审核',
        meta: {title: '在线审核', metaName: 'onlineAudit', isCached: true}
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
        meta: {
          title: '币种简介编辑',
          metaName: 'currencyIntroductionEdit',
          lastRouterName: 'currencyIntroduction',
          isCached: true
        }
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
  },
  // 法币专区
  {
    path: '',
    name: 'frenchCurrencyZone',
    resName: '法币专区',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/C2CData',
        component: _import('frenchCurrencyZone/C2CData/C2CData'),
        name: 'C2CData',
        resName: 'C2C 数据',
        meta: {title: 'C2C 数据', metaName: 'C2CData', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/complaintRecord',
        component: _import('frenchCurrencyZone/complaintRecord/complaintRecord'),
        name: 'complaintRecord',
        resName: '申诉记录',
        meta: {title: '申诉记录', metaName: 'complaintRecord', isCached: true}
      }
    ]
  },
  // 锁仓管理
  {
    path: '',
    name: 'lockUpManagement',
    resName: '锁仓管理',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/preOrderItems',
        component: _import('lockUpManagement/preOrderItems/preOrderItems'),
        name: 'preOrderItems',
        resName: '预购项目',
        meta: {title: '预购项目', metaName: 'preOrderItems', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/preOrderItemsEdit/:type/:id',
        component: _import('lockUpManagement/preOrderItems/preOrderItemsEdit'),
        name: 'preOrderItemsEdit',
        resName: '预购项目编辑',
        meta: {
          title: '预购项目编辑',
          metaName: 'preOrderItemsEdit',
          lastRouterName: 'preOrderItems',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/lockUpRecord',
        component: _import('lockUpManagement/lockUpRecord/lockUpRecord'),
        name: 'lockUpRecord',
        resName: '锁仓记录',
        meta: {title: '锁仓记录', metaName: 'lockUpRecord', isCached: true}
      }
    ]
  },
  // 永续合约
  {
    path: '',
    name: 'sustainableContract',
    resName: '永续合约',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/leverage',
        component: _import('sustainableContract/leverage/index'),
        name: 'leverage',
        resName: '杠杆数倍',
        meta: {title: '杠杆数倍', metaName: 'leverage', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/leverageEdit/:type/:id',
        component: _import('sustainableContract/leverage/edit'),
        name: 'leverageEdit',
        resName: '杠杆数倍',
        meta: {
          title: '杠杆数倍',
          metaName: 'leverageEdit',
          lastRouterName: 'leverage',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/marketSynchronization',
        component: _import('sustainableContract/marketSynchronization/index'),
        name: 'marketSynchronization',
        resName: '行情同步',
        meta: {title: '行情同步', metaName: 'marketSynchronization', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/currencyManagement',
        component: _import('sustainableContract/currencyManagement/index'),
        name: 'currencyManagement',
        resName: '币种管理',
        meta: {title: '币种管理', metaName: 'currencyManagement', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/currencyManagementEdit/:type/:id',
        component: _import('sustainableContract/currencyManagement/edit'),
        name: 'currencyManagementEdit',
        resName: '币种管理',
        meta: {
          title: '币种管理',
          metaName: 'currencyManagement',
          lastRouterName: 'leverage',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/orderManagement',
        component: _import('sustainableContract/orderManagement/index'),
        name: 'orderManagement',
        resName: '订单管理',
        meta: {title: '订单管理', metaName: 'orderManagement', isCached: true}
      }
    ]
  },
  // 多账户管理
  {
    path: '',
    name: 'multiAccountManagement',
    resName: '多账户管理',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/multiAccount',
        component: _import('multiAccountManagement/multiAccount/index'),
        name: 'multiAccount',
        resName: '多账户',
        meta: {title: '多账户', metaName: 'multiAccount', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/multiAccountEdit/:type/:id',
        component: _import('multiAccountManagement/multiAccount/edit'),
        name: 'multiAccountEdit',
        resName: '多账户',
        meta: {
          title: '多账户',
          metaName: 'multiAccountEdit',
          lastRouterName: 'multiAccount',
          isCached: true
        }
      },
      {
        isMenuShow: true,
        path: '/accountRelationship',
        component: _import('multiAccountManagement/accountRelationship/index'),
        name: 'accountRelationship',
        resName: '账户关系',
        meta: {title: '账户关系', metaName: 'accountRelationship', isCached: true}
      },
      {
        isMenuShow: false,
        path: '/accountRelationshipEdit/:type/:id',
        component: _import('multiAccountManagement/accountRelationship/edit'),
        name: 'accountRelationshipEdit',
        resName: '账户关系',
        meta: {
          title: '账户关系',
          metaName: 'accountRelationshipEdit',
          lastRouterName: 'accountRelationshipEdit',
          isCached: true
        }
      }, {
        isMenuShow: true,
        path: '/transactionType',
        component: _import('attachmentManagement/transactionType/transactionType'),
        name: 'transactionType',
        resName: '交易类型',
        meta: {title: '交易类型', metaName: 'transactionType', isCached: true}
      }
    ]
  },
  // 支付管理
  {
    path: '',
    name: 'payManagement',
    resName: '支付管理',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/payRule',
        component: _import('payManagement/payRule/index'),
        name: 'payRule',
        resName: '支付规则',
        meta: {title: '支付规则', metaName: 'payRule', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/payCurrency',
        component: _import('payManagement/payCurrency/index'),
        name: 'payCurrency',
        resName: '支付币种',
        meta: {title: '支付币种', metaName: 'payCurrency', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/userPayLimit',
        component: _import('payManagement/userPayLimit/index'),
        name: 'userPayLimit',
        resName: '用户支付限额',
        meta: {title: '用户支付限额', metaName: 'userPayLimit', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/payOrder',
        component: _import('payManagement/payOrder/index'),
        name: 'payOrder',
        resName: '支付订单',
        meta: {title: '支付订单', metaName: 'payOrder', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/onSiteOrder',
        component: _import('payManagement/onSiteOrder/index'),
        name: 'onSiteOrder',
        resName: '站内订单',
        meta: {title: '站内订单', metaName: 'onSiteOrder', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/serviceManagement',
        component: _import('payManagement/serviceManagement/index'),
        name: 'serviceManagement',
        resName: '客服管理',
        meta: {title: '客服管理', metaName: 'serviceManagement', isCached: true}
      }
    ]
  },
  // 充提汇
  {
    path: '',
    name: 'chargeToAskHui',
    resName: '充提汇',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/chainOnTheAssets',
        component: _import('chargeToAskHui/chainOnTheAssets/index'),
        name: 'chainOnTheAssets',
        resName: '链上资产',
        meta: {title: '链上资产', metaName: 'chainOnTheAssets', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/mentionFillingRecord',
        component: _import('chargeToAskHui/mentionFillingRecord/index'),
        name: 'mentionFillingRecord',
        resName: '充提记录',
        meta: {title: '充提记录', metaName: 'mentionFillingRecord', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/summaryManagement',
        component: _import('chargeToAskHui/summaryManagement/index'),
        name: 'summaryManagement',
        resName: '汇总管理',
        meta: {title: '汇总管理', metaName: 'summaryManagement', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/bluntRemittancesAccount',
        component: _import('chargeToAskHui/bluntRemittancesAccount/index'),
        name: 'bluntRemittancesAccount',
        resName: '冲汇兑账',
        meta: {title: '冲汇兑账', metaName: 'bluntRemittancesAccount', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/auditRecords',
        component: _import('chargeToAskHui/auditRecords/index'),
        name: 'auditRecords',
        resName: '审核记录',
        meta: {title: '审核记录', metaName: 'auditRecords', isCached: true}
      }
    ]
  },

  // 附件管理
  {
    path: '',
    name: 'attachmentManagement',
    resName: '附件管理',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/discoveryRotation',
        component: _import('attachmentManagement/discoveryRotation/discoveryRotation'),
        name: 'discoveryRotation',
        resName: '发现轮播',
        meta: {title: '发现轮播', metaName: 'discoveryRotation', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/announcementManagement',
        component: _import('attachmentManagement/announcementManagement/announcementManagement'),
        name: 'announcementManagement',
        resName: '公告管理',
        meta: {title: '公告管理', metaName: 'announcementManagement', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/helpCenter',
        component: _import('attachmentManagement/helpCenter/helpCenter'),
        name: 'helpCenter',
        resName: '帮助中心',
        meta: {title: '帮助中心', metaName: 'helpCenter', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/wechatConfig',
        component: _import('attachmentManagement/wechatConfig/wechatConfig'),
        name: 'wechatConfig',
        resName: '微信配置',
        meta: {title: '微信配置', metaName: 'wechatConfig', isCached: true}
      }
    ]
  },
  // 支付管理
  {
    path: '',
    name: 'discoveryCenter',
    resName: '发现中心',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/discoveryCenter',
        component: _import('discoveryCenter/discoveryCenter/index'),
        name: 'discoveryCenter',
        resName: '发现中心',
        meta: {title: '发现中心', metaName: 'discoveryCenter', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/appNative',
        component: _import('discoveryCenter/appNative/index'),
        name: 'appNative',
        resName: 'AppNative',
        meta: {title: 'AppNative', metaName: 'appNative', isCached: true}
      }
    ]
  },
  // 支付管理
  {
    path: '',
    name: 'financialStatistics',
    resName: '财务统计',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/transferRecord',
        component: _import('financialStatistics/transferRecord/index'),
        name: 'transferRecord',
        resName: '转账记录',
        meta: {title: '转账记录', metaName: 'transferRecord', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/localToUp',
        component: _import('financialStatistics/localToUp/index'),
        name: 'localToUp',
        resName: '本地充值',
        meta: {title: '本地充值', metaName: 'localToUp', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/frozenAssets',
        component: _import('financialStatistics/frozenAssets/index'),
        name: 'frozenAssets',
        resName: '冻结资产',
        meta: {title: '冻结资产', metaName: 'frozenAssets', isCached: true}
      }
    ]
  },
  // 数据日志
  {
    path: '',
    name: 'dataLog',
    resName: '数据日志',
    isMenuShow: true,
    component: Layout,
    children: [
      {
        isMenuShow: true,
        path: '/messageRecord',
        component: _import('dataLog/messageRecord/index'),
        name: 'messageRecord',
        resName: '留言记录',
        meta: {title: '留言记录', metaName: 'messageRecord', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/operationLog',
        component: _import('dataLog/operationLog/index'),
        name: 'operationLog',
        resName: '操作日志',
        meta: {title: '操作日志', metaName: 'operationLog', isCached: true}
      },
      {
        isMenuShow: true,
        path: '/registrationStatistics',
        component: _import('dataLog/registrationStatistics/index'),
        name: 'registrationStatistics',
        resName: '注册统计',
        meta: {title: '注册统计', metaName: 'registrationStatistics', isCached: true}
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

export default router;
