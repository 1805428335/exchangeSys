<!--
 * @Author: your name
 * @Date: 2020-11-20 10:13:05
 * @LastEditTime: 2020-11-20 10:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\lockUpManagement\preOrderItems\preOrderItemsEdit.vue
-->
<template>
    <div>
        <edit-page @editEvent="editEvent" v-loading="loading">
            <div slot="editPage">
                <g-edit-form
                    ref="editForm"
                    v-if="pageConfigLoading"
                    :type="type"
                    :tableConfig="pageConfig.mainFormConfig"
                    :projectForm="pageConfig.projectForm"
                    @editFormEvent="editFormEvent">
                </g-edit-form>
            </div>
        </edit-page>
    </div>
</template>
<script>
import Page from './configEdit.js';
import {editPage} from 'mixins/editMixins';

export default {
    name: 'preOrderItemsEdit',
    mixins: [editPage],
    data () {
        return {
            page: new Page(),
            projectForm: {
                code: '',
                code1: '',
                code2: '',
                code3: '',
                code4: '',
                code5: '',
                code6: '',
                code7: '',
                code8: '',
                code9: '',
                code10: '',
                code11: ''
            }
        };
    },
    props: {
        processParmas: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        // 获取info数据
        async _getInfoData(id = 0) {
            await this.handleGetInfoData(id, this.page.PageConfig.processParmas.infoUrl);
        },
        // 保存
        handleSave (isProcess = false) {
            this.$refs.editForm.getValidateForm(() => {
                const data = this.$clone(this.pageConfig.projectForm);
                this.handleSaveData(data, isProcess);
            });
        }
    }
};
</script>
