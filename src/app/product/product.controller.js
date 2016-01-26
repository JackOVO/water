/**
 * 运营控制器
 */


export class ProductController {
  constructor($scope, $state, productService) {
    'ngInject';

    this.paging = null;
    this.columns = productService.columns(); // 数据列定义

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
  }
}