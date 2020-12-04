<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 09:35:32
 * @LastEditTime: 2020-11-21 14:06:24
 * @LastEditors: Please set LastEditors
 * @Description: C2C 数据
 * @FilePath: \exChange\src\views\frenchCurrencyZone\C2CData\C2CData.vue
-->
<template>
  <div class='compositePage' >
    <div class='roleCons' style="height: 40px; flex-direction: row;justify-content: flex-end;">
      <div class="compositePage-but smallFont set" @click="changeShow(1)">
        <i :class=" isShow1 ? 'el-icon-arrow-left' : 'el-icon-arrow-right'">
          {{ isShow1 ? '币币账户收起' : '币币账户展开' }}
        </i>
      </div>
      <div class="compositePage-but smallFont set" @click="changeShow(2)">
        <i :class=" isShow2 ? 'el-icon-arrow-left' : 'el-icon-arrow-right'">
          {{ isShow2 ? '合约账户收起' : '合约账户展开' }}
        </i>
      </div>
      <div class="compositePage-but smallFont set" @click="changeShow(3)">
        <i :class=" isShow3 ? 'el-icon-arrow-left' : 'el-icon-arrow-right'">
          {{ isShow3 ? 'OTC账户收起' : 'OTC账户展开' }}
        </i>
      </div>
      <div class="compositePage-but smallFont set" @click="changeShow(4)">
        <i :class=" isShow4 ? 'el-icon-arrow-left' : 'el-icon-arrow-right'">
          {{ isShow4 ? '申购账户收起' : '申购账户展开' }}
        </i>
      </div>
    </div>
    <div class='roleCons'>
      <!--      <div class='contents'  style="flex-direction:column ;">-->
      <div class='contents'>
        <div class='contents' style="flex-direction:column ; flex: 5;" v-show="isShow1||isShow2">
          <div class='contents-table' style='flex: 5;position: relative;' v-show="isShow1">

            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>币币账户</div>
                  </div>
                </div>
              </div>
            </div>

            <div class='cons-bottom'>
              <div class='cons'>
                <contractAccount ref="contractAccount"></contractAccount>
              </div>
            </div>
          </div>
          <div class='contents-table' style='flex: 5;position: relative;' v-show="isShow2">

            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>合约账户</div>
                  </div>
                </div>
              </div>
            </div>

            <div class='cons-bottom'>
              <div class='cons'>
                <currencyAccount ref="currencyAccount"></currencyAccount>
              </div>
            </div>
          </div>
        </div>
        <div class='contents-table' style='flex: 8;'>
          <div class='cons-top'>
            <div class='function_cons'>
              <div class='search_cons'>
                <div class='cons-head'>
                  <div>用户管理</div>
                </div>
              </div>
            </div>
          </div>
          <div class='cons-bottom'>
            <div class='cons'>
              <userManagementChild ref="userManagementChild"></userManagementChild>
            </div>
          </div>
        </div>
        <div class='contents' style="flex-direction:column ; flex: 5;" v-show="isShow3||isShow4">
          <div class='contents-table' style='flex: 5;position: relative;' v-show="isShow3">

            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>OTC账户</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                <otcAccount ref="otcAccount"></otcAccount>
              </div>
            </div>
          </div>
          <div class='contents-table' style='flex: 5;position: relative;' v-show="isShow4">

            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>申购账户</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                <subscriptionAccount ref="subscriptionAccount"></subscriptionAccount>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import currencyAccount from './currencyAccount/index';
import contractAccount from './contractAccount/index';
import otcAccount from './otcAccount/index';
import subscriptionAccount from './subscriptionAccount/index';
import userManagementChild from './userManagementChild/index';

export default {
  name: 'userManagements',
  components: {userManagementChild, currencyAccount, contractAccount, otcAccount, subscriptionAccount},
  data() {
    return {

      offsetHeight: 500,
      offsetHeightRight: 500,
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true
    };
  },
  created() {
    //   this._getTableDataList();
  },
  mounted() {

  },
  watch: {},
  methods: {
    changeShow(id) {
      this[`isShow${id}`] = !this[`isShow${id}`];
      this.$refs.currencyAccount.tests();
      this.$refs.contractAccount.tests();
      this.$refs.otcAccount.tests();
      this.$refs.subscriptionAccount.tests();
    }
  },
  activated() {
    // this.$refs.addressSeries.tests();
  }
};
</script>
<style lang='scss' scoped>
.compositePage-but {
  //position: absolute;
  //right: 20px;
  //top: 20px;
  margin-right: 10px;
}

@import 'styles/compositePage.scss';

</style>
