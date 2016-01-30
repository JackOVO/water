/**
 * 运营控制器
 */


export class ProductController {
  constructor($scope, $state, productService) {
    'ngInject';
    this.productService = productService;

    this.paging = null;
    this.title = '商品列表';
    this.columns = productService.columns(); // 数据列定义
    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '改', action: ({sn:s}) => `vm.edit('${s}')`},
        {text: '删', clas: 'danger', action: ({sn:s, name:n}) => `vm.del('${s}', '${n}')`}]
    };

    // 按钮配置
    this.btns = [{
      name: '新增商品', icon: 'fa-plus', click: this.add
    }];

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'search',
        clas: 'col-md-offset-8 col-md-4',
        reset: 'vm.reset',
        search: 'vm.search',
        valKey: 'searchValue',
        placeholder: '按商品名称查询'
      }]
    };

    // 商品回调监听
    $scope.$on('productSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      productService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };

    this.reset = () => {
      productService.search(1, {});
      $state.go('.', {page: 1}, {notify: false});
    };
  }

  // 搜索
  search(sobj) {
    sobj.searchProperty = 'name'; // 商品名称
    this.productService.search(1, sobj);
  }

  // 新增
  add(vm) {
    vm.productService.openEditPage();
  }

  // 编辑
  edit(code) {
    this.productService.openEditPage(code);
  }

  // 删除
  del(code, name) {
    this.productService.del(code, name);
  }
}