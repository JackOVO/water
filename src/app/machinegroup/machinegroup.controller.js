/**
 * 分组控制器
 */

export class MachinegroupController {
  constructor($scope, machineGroupService) {
    'ngInject';
    let _this = this;
    this.machineGroupService = machineGroupService;
    
    this.paging = null;
    this.title = '分组列表';
    this.columns = machineGroupService.columns();

    // 机器树
    let initCheckeds = []; // 初始选中, 用来判读是否更改
    this.code = null; // 组的code
    this.isEdited = false; // 是否已经更改过权限
    this.children = null;
    this.checkeds = null;

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({code:c}) => `vm.edit('${c}')`},
        {text: '删', clas: 'danger',
          action: ({code:c, name:n}) => `vm.del('${c}', '${n}')`
        }]
    };

    // 监听权限选中id
    $scope.$watch('vm.checkeds', function(checkeds) {
      // 未更改选中结果缓存
      if (initCheckeds === true) { initCheckeds = checkeds; }
      let thStr = checkeds + '';
      let initStr = initCheckeds + '';
      _this.isEdited = thStr !== initStr;
    });

    // 分页监听
    $scope.$on('machinegroupSearch', (e, paging) => {
      this.paging = paging;
    });

    // 切换权限树监听
    $scope.$on('machinegroupGetMachineTree', (e, childrens) => {
      this.children = childrens;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      machineGroupService.search(page);
    };

    // 表格点击相应, 通知权限更新权限树
    this.onTableClick = ({code}) => {
      this.code = code;
      machineGroupService.getMachinesTree(code).then(() => {
        initCheckeds = true; // 证明下次选中更新, 是当前选中的结果
      });
    }

    // updMachineTree
    this.updMachine = () => {
      let code = this.code;
      let codes = this.checkeds;

      // 跟新并重新执行行点击方法, 触发树更新
      this.machineGroupService.updMachineTree(code, codes).then((success) => {
        if (success === true) { _this.onTableClick({code: code}); }
      });
    }
  }

  add() {
    this.machineGroupService.openEditPage();
  }

  edit(code) {
    this.machineGroupService.openEditPage(code);
  }

  del(code, name) {
    this.machineGroupService.del(code, name);
  }
}