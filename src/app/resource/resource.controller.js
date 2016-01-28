/**
 * 权限(资源)控制器
 */

export class ResourceController {
  constructor($scope, resourceService) {
    'ngInject';
    let _this = this;
    this.title = '权限树';
    this.resourceService = resourceService;

    // 点击树节点回调
    this.clickNode = ({id, text}) => {
      _this.code = id;
      _this.name = text;
      $scope.$apply();
    };

    // 监听初始化
    $scope.$on('resourceTree', (e, tree) => {
      this.tree = tree;
    });
  }

  add() {
    this.resourceService.openEditPage(null, this.code);
  }

  edit() {
    let _this = this;
    this.resourceService.openEditPage(this.code).then(() => {
      _this.code = null;
      _this.name = null;
    });
  }

  del() {
    let _this = this;
    if (!this.code) { return; }

    this.resourceService.del(this.code, this.name).then(() => {
      _this.code = null;
      _this.name = null;
    });
  }
}