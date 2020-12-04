<!--
 * @Author: your name
 * @Date: 2020-11-19 16:44:17
 * @LastEditTime: 2020-11-19 17:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\currencyIntroduction\currencyIntroductionEdit.vue
-->

<template>
  <div>
    <edit-page @editEvent="editEvent" v-loading="loading">
      <div slot="editPage">
        <g-edit-form
          ref="editForm"
          :type="type"
          :tableConfig="pageConfig.mainFormConfig"
          :projectForm="projectForm"
          :customRules="{code3: [
            {required: true,message:'请输入手机号', trigger: 'blur'},
            {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,message:'手机号格式不对', trigger: 'blur'},
          ]}"
        >
        </g-edit-form>
      </div>
    </edit-page>
  </div>
</template>
<script>
import Page from './configEdit.js';
import {editPage} from 'mixins/editMixins';
import {search} from 'mixins/searchMixins';

export default {
  name: 'mine',
  mixins: [search],
  data() {
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
      },
      type: 'add'
    };
  },
  props: {
    processParmas: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    // 获取info数据
    async _getInfoData(id = 0) {
      await this.handleGetInfoData(id, this.page.PageConfig.processParmas.infoUrl);
    },
    // 保存
    handleSave(isProcess = false) {
      this.$refs.editForm.getValidateForm(() => {
        const data = this.$clone(this.pageConfig.projectForm);
        this.handleSaveData(data, isProcess);
      });
    }
  }

};
</script>
