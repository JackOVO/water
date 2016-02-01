/**
 * 角色控制器
 */

export class RoleController {
  constructor($scope, roleService, competenceService) {
    'ngInject';
    let _this = this;
    this.paging = null;
    this.$scope = $scope;
    this.roleService = roleService;
    this.columns = roleService.dataTableColumns; // 特殊列操作配置

    // 权限树
    let initCheckeds = []; // 初始选中, 用来判读是否更改
    this.isEdited = false; // 是否已经更改过权限
    this.roleCode = null;
    this.roleName = null;
    this.children = null;
    this.checkeds = null;

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({roleCode:r}) => `vm.edit('${r}')`},
        {text: '删', clas: 'danger',
         action: ({roleCode:r, roleName:rn}) => `vm.del('${r}', '${rn}')`
      }]
    };

    // 分页监听
    $scope.$on('roleSearch', (e, paging) => {
      _this.paging = paging;
    });

    // 切换权限树监听
    $scope.$on('competenceToggleTree', (e, childrens) => {
      _this.children = childrens;
    });

    // 监听权限选中id
    $scope.$watch('vm.checkeds', function(checkeds) {
      // 未更改选中结果缓存
      if (initCheckeds === true) { initCheckeds = checkeds; }
      let thStr = checkeds + '';
      let initStr = initCheckeds + '';
      _this.isEdited = thStr !== initStr;
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;
      roleService.search(page);
    };

    // 表格点击相应, 通知权限更新权限树
    this.onTableClick = ({roleCode}) => {
      _this.roleCode = roleCode;

      // 切换权限的树
      competenceService.toggleTree(roleCode).then(() => {
        initCheckeds = true; // 证明下次选中更新, 是当前选中的结果
      });
    }
  }

  // 更新权限
  updCompetence() {
    let _this = this;
    let roleCode = this.roleCode;
    let roleName = this.roleName;
    let checkeds = this.checkeds;

    // 跟新并重新执行行点击方法, 触发树更新
    this.roleService.updCompetence(roleCode, checkeds).then((success) => {
      let obj = {roleCode: roleCode, roleName: roleName};
      if (success === true) { _this.onTableClick(obj); }
    });
  }

  // 添加角色
  add() {
    this.roleService.openEditPage();
  }

  // 编辑
  edit(code) {
    this.roleService.openEditPage(code);
  }

  // 删除
  del(code, name) {
    this.roleService.del(code, name);
  }
}