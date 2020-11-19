
export default {
    // 查询指定语言包
    languageValues: {
      url: '/language/values',
      method: 'get'
    },
    // 获取图路径（单个）
    getFileInfo: {
      url: '/file/file/inf',
      method: 'get'
    },
    // 文件下载
    fileDownload: {
      url: '/file/download',
      method: 'get',
      isExport: true,
      loading: true
    },
    // 批量获取文件路径
    getFilepath: {
      url: '/file/file/list',
      method: 'post'
    },
    // 统一的文件上传
    setFileUpload: {
      url: '/file/tenant/upload',
      method: 'post'
    },
    // 获取物资库明细
    getBasematerialDetail: {
      url: '/basematerial/detail/win/page',
      method: 'get'
    },
    // 查询通用语言包
    getLanguageSubSystemCodeValues: {
      url: '/language/subSystemCode/value?subSystemCode=common',
      method: 'get'
    },
    // 获取数据项
    getDicItemValues: {
      url: '/dictionary/item/values',
      method: 'get'
    },
    // 获取数据项api
    getDicItemApiValues: {
      url: '/dictionary/item/api/values',
      method: 'get'
    },
    // 搜索组织机构树
    getOrgTree: {
        url: '/organization/org/tree',
        method: 'get'
    },
     // 搜索组织机构树
    getEffectiveOrgTree: {
      url: '/organization/org/effective/tree',
      method: 'get'
    },
    // 获取组织机构下的用户
    getUserList: {
      url: '/organization/org/users',
      method: 'post'
    },
    // 批量获取用户信息
    getUserInfosList: {
      url: '/organization/user/basic/infos',
      method: 'post'
    },
    // 分页查询有权限且项目状态为已启动且未竣工的项目
    getProjectPermissionList: {
      url: '/project/permission/page',
      method: 'post'
    },
    // 不需要按照权限查询
    getProjectEffectiveList: {
      url: '/project/effective/page',
      method: 'post'
    },
    // 查询文件路径 fileIds: []
    fileDownloadList: {
      url: '/file/file/list',
      method: 'post'
    },
    // 甲方一览
    getPartyAPage: {
        url: '/partya/page',
        method: 'post'
    },
    // 获取甲方分类
    getPartyAType: {
        url: '/partya/type/list/effective',
        method: 'get'
    },
    // 获取甲方信息
    getPartyAPageList: {
      url: '/partya/page',
      method: 'post'
    },
    // 获取乙方信息
    getPartyBPageList: {
      url: '/partyb/page',
      method: 'post'
    },
    // 设置用户的常用菜单
    addCommonUsedMenu: {
      url: '/passport/used/add',
      method: 'get',
      responseType: 'arraybuffer'
    },
    // 任务小红点
    implementationNotes: {
      url: '/workflow/api/user/count',
      method: 'post'
   }
};
