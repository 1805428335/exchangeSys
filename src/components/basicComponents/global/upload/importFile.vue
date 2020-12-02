<!--
 * @Author: your name
 * @Date: 2020-08-09 10:13:02
 * @LastEditTime: 2020-11-19 13:03:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_contract-合同管理\src\components\basicComponents\global\upload\importFile.vue
-->
<template>
  <div
    class="uploadOrgWraHouse" style="display: inline-flex; margin:0 10px;">
    <el-button :disabled="flowStatus" v-fast-click class="more" size="small"
        type="primary" icon="el-icon-folder-opened" @click="setUploadStatus">
        导入
    </el-button>
    <div class="imgUrlList">
      <el-upload
        v-if="!flowStatus"
        :action="fileUrl"
        :headers="myHeaders"
        :data="fileName"
        ref="upload"
        :limit="limit"
        :auto-upload="false"
        :file-list="imgUrlList"
        :on-error="handleError"
        :on-change="imgPreview"
        :on-exceed='handleExceed'
        :on-success="handleSuccess"
        :before-upload="beforeAvatarUpload">
      </el-upload>
    </div>
    <!-- 导入获取的物资明细 -->
    <slot v-loading="loadingShow" :dialogImportFlag='dialogImportFlag' :subImportTable='subImportTable'></slot>
  </div>
</template>

<script>
import config from 'util/config';
import Auth from 'util/auth';

export default {
    name: 'upload',
    data() {
        return {
            fileUrl: config.url,
            myHeaders: {
                'Access-Token': Auth.hasToken(),
                'Access-Domain': 'customer',
                userId: Auth.hasUserInfo().userId,
                Language: Auth.hasLanguage(),
                resource: 'P2'
            },
            fileName: {
                fileName: '',
                subSystemCode: config.subSystemCode
            },
            imgUrlList: [],
            tableData: [],
            dialogImportFlag: false,
            loadingShow: false,
            subImportTable: {}
        };
    },
    props: {
        parameter: {
            type: Object,
            deefault: () => {}
        },
        buttonConfig: {
            type: Object,
            deefault: () => {}
        },
        tableDetailList: {
            type: Array,
            default: () => []
        },
        flowStatus: {
            type: Boolean,
            default: true
        },
        limit: {
            type: Number,
            default: 10
        },
        importUrl: {
            type: String,
            default: ''
        },
        subTable: {
            type: Object,
            deefault: () => {}
        },
        editPage: {}
    },
    mounted() {
        this.fileUrl = `${this.fileUrl}${this.importUrl}`;
    },
    methods: {
        setUploadStatus() {
            if (this.editPage.canImprotDetail && this.editPage.canImprotDetail()) {
               this.$refs.upload.$refs['upload-inner'].handleClick();
            }
        },
        // 文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.error('上传文件个数已超过限制');
        },
        // 文件上传失败
        handleError () {
            this.$message.error('文件上传失败');
        },
        beforeAvatarUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
               this.$message.error('上传文件大小不能超过 5MB!');
            }
            this.fileName.fileName = file.name;
            return isLt5M;
        },
        // 文件预览
        imgPreview(files, fileList) {
            const fileName = files.name;
            const regex = /(.xls|.xlsx)$/;
            if (!regex.test(fileName)) {
                this.$message.error('请上传文件类型应为.xls 或 .xlsx');
            } else {
                this.dialogImportFlag = true;
                this.loadingShow = true;
                this.$refs.upload.submit();
            }
        },
        handleSuccess(response, file, fileList) {
            if (response.status === 0) {
                if (response.data && response.data.length) {
                    this.$message.success('文件上传成功');
                }
                this.subImportTable = this.$clone(this.subTable);
                this.subImportTable.tableData = response.data;
                this.$emit('importData', this.subImportTable);
                this.$refs.upload.clearFiles();
                fileList = [];
            } else {
                this.$message.error(response.errorMsg ? response.errorMsg : response.errList[0].errMsg);
                this.dialogImportFlag = false;
            }
            this.loadingShow = false;
        }
    }
};
</script>

<style scoped lang="scss">
  body {
    margin: 0;
  }

  .imgUrlList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      border: none;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
  }
</style>
