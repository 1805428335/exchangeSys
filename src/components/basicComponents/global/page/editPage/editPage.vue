
<!--
 * @Author: your name
 * @Date: 2020-07-13 15:00:46
 * @LastEditTime: 2020-11-19 17:14:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_unit\src\views\partyA\partyAInformation\partyAInformationEdit.vue
-->
<template>
    <div class='page-edit'>
        <div class='roleCons'>
            <!-- 企业基本信息 -->
            <g-edit-title
            :title="isProcess ? translateName : `${translateName}${typeName}`">
                <div>
                    <el-button :disabled="!pageDisabled" size="small" type="primary"
                    icon="el-icon-circle-check" @click="handleSave" v-fast-click>保 存</el-button>
                    <el-button :disabled="!pageDisabled" size="small" type="primary"
                    icon="el-icon-magic-stick" class="more" @click="handleReset" v-fast-click>重 置</el-button>
                    <el-button class="urgent" type="primary"
                    icon="el-icon-circle-close" size="small" @click="handleClose">关 闭</el-button>
                </div>
            </g-edit-title>
            <div class='content'>
                <div class='cons'>
                    <div></div>
                    <slot name="editPage" :pageDisabled='pageDisabled'></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {closeRoute} from 'mixins/index';

export default {
    name: 'editPage',
    mixins: [closeRoute],
    data () {
        return {
            pageDisabled: false,
            isProcess: false,
            translateName: '',
            typeName: ''
        };
    },
    created() {
        this.type = this.$base64.decode(this.$route.params.type);
        this.id = Number(this.$base64.decode(this.$route.params.id));
        this.translateName = this.$route.meta.title;
        this.pageStatus();
    },
    methods: {
        // 页面状态
        pageStatus() {
            this.pageDisabled = (this.type === 'add' || this.type === 'edit');
            if (this.type === 'add') {
                this.typeName = '添加';
            }
            if (this.type === 'edit') {
                this.typeName = '修改';
            }
            if (this.type === 'info') {
                this.typeName = '查看';
            }
        },
        // 取 消保存
        handleClose () {
            this.$emit('editEvent', 'close');
        },
        // 保存
        handleSave () {
            this.$emit('editEvent', 'save');
        },
        // 重置
        handleReset() {
            this.$emit('editEvent', 'reset');
        }
    }
};
</script>
<style lang="scss" scoped>
  @import 'components/basicComponents/styles/pageEdit.scss';
</style>
