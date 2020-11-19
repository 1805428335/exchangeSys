
export default {
    // 密码登录
    passwordLogin: {
      url: '/passport/api/password/login',
      method: 'post'
    },
    // 校验用户是否存在
    checkUserCode: {
      url: '/passport/api/check/user',
      method: 'get'
    },
    // 校验用户手机号是否存在 mobile
    checkMobile: {
      url: '/passport/api/check/mobile',
      method: 'get'
    },
    // 判断用户是否绑定了手机号 currentUserId
    checkHasMobile: {
      url: '/passport/api/check/has/mobile',
      method: 'get'
    },
    // 判断用户是否设置了密码
    checkHasPassword: {
      url: '/passport/api/check/password',
      method: 'get'
    },
    // 设置密码
    setHasPassword: {
      url: '/passport/api/password/set',
      method: 'post'
    },
    // 绑定手机号发送验证码
    smsMobileBind: {
      url: '/valid/api/sms/mobile/bind',
      method: 'get'
    },
    // 绑定手机号
    userBindMobile: {
      url: '/passport/api/bind/mobile',
      method: 'post'
    },
    // 验证token是否存在
    tokenCheckLogin: {
      url: '/passport/api/token/check',
      method: 'get'
    },
    // 退出登录
    outLogin: {
      url: '/passport/login/out',
      method: 'get'
    },
    // 获取用户的子系统菜单
    getsubSystemMenus: {
      url: '/passport/menus',
      method: 'get'
    },
    // 发送短信验证码
    validSmsLogin: {
      url: '/valid/api/sms/login',
      method: 'get'
    },
    // 短信登录
    passportSmsLogin: {
      url: '/passport/api/sms/login',
      method: 'post'
    },
    // 登录校验
    // 获取图形验证码
    validVerify: {
      url: '/valid/api/verify',
      method: 'get'
    },
    // 图形验证码登录
    validVerifyLogin: {
      url: '/passport/api/verify/login',
      method: 'post'
    },
    // 判断用户是否有密码,用于登录前校验是否有密码
    checkNamePassword: {
      url: '/passport/api/name/check/password',
      method: 'get'
    },
    // 区号
    getSmsCountryEffective: {
      url: '/sms/country/api/country/effective',
      method: 'get'
    }
};
