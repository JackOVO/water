/**
 * 活动统计服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AppService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, dataTableService, statusService, productService, appFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, appFactory);
    this.appFactory = appFactory;
    this.statusService = statusService;
    this.productService = productService;
    this.dataTableService = dataTableService;
    this.dataTableColumns = dataTableColumns;
  }

  columns() {
    this.dataTableColumns[3].render = this.dataTableService.dataRender;
    this.dataTableColumns[4].render = this.dataTableService.dataRender;
    this.dataTableColumns[5].render = this.dataTableService.imgRender;
    this.dataTableColumns[7].render = this.dataTableService.dataRender;
    this.dataTableColumns[8].render = this.dataTableService.downLoadRender;
    this.dataTableColumns[9].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 打开编辑页添加依赖数据
  openEditPage(scope, code) {
    let _this = this;
    let title = '增加推广';

    let binding = {
      app: this.appFactory.create(),
      products: this.productService.getCombobox(),
      enables: this.statusService.getCombobox('flag'),
      requiresL: this.statusService.getCombobox('andrews')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改推广';
      binding.app = this.appFactory.getById(code);
    } else {
      binding.app.spreadOutline = [' '];
    }
    
    let inputs = [
      {name: 'APP名称', model: 'app.activityName', required: true},
      {name: 'APP图标', model: 'app.appLogo', type: 'upload',
        required: true},
      {name: 'APP文件', model: 'app.spreadLink', type: 'upload',
        required: true},
      {
        name: 'APP描述',
        group: 'fileGroup',
        type: 'uploadGroup',
        model: 'app.activityImg', // 数组
        addFnName: 'addProduct',
        delFnName: 'delProduct'
      },
      {name: '开始时间', model: 'app.activityBeginTime', type:'datepicker',
        required: true},
      {name: '结束时间', model: 'app.activityEndTime', type:'datepicker',
       required: true},
      {name: '选择商品', model: 'app.products', type: 'select',
        source: 'products', def: '请选择商品'},
      {name: '商品数量', model: 'app.spreadQuantity', type: 'number',
        required: true},
      {name: '开发商', model: 'app.appDeveloper', required: true},
      {name: '更新日期', model: 'app.update', type:'datepicker',
        required: true},
      {name: '版本号', model: 'app.version', required: true},
      {name: '系统要求', model: 'app.requires', type: 'select',
        source: 'requiresL',  def: '请选择系统要求', required: true},
      {name: '状态标识', model: 'app.enableFlag',  type: 'select',
        source: 'enables', def: '请选择状态标识'},
      {name: '内容概述', model: 'app.spreadOutline', type: 'textarea',
        required: true}
    ];

    scope.addProduct = () => {
      scope.app.spreadOutline.push(' ');
    };
    scope.delProduct = (index) => {
      scope.app.spreadOutline.splice(index, 1);
    };

    super.openEditDialog(title, inputs, binding, scope, true)
      .then(({app, uploadFn, files}) => {
console.info(app);
        let key = app.activityCode ? 'upd' : 'add';
        if (files && files.length) { // 上传
          _this[key](app, uploadFn);
        } else {
          _this[key](app);
        }
    });
  }

  // 上传添加封装
  add(entity, uploadFn) {
    let _this = this;
    formData(entity);
    return this.appFactory.add(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

  // 上传修改封装
  upd(entity, uploadFn) {
    let _this = this;
    formData(entity);
    return this.appFactory.upd(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

  // 删除在封装
  del(activityCode, name) {
    let title = '删除推广(' + name + ')';
    let content = '<p>确认删除该推广吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(activityCode);
    });
  }
}

function formData(entity) {
  let btimeKey = 'activityBeginTime',
      etimeKey = 'activityEndTime',
      utimeKey = 'update';
  if (entity[btimeKey]) {
    entity[btimeKey] = new Date(entity[btimeKey]).format('yyyy-MM-dd');
  }
  if (entity[etimeKey]) {
    entity[etimeKey] = new Date(entity[etimeKey]).format('yyyy-MM-dd');
  }
  if (entity[utimeKey]) {
    entity[utimeKey] = new Date(entity[utimeKey]).format('yyyy-MM-dd');
  }
  return entity;
}




// 数据列定义
let dataTableColumns = [
  {data: 'activityName', title: '推广名称'},
  {data: 'products', title: '赠送商品'},
  {data: 'spreadQuantity', title: '商品数量'},
  {data: 'activityBeginTime', title: '开始时间'},
  {data: 'activityEndTime', title: '结束时间'},
  {data: 'appLogo', title: 'LGOG'},
  {data: 'version', title: '版本号'},
  {data: 'update', title: '更新时间'},
  {data: 'spreadLink', title: '下载'},
  {data: 'enableFlag', title: '是否启用'}
];