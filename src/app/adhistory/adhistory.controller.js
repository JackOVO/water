/**
 * 广告历史控制器
 */

export class AdHistoryController {
  constructor($scope, $state, adHistoryService) {
    'ngInject';

    this.title = '排期列表';
    this.paging = null;
    this.columns = adHistoryService.columns();

    $scope.$on('adhistorySearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页请求
    this.turn = (params) => {
      let page = params.page;
      adHistoryService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };
  }
}