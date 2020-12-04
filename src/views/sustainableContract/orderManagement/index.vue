<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 09:35:32
 * @LastEditTime: 2020-11-21 14:06:24
 * @LastEditors: Please set LastEditors
 * @Description: C2C 数据
 * @FilePath: \exChange\src\views\frenchCurrencyZone\C2CData\C2CData.vue
-->
<template>
  <div class='compositePage'>
    <div class="compositePage-but smallFont set" @click="changeShow">
      <i :class=" isShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"> {{ isShow ? '收起' : '展开' }}</i>
    </div>
    <div class='roleCons'>
      <div class='contents'  style="flex-direction:column ;">
        <div class='contents-table' style='flex: 7;' v-show="isShow">
          <div class='cons-top'>
            <div class='function_cons'>
              <div class='search_cons'>
                <div class='cons-head'>
                  <div>数据汇总</div>
                </div>
              </div>
            </div>
          </div>

          <div class='cons-bottom'>
            <div class='cons'>
              <dataSummary ref="dataSummary"></dataSummary>
            </div>
          </div>
        </div>
        <transition name="el-zoom-in-center">
          <div class='contents-table' style='flex: 5;' >
            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>订单管理</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                <orderManagements  ref="orderManagements"></orderManagements>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

import orderManagements from './orderManagements/index';
import dataSummary from './dataSummary/index';

export default {
  name: 'orderManagement',
  components: {dataSummary, orderManagements},
  data() {
    return {

      offsetHeight: 500,
      offsetHeightRight: 500,
      isShow: true
    };
  },
  created() {
    //   this._getTableDataList();
  },
  mounted() {

  },
  watch: {},
  methods: {
    changeShow() {
      this.isShow = !this.isShow;
      this.$refs.dataSummary.tests();
      this.$refs.orderManagements.tests();
    }
  },
  activated() {
    // this.$refs.addressSeries.tests();
  }
};
</script>
<style lang='scss' scoped>
.compositePage-but {
  position: absolute;
  right: 20px;
  top: 20px;
}

@import 'styles/compositePage.scss';

</style>
