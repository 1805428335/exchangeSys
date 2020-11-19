<template>
  <div class="uploadFileWrap">
    <ul
      :class="!flowStatus?'info':''"
      v-if="imgUrlList.length > 0">
      <li>
        <el-dropdown size="height:40px;">
          <p class="set" style=" white-space: nowrap;text-overflow: ellipsis;overflow:hidden;">
            {{imgUrlList[0].fileName | fileNameFilter}}</p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :key="item.id"
              v-for="(item,index) in imgUrlList">
              {{item.fileName | fileNameFilter}}
              <span  v-if="flowStatus"  @click="deleltImages(index)" style="float: right;margin-left: 6px;">
                <i class="el-icon-circle-close"></i>
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <el-upload
      v-if="flowStatus"
      style=" vertical-align: middle;display: inline-block;height: 100%;"
      :action="fileUrl"
      :headers="myHeaders"
      :data="fileName"
      ref="upload"
      :multiple="multiple"
      :limit="limit"
      :on-exceed='handleExceed'
      :file-list="imgUrlList"
      :on-error="handleError"
      :on-change="imgPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload">
      <el-button
        class="uploadBtn"
        :disabeld="uploadTitle=== '上传中...'"
        size="mini"
        style="vertical-align: middle;" type="text">
        <span style="font-size: 12px;">{{title}}</span>
      </el-button>
    </el-upload>
    <span
      v-if="imgUrlList.length > 0"
      @click="handleGridData"
      class="uploadBtn findFiles smallFont set"
      type="text">查看({{imgUrlList.length}})
    </span>
    <span v-if="imgUrlList.length===0 && !flowStatus">暂无附件</span>

    <!-- 附件弹框 -->
    <el-dialog
      class="el-dialog-auto" title="附件列表" append-to-body
      v-if="dialogGridData" :visible.sync="dialogGridData"
      width="70%">
      <attachment :gridData="gridData">
      </attachment>
    </el-dialog>
  </div>
</template>

<script>
  import Auth from 'util/auth';
  import config from 'util/config';

  export default {
    name: 'upload-file',
    components: {
      attachment (resolve) {
        require(['./attachment.vue'], resolve);
      }
    },
    data () {
      return {
        fileUrl: config.fileTenantUrl,
        myHeaders: {
          'Access-Token': Auth.hasToken(),
          'Access-Domain': 'customer',
          userId: Auth.hasUserInfo().userId,
          Language: Auth.hasLanguage(),
          'resource': 'P2'
        },
        fileName: {
          fileName: '',
          subSystemCode: config.subSystemCode
        },
        imgUrlList: [],
        gridData: [],
        uploadTitle: '上传',
        title: '上传',
        dialogGridData: false,
        firstImgUrl: {}
      };
    },
    props: {
      flowStatus: {
        type: Boolean,
        default: true
      },
      attachment: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: 10
      },
      multiple: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      attachment: {
        handler () {
          this.getGridData();
        },
        immediate: true
      }
    },
    methods: {
      // 获取文件
      getGridData () {
        if (this.attachment) {
          const attachmentIdList = this.attachment.split(',');
          const params = {
            fileIds: attachmentIdList
          };
          this.$store.dispatch('publicApi/getFilepath', params).then(res => {
            if (!res.results.length) return;
            this.imgUrlList = res.results;
            this.gridData = res.results;
          });
        }
      },
      // 点击查看文件
      handleGridData () {
        this.dialogGridData = true;
      },
      // 移除文件
      deleltImages (index) {
        this.$confirm(`删除 ${this.imgUrlList[index].fileName}?`, '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.imgUrlList.splice(index, 1); // 假设长度为3
          if (this.imgUrlList.length) {
            const attachment = this.imgUrlList.map(v => v.id).join(',');
            this.$emit('update:attachment', attachment);
          } else {
            this.$emit('update:attachment', '');
          }
        }).catch(() => {
        });
      },
      // 移除文件
      handleRemove () {

      },
      // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      imgPreview () {

      },
      // 文件超出个数限制时的钩子
      handleExceed(files, fileList) {
        console.log(files, fileList);
        this.$message.error('上传文件个数已超过限制');
      },
      // 文件上传之前
      beforeAvatarUpload (file) {
        const isLt5M = file.size / 1024 / 1024 < 6;
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
          return false;
        }
        this.fileName.fileName = file.name;
        this.fileName.sourceCode = this.$route.name;
        this.uploadTitle = '上传中...';
        this.title = '上传中...';
        return isLt5M;
      },
      // 文件上传成功
      handleSuccess (response, file, fileList) {
        const timeOut = setTimeout(() => {
          fileList.map(item => {
            if (item.response) {
              item.fileName = item.name;
              item.filePath = item.url;
              item.filePath = item.url;
              item.fileSize = item.size;
              item.id = item.response.results;
            }
          });
          const imgUrlList = fileList.reverse();
          const arr = imgUrlList.map(v => v.id);
          this.$emit('update:attachment', arr.join(','));
          this.$message.success('文件上传成功');
          this.uploadTitle = '上传';
          this.title = '上传';
          clearTimeout(timeOut);
        }, 100);
      },
      // 文件上传失败
      handleError () {
        this.$message.error('文件上传失败');
        this.uploadTitle = '上传';
        this.title = '上传';
      }
    }
  };
</script>

<style scoped lang="scss">
  .uploadFileWrap {
    font-size: 12px;
    width: 100%;
    height: 36px;
    display: flex;
    align-items: self-end;
    justify-content: center;
    ul {
      width: calc(100% - 130px);
      max-width: calc(100% - 130px);
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      &.info {
        width: calc(100% - 66px);
        max-width: calc(100% - 66px);
      }
      li {
        width: 100%;
        height: 100%;
        list-style: none;
        p {
          width: 100%;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        /deep/ .el-dropdown {
            width: 100%;
        }
      }
    }
    .uploadBtn {
      display: inline-block;
      vertical-align: middle;
      width: 60px;
      height: 100%;
      /*margin: 0 5px;*/
      &.findFiles {
        position: relative;
        top: 0.6px;
      }
    }
  }
</style>
