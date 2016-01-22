/**
 * 用户服务
 */

import { BusinessFactory } from '../main/business.factory';

export class UserService extends BusinessFactory {
  constructor(toastr,
              $rootScope,
              dialogService,
              userFactory,
              roleService,
              statusService,
              subjectService,
              dataTableService) {
              'ngInject';

   super(toastr, $rootScope, dialogService, userFactory);
   this.userFactory = userFactory;
   this.roleService = roleService;
   this.statusService = statusService;
   this.subjectService = subjectService;

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
      user: this.userFactory.create(),
      enables: this.statusService.getCombobox('flag'),
      subjects: this.subjectService.getCombobox(),
      roles: []
    };
      
    let inputs = [
      {name: '用户名称', model: 'user.userName'},
      {name: '登录名称', model: 'user.loginName'},
      {name: '登录密码', model: 'user.password', type: 'password'},
      {name: '所属公司', model: 'user.subjectCode',
       type: 'select', source: 'subjects', m2: 'user.subjectName'},
      {name: '所属角色', model: 'user.roleCode', type: 'select',
        source: 'roles', m2: 'user.roleName'},
      {name: '状态标识', model: 'user.enableFlag', type: 'select',
        source: 'enables'},
      {name: '备注', model: 'user.remark', type: 'textarea'}
    ];

    // 公司角色级联
    scope.$watch('user.subjectCode', (subjectCode) => {
      if (!subjectCode) { return; }
      this.roleService.getCombobox(subjectCode).then((array) => {
        scope.roles = array;
        if (scope.roles.length) {
          scope.user.roleCode = scope.roles[0].value;
        }
      });
    });

    super.openEditDialog('添加用户', inputs, binding, scope).then(({user}) => {
      super.add(user);
    });
  }

  // 下载关联
  del(userCode, loginName) {
    let title = '删除用户(' + loginName + ')';
    let content = '<p>确认删除该用户吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(userCode);
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
      super.openDialog(conf, content);
    });
  }

  // 解绑微信
  unbindWechat(userCode, loginName) {
    let _this = this;
    let title = '解绑微信(' + loginName + ')';
    let content = '<p>确认解绑吗?</p>';

    super.confirmDialog(title, content).then(() => {
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
  {data: 'subjectName', title: '公司名称'},
  {data: 'roleName', title: '角色名称'},
  {data: 'enableFlag', title: '状态'},
  {data: 'bandedWechat', title: '微信'}
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