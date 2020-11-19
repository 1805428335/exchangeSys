<template>
  <div class="loginWrap" ref="loginWrap">
    <div class="headerWrap">
      <div class="logo" style="float: left;">
        <img :src="require('assets/images/logowhite.png')" alt />
      </div>
    </div>
    <div class="login-img">
      <img :src="require('assets/images/logo.png')" alt />
    </div>
    <div class="loginContents">
      <login-reset :n="n" class ref="loginReset" @logined="getLogined" v-show="!resetShow"></login-reset>
    </div>
    <div class="footerWrap">
      <login-footer></login-footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Utils from 'util';

export default {
  name: 'login',
  components: {
    loginFooter(resolve) {
      require(['./loginFooter.vue'], resolve);
    },
    loginReset(resolve) {
      require(['./loginReset.vue'], resolve);
    }
  },
  data() {
    return {
      resetShow: false,
      qrImg1: false,
      qrImg2: false,
      loading: false,
      carouselList: [
        {
          backgroundUrl: 'assets/images/loginbanner001.png',
          topTitle: '',
          bottomTitle: ''
        },
        {
          backgroundUrl: 'assets/images/loginbanner002.png',
          topTitle: '',
          bottomTitle: ''
        },
        {
          backgroundUrl: 'assets/images/loginbanner003.png',
          topTitle: '',
          bottomTitle: ''
        }
      ],
      n: 1 // 图片的index。
    };
  },
  created() {
    document.title = '交易所后台管理系统_欢迎登录';
  },
  methods: {
    ...mapActions({
      login: 'user/loginPassword'
    }),
    setLanguageCommon(languageArr) { // 遍历后台传来的路由字符串，转换为组件对象
      const languageObj = {};
      languageArr.forEach(item => {
        if (languageObj[item.pageCode]) {
          this.$set(languageObj[item.pageCode], item.columnCode, item.languageValue);
        } else {
          this.$set(languageObj, item.pageCode, {[item.columnCode]: item.languageValue});
        }
      });
      return languageObj;
    },
    getLogined(val) {
      this.$router.push('/home');
      // 咋不需要弹窗
    },
    // 鼠标移入移出
    changeMask() {
      this.qrImg1 = !this.qrImg1;
    },
    changeMask2() {
      this.qrImg2 = !this.qrImg2;
    },
    setLanguage(arr) {
      const obj = {};
      for (const i in arr) {
        const item = arr[i];
        this.$set(obj, item.columnCode, item.languageValue);
      }
      return obj;
    }
  }
};
</script>

<style scoped lang="scss">
.loginWrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: url("../../assets/images/loginbanner.png");
  // background-repeat: no-repeat;
  //  background-size: cover;
  background:linear-gradient(135deg,rgba(0,138,247,1) 0%,rgba(7,33,226,1) 100%);
  .login-img{
    display: flex;
    align-items: center;
    width: 100%;
    height: 90%;
    padding: 12%;
    box-sizing: border-box;;
    img{
      // width: 40%;
      width: 750px;
    }
  }
  .headerWrap {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 50px;
    height: 50px;
    z-index: 999;
    position: relative;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    .logo {
      display: inline-block;
      margin-right: 20px;
      img {
        width: 140px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    span {
      font-size: 42px;
      color: white;
    }
    .language {
      a {
        margin: 0 20px;
        font-size: 16px;
        text-decoration: none;
      }
      span {
        margin: 0 20px;
      }
    }
    .qrcodes {
      position: absolute;
      top: 66px;
      right: 20px;
      height: 120px;
      img {
        width: 120px;
        display: block;
        position: relative;
        float: right;
        &.qrImg1 {
          right: 50px;
        }
        &.qrImg2 {
          right: 162px;
        }
      }
    }
  }
  .loginContents {
    width: 100%;
    padding: 0 10%;
    z-index: 999;
    min-width: 1200px;
    display: flex;
    margin-top: 100px;
    .login_fun {
      transform: translateY(-100px);
      flex: 2;
      margin-right: 10%;
      img {
        width: 100%;
      }
    }
    .login-cons1 {
      flex: 1;
      transform: translateY(50px);
    }
  }
  .footerWrap {
    position: absolute;
    width: 100%;
    z-index: 999;
    text-align: center;
    height: 50px;
    bottom: 0;
  }
  .home {
    a {
      margin: 0 16px;
      font-size: 16px;
    }
    span {
      margin: 0 16px;
    }
  }
  .el-carousel {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 33;
    opacity: 0.75;
    top: 0;
    bottom: 0;
    .carousel-tips {
      position: absolute;
      left: 200px;
      bottom: 130px;
      z-index: 1000;
      width: 400px;
      h2 {
        color: white;
        position: relative;
        &.top {
          margin-bottom: 40px;
        }
        &.bottom {
          left: 80px;
        }
      }
    }
    img {
      width: 100%;
      /*height: 100%;*/
      display: none;
      transition: all 0.5s linear;
      &:hover {
        transform: scale(1.1);
      }
      &.active {
        display: block;
      }
    }
    .el-carousel-item {
      width: 100%;
      height: 100%;
      position: relative;
      background-size: cover;
    }
    .el-carousel__indicator {
      margin: 0 8px;
    }
  }
  .qrcodes {
    position: absolute;
    top: 66px;
    right: 50px;
    height: 120px;
    img {
      width: 120px;
      display: block;
      position: relative;
      float: right;
      &.qrImg1 {
        right: 50px;
      }
      &.qrImg2 {
        right: 162px;
      }
    }
  }

  .banner {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 33;
    opacity: 0.75;
    top: 0;
    .bannerImg {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
      .el-carousel-item {
        width: 100%;
        height: 100%;
        display: none;
        &.active {
          display: block;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bannerBtn {
      position: absolute;
      list-style: none;
      bottom: 20px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      margin: 0;
      padding: 0;
      z-index: 999;
      li {
        display: inline-block;
        background-color: transparent;
        padding: 12px 4px;
        cursor: pointer;
        margin: 0 8px;
        button {
          height: 5px;
          width: 35px;
          border-radius: 2px;
          display: block;
          opacity: 0.48;
          background-color: #fff;
          border: none;
          outline: 0;
          padding: 0;
          margin: 0;
          cursor: pointer;
          -webkit-transition: 0.3s;
          transition: 0.3s;
          &.active {
            opacity: 1;
          }
        }
      }
    }
    .carousel-tips {
      position: absolute;
      left: 200px;
      bottom: 130px;
      z-index: 1000;
      width: 400px;
      h2 {
        color: white;
        position: relative;
        font-size: 35px;
        opacity: 1 !important;
        &.top {
          margin-bottom: 40px;
        }
        &.bottom {
          left: 80px;
        }
      }
    }
    .el-carousel__arrow {
      z-index: 1000;
    }
  }
}
</style>
