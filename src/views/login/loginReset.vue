<template>
  <div class='login-cons' :class="isMobileTerminal?'isMobileTerminal':''">
    <div class='logo'>
      <!-- 施工管理云系统 -->
      <span>交易所后台管理系统</span>
    </div>
    <div class='login-tabs'>
    </div>
    <!-- 密码登录 -->
    <!-- status-icon  -->
    <div v-show='tabsKey === 0'>
      <el-form :model='loginForm' :rules='rules' ref='loginForm' class='demo-ruleForm'>
        <el-form-item prop='userCode' :error='loginForm.errorUserCode'>
          <el-input
            v-model.number='loginForm.userCode'
            clearable
            placeholder="请输入登录名"
          >
            <i slot='prefix' class='el-input__icon el-icon-user icon-grey'></i>
          </el-input>
        </el-form-item>
        <el-form-item prop='password' :error='loginForm.errorMsg'>
          <el-input
            type='password'
            v-model='loginForm.password'
            placeholder="请输入密码"
            @keyup.enter.native="PsssubmitForm('loginForm')"
            clearable
            show-password
            show-word-limit
          >
            <i slot='prefix' class='el-input__icon el-icon-unlock icon-grey'></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        type='primary'
        size='small'
        class="login-submit"
        @click.native.prevent="submitForm('loginForm')"
        :loading='logining'
      >登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import config from 'util/config';
import Auth from 'util/auth';

const Base64 = require('js-base64').Base64;

export default {
  props: {
    title: {
      type: String,
      default: '施工管理云系统'
    },
    n: {
      default: 0
    }
  },
  data() {
    const checkUserCode = (rule, value, callback) => {
      if (!value) {
        // 手机号/账号/邮箱不能为空
        callback(new Error('手机号/账号/邮箱不能为空'));
      } else {
        callback();
      }
    };
    const checkSmsCode = (rule, value, callback) => {
        const regular = /[0-9]{6}/g;
        if (!value) {
            // 请输入验证码
            callback(new Error('请输入验证码'));
        } else if (!regular.test(value)) {
            // 验证码应为6位的数字
            callback(new Error('验证码应为6位的数字'));
        } else {
            callback();
        }
    };
    const checkPassword = (rule, value, callback) => {
        if (!value) {
            // 密码不能为空
            callback(new Error('密码不能为空'));
        } else {
            callback();
        }
    };
    return {
      loginForm: { userCode: '', password: '', errorMsg: ''},
      logining: false,
      tabsKey: 0,
      sendAuthCode: true,
      passAuth_time: 0,
      auth_time: 0,

      rules: {
        password: [
          {
            required: true,
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        userCode: [
          {
            required: true,
            validator: checkUserCode,
            trigger: 'blur'
          }
        ]
      },
      isDisabled1: false,
      isMobileTerminal: false,
      remember: false,
      type: 1, // 判断后台还是前台登录 0 后台 1 前台
      verifyToken: '', // 图形验证码返回的Token
      loginTimes: 0,
      passErrorCode: '',
      ImageCode: '', // 图形验证
      verificationCode: '',
      setPassWordShow: false,
      bindMobileShow: false,
      hasUserInfo: {}
    };
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isMobileTerminal = true;
    } else {
      this.isMobileTerminal = false;
    }
  },
  watch: {},
  mounted() {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.loginForm.userCode = userName;
    }
    // 在页面加载时从cookie获取登录信息
    const userCode = this.getCookie('userCode');
    const password = Base64.decode(this.getCookie('password'));
    // 如果存在赋值给表单，并且将记住密码勾选
    if (password) {
      this.loginForm.userCode = userCode;
      this.loginForm.password = password;
      this.remember = true;
    }
  },
  methods: {
    ...mapActions({
      login: 'user/loginPassword'
    }),
    // 密码登录
    submitForm(formName) {
      this.$router.push('/home');
      // this.loginForm.errorMsg = '';
      // this.verificationCode = '';
      // this.passErrorCode = '';
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     if (this.loginTimes < 2) {
      //       this.passLogin();
      //     } else if (this.loginTimes >= 2 && this.loginTimes < 4) {
      //       this.VerifLogin();
      //     }
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 密码登录
    passLogin() {
      this.loginForm.errorMsg = '';
      const userInfo = {
        userCode: this.loginForm.userCode,
        password: this.loginForm.password,
        userId: 0
      };
      this.$store.dispatch('login/passwordLogin', userInfo).then((res) => {
        this.logining = true;
        if (res.status === 1) {
          const code = res.results.code;
          this.loginForm.errorMsg = '登录出错';
          this.logining = false;
        } else {
          this.loginForm.errorMsg = '';
          this.setLoginAuth(res.results);
        }
      }).catch((error) => {
        this.logining = false;
      });
    },
    // 获取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(`${key}=`);
        if (start !== -1) {
          start = start + key.length + 1;
          let end = document.cookie.indexOf(';', start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return '';
    },
    // 保存cookie
    setCookie(cName, value, expiredays) {
      const exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      // eslint-disable-next-line
      document.cookie = cName + '=' + decodeURIComponent(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
    },
    setLoginAuth(userInfo) {
      this.logining = false;
      this.$store.commit('user/SET_TOKEN', userInfo);
      this.$emit('logined', true);
      localStorage.setItem('userName', this.loginMsg.userCode || this.loginForm.userCode);
      this.setCookie('token', userInfo.token);
      Auth.setLanguage('zh');
      this.setUserInfo();
      Auth.setUserInfo(userInfo);
      const passLogin = setTimeout(() => {
        clearTimeout(passLogin);
      }, 1500);
    }
  }
};
</script>

<style scoped lang='scss'>
 /deep/ .el-input__icon{
   line-height: 40px !important;
 }
.login-cons {
  // width: 270px;
  // min-height: 280px;
  width: 300px;
  min-height: 240px;
  margin: 0 auto;
  padding: 40px 40px 30px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  position: absolute;
  top: 45%;
  z-index: 2001;
  margin-top: -150px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  &.isMobileTerminal {
    right: 30%;
  }
  .login-tabs {
    width: 60%;
    margin: 10px auto;
    height: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      text-align: center;
      height: 28px;
      border-bottom: 1px solid rgba(51,51,51,0);
      cursor: pointer;
    }
    .active {
      border-bottom: 1px solid rgba(51,51,51,1);
    }
    .tabsList {
      font-size:16px;
      color: #333333;
    }
  }
  .el-button {
    width: 100%;
  }
  p {
    &:hover {
      cursor: pointer;
    }
  }
  .logo {
    width: 100%;
    text-align: center;
    span {
      color: #111111;
      font-size: 24px;
    }
  }
  .code {
    border: 0;
    color: grey;
  }
  .code-img {
    width: 100%;
    height: 40px;
    display: inline-block;
    background-color: #409eff;
    border-radius: 5px;
  }
}

.demo-ruleForm {
  .el-input {
    position: relative;
    margin-bottom: 6px;
    img {
      position: absolute;
      top: 10px;
      margin-right: 10px;
      left: 6px;
    }
  }
  .el-input__inner {
    text-indent: 60px;
  }
}

.login-msg-form {
  .el-input {
    position: relative;
    margin-bottom: 6px;
    img {
      position: absolute;
      top: 10px;
      margin-right: 10px;
      left: 6px;
    }
  }
  .el-input__inner {
    text-indent: 60px;
  }
}
.icon-grey{
  font-size: 18px;
  color: #D2D2D2;
}
.phoneCode {
  position: absolute;
  right: 10px;
}
.login-submit{
  height: 36px;
  background:linear-gradient(90deg,rgba(55,138,247,1),rgba(42,114,235,1));
  box-shadow:0px 2px 5px 0px rgba(0, 255, 90, 0.35);
  border-radius:26px;
}
</style>
