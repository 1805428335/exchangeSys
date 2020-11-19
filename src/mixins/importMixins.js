import {closeRoute} from 'mixins/index';
import Auth from 'util/auth';

export const importPage = {
    mixins: [closeRoute],
    data () {
        return {
            // 导入明细
            dialogImportFlag: false,
            subImportTable: '',
            dialogConfig: {
                title: this.$t('dialog.importDetail'),
                appendBody: false,
                center: true,
                top: '50px',
                width: '80%',
                span: '0.75'
            },
            deleteImportList: [],
            that: ''
        };
    },
    created () {
        this.that = this;
    },
    methods: {
        // -------------------------------------------- 导入子表 ----------------------------------------
        // 子表事件按钮事件传出
        dialogEvent(eventName) {
            if (eventName === 'close') {
                this.dialogImportFlag = false;
            }
            if (eventName === 'save') {
                console.log('save');
                this.sysHandleImportSave(this.subImportTable.subTableName); // 批量删除
            }
            if (eventName === 'delete') {
                this.sysHandleImportDeleta(this.subImportTable.subTableName); // 批量删除
                console.log('delete');
            }
        },
        // 保存导入明细数据
        sysHandleImportSave(tableName) {
            this.$refs.importTable.validateTableData((importDetails) => {
                const tableData = this.pageConfig.subTableConfig[tableName].tableData;
                this.$set(this.pageConfig.subTableConfig[tableName], 'tableData', tableData.concat(importDetails));
                this.dialogImportFlag = false;
                // 子表长度变化后的数值计算回调
                this.deletTableCallback && this.deletTableCallback(tableName);
            });
        },
        // 批量删除
        sysHandleImportDeleta(tableName) {
            this.handleDeleteImportSubTable(this.deleteImportList, this.$t(`${this.translateName}.${tableName}`), tableName);
        },
        // 批量删除操作
        handleDeleteImportSubTable(arr, keyValue, tableName) {
            if (arr && arr.length > 0) {
                const deletMessage = this.$t('tips.deleteDetailedTips').replace('{keyValue}', keyValue);
                const deleteDetailsMessage = this.$t('tips.deleteDetailsApiTips').replace('{keyValue}', keyValue);
                const messageTips = deletMessage;
                this.$confirm(messageTips, `${this.$t('button.batchDeletion')}${keyValue}`, {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取 消',
                    type: 'warning'
                }).then(() => {
                    arr.forEach(v => {
                        this.subImportTable.tableData.splice(this.subImportTable.tableData.indexOf(v), 1);
                    });
                }).catch(e => {});
            } else {
                // 请选择明细清单
                this.$message.error(this.$t('tips.pleaseSelectDetailed'));
            }
        },
        // 子表操作事件
        editImportTableEvent({eventName, params}) {
            if (eventName === 'tableSelect') { // 下拉选择
                this.handleImportTableSelect(params);
            }
            if (eventName === 'operateDataEvent') { // 数值计算
                this.handleImportCalculation(params);
            }
            if (eventName === 'handleTable') { // 表格文本操作事件
                params.item && params.item.fn && params.item.fn(params);
            }
        },
        // 子表下拉选择赋值
        handleImportTableSelect({item, row, event, subTable, rowIndex}) {
            item.relationList.forEach(res => {
                let index = 0;
                if (item.formType === 'select') {
                    index = item.selectList.findIndex(v => v[item.valueCode] === event);
                } else {
                    index = item.selectList.findIndex(v => v.dataCode === event);
                }
                this.$set(this.subImportTable.tableData[rowIndex], res.receive, item.selectList[index][res.value]);
            });
        },
        // 数值计算
        handleImportCalculation(params) {
            console.log(params);
        }
    }
};
