import config from 'util/config';

export const basicList = {
  data () {
    return {
      stystemFlag: 0, //  系统
      companyFlag: 1, //  企业/业务
      flowStatusList: [],
      propertyList: [], // 供应商类型
      levelList: [], // 供应商类型
      appraiseStatusList: [], // 是否合格
      appraiseLevelsList: [], // 评价等级
      qualificationsList: [], // 资质
      permitList: [], // 许可
      productQualityList: [], // 产品质量
      reputationList: [], // 用户反馈意见
      throughputEvaluationList: [], // 生产/供货能力
      productPriceEvaluationList: [], // 产品价格
      productQualityEvaluationList: [], // 产品质量评价
      reputationEvaluationList: [], //  业绩/信誉
      serviceEvaluationList: [],
      reasonTypeList: [], // 亏损原因
      cycleTypeList: [], // 周期类型
      attributeList: [], //  工程属性
      messageTypeList: [],
      supperStatusList: [], // 供货订单状态
      arrivalMethodList: [], // 运输方式
      calcRulesList: [], // 计量规则
      sellteMethodList: [], // 结算方式
      costTypeList: [], //  费用类型
      officeStatusList: [], // 任职状态
      rolesTypeList: [], // 角色类型
      //  flag: 0，系统字段 1，可扩展字段
      dataList: []
    };
  },
  created () {
    this.dataList = JSON.parse(JSON.stringify(config.dataList));
  },
  methods: {
    // 表格数据字典
    setDicData (value, selectList) {
      const index = selectList && selectList.findIndex(v => v.dataCode === value);
      if (index < 0) return '';
      return selectList[index].dataName;
    },
    judgeDataList (id, str) {
      const index = this[`${str}List`].findIndex(v => v.dataCode === id);
      if (index < 0) return;
      return this[`${str}List`][index].dataName;
    },
    async getDicAllDataList (arr) {
      for (const i in arr) {
        const item = arr[i];
        await this.getDataList(item);
      }
    },
    getDataList (str) {
      const index = this.dataList.findIndex(v => v.code === str);
      if (index < 0) return;
      const id = this.dataList[index].id;
      this._getDicItemValues(id, str);
    },
    _getDicItemValues (id, str) {
      this.$store.dispatch('dataDictionary/getDicItemValues', {dicId: id}).then(res => {
        this[`${str}List`] = res.results;
      });
    }
  }
};
export const closeRoute = {
  inject: ['reload', 'reloadPage'],
  data () {
    return {
      loadRouteName: '',
      lastRouterName: ''
    };
  },
  computed: {
    tagNavList () {
      return this.$store.state.tagNav.cachedPageList;
    }
  },
  created () {
    this.loadRouteName = this.$route.meta.metaName;
    this.lastRouterName = this.$route.meta.lastRouterName;
  },
  methods: {
    // 关闭当前页面
    setRoute () {
      const index = this.tagNavList.findIndex(v => v.name === this.loadRouteName);
      if (index < 0) return;
      this.closeTheTag(this.tagNavList[index], index);
    },
    closeTheTag (item, index) {
      //  当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
      //  如果没有前一个Tag，则加载默认页面
      this.$store.commit('tagNav/removeTagNav', item);
      if (this.$route.meta.metaName === item.name) {
        if (index) {
          const iNOW = this.tagNavList.findIndex(v => v.name === this.lastRouterName);
          if (iNOW >= 0) {
            this.$router.push(`/${this.lastRouterName}`);
            const timestamp = (new Date()).getTime();
            const lastRoute = JSON.parse(JSON.stringify(this.tagNavList[iNOW]));
            lastRoute.setTime = timestamp;
            this.$store.commit('tagNav/SET_FRESHROUTE', lastRoute);
          } else {
            this.$router.push(this.tagNavList[index - 1].path);
          }
        } else {
          this.$router.push('/home');
        }
      }
    }
  }
};
export const freshList = {
  inject: ['reload', 'reloadPage'],
  data () {
    return {
      lastRouterName: ''
    };
  },
  computed: {
    freshRoute () {
      return this.$store.state.tagNav.freshRoute;
    }
  },
  created () {
    this.lastRouterName = this.$route.meta.lastRouterName;
  },
  watch: {
    freshRoute: {
      handler() {
        const timer = setInterval(() => {
          if (this.$route.name === this.freshRoute.name) {
            this._getTableDataList && this._getTableDataList();
            clearInterval(timer);
          }
        }, 100);
      },
      deep: true
    }
  },
  methods: {
    freshRouteAll () {
      if (!this.lastRouterName) return;
        const iNOW = this.tagNavList.findIndex(v => v.name === this.lastRouterName);
        if (iNOW < 0) return;
        this.$router.push(`/${this.lastRouterName}`);
        const timestamp = (new Date()).getTime();
        const lastRoute = JSON.parse(JSON.stringify(this.tagNavList[iNOW]));
        lastRoute.setTime = timestamp;
        this.$store.commit('tagNav/SET_FRESHROUTE', lastRoute);
        this._getTableDataList();
    }
  }
};
