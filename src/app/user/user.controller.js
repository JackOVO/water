/**
 * 用户控制器
 */

export class UserController {
  constructor($scope, userService, machineService) {
    'ngInject';
    let _this = this;
    this.paging = null;
    this.$scope = $scope;
    this.userService = userService;
    this.columns = userService.columns(); // 特殊列操作配置

    // 数据权限相关
    let initCheckeds = []; // 初始选中, 用来判读是否更改
    this.isEdited = false; // 是否已经更改过权限
    this.userCode = null;
    this.loginName = ''; // 选中的登录名称(datatable)
    this.machineCheckeds = []; // 选中的机器id数组

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({userCode:u}) => `vm.edit('${u}')`},
        {text: '删', clas: 'danger',
          action: ({userCode:u, loginName:l}) => `vm.del('${u}', '${l}')`
        }],
      specific: userService.dataTableColumnSpecific
    };

    // 分页监听
    $scope.$on('userSearch', function(e, paging) {
      _this.paging = paging;
    });

    // 监听机器选中id
    $scope.$watch('vm.machineCheckeds', function(checkeds) {
      // 未更改选中结果缓存
      if (initCheckeds === true) { initCheckeds = checkeds; }
      let thStr = checkeds + '';
      let initStr = initCheckeds + '';
      _this.isEdited = thStr !== initStr;
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;
      // 不需要的排序, 后台暂不支持
      // if (params.order.length) {
      //   let dir = params.order[0].dir,
      //       index = params.order[0].column;

      //   let name = params.columns[index].data;
      //   userService.setOrder({pro: name, dir: dir});
      // }
      userService.search(page);
    };

    // 表格点击相应, 通知机器更新权限树
    this.onTableClick = ({userCode, loginName}) => {
      _this.userCode = userCode;
      _this.loginName = loginName;

      // 切换机器的树
      machineService.toggleTree(userCode).then(() => {
        initCheckeds = true; // 证明下次选中更新, 是当前选中的结果
      });
    }
  }

  // 更新资源
  updResource() {
    let _this = this;
    let userCode = this.userCode;
    let loginName = this.loginName;
    let checkeds = this.machineCheckeds;

    // 跟新并重新执行行点击方法, 触发树更新
    this.userService.updMachineResource(userCode, checkeds).then((success) => {
      let obj = {userCode: userCode, loginName: loginName};
      if (success === true) { _this.onTableClick(obj); }
    });
  }

  // 添加用户
  add() {
    let scope = this.$scope;
    this.userService.openEditPage(scope);
  }

  // 编辑用户
  edit(code) {
    let scope = this.$scope;
    this.userService.openEditPage(scope, code);
  }

  // 删除用户
  del(code, name) {
    this.userService.del(code, name);
  }

  // 绑定微信
  bindWechat(code, name) {
    this.userService.openWechatQRImg(code, name);
  }

  // 解绑微信
  unBindWechat(code, name) {
    this.userService.unbindWechat(code, name);
  }
}