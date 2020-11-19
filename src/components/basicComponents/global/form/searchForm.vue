<template>
  <div class="operationFormWrap">
    <el-form
      ref="searchFormValue"
      label-position="left"
      :model="searchFormValue"
      label-width="120px"
      @submit.native.prevent
      class="demo-ruleForm">
      <div class="form-group">
        <div class="row-form">
          <el-row :gutter="24">
            <template v-for="(item,index) in formList">
              <el-col v-if="item.inputStatus !=='hide'" :key="index" :span="item.span">
                <!-- 时间区间 -->
                <el-form-item
                  v-if="item.formType==='daterange-split'"
                  :label="item.label"
                  :class="item.label.length > 7 && 'maxLabel'">
                  <el-tooltip slot="label"  v-if="item.label.length > 7 && 'maxLabel'" class="item" effect="dark" :content="item.label" placement="top-start">
                    <span>{{item.label}}</span>
                  </el-tooltip>
                  <span v-else slot="label">{{item.label}}</span>
                  <div style="display: flex;align-items: center;">
                    <el-date-picker
                      v-model="searchFormValue[item.propStart]"
                      :placeholder="item.placeholderStart"
                      :size="item.size || 'small'"
                      clearable
                      :disabled="item.inputStatus === 'disabled'"
                      :type="item.type === 'time' ? 'datetime' : 'date'"
                      @change="sysHandleSearch"
                      default-time="00:00:00"
                      value-format="yyyy-MM-dd HH:mm:ss'"
                      style="width: 100%;"
                    >
                    <i slot="prefix-icon" class="icon"></i></el-date-picker>
                    <span style="margin: 0 10px;">-</span>
                    <el-date-picker
                      v-model="searchFormValue[item.propEnd]"
                      :placeholder="item.placeholderEnd"
                      :size="item.size || 'small'"
                      clearable
                      :disabled="item.inputStatus === 'disabled'"
                      :type="item.type === 'time' ? 'datetime' : 'date'"
                      @change="sysHandleSearch"
                      default-time="23:59:59"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 100%;"
                    >
                    <i slot="prefix-icon" class="icon"></i></el-date-picker>
                  </div>
                </el-form-item>
                <!-- 其他 -->
                <el-form-item
                  v-else
                  :label="item.label"
                  :prop="item.prop"
                  :class="item.label.length > 7 && 'maxLabel'">
                  <el-tooltip slot="label"  v-if="item.label.length > 7 && 'maxLabel'" class="item" effect="dark" :content="item.label" placement="top-start">
                    <span>{{item.label}}</span>
                  </el-tooltip>
                  <span v-else slot="label">{{item.label}}</span>
                  <!-- 插槽 -->
                  <template v-if="item.formType==='slot'">
                    <slot :name="'form-' + item.prop" :searchFormValue="searchFormValue" :item="item"></slot>
                  </template>
                  <!--// 文本输入框-->
                  <el-input
                    v-if="item.formType==='input'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    @keyup.enter.native="sysHandleSearch"
                    :clearable="item.inputStatus !== 'disable'"
                    :disabled="item.inputStatus === 'disable'"
                    :maxlength="Number(item.maxlength)"
                    show-word-limit>
                  </el-input>
                  <!-- 审批状态选择框 -->
                  <el-select
                    v-if="item.formType==='flowStatusRadio'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :clearable="item.clearable"
                    :disabled="item.inputStatus === 'disable'"
                    :filterable="item.filterable || true"
                    style="width:100%"
                    @change="sysHandleSearch">
                    <el-option
                      v-for="(child,i) in flowStatusList"
                      :key="i"
                      :label="child.dataName"
                      :value="child.dataCode"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-if="item.formType==='flowStatus'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    multiple  collapse-tags
                    :clearable="item.clearable"
                    :disabled="item.inputStatus === 'disable'"
                    :filterable="item.filterable || true"
                    style="width:100%"
                    @change="sysHandleSearch">
                    <el-option
                      v-for="(child,i) in flowStatusList"
                      :key="i"
                      :label="child.dataName"
                      :value="child.dataCode"
                    ></el-option>
                  </el-select>
                  <!--// 下拉选择框-->
                  <el-select
                    v-if="item.formType==='select'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :clearable="item.clearable"
                    :multiple='item.multiple || false'
                    :collapse-tags='item.collapseTags || false'
                    :disabled="item.inputStatus === 'disable'"
                    :filterable="item.filterable || true"
                    style="width:100%"
                    @change="sysHandleSearch">
                    <el-option
                      v-for="(child,i) in item.selectList"
                      :key="i"
                      :label="child[item.nameCode]"
                      :value="child[item.valueCode]"
                    ></el-option>
                  </el-select>
                  <!-- 数据字典下拉选择框 -->
                  <el-select
                    v-if="item.formType==='dicSelect'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :multiple='item.multiple || false'
                    :collapse-tags='item.collapseTags || false'
                    :filterable="item.filterable || true"
                    clearable
                    style="width:100%"
                    @change="sysHandleSearch"
                  >
                    <el-option
                      v-for="(child,i) in item.selectList"
                      :key="i"
                      :label="child.isTranslate ? child.dataName : child.dataName"
                      :value="child.dataCode"
                    ></el-option>
                  </el-select>
                  <!--// Cascader 级联选择器-->
                  <el-cascader
                    v-if="item.formType==='city'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    style="width: 100%"
                    @change="sysHandleSearch"
                    :options="options"
                    :props="{ checkStrictly: true }"
                  ></el-cascader>
                  <!--//数字输入框-->
                  <el-number
                    v-if="item.formType==='number'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    :maxlength="Number(item.maxlength)"
                    :precision="Number(item.precision)"
                    @keyup.enter.native="sysHandleSearch"
                    :min="item.min"
                    :max="item.max"
                    show-word-limit
                  ></el-number>
                  <!--// 日期  禁止选择部分日期待定-->
                  <el-date-picker
                    v-if="item.formType==='date' || item.formType==='time'"
                    v-model="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    :picker-options="item.pickerOptions && pickerOptions"
                    type="date"
                    @change="sysHandleSearch"
                    :value-format="item.formType==='date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'"
                    style="width: 100%;"
                  ></el-date-picker>
                  <!--年份-->
                  <el-date-picker
                    v-if="item.formType==='year'"
                    v-model="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    :picker-options="item.pickerOptions && pickerOptions"
                    type="year"
                    @change="sysHandleSearch"
                    value-format="yyyy"
                    style="width: 100%;"
                  ></el-date-picker>
                  <!--月份-->
                  <el-date-picker
                    v-if="item.formType==='month'"
                    v-model="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    :picker-options="item.pickerOptions && pickerOptions"
                    type="month"
                    @change="sysHandleSearch"
                    value-format="yyyy-MM"
                    style="width: 100%;"
                  ></el-date-picker>
                  <!--周-->
                  <el-date-picker
                    v-if="item.formType==='week'"
                    v-model="searchFormValue[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                    :size="item.size || 'small'"
                    clearable
                    :format="'yyyy' + '年' + 'MM' + '第' + week + '周'"
                    @change="weekChange(item, $event)"
                    value-format="yyyy-MM-dd"
                    class="inp"
                    type="week"
                    :picker-options="{'firstDayOfWeek': 1}">
                  </el-date-picker>
                  <!--// radio 单选-->
                  <el-radio-group
                    v-if="item.formType==='radio'"
                    v-model.trim="searchFormValue[item.prop]"
                    @change="sysHandleSearch"
                    :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                  >
                    <el-radio
                      v-for="(child,i) in item.selectList"
                      :key="i"
                      :label="child[item.value]"
                    >{{child[item.label]}}</el-radio>
                  </el-radio-group>
                  <!--switch滑块-->
                  <el-switch
                    v-if="item.formType==='switch'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                    @change="sysHandleSearch"
                  ></el-switch>
                  <!--基础checkbox单选-->
                  <el-checkbox
                    v-if="item.formType==='checkbox'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                    @change="sysHandleSearch"
                  ></el-checkbox>
                  <!--// 基础checkbox多选-->
                  <el-checkbox-group
                    v-if="item.formType==='checkboxGroup'"
                    v-model.trim="searchFormValue[item.prop]"
                    :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                    @change="sysHandleSearch"
                  >
                    <el-checkbox
                      v-for="(child,i) in item.selectList"
                      :key="i"
                      :label="child[item.value]"
                    >{{child[item.label]}}</el-checkbox>
                  </el-checkbox-group>
                  <!--textarea-->
                  <el-input
                    v-if="item.formType==='textarea'"
                    type="textarea"
                    v-model.trim="searchFormValue[item.prop]"
                    :placeholder="'请输入' + item.label"
                    :size="item.size || 'small'"
                    @keyup.enter.native="sysHandleSearch"
                    clearable
                    :disabled="item.inputStatus === 'disable'"
                    :maxlength="Number(item.maxlength)"
                    show-word-limit
                    :autosize="{ minRows: item.minRows, maxRows: item.maxRows}"
                  ></el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </div>
        <div class="row-button">
          <el-button size="small" type="primary" icon="el-icon-search" class="search" @click="sysHandleSearch">搜索</el-button>
          <el-button v-if="configForm.isReset"  size="small" type="" plain icon="el-icon-magic-stick" class="more" @click="sysHandleResetForm">重置</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data';

export default {
  name: 'searchFrom',
  data () {
    return {
      options: regionData,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      // searchFormValue: {},
      clonesearchFormValue: {},
      flowStatusList: [], // 审批状态
      week: 1,
      formList: []
    };
  },
  props: {
    configForm: {
      type: Object,
      default: () => {
        const parmas = {
          // 表单配置
          formList: [],
          // 表单按钮
          isReset: false
        };
        return parmas;
      }
    },
    // 表单值
    searchFormValue: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    configForm: {
      handler() {
        this.formList = this.configForm.formList;
      },
      deep: true
    },
    'configForm.formList': {
      handler() {
        this.formList = this.configForm.formList;
      },
      deep: true
    }
  },
  created() {
    this.flowStatusList = this.$store.state.constant.flowStatusList;
  },
  mounted () {
    this.formList = this.configForm.formList;
    this.clonesearchFormValue = this.$clone(this.searchFormValue);
  },
  methods: {
    // 重置
    sysHandleResetForm () {
      this.$refs.searchFormValue.resetFields();
      this.searchEvent({eventName: 'clear'});
    },
    // 搜索
    sysHandleSearch () {
      this.searchEvent({eventName: 'search'});
    },
    searchEvent(params = {}) {
      this.$emit('searchEvent', params);
    },
  // 选择周之后
    weekChange(item, val) {
      if (val) {
        this.week = this.getWeekInMonth(new Date(val));
        this.$set(this.searchFormValue, 'week', this.week);
        this.searchEvent({eventName: 'search'});
      }
    },
    // 根据日期判断是月的第几周
    getWeekInMonth(t, item) {
      if (t === undefined || t === '' || t == null) {
        t = new Date();
      } else {
        const _t = new Date();
        _t.setYear(t.getFullYear());
        _t.setMonth(t.getMonth());
        _t.setDate(t.getDate());
        const date = _t.getDate(); // 给定的日期是几号
        _t.setDate(1);
        const d = _t.getDay(); // 1. 得到当前的1号是星期几。
        let fisrtWeekend = d;
        if (d === 0) {
          fisrtWeekend = 1;
          // 1号就是星期天
        } else {
          fisrtWeekend = 7 - d + 1; // 第一周的周未是几号
        }
        if (date <= fisrtWeekend) {
          return 1;
        } else {
          return 1 + Math.ceil((date - fisrtWeekend) / 7);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.operationFormWrap {
  width: 100%;
}
.form-group{
  width: 100%;
  display: flex;
  align-items: center;
  .row-form{
    flex: auto;
  }
  .row-button{
    // width: 120px;
    padding-left: 10px;
    display: flex;
    flex-direction: column-reverse;
    text-align: right;
  }
}
</style>
