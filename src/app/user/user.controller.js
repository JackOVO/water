/**
 * 用户控制器
 */

export class UserController {
  constructor($scope, userService) {
    'ngInject';
    let _this = this;
    this.paging = null;
    this.columns = userService.columns();
    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({userCode}) => `vm.edit(${userCode})`},
        {text: '删', clas: 'danger', action: ({userCode}) => `vm.del(${userCode})`}
      ],
      specific: userService.dataTableColumnSpecific
    };

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

    // 分页监听
    $scope.$on('userSearch', function(e, paging) {
      _this.paging = paging;
    });
  }

  edit(code) {
    alert('修改');
  }

  del(code) {
    alert('删除');
  }

  // 绑定微信
  bindWechat(code) {
    alert('绑定');
  }

  // 解绑微信
  unBindWechat(code) {
    alert('解绑');
  }
}