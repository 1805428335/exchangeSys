<template>
  <div class="upload-container tinymceUpload">
    <el-button
      style="position: relative;top: -3px;"
      icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
      @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="60%"
      center>
      <div class="picture">
        <el-upload
          :action="fileUrl"
          :headers="myHeaders" :data="fileName"
          list-type="picture-card" ref="upload"
          multiple accept="image/*"
          :file-list="imgUrlList"
          :on-error="handleError"
           :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="urgent" type="primary" icon="el-icon-circle-close" size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-check" size="small" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import config from 'util/config';
  import Auth from 'util/auth';

  export default {
    name: 'eidtor-image',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        fileCmsUrl: config.fileCmsUrl,
        fileName: {
          fileName: '',
          subSystemCode: config.subSystemCode
        },
        fileUrl: config.fileUrl,
        myHeaders: {
          'Access-Token': Auth.hasToken(),
          'Access-Domain': 'customer',
          userId: Auth.hasUserInfo().userId,
          Language: Auth.hasLanguage(),
          resource: 'P2'
        },
        dialogVisible: false,
        imgUrlList: []
      };
    },
    methods: {
      handleSubmit() {
        const imagePathList = this.imgUrlList.map(v => v.url);
        this.$emit('successCBK', imagePathList);
        this.$refs.upload.clearFiles();
        this.imgUrlList = [];
        this.dialogVisible = false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        this.fileName.fileName = file.name;
        // this.uploadTitle = '上传中';
        return isLt5M;
      },
      handleSuccess(response, file, fileList) {
        fileList.map(item => {
          if (item.response) {
            item.id = item.response.results;
          }
        });
        const imgUrlList = fileList.slice();
        let attachment = JSON.parse(JSON.stringify(imgUrlList));
        attachment = attachment.map(item => item.id);
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
        this.$store.dispatch('publicApi/fileDownloadList', {fileIds: attachment}).then(res => {
          this.imgUrlList = res.results;
          for (const i in this.imgUrlList) {
            this.imgUrlList[i].name = this.imgUrlList[i].fileName;
            this.imgUrlList[i].url = config.imageUrl + this.imgUrlList[i].filePath;
            console.log(this.imgUrlList, 'imgUrlList');
          }
        });
      },
      handleError(error, file, fileList) {
        this.$message.error('文件上传失败');
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
