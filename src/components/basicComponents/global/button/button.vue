<template>
  <!-- noAuth: 对按钮进行权限控制
    buttonName: '', //文字
      size: 'small', //尺寸
      type: 'primary', //类型
      plain: false, //是否朴素按钮
      disabled: false, //是否禁用状态
      icon: '', //图标类名
      class: '', //类名
      style: '', //样式
      fnName: '', //函数名称 -->
  <div>
    <el-button
        v-if="deleteNum > 0"
        size="small"
        type="primary"
        icon="el-icon-delete"
        class="urgent"
        v-fast-click
        @click="handleFn('sysHandleDeletaBatch')">
        <span class="midFont set">(已选中{{deleteNum}}行)</span>
    </el-button>
    <template v-for="(parameter, index) in buttonListOpera">
      <template v-if="!parameter.slot">
        <el-button
          :key="index"
          :name="parameter.code"
          :size="parameter.size || buttonConfig.size"
          :type="parameter.type || buttonConfig.type"
          :plain="parameter.plain || buttonConfig.plain"
          :disabled="parameter.disabled"
          :icon="parameter.icon || buttonConfig.icon"
          :class="parameter.class || buttonConfig.class"
          :style="parameter.style || buttonConfig.style"
          v-fast-click
          @click="handleFn(parameter)">
          {{parameter.name}}
        </el-button>
      </template>
      <template v-else>
        <slot
         :name="`button-${parameter.code}`" :parameter="parameter" :buttonConfig='buttonConfig'>
         </slot>
      </template>
    </template>
    <slot>
    </slot>
  </div>
</template>
<script>
  export default {
    data () {
        const buttonConfig = {
            has: '',
            show: true,
            size: 'small',
            type: 'primary',
            plain: false,
            disabled: false,
            icon: '',
            class: '',
            style: '',
            isDelete: false,
            code: 'sysHandleAdd'
        };
        return {
            buttonConfig,
            deleteNum: 0,
            // 上传
            sysHandleUpload: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-upload2',
                class: 'more',
                name: '上 传',
                code: 'sysHandleUpload',
                slot: false
            },
            // 添加
            sysHandleAdd: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-plus',
                name: '添 加',
                code: 'sysHandleAdd',
                slot: false
            },
            // 导出
            sysHandleExport: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-download',
                class: 'more',
                name: '导 出',
                code: 'sysHandleExport',
                slot: false
            },
            // 导入
            sysHandleImport: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-folder-opened',
                class: 'more',
                name: '导 入',
                code: 'sysHandleImport',
                slot: false
            },
            // 下载模板
            sysHandleDownloadTemplate: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-document',
                class: 'more',
                name: '下载模板',
                code: 'sysHandleDownloadTemplate',
                slot: false
            },
            // 提交流程
            sysHandleStartProcess: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-upload2',
                class: 'urgent',
                name: '提交流程',
                code: 'sysHandleStartProcess',
                slot: false
            },
            // 流程监控
            sysHandleMonitorProcess: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-aim',
                class: 'urgent',
                name: '流程监控',
                code: 'sysHandleMonitorProcess',
                slot: false
            },
            // 打印
            sysHandlePrint: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-printer',
                class: 'other',
                name: '打 印',
                code: 'sysHandlePrint',
                slot: false
            },
            // 打印标签
            sysHandlePrintLabel: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-printer',
                class: 'other',
                name: '打印标签',
                code: 'sysHandlePrintLabel',
                slot: false
            },
            // 取 消/关闭
            sysCancelSave: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-circle-close',
                class: 'urgent',
                name: '取 消',
                code: 'sysCancelSave',
                slot: false
            },
            // 全部删除
            sysHandleDeleteAll: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-delete',
                isDelete: true,
                class: 'urgent',
                name: '全部删除',
                code: 'sysHandleDeleteAll',
                slot: false
            },
            // 批量删除
            sysHandleDeletaBatch: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-delete',
                isDelete: true,
                class: 'urgent',
                name: '批量删除',
                code: 'sysHandleDeletaBatch',
                slot: false
            },
            // 添加明细
            sysHandleDeletaAdd: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-plus',
                name: '添加明细',
                code: 'sysHandleDeletaAdd',
                slot: false
            },
            // 选择明细
            sysHandleSelectDetail: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-plus',
                name: '选择明细',
                code: 'sysHandleSelectDetail',
                slot: false
            },
            // 导出明细
            sysHandleExportDetail: {
                size: 'small',
                type: '',
                plain: false,
                icon: 'el-icon-download',
                name: '导出明细',
                code: 'sysHandleExportDetail',
                slot: false
            },
            // 保存
            sysSaveData: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-circle-check',
                class: '',
                name: '保 存',
                code: 'sysSaveData',
                slot: false
            },
            // 重置
            sysHandleResetForm: {
                size: 'small',
                type: 'primary',
                plain: false,
                icon: 'el-icon-magic-stick',
                class: 'more',
                name: '重 置',
                code: 'sysHandleResetForm',
                slot: false
            },
            // 搜索
            sysHandleSearch: {
                size: 'small',
                type: '',
                plain: true,
                icon: 'el-icon-search',
                class: 'search',
                name: '搜 索',
                code: 'sysHandleSearch',
                slot: false
            },
            buttonList: [],
            buttonListOpera: [],
            // 判断页面类型是什么
            type: 'add'
        };
    },
    props: {
      operationButtons: {
        default: () => [],
        type: Array
      },
      // 需要删除的数据个数
      deleteLength: {
        type: Number,
        default: 0
      }
    },
    watch: {
      deleteLength: {
        handler () {
          this.deleteNum = JSON.parse(JSON.stringify(this.deleteLength));
        },
        immediate: true
      },
      operationButtons: {
        handler () {
          this.buttonListOpera = [];
          this.type = this.$route.params.type;
          this.buttonList = JSON.parse(JSON.stringify(this.operationButtons));
          this.buttonList.forEach(item => {
            //   是否自定义按钮
            if (!item.isCustom) {
                if (this.type === 'info') {
                    item.disabled = true;
                } else {
                  this[item.code].disabled = item.disabled;
                }
                this[item.code].authCode = item.authCode;
                this[item.code].noAuth = item.noAuth;
                this[item.code].subTableCode = item.subTableCode;
                this[item.code].name = item.name ? item.name : this[item.code].name;
                this[item.code].slot = item.slot || false;
                this.buttonListOpera.push(this[item.code]);
            } else {
              this.buttonListOpera.push(item);
            }
          });
        },
        immediate: true
      }
    },
    methods: {
      handleFn (parameter) {
        this.$emit('butFnName', parameter.code);
        this.$emit('editTableBut', parameter);
      },
      disabledStatus (disabled) {
        if (disabled) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>
