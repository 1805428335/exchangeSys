<template>
  <div class="operationFormWrap">
    <el-form ref="projectForm" label-position="left" :model="projectForm" :rules="rule"
             label-width="120px" class="demo-ruleForm" :disabled="pageDisabled" v-if="projectForm && isResetRule">
      <el-row :gutter="24">
        <template v-for="(item,index) in formList">
          <el-col
            v-if="item.inputStatus !=='hide'"
            :class="formClass(item)"
            :key="index" :span="item.span">
            <!-- 插槽 -->
            <template v-if="item.formType==='slot'">
              <slot :name="'form-' + item.prop" :scope="projectForm" :item="item"></slot>
            </template>
            <!-- 分段提示 -->
            <div class="divisionTitle" v-else-if="item.formType==='divisionTitle'">
              <span class="midFont set">{{item.label}}</span>
            </div>
            <!-- 标题显示 -->
            <g-edit-title  v-else-if="item.formType==='title'" :title="item.label" style="border:0;">
            </g-edit-title>
            <!-- 其他 -->
            <el-form-item v-else :label="item.label" :prop="item.prop"  :title="item.label">
              <!-- text -->
              <span v-if="item.formType==='text'" class="midFont grey">{{projectForm[item.prop] | systemFilters(item)}}</span>
              <!--// 文本输入框-->
              <el-input
                v-if="item.formType==='input'"
                v-model.trim="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :maxlength="Number(item.maxlength)" show-word-limit>
              </el-input>
              <!--// 下拉选择框-->
              <el-select
                v-if="item.formType==='select'"
                v-model.trim="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :multiple='item.multiple || false'
                :collapse-tags='item.collapseTags || false'
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :filterable="item.filterable || true"
                style="width:100%"
                @focus="handleFocus(item, 'focus')"
                @change="handleChange(item, $event)">
                <el-option
                  v-for="(child,i) in item.selectList" :key="i"
                    :label="child[item.nameCode]"
                    :value="child[item.valueCode]">
                </el-option>
              </el-select>
              <!-- 数据字典下拉选择框 -->
              <el-select
                v-if="item.formType==='dicSelect'"
                v-model.trim="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :disabled="item.inputStatus === 'disable'"
                :filterable="item.filterable || true"
                :multiple='item.multiple || false'
                :collapse-tags='item.collapseTags || false'
                :clearable="item.clearable === undefined ? true : item.clearable"
                style="width:100%"
                @focus="handleFocus(item, 'focus')"
                @change="handleChange(item, $event)">
                <el-option
                  v-for="(child,i) in item.selectList" :key="i"
                  :label="child.isTranslate ? child.dataName : child.dataName"
                  :value="item.isNumber ? Number(child.dataCode) : child.dataCode">
                </el-option>
              </el-select>
              <!--// Cascader 级联选择器-->
              <el-cascader
                v-if="item.formType==='city'"
                v-model="projectForm[item.prop]" ::placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                style="width: 100%" @change="addressChange"
                :options="options"
                :props="cityAreaProps">
              </el-cascader>
              <!--//数字输入框-->
              <el-input
                v-if="item.formType==='number'"
                type="number"
                v-model="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :max="item.max" :min="item.min"
                :maxlength="item.maxlength"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)"
                show-word-limit>
              </el-input>
              <el-number
                v-if="item.formType==='elNumber'"
                v-model.trim="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :maxlength="Number(item.maxlength)"
                :precision="Number(item.precision)"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)"
                :min="item.min" :max="item.max || 99999999999" show-word-limit>
              </el-number>
              <!--// 日期  禁止选择部分日期待定-->
              <el-date-picker
                v-if="item.formType==='date' || item.formType==='time'"
                v-model="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :picker-options="item.pickerOptions ? pickerOptions : item.beforePickerOptions ? beforePickerOptions : ''"
                :type="item.formType==='date' ? 'date' : 'datetime'"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;">
              </el-date-picker>
              <!--年份-->
              <el-date-picker
                v-if="item.formType==='year'"
                v-model="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :picker-options="item.pickerOptions && pickerOptions"
                type="year" @change="handleChange(item, $event)"
                @focus="handleFocus(item)"
                value-format="yyyy" style="width: 100%;">
              </el-date-picker>
              <!-- 季度 -->
              <!--月份-->
              <el-date-picker
                v-if="item.formType==='month'"
                v-model="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :picker-options="item.pickerOptions && pickerOptions"
                type="month" @change="handleChange(item, $event)"
                @focus="handleFocus(item)"
                value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
              <!--周-->
              <el-date-picker
                v-if="item.formType==='week'"
                v-model="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :format="'yyyy' + '年' + 'MM' + '第' + week + '周'"
                @focus="handleweekFocus(item)"
                @change="weekChange(item, $event)"
                value-format="yyyy-MM-dd"
                class="inp"
                type="week"
                :picker-options="{'firstDayOfWeek': 1}">
              </el-date-picker>
              <!--// radio 单选-->
              <el-radio-group
                v-if="item.formType==='radio'"
                v-model.trim="projectForm[item.prop]"
                :size="item.size || 'small'" :disabled="item.inputStatus === 'disable'">
                <el-radio
                  v-for="(child,i) in item.selectList" :key="i"
                  :label="child[item.value]">
                  {{child[item.label]}}
                </el-radio>
              </el-radio-group>
              <!--switch滑块-->
              <el-switch
                v-if="item.formType==='switch'"
                v-model.trim="projectForm[item.prop]"
                :size="item.size || 'small'" :disabled="item.inputStatus === 'disable'"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)">
              </el-switch>
              <!--基础checkbox单选-->
              <el-checkbox
                v-if="item.formType==='checkbox'"
                v-model.trim="projectForm[item.prop]"
                :size="item.size || 'small'" :disabled="item.inputStatus === 'disable'"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)">
              </el-checkbox>
              <!--// 基础checkbox多选-->
              <el-checkbox-group
                v-if="item.formType==='checkboxGroup'"
                v-model.trim="projectForm[item.prop]"
                :size="item.size || 'small'" :disabled="item.inputStatus === 'disable'"
                @focus="handleFocus(item)"
                @change="handleChange(item, $event)">
                <el-checkbox
                  v-for="(child,i) in item.selectList" :key="i"
                  :label="child[item.value]">
                  {{child[item.label]}}
                </el-checkbox>
              </el-checkbox-group>
              <!--附件上传-->
              <file-upload
                v-if="item.formType==='upload'"
                :attachment.sync="projectForm[item.prop]"
                :isPhoto="item.isPhoto"
                @identify='identify(item, $event)'
                :arrayNumber="item.arrayNumber"
                :isIdentify="item.isIdentify || false"
                :flowStatus="item.inputStatus === 'disable' || pageDisabled" :limit="item.limit || 10"
                :multiple="item.multiple">
              </file-upload>
              <!-- 无翻译附件 -->
              <translateFileUpload
                v-if="item.formType==='translateFileUpload'"
                :attachment.sync="projectForm[item.prop]"
                :isPhoto="item.isPhoto"
                @identify='identify(item, $event)'
                :arrayNumber="item.arrayNumber"
                :isIdentify="item.isIdentify || false"
                :flowStatus="item.inputStatus === 'disable' || pageDisabled" :limit="item.limit || 10"
                :multiple="item.multiple">
              </translateFileUpload>
              <!--textarea-->
              <el-input
                v-if="item.formType==='textarea'"
                type="textarea"
                v-model.trim="projectForm[item.prop]" :placeholder="item.placeholder ? item.placeholder : ''"
                :size="item.size || 'small'"
                :clearable="item.clearable === undefined ? true : item.clearable" :disabled="item.inputStatus === 'disable'"
                :maxlength="Number(item.maxlength)" show-word-limit
                :autosize="{ minRows: item.minRows, maxRows: item.maxRows}">
              </el-input>
              <!-- 州/国家/城市 -->
              <el-cascader
                  v-if="item.formType==='area'"
                  style="width:100%" :placeholder="item.placeholder ? item.placeholder : ''"
                  v-model="projectForm[item.prop]"
                  :disabled="item.inputStatus === 'disable'"
                  :clearable="item.clearable === undefined ? true : item.clearable"
                  :size="item.size || 'small'"
                  :options="area"
                  :props="areaProps"
                  @change="handleChangeOptions">
              </el-cascader>
              <!-- 选择员工 -->
              <div class="slot-input" v-if="item.formType==='userRadio'">
                <el-input
                    v-model.trim="projectForm[item.prop]"
                    :size="item.size || 'small'"
                    clearable :disabled="item.inputStatus === 'disable'" readonly>
                    <template slot="suffix" v-if="item.inputStatus !== 'disable' && !pageDisabled">
                        <i v-if="projectForm[item.prop]" class="slot-close el-icon-circle-close" @click="handleClearUser(item)"></i>
                        <i class="multiple-choice-icon iconfont icon-menu" @click="handleSelectUser(item)"></i>
                    </template>
                </el-input>
              </div>
            </el-form-item>
            <div v-if="item.titleTips" class="titleTips">
              {{item.titleTips}}
            </div>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 员工 -->
    <g-dialog v-if="userFlag" :dialogConfig="userDialogConfig" :isVisible.sync="userFlag">
        <organizationUserTable slot="body" slot-scope="{height}" :dialogHeight="height"
        :selectedUsers="projectForm[userConfig[currentConfig.prop].key] || []"
        :choice="userConfig[currentConfig.prop].formType === 'userRadio' ? 'isRadio' : 'isCheckbox'"
        :close.sync="userFlag" @selectUser="getUser" v-if="userFlag"></organizationUserTable>
    </g-dialog>
  </div>
</template>

<script>
  import {provinceAndCityData, regionData} from 'element-china-area-data';
  import areaArr from 'components/basicComponents/JS/area/area';

  export default {
    name: 'editForm',
    components: {
      fileUpload (resolve) {
        require(['../upload/fileUpload.vue'], resolve);
      },
      // 无翻译
      translateFileUpload (resolve) {
        require(['../upload/translateFileUpload.vue'], resolve);
      },
      organizationUserTable(resolve) {
          require(['components/basicComponents/userDialog/organizationUserTable.vue'], resolve);
      }
    },
    data () {
      return {
        options: regionData,
        area: areaArr,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now();
          }
        },
        beforePickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now();
          }
        },
        formList: [],
        rules: {},
        // projectForm: {},
        pageDisabled: false,
        oldFormData: {},
        areaStep: 0,
        areaProps: {
          value: 'id',
          label: 'placename'
        },
        cityAreaProps: {
          value: 'value',
          label: 'label'
        },
        dialogConfig: {
          title: '请选择项目',
          appendBody: true,
          center: true,
          top: '80px',
          width: '80%',
          span: '0.7'
        },
        porjectFlag: false,
        projectConfig: '',
        projectIdList: [],
        usePlaceConfig: '',
        week: 1,
        // 选择员工
        userFlag: false,
        userDialogConfig: {
          title: '选择员工',
          appendBody: false,
          center: true,
          top: '80px',
          width: '80%',
          span: '0.7'
        },
        userConfig: '',
        rule: {},
        currentConfig: {}, // 点击打开弹出框的当前行配置
        weekConfig: {},
        isResetRule: true,
        areaCityStep: 0
      };
    },
    props: {
      tableConfig: {
            type: Object,
            default: () => {
              const params = {
                  // 表单配置
                  formList: []
              };
              return params;
            }
      },
      // 当前表单状态
      type: {
        type: String,
        default: 'add'
      },
      // 表单值
      projectForm: {
        type: Object,
        default: () => {}
      },
      customRules: {
        type: Object,
        default: () => {}
      },
      isTranslate: {
        default: true
      }
    },
    watch: {
      tableConfig: {
        handler () {
          const tableConfig = JSON.parse(JSON.stringify(this.tableConfig));
          this.pageDisabled = this.type === 'info';
          let state = 'pleaseEnter';
          this.userConfig = {};
          this.projectConfig = {};
          tableConfig.formList.forEach(item => {
            if (item.formType === 'userRadio') {
              this.userConfig[item.prop] = this.$clone(item);
            }
            if (item.isRule) {
              this.rules[item.prop] = [];
              if (item.formType === 'dicSelect' || item.formType === 'select') {
                state = '请选择';
              } else {
                state = '请输入';
              }
              this.rules[item.prop].push({
                message: item.rulesMessage ? item.rulesMessage : `${state}${this.item.label}`,
                trigger: item.formType === 'input' ? 'blur' : 'change',
                required: true
              });
            }
          });
          this.formList = tableConfig.formList;
          this.rule = {...this.rules, ...this.customRules};
        },
        immediate: true
      },
      'tableConfig.formList': {
        handler() {
          let state = 'pleaseSelect';
          this.tableConfig.formList.forEach(item => {
            if (item.formType === 'week') {
              this.weekConfig = item;
            }
            if (item.isRule) {
              this.rules[item.prop] = [];
              if (item.formType === 'week') {
                this.weekConfig = item;
              }
              if (item.formType === 'input' || item.formType === 'number' || item.formType === 'elNumber' || item.formType === 'textarea') {
                state = '请输入';
              } else {
                state = '请选择';
              }
              this.rules[item.prop].push({
                message: item.rulesMessage ? item.rulesMessage : `${state}${this.item.label}`,
                trigger: item.formType === 'input' ? 'blur' : 'change',
                required: true
              });
            }
          });
          this.formList = this.tableConfig.formList;
          this.rule = {...this.rules, ...this.customRules};
        },
        immediate: true
      }
    },
    mounted() {
      this.oldFormData = this.$clone(this.projectForm);
      this.oldRelationForm = this.$clone(this.projectForm);
    },
    methods: {
      // 表单状态class
      formClass (item) {
        if (item.isRule && (item.inputStatus === 'disable' || this.pageDisabled)) {
          return 'is-required edit-form-disable';
        } else if (item.inputStatus === 'disable' || this.pageDisabled) {
          return 'edit-form-disable';
        } else if (item.isRule) {
          return 'is-required';
        } else {
          return '';
        }
      },
      resetRules() {
        this.isResetRule = false;
        const tableConfig = JSON.parse(JSON.stringify(this.tableConfig));
        this.pageDisabled = this.type === 'info';
        let state = 'pleaseSelect';
        this.userConfig = {};
        this.projectConfig = {};
        tableConfig.formList.forEach(item => {
          if (item.formType === 'week') {
            this.weekConfig = item;
          }
          if (item.formType === 'userRadio') {
            this.userConfig[item.prop] = this.$clone(item);
          }
          if (item.isRule) {
            this.rules[item.prop] = [];
            if (item.formType === 'input' || item.formType === 'number' || item.formType === 'elNumber' || item.formType === 'textarea') {
                state = '请输入';
              } else {
                state = '请选择';
              }
            this.rules[item.prop].push({
              message: item.rulesMessage ? item.rulesMessage : `${state}${this.item.label}`,
              trigger: item.formType === 'input' ? 'blur' : 'change',
              required: true
            });
          }
        });
        this.formList = tableConfig.formList;
        this.rule = {...this.rules, ...this.customRules};
        this.$refs.projectForm.clearValidate();
        this.isResetRule = true;
      },
        // 切换设备所在地
      handleChangeOptions(val) {
        this.areaStep = 0;
        if (this.projectForm.areas && this.projectForm.areas.length === 0) return;
        const keysList = ['continent', 'country', 'province', 'city', 'area'];
        this.getArea(this.area, keysList);
      },
      // 获取值
      getArea(arr, keysList) {
        const key = keysList[this.areaStep];
        for (const i in arr) {
          const item = arr[i];
          if (item.id === this.projectForm.areas[this.areaStep]) {
            this.projectForm[key] = `${item.placename}-${item.id}-${item.code}-${item.lev}`;
            if (item.children && item.children.length) {
              this.areaStep++;
              this.getArea(item.children, keysList);
            }
          }
        }
      },
      // 清除表单的值
      resetForm () {
        this.$refs.projectForm.resetFields();
      },
      // 选中之前
      handleFocus(item, type) {
        this.$set(this.oldRelationForm, item.prop, this.projectForm[item.prop]);
      },
      // 选中
      handleChange (item, event) {
        const params = {
          paramsConfig: item,
          selectList: event,
          oldRelationForm: this.$clone(this.oldRelationForm)
        };
        this.$emit('editFormEvent', {eventName: 'relationTable', params});
      },
      // 附件自动识别
      identify(item, event) {
        const params = {
          paramsConfig: item,
          identifyUrl: event
        };
        this.$emit('editFormEvent', {eventName: 'identify', params});
      },
      // 判断关联字段不能为空且提示 传入数组arr对象  value（关联字段数据库字段，不含表名） 键 lable （关联字段显示名称）值
      jsJudgeEmpty (arr) {
        let status = true;
        for (const i in arr) {
          const item = arr[i];
          if (!this.projectForm[item.value]) {
            const placeholder = `${item.lable} 不能为空`;
            this.$message.error(placeholder);
            return status = false;
          }
        }
        return status;
      },
      // 数据匹配 多用于弹出框 多个数据赋值 liek = value obj需要的数据
      jsDataListMatching (arr, obj) {
        for (const i in arr) {
          const item = arr[i];
          this.projectForm[item.liek] = obj[item.value];
        }
      },
      // 下拉选择框数据匹配 item 字段渲染参数(固定) val选中的值(固定)  assignment 需要赋值的字段(不含表名)
      jsDataMatching (item, val, assignment) {
        const key = item.selectList.findIndex((v) => v.id === val);
        if (key >= 0) {
          this.projectForm[assignment] = item.selectList[key].lable;
        } else {
          this.projectForm[assignment] = '';
        }
      },
      // 清空指定字段数据 传入数组arr: 需要清空的字段(不含表名)
      jsSetWipeData (arr) {
        arr.forEach((item) => {
          this.projectForm[item] = '';
        });
      },
      // 不验证获取值
      getForm() {
        return JSON.parse(JSON.stringify(this.projectForm));
      },
      // 得到form 表单值
      getValidateForm (callback) {
        this.$refs.projectForm.validate((valid) => {
          if (valid) {
            callback && callback();
          } else {
            const errorTime = setTimeout(() => {
              const isError = document.getElementsByClassName('is-error');
              if (isError[0].querySelector('input')) {
                isError[0].querySelector('input').focus();
              } else if (isError[0].querySelector('textarea')) {
                isError[0].querySelector('textarea').focus();
              }
              clearTimeout(errorTime);
            }, 100);
          }
        });
      },
      // 选择城市地区
      addressChange (arr) {
        this.areaCityStep = 0;
        if (this.projectForm.areas && this.projectForm.areas.length === 0) return;
        const keysList = ['province', 'city', 'area'];
        this.getCityArea(this.options, keysList);
      },
      // 获取值
      getCityArea(arr, keysList) {
        const key = keysList[this.areaCityStep];
        for (const i in arr) {
          const item = arr[i];
          if (item.value === this.projectForm.areas[this.areaCityStep]) {
            this.projectForm[key] = `${item.label}-${item.value}`;
            if (item.children && item.children.length) {
              this.areaCityStep++;
              this.getCityArea(item.children, keysList);
            }
          }
        }
      },
      // 选择周
      handleweekFocus(item) {
        this.$set(this.oldRelationForm, item.prop, this.projectForm[item.prop]);
      },
      // 选择周之后
      weekChange(item, val) {
        if (val) {
          console.log(val);
          this.week = this.getWeekInMonth(new Date(val));
          this.$set(this.projectForm, 'week', this.week);
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
          console.log(date, fisrtWeekend);
          if (date <= fisrtWeekend) {
            return 1;
          } else {
            return 1 + Math.ceil((date - fisrtWeekend) / 7);
          }
        }
      },
      // ------------------------ 员工单选 -----------------
      handleClearUser(item) {
        this.$emit('editFormEvent', {eventName: 'clearUser', params: item});
      },
      // 选择员工
      handleSelectUser(item) {
        this.currentConfig = item;
        this.userFlag = true;
      },
      // 获取员工
      getUser(arr) {
        const params = {
          paramsConfig: this.userConfig[this.currentConfig.prop],
          selectList: arr
        };
        this.$emit('editFormEvent', {eventName: 'user', params});
        this.userFlag = false;
      }
    }
  };
</script>

<style scoped lang="scss">
.operationFormWrap {
  width: 100%;
}
.divisionTitle{
  line-height: 40px;
}
.titleTips{
  margin-left: 132px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #acabab;
  position: relative;
  top: -15px;
}
.jsDialog {
  padding: 10px;
  min-height: 400px;
  .footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 14px;
  }
}
.slot-input {
  display: flex;
  justify-content: space-between;
  .assginer-items {
    flex: 1;
    /deep/ .el-tag--mini {
      margin-right: 8px;
    }
  }
  .set {
    width: 16px;
  }
}
</style>
