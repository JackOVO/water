/**
 * 活动服务
 */

import { BusinessFactory } from '../main/business.factory';

export class ActivityService extends BusinessFactory {
  constructor(toastr, $q, $rootScope, dialogService, statusService,dataTableService, productService, activityFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, activityFactory);
    this.statusService = statusService;
    this.productService = productService;
    this.activityFactory = activityFactory;
    this.dataTableColumns = dataTableColumns;
    this.dataTableService = dataTableService;
  }

  columns() {
    this.dataTableColumns[3].render = this.dataTableService.dataRender;
    this.dataTableColumns[4].render = this.dataTableService.dataRender;
    this.dataTableColumns[8].render = this.dataTableService.enableflagRender;
    this.dataTableColumns[9].render = this.dataTableService.activityRender;
    return this.dataTableColumns;
  }

  // 打开编辑页添加依赖数据
  openEditPage(scope, code) {
    let title = '增加活动';

    let binding = {
      a: this.activityFactory.create(),
      products: this.productService.getCombobox(),
      enables: this.statusService.getCombobox('flag'),
      activitys: this.statusService.getCombobox('activity')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改活动';
    } else {
      binding.a.productCodes = ['20151222165755483'];

    }

    scope.fileGroup = [];
scope.$watch('a.productCodes', (code) => {
  console.info(code);
}, true);
    let inputs = [
      {name: '推广名称', model: 'a.activityName', required: true},
      {name: '公众号名称', model: 'a.wechatOriginalName', required: true},
      {name: '公众号logo', model: 'a.wechatLogo', type:'upload',
        upName: 'img1', group:'fileGroup', required: true},
      {name: '公众号二维码', model: 'a.activityImg', type:'upload', 
        upName: 'img2', group:'fileGroup', required: true},
      {name: '活动结束时间', model: 'a.activityBeginTime', type:'datepicker',
        required: true},
      {name: '活动开始时间', model: 'a.activityEndTime',  type:'datepicker', 
        required: true},
      {name: '赠送数量', model: 'a.spreadQuantity', type:'number',
        required: true},
      {name: '渠道ID', model: 'a.wechatQrscene', required: true},
      {
        required: true,
        name: '赠送商品',
        source: 'products',
        type: 'selectGroup',
        model: 'a.productCodes'
      },
      {name: '状态标识', model: 'a.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'},
      {name: '活动类型', model: 'a.activityType', type: 'select',
       source: 'activitys', def: '请选择活动类型'},
      {name: '公众号介绍', model: 'a.activityRemark', type:'textarea',
        required: true}
    ];

    super.openEditDialog(title, inputs, binding, scope)
      .then(({a, uploadFn, files}) => {
        this.add(a, uploadFn);
    });
  }

  // 上传添加封装
  add(entity, uploadFn) {
    let _this = this;
    return this.activityFactory.add(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

//   
// wechatOriginalName
// wechatLogo
// activityImg
// activityBeginTime
// activityEndTime
// spreadQuantity
// wechatQrscene
// productCodes
// enableFlag
// activityType
// activityRemark
}

let dataTableColumns = [
  {data: 'activityName', title: '推广名称'},
  {data: 'wechatOriginalName', title: '公众号名称'},
  {data: 'wechatOriginalId', title: '公众号原始ID'},
  {data: 'activityBeginTime', title: '活动结束时间'},
  {data: 'activityEndTime', title: '活动开始时间'},
  {data: 'spreadQuantity', title: '赠送数量'},
  {data: 'wechatQrscene', title: '渠道ID'},
  {data: 'productCodes', title: '赠送商品'},
  {data: 'enableFlag', title: '是否启用'},
  {data: 'activityType', title: '活动类型'},
  {data: 'activityRemark', title: '公众号介绍'}
];