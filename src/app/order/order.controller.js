/**
 * 运营控制器
 */

export class OrderController {
  constructor($scope, $state, orderService) {
    'ngInject';
    let _this = this;
    this.title = '订单列表';

    this.paging = null;
    this.columnDefs = {};
    this.orderService = orderService;
    this.columns = orderService.column(); // 数据列定义
    this.status = [{value: 0, text: '未确认'},
                    {value: 1, text: '已确认'},
                     {value: 2, text: '已完成'},
                      {value: 3, text: '已取消'}];

    // 按钮配置
    this.btns = [{
      name: '下载Excel', icon: 'fa-download', click: this.download
    }];

    this.defs = {
      ctrlScope: $scope,
      buttons: [
        {text: '详情', action: ({id:id}) => `vm.info('${id}')`}
      ]
    };

    // 搜索工具条配置
    this.tools = {
      inputs: [{
        type: 'datepicker', valKey: 'startDate',
        clas: 'col-md-2', placeholder: '开始时间'
      }, {
        type: 'datepicker', valKey: 'endDate',
        clas: 'col-md-2', placeholder: '结束时间',
        setHours: '23'
      }, {
        type: 'select', valKey: 'orderStatus', source: 'vm.status',
        clas: 'col-md-2', placeholder: '选择订单状态'
      }, {
        type: 'search',
        clas: 'col-md-5 col-md-offset-1',
        reset: 'vm.reset',
        search: 'vm.search',
        valKey: 'searchValue',
        parKey: 'searchProperty',
        placeholder: '输入查询的值',
        downbar: [{value: 'sn', text: '订单编号'},
                  {value: 'consignee', text: '客户名称'},
                  {value: 'productName', text: '商品名称'},
                  {value: 'vmName', text: '机器名称'}]
      }]
    };

    // 搜索回调监听
    $scope.$on('orderSearch', (e, paging) => {
      this.paging = paging;
    });

    // 翻页方法
    this.turn = (params) => {
      let page = params.page;
      _this.orderService.search(page).then(() => {
        $state.go('.', {page: page}, {notify: false});
      });
    };

    // 清空方法
    this.reset = () => {
      orderService.search(1, undefined, {});
    };
  }

  // 详情
  info(id) {
    this.orderService.openInfoPage(id);
  }

  // 搜索
  search(sobj) {
    // this.loading = true;
    this.orderService.search(1, undefined, sobj);
  }

  // 下载
  download(vm) {
    vm.orderService.download();
  }
}