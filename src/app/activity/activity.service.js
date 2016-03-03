/**
 * 活动服务
 */

import { Options } from '../main/model';
import { BusinessFactory } from '../main/business.factory';

export class ActivityService extends BusinessFactory {
  constructor(toastr, $q, $rootScope, dialogService, statusService, dataTableService, machineService, machineGroupService, productService, activityFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, activityFactory);
    this.statusService = statusService;
    this.machineService = machineService;
    this.productService = productService;
    this.activityFactory = activityFactory;
    this.dataTableColumns = dataTableColumns;
    this.dataTableService = dataTableService;
    this.machineGroupService = machineGroupService;
  }

  columns() {
    this.dataTableColumns[3].render = this.dataTableService.dataRender;
    this.dataTableColumns[4].render = this.dataTableService.dataRender;
    this.dataTableColumns[9].render = this.dataTableService.activityRender;
    this.dataTableColumns[7].render = (list) => {
      let html = [];
      for (let index in list) { html.push(list[index].name); }
      return html.join(',');
    };
    this.dataTableColumns[8].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 在封装
  getById(code) {
    return this.activityFactory.getById(code).then((res) => {
      let activity = res[0], selMachineCodes = res[1];
      activity.machineCodes = selMachineCodes;
      return activity;
    });
  }

  // 打开编辑页添加依赖数据
  openEditPage(scope, code) {
    let _this = this;
    let title = '增加活动';

    let binding = {
      a: this.activityFactory.create(),
      activitys: [new Options(1, '一分钱喝')],
      productx: this.productService.getCombobox().then((ary) => {
        // 非编辑下默认一项
        if (!code) { scope.a.productCodes = [ary[0].value]; }
        return ary;
      }),
      machines: this.machineService.getCombobox(), // checkbox
      enables: this.statusService.getCombobox('flag'),
      machineGroups: this.machineGroupService.getCombobox()
      // new Options(2, 'app推广')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改活动';
      binding.a = this.getById(code).then((activity) => {
activity.productCodes = [];
for (let index in activity.products) {
  activity.productCodes.push(activity.products[index].sn);
}
activity.activityEndTime = new Date(activity.activityEndTime);
activity.activityBeginTime = new Date(activity.activityBeginTime);

activity.codes = activity.codes || [];
activity.machineCodes = activity.machineCodes || [];

// console.info(activity);
        return activity;
      });
    }

    let inputs = [
      {name: '推广名称', model: 'a.activityName', required: true},
      {name: '公众号名称', model: 'a.wechatOriginalName', required: true},
      {name: '公众号logo', model: 'a.wechatLogo', type:'upload',
        upName: 'WECHAT_LOGO', group:'fileGroup', required: true},
      {name: '公众号二维码', model: 'a.activityImg', type:'upload',
        upName: 'ACTIVITY_IMG', group:'fileGroup', required: true},
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
        source: 'productx',
        type: 'selectGroup',
        model: 'a.productCodes', // 数组
        addFnName: 'addProduct',
        delFnName: 'delProduct'
      },
      {name: '状态标识', model: 'a.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'},
      {name: '活动类型', model: 'a.activityType', type: 'select',
       source: 'activitys', def: '请选择活动类型'},
      {name: '售货机', type: 'tabs', inputs: [
        {name: '机器关联', model: 'a.machineCodes', type: 'checkbox',
          source: 'machines'},
        {name: '分组关联', model: 'a.codes', type: 'checkbox',
          source: 'machineGroups'}
      ]},
      {name: '公众号介绍', model: 'a.activityRemark', type:'textarea',
        required: true}
    ];

scope.addProduct = () => {scope.a.productCodes.push(scope.a.productCodes[0]);};
scope.delProduct = (index) => { scope.a.productCodes.splice(index, 1); };

    super.openEditDialog(title, inputs, binding, scope, true)
      .then(({a, uploadFn, files}) => {
        let key = a.activityCode ? 'upd' : 'add';

delete a.products;
delete a.createDate;
delete a.modifyDate;

// 有codes就为分组提交
if (a.codes && a.codes.length) {
  a.type = 1; // 分组提交- -
} else {
  a.type = 0; // 机器提交
  a.codes = a.machineCodes;
}
delete a.machineCodes;

        if (files && files.length) { // 上传
          _this[key](a, uploadFn);
        } else {
          _this[key](a);
        }
    });
  }

  // 上传添加封装
  add(entity, uploadFn) {
    let _this = this;
    formData(entity);
    return this.activityFactory.add(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

  // 上传修改封装
  upd(entity, uploadFn) {
    let _this = this;
    formData(entity);
    return this.activityFactory.upd(entity, uploadFn).then((msg) => {
      _this.refreshList(msg);
      return msg;
    });
  }

  // 删除在封装
  del(activityCode, name) {
    let title = '删除活动(' + name + ')';
    let content = '<p>确认删除该活动吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(activityCode);
    });
  }

  // Hjsdlfjslfjksjdfk
  getMachines(code) {
    let _this = this;
    return this.activityFactory.getMachines(code).then((children) => {
      return _this.globalNotice('toggleMachines', children);
    });
  }
}

function formData(entity) {
  // let btimeKey = 'activityBeginTime',
  //     etimeKey = 'activityEndTime';
  // if (entity[btimeKey]) {
  //   entity[btimeKey] = new Date(entity[btimeKey]).format('yyyy-MM-dd');
  // }
  // if (entity[etimeKey]) {
  //   entity[etimeKey] = new Date(entity[etimeKey]).format('yyyy-MM-dd');
  // }
  return entity;
}

let dataTableColumns = [
  {data: 'activityName', title: '推广名称'},
  {data: 'wechatOriginalName', title: '公众号名称'},
  {data: 'wechatOriginalId', title: '公众号原始ID'},
  {data: 'activityBeginTime', title: '活动结束时间'},
  {data: 'activityEndTime', title: '活动开始时间'},
  {data: 'spreadQuantity', title: '赠送数量'},
  {data: 'wechatQrscene', title: '渠道ID'},
  {data: 'products', title: '赠送商品'},
  {data: 'enableFlag', title: '是否启用'},
  {data: 'activityType', title: '活动类型'},
  {data: 'activityRemark', title: '公众号介绍'}
];