<template>
  <div class="file-upload uploadFileWrap">
    <div class="top">
      <el-upload
        style=" vertical-align: middle;display: inline-block;height: 100%;"
        :action="fileUrl"
        :headers="myHeaders"
        :disabled="title=== '附件上传中' || flowStatus"
        :data="fileName"
        ref="upload"
        :multiple="multiple"
        :limit="limit"
        :file-list="imgUrlList"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed='handleExceed'
        :before-upload="beforeAvatarUpload">
        <el-button
          class="uploadBtn"
          icon="el-icon-link"
          :disabled="title=== '附件上传中' || flowStatus"
          v-if="title!== '附件上传中'"
          style="vertical-align: middle"
          size="small"
          type="text"
        >
          {{uploadTitle}}
          <!--添加附件-->
        </el-button>
        <span v-else class="midFont light-grey">{{uploadTitle}}</span>
      </el-upload>
      <el-divider direction="vertical"></el-divider>
      <span class="midFont" @click="fileShow=!fileShow">
        <i :class="fileShow?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
      </span>
      <span style="margin-left: 20px;" class="midFont">已成功上传 {{filesNum}}个附件
        <span v-if="imgUrlList.length > 0">，共 {{fileSizes}}</span>
      </span>
      <span class="midFont set" style="margin-left:16px;" v-if="isIdentify && !flowStatus" @click="handleIdentify">自动识别</span>
    </div>
    <div class="bottom">
      <el-collapse-transition>
        <ul class="files" v-show="fileShow">
          <li
            v-for="(item,index) in imgUrlList"
            :key="item.id"
            :style="{width: `calc(${(100 / arrayNumber)}% - 5px)`}">
            <div class="left">
              <img v-if="judgeFileImage(item.fileSuffix)" :src="imageUrl+item.filePath" alt />
              <span
                v-else
                class="icon iconfont"
                :class="setClass(item.fileName)"
                style="font-size: 32px !important;margin-left: 8px;"
              ></span>
            </div>
            <div class="right">
              <div class="cons">
                <p class="midFont">{{fileNameFilvalter(item)}}</p>
                <p class="midFont light-grey">{{handconstransformation(item.fileSize)}}</p>
              </div>
              <div class="set">
                <!-- 预览 -->
                <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
                  <span class="preview" @click="handleViewer(item)">
                    <i class="el-icon-view"></i>
                  </span>
                </el-tooltip>
                <!-- 下载 -->
                <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
                  <span class="download" @click="downFilePath(item)">
                    <i class="el-icon-download"></i>
                  </span>
                </el-tooltip>
                <!-- 删除 -->
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                  <span class="download" @click="deconsteFile(index)" v-if="!flowStatus">
                    <i class="el-icon-close"></i>
                  </span>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
      </el-collapse-transition>
    </div>

    <image-viewer
      v-if="visible"
      :image-viewer-list="imageViewerList"
      @clearImg="getClearImg"
      :current-img="currentImg"
      :visible="visible"
    ></image-viewer>
  </div>
</template>

<script>
import Auth from 'util/auth';
import config from 'util/config';

export default {
  name: 'file-upload',
  components: {
    imageViewer (resolve) {
      require(['./imageViewer.vue'], resolve);
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
        resource: 'P2'
      },
      fileName: {
        fileName: '',
        subSystemCode: config.subSystemCode
      },
      imgUrlList: [],
      gridData: [],
      uploadTitle: '添加附件',
      dialogGridData: false,
      firstImgUrl: {},
      fileShow: true,
      fileCmsUrl: config.fileViewUrl,
      imageUrl: config.imageUrl, // 图片预览
      visible: false,
      currentImg: '',
      title: ''
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
    isPhoto: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    multiple: {
      type: Boolean,
      default: true
    },
    isShop: {
      type: Boolean,
      default: false
    },
    // 一行li显示个数
    arrayNumber: {
      type: Number,
      default: 4
    },
    isIdentify: { // 自动识别
      type: Boolean,
      default: false
    }
  },
  computed: {
    filesNum () {
      return this.imgUrlList.length;
    },
    fileSizes () {
      let capacityConut = 0;
      for (const i in this.imgUrlList) {
        const item = this.imgUrlList[i];
        capacityConut += item.fileSize;
      }
      return this.formatFileSize(capacityConut);
    },
    imageViewerList () {
      if (this.imgUrlList.length === 0) return;
      const arr = [];
      for (const i in this.imgUrlList) {
        const item = this.imgUrlList[i];
        const fileSuffix = item.fileSuffix.toLowerCase();
        // 为图片预览
        if (/jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga/.test(fileSuffix)) {
          item.imagePath = this.imageUrl + item.filePath;
          arr.push(item);
        }
      }
      return arr;
    }
  },
  mounted () {
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
    // 文件名称
    fileNameFilvalter(item) {
      // console.log(item);
      const fileName = item.fileName ? item.fileName.substr(0, item.fileName.lastIndexOf('_')) : '';
      return fileName ? `${fileName}.${item.fileSuffix}` : '';
    },
    // 获取文件
    getGridData () {
      if (this.attachment) {
        const attachmentIdList = this.attachment.split(',');
        const data = {
          fileIds: attachmentIdList.map((item) => (item = Number(item)))
        };
        this.$store.dispatch('publicApi/getFilepath', data).then(res => {
          this.imgUrlList = res.results;
        });
      } else {
        this.imgUrlList = [];
      }
    },
    getClearImg () {
      this.visible = false;
    },
    // 移除文件
    handleRemove (file, fileList) {
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.error('上传文件个数已超过限制');
    },
    // 文件上传之前
    beforeAvatarUpload (file) {
      let isJPG;
      if (this.isPhoto) {
        isJPG = file.type.indexOf('image') >= 0;
      } else {
        isJPG = true;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('只能上传图片');
        return false;
      }
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!');
      } else {
        this.fileName.fileName = file.name;
        this.uploadTitle = '附件上传中';
        this.title = '附件上传中'; // '附件上传中'
      }
      return isLt5M && isJPG;
    },
    // 文件上传成功
    handleSuccess (response, file, fileList) {
      const timeOut = setTimeout(() => {
        fileList.map((item) => {
          if (item.response) {
            item.fileName = item.name;
            item.filePath = item.url;
            item.fileSize = item.size;
            item.id = item.response.results;
          }
        });
        const arr = fileList.map(v => v.id);
        this.$emit('update:attachment', arr.join(','));
        this.$message.success('文件上传成功');
        this.uploadTitle = '添加附件';
        this.title = '附件上传'; // '附件上传'
        clearTimeout(timeOut);
      }, 100);
    },
    // 文件上传失败
    handleError () {
      this.$message.error('文件上传失败');
      this.uploadTitle = '添加附件';
      this.title = '附件上传'; // '附件上传'
    },
    formatFileSize (size) {
      const value = Number(size);
      if (size && !isNaN(value)) {
        const units = [
          'B',
          'KB',
          'MB',
          'GB',
          'TB',
          'PB',
          'EB',
          'ZB',
          'YB',
          'BB'
        ];
        let index = 0;
        let k = value;
        if (value >= 1024) {
          while (k > 1024) {
            k = k / 1024;
            index++;
          }
        }
        return `${k.toFixed(2)}${units[index + 1]}`;
      }
      return 0;
    },
    // 转换容量
    handconstransformation (capacityConut) {
      if (capacityConut < 1024) {
        return `${capacityConut}kb`;
      }
      capacityConut = capacityConut / 1024; // 转换为MB
      if (capacityConut < 1024) {
        return `${capacityConut.toFixed(2)}Mb`;
      }
      capacityConut = capacityConut / 1024; // 转换为G
      return `${capacityConut.toFixed(2)}G`;
    },
    // 文件预览
    handleViewer (item) {
      const fileSuffix = item.fileSuffix.toLowerCase();
      // 为图片预览
      if (/jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga/.test(fileSuffix)) {
        this.handleImageViewer(item);
      }
      if (/ppt|doc|xls|xlsx|txt|docx|pptx|pdf/.test(fileSuffix)) {
        this.handleFileInfo(item);
      }
    },
    handleImageViewer (item) {
      this.currentImg = this.imageUrl + item.filePath;
      this.visible = true;
    },
    // 文件预览
    handleFileInfo (row) {
      const fileName = this.fileNameFilvalter(row);
      const downloadUrl = `${this.$utils.config.url}/file/download?fileId=${row.id}&fullfilename=${fileName}`;
      const url = `${this.$utils.config.fileViewerUrl}${encodeURIComponent(downloadUrl)}`;
      window.open(url);
    },
    // 文件下载
    downFilePath (row) {
      console.log(row);
      const url = `${config.url}/file/download?fileId=${row.id}`;
      const link = document.createElement('a');
      link.style.display = 'none';
      link.target = '_Blank';
      link.href = url;
      link.target = '_Blank';
      const fileName = this.fileNameFilvalter(row);
      console.log(fileName);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    },
    // 移除文件
    deconsteFile (index) {
      this.$confirm(
        `删除${this.imgUrlList[index].fileName}?`, '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取 消',
          type: 'warning'
        }
      )
        .then(() => {
          this.imgUrlList.splice(index, 1); // 假设长度为3
          if (this.imgUrlList.length) {
            const attachment = this.imgUrlList.map(v => v.id).join(',');
            this.$emit('update:attachment', attachment);
          } else {
            this.$emit('update:attachment', '');
          }
        })
        .catch(() => {
        });
    },
    // 判断是否为图片
    judgeFileImage (val) {
      val = val.toLowerCase();
      return /jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga/.test(val);
    },
    // 判断其他文件
    judgeFile (val) {
      val = val.toLowerCase();
      return /ppt|doc|xls|xlsx|txt|docx|pptx|pdf/.test(val);
    },
    // 判断是什么类型的文件
    setClass (val) {
      if (val) {
        const filePath = val.split('.');
        const ficonstype = filePath[filePath.length - 1];
        ficonstype.toLowerCase();
        if (ficonstype === 'txt') {
          return 'icon-txt';
        } else if (ficonstype === 'ppt') {
          return 'icon-ppt';
        } else if (ficonstype === 'rar') {
          return 'icon-rar_1';
        } else if (ficonstype === 'pdf') {
          return 'icon-pdf';
        } else if (ficonstype === 'zip') {
          return 'icon-ZIP_1';
        } else if (ficonstype === 'doc' || ficonstype === 'docx') {
          return 'icon-word';
        } else if (ficonstype === 'xls' || ficonstype === 'xlsx') {
          return 'icon-excel1';
        } else {
          return '';
        }
      }
    },
    // 自动识别
    handleIdentify() {
      if (this.imgUrlList.length === 0) {
        this.$message.error('请上传附件');
        return;
      }
      const identifyUrl = `${config.imageUrl}${this.imgUrlList[0].filePath}`;
      this.$emit('identify', identifyUrl);
    }
  }
};
</script>

<style scoped lang="scss">
.icon-txt{
  color: #1f7246;
}
.icon-ppt{
  color: #d81e06;
}
.icon-rar_1{
  color: #8475ff;
}
.icon-pdf{
  color: #e70400;
}
.icon-ZIP_1{
  color: #733781;
}
.icon-word{
  color: #0095e0;
}
.icon-excel1{
  color: #1f7246;
}
ul {
  li {
    list-style:none
  }
}
.file-upload {
  width: 100%;
  .top {
    position: relative;
    .progress {
      position: absolute;
      width: 200px;
      bottom: -16px;
      left: 0px;
    }
  }
  .bottom {
    width: 100%;
    overflow: hidden;
    ul {
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      li {
        height: 50px;
        // flex: 1;
        margin-right: 5px;
        margin-bottom: 15px;
        position: relative;
        &:nth-child(4) {
          margin-right: 0;
        }
        .left {
          width: 50px;
          height: 50px;
          float: left;
          display: flex;
          align-items: center;
          line-height: 50px;
          margin-right: 5px;
          img {
            display: inline-block;
            vertical-align: mathematical;
            max-width: 50px;
            max-height: 50px;
          }
        }
        .right {
          width: calc(100% - 65px);
          height: 50px;
          float: left;
          cursor: pointer;
          position: relative;
          background: rgb(245, 245, 245);
          .cons {
            width: 100%;
            height: 100%;
            padding: 5px;
            box-sizing: border-box;
            p {
              line-height: 24px;
              width: 100%;
              overflow: hidden;
              height: 20px;
              font-size: 12px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .set {
            width: 100%;
            height: 100%;
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            z-index: 99;
            background: rgba(0, 0, 0, 0.6);
            line-height: 50px;
            padding-right: 5px;
            text-align: right;
            span {
              margin: 0 8px;
              font-size: 18px;
              color: white;
              font-weight: bold;
            }
          }
          &:hover {
            .set {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
