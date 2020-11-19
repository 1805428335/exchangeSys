<template>
  <div>
    <div class="header">
      <div class="logo">
        <img :src="require('assets/images/logowhite.png')" alt="">
        <span></span>
      </div>
      <div class="menu">
      </div>
      <div class="public">
        <div class="user-info-list" style="cursor: pointer; padding-left: 30px;">
          <el-popover
            placement="bottom"
            width="300"
            trigger="hover">
            <div slot="reference" style="cursor: pointer;display: flex;align-items: center;">
              <div class="reference-user-img">
                <img style="max-width: 100%; max-height: 100%;" class="midFont"
                  :src="userHead ? userHead : require('assets/images/public/nav_user.png')">
              </div>
            </div>
            <div class="userInfo_list">
              <div class="user-info">
                <div class="user-userHead">
                  <img style="max-width: 100%; max-height: 100%;" class="midFont"
                  :src="userHead ? userHead : require('assets/images/public/nav_user.png')">
                </div>
                <div class="user-infos">
                  <tooltips :value="userInfo.tenantName"></tooltips>
                  <span>{{userInfo.userName}}</span>
                </div>
              </div>
              <div class="list_footer" @click="exitLogon">
                <i class="el-icon-switch-button"></i>
                <p>退出登录</p>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      style="top:25%"
      width="30%">
      <div slot="title" class="out-header"><i class="el-icon-warning-outline"></i><span>提示</span></div>
      <span style="line-height: 50px;margin-bottom: 50px;text-indent: 1em;display: flex;">您确定退出吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-fast-click
          icon="el-icon-circle-close"
          class="urgent" type="primary"
          size="small" @click="dialogVisible = false">取 消
        </el-button>
        <el-button
          size="small"
          v-fast-click
          icon="el-icon-circle-check"
          type="primary"
          @click="submitForm">确 定
        </el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import Auth from 'util/auth';
  import Utils from 'util/index.js';
  import config from 'util/config';

  export default {
    name: 'headNavigation',
    inject: ['reload'],
    data () {
      return {
        dialogVisible: false,
        userHead: '',
        userInfoList: [
          {
            name: '基本资料', icon: 'el-icon-user', path: 'personalInfo'
          },
          {
            name: '安全设置', icon: 'el-icon-lock', path: 'setSecurity'
          },
          {
            name: '修改密码', icon: 'el-icon-office-building', path: 'authentication'
          }
        ],
        types: '',
        userName: '',
        logoImage: '',
        headPic: '',
        isProbation: 0,
        userInfo: {},
        results: 0
      };
    },
    computed: {
      stateUserInfo() {
        return this.$store.state.user.userInfo;
      },
      isHeadPic() {
        return this.$store.state.user.isHeadPic;
      }
    },
    watch: {
      isHeadPic() {
        this.handleSetUserInfo();
      },
      stateUserInfo: {
        handler() {
          this.userInfo = Auth.hasUserInfo();
          this.handleSetUserInfo();
        },
        deep: true
      }
    },
    updated() {
      this._getImplementationNotes();
    },
    mounted () {
      this.handleSetUserInfo();
    },
    created() {
      this.userInfo = Auth.hasUserInfo();
    },
    methods: {
      handleSetUserInfo () {
        const userInfo = Auth.hasUserInfo();
        this.types = userInfo.types;
        this.userName = userInfo.userName;
        this.logoImage = config.imageUrl + userInfo.logo;
        this.headPic = userInfo.headPic;
        // 1使用客户 0正式客户
        this.isProbation = userInfo.isProbation;
        if (!this.headPic) return;
        this._getFileDownloadList(this.headPic);
       },
      // 获取图片路径
      _getFileDownloadList(id) {
          this.$store.dispatch('publicApi/getFilepath', {fileIds: [id]}).then(res => {
             this.userHead = `${config.imageUrl}${res.results[0].filePath}`;
          });
       },
      // 代办显示个数
      _getImplementationNotes() {
         this.$store.dispatch('publicApi/implementationNotes').then(res => {
             this.results = res.results ;
         });
      },
       // 退出登录
      exitLogon () {
        this.dialogVisible = true;
      },
      submitForm () {
        this.$store.dispatch('login/outLogin').then(res => {
          Auth.reLogin();
          Utils.commonUtil.resetVuex(); // 清楚store数据
          this.jumpPageProtal('login');
        });
      },
      // 导航跳转到中台页面
      jumpPageProtal(page) {
        this.$router.push(`/${page}`);
      }
    }
  };
</script>

<style scoped lang="scss">
  .header {
    height: 50px;
    padding: 0 0 0 10px;
    width: 100%;
    line-height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    background: #2b74ec;
    // background: linear-gradient(90deg,#2b74ec,#2b74ec);
    display: flex;
    .logo {
      float: left;
      margin-right: 10px;
      img {
        height: 30px;
        margin-top: 12px;
      }
    }
    .menu {
      float: left;
      flex: auto;
      // background: linear-gradient(90deg,#2b74ec,#2b74ec);
      padding: 0 10px;
      li {
        height: 100%;
        float: left;
        font-size: 12px;
        color: white;
        cursor: pointer;
        margin: 0 20px;
        list-style-type: none;
        &.active {
          color: #2b74ec;
        }
      }
    }
    .public {
      float: right;
      display: flex;
      // background: linear-gradient(90deg,#2b74ec,#2b74ec);
      padding-right: 20px;
      .exitLogon {
        margin-left: 40px;
        color: white;
        cursor: pointer;
        }
      .reference-user-img{
        width: 32px;
        height: 32px;
        overflow: hidden;
        background: #ffffff;
        margin-top: 9px;
        border-radius: 50%;
        display: flex;
        align-items: center;
      }
    }
  }

  .out-header {
    color: white;
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      margin-left: 5px;
      display: inline-block;
    }
  }
  .userInfo_list {
    width: 300px;
    .user-info{
      border-bottom: 1px solid #eeeeee;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .user-userHead{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        padding-right: 15px;
        display: flex;
        align-items: center;
      }
      .user-infos{
        flex: auto;
        line-height: 28px;
        overflow: hidden;
        div{
          font-size: 14px;
          color: black;
        }
      }
    }
    .list_li {
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      i{
        font-size: 16px;
      }
    }
    .list_li:hover {
      background: #ebebeb;
    }
    .active {
      background: rgb(212, 235, 250);
      color: #2b74ec;
      border-radius: 5px;
    }
    .list_footer {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 40px;
      height: 40px;
      text-align: center;
      background: #fafafa;
      cursor: pointer;
      color: #f55e14;
      margin-top: 15px;
    }
    .list_footer:hover {
      background: #eee;
    }
  }
</style>
