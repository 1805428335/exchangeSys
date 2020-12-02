<template>
  <el-table
    ref="organizationTable"
    :data="tableData"
    :height="offsetHeight"
    style="width: 100%;"
    row-key="id"
    size="small"
    highlight-current-row
    default-expand-all
    @row-click="handleCurrentChange"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <template slot="empty">
      <no-data>
      </no-data>
    </template>
    <el-table-column prop="orgAttributeCode"
     label="组织机构" min-width="180" show-overflow-tooltip>
      <template slot-scope="scope">
        <el-checkbox
        @change="handleCurrentChange(scope.row)"
         v-if="isRadio || isCheckBox" v-model="scope.row.checked"
         :disabled="scope.row.disabled" style='margin-right:8px;'>
        </el-checkbox>
        <i :class="scope.row.orgAttributeCode | iconFilter"></i>
        <span>{{ scope.row.orgName }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        orgList: [],
        testData: []
      };
    },
    props: {
      offsetHeight: {
        default: 400
      },
      isRadio: {
        default: false
      },
      isCheckBox: {
        default: false
      },
      selectOrgId: {
        default: ''
      },
      isShowDepartName: {
        default: true,
        type: Boolean
      }
    },
    created () {
      this._getOrgTree();
    },
    filters: {
      iconFilter (val) {
        if (val === '01') return 'iconfont icon-gongsiyewu color-gongsiyewu';
        if (val === '02') return 'iconfont icon-home color-home';
        if (val === '03') return 'iconfont icon-bumen color-bumen';
        if (val === '04') return 'iconfont icon-bumen color-bumen';
      }
    },
    methods: {
      // 获取组织机构
      _getOrgTree () {
        this.$store.dispatch('publicApi/getEffectiveOrgTree').then(res => {
          if (res.results.length === 0) return;
          if (!this.isShowDepartName) {
            this.filterOgr(res.results);
          }
          this.tableData = res.results;
          this.$refs.organizationTable.setCurrentRow(this.tableData[0]);
          this.$emit('currentRow', this.tableData[0]);// 进页面首次点击
          if (this.isRadio) {
            this.$nextTick(() => {
              this.setCheckTree(res.results);
            });
          }
        });
      },
      filterOgr (targetList) { // 遍历后台传来的路由字符串，转换为组件对象
        const filterList = targetList.filter(v => {
          if (v.children && v.children.length) {
            v.children = this.filterOgr(v.children);
          }
          return v.orgAttributeCode !== '04';
        });
        return filterList;
      },
      setCheckTree (arr) {
        for (const i in arr) {
          const item = arr[i];
          if (this.selectOrgId === item.id) {
            this.$set(item, 'checked', true);
          } else {
            this.$set(item, 'checked', false);
          }
          if (item.children && item.children.length) {
            this.setCheckTree(item.children);
          }
        }
      },
      // 点击当前行
      handleCurrentChange (val) {
        // this.$emit('update:currentRow', val);
        this.$emit('currentRow', val);
        if (this.isRadio) {
          this.orgList = [];
          if (val.checked) {
            this.$set(val, 'checked', false);
          } else {
            this.checkRadio(this.tableData);
            this.$set(val, 'checked', true);
            this.orgList.push(val);
          }
        }
      },
      // 设置勾选
      checkRadio (arr) {
        for (const i in arr) {
          const item = arr[i];
          this.$set(item, 'checked', false);
          if (item.children && item.children.length) {
            this.checkRadio(item.children);
          }
        }
      },
      // 获取 选择得组织机构
      getOrgList () {
        return this.orgList;
      }
    }
  };
</script>
