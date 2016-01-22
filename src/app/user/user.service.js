/**
 * 用户服务
 */

 import { BusinessFactory } from '../main/business.factory';

export class UserService extends BusinessFactory {
  constructor(toastr,$rootScope,dialogService,userFactory,dataTableService) {
   'ngInject';

   super(toastr, $rootScope, dialogService, userFactory, 2);
   this.userFactory = userFactory;
   this.dataTableService = dataTableService;
   this.dataTableColumns = dataTableColumns;
   this.dataTableColumnSpecific = dataTableColumnSpecific;
  }

  /**
   * 用户服务初始化
   * @return {[type]} [description]
   */
  init() {
    this.search(1);
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[4].render = this.dataTableService.flagRender;
    return this.dataTableColumns;
  }

  // 打开编辑页添加依赖数据
  openEditPage(scope) {
    let binding = {
      user: this.userFactory.create()
    };
    let inputs = [
      {name: '用户名称', model: 'user.userName'},
      {name: '登录名称', model: 'user.loginName'},
      {name: '登录密码', model: 'user.password', type: 'password'},
      {name: '所属公司', model: 'user.subjectCode', type: 'select',
        source: 'subjects'},
      {name: '所属角色', model: 'user.roleCode', type: 'select',
        source: 'roles'},
      {name: '状态标识', model: 'user.enableFlag', type: 'select',
        source: 'enables'},
      {name: '备注', model: 'user.remark', type: 'textarea'}
    ];

    super.editDialog('添加用户', inputs, binding, scope).then(({user}) => {
console.log(user);
    });
  }

  // 打开二维码图片
  openWechatQRImg(userCode, loginName) {
    // 后台应该给图片大小或者描述
    let conf = {
      button: false,
      width: '330px',
      title: '绑定微信(' + loginName + ')'
    };

    this.userFactory.getWechatQRUrl(userCode).then((url) => {
      let content = '<img src="' + url + '">'+
      '<p style="text-align:center;" class="text-muted">扫一扫干点啥?</p>';
      super.dialog(conf, content);
    });
  }

  // 解绑微信
  unbindWechat(userCode, loginName) {
    let _this = this;
    let title = '解绑微信(' + loginName + ')';
    let content = '<p>确认解绑吗?</p>';

    super.confirm(title, content).then(() => {
      _this.userFactory.unbindWechat(userCode).then((msg) => {
        _this.refreshList(msg);
      });
    });
  }
}

// 列定义
let dataTableColumns = [
  {data: 'userName', title: '用户名称'},
  {data: 'loginName', title: '登录名称'},
  {data: 'subjectName', title: '公司名称', orderable: false},
  {data: 'roleName', title: '角色名称', orderable: false},
  {data: 'enableFlag', title: '状态', orderable: false},
  {data: 'bandedWechat', title: '微信', orderable: false}
];

// 特殊列处理
let dataTableColumnSpecific = {
  5: ({userCode, loginName, bandedWechat, wechatInfo}) => {
    let button = {};
    if (bandedWechat === false) {
      button = {
        text: '绑定微信',
        action: `vm.bindWechat('${userCode}', '${loginName}')`
      };
    } else {
      button = {
        type: 'a', text: `${wechatInfo}`,
        action: `vm.unBindWechat('${userCode}', '${loginName}')`
      };
    }
    return button;
  }
};