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
    <div class="compositePage-but smallFont set" @click='isShow = !isShow'>
      <i :class=" isShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"> {{ isShow ? '收起' : '展开' }}</i>
    </div>
    <div class='roleCons'>
      <div class='contents'>
        <div class='contents-table' style='flex: 5;'>
          <div class='cons-top'>
            <div class='function_cons'>
              <div class='search_cons'>
                <div class='cons-head'>
                  <div>公链管理</div>
                </div>
              </div>
            </div>
          </div>

          <div class='cons-bottom'>
            <div class='cons'>
              <addressSeries></addressSeries>
            </div>
          </div>
        </div>
        <transition name="el-zoom-in-center">
          <div class='contents-table table1' style='flex: 5;' v-show="isShow">
            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>币种管理</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                <addressTheLibrarys></addressTheLibrarys>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

import addressTheLibrarys from './addressTheLibrarys/index';
import addressSeries from './addressSeries/index';

export default {
  name: 'addressTheLibrary',
  components: {addressSeries, addressTheLibrarys},
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
  methods: {}
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
