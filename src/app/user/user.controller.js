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
    this.columns = userService.columns();
    this.machineCheckeds = []; // 选中的机器id数组
    this.defs = {
      ctrlScope: $scope,
      buttons: [{
        text: '改',
        action: ({userCode:u, loginName:l}) => `vm.edit('${u}', '${l}')`
      },{
        text: '删',
        clas: 'danger',
        action: ({userCode:u, loginName:l}) => `vm.del('${u}', '${l}')`
      }],
      specific: userService.dataTableColumnSpecific
    };

    // 分页监听
    $scope.$on('userSearch', function(e, paging) {
      _this.paging = paging;
    });

    $scope.$watch('vm.machineCheckeds', function(checkeds) {
console.info('xxx', checkeds);
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;

      if (params.order.length) {
        let dir = params.order[0].dir,
            index = params.order[0].column;

        let name = params.columns[index].data;
        userService.setOrder({pro: name, dir: dir});
      }

      userService.search(page);
    };

    // 表格点击相应, 通知机器更新权限树
    this.onTableClick = ({userCode}) => {
      machineService.toggleTree(userCode);
    }
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