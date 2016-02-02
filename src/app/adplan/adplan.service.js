/**
 * 广告排期服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdPlanService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    statusService,
    machineService,
    dataTableService,
    adresourceService,
    adPlanFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adPlanFactory);
    this.adPlanFactory = adPlanFactory;
    this.dataTableCloum = dataTableCloum;

    this.statusService = statusService;
    this.machineService = machineService;
    this.dataTableService = dataTableService;
    this.adresourceService = adresourceService;
  }

  columns() {
    this.dataTableCloum[2].render = this.dataTableService.timeRender;
    this.dataTableCloum[3].render = this.dataTableService.timeRender;
    this.dataTableCloum[4].render = this.dataTableService.adTypeRender;
    this.dataTableCloum[5].render = this.dataTableService.enableflagRender;
    return this.dataTableCloum;
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加排期';

    let binding = {
      plan: this.adPlanFactory.create(),
      machines: this.machineService.getCombobox(), // checkbox
      enables: this.statusService.getCombobox('flag'),
      resources: this.adresourceService.getCombobox(),
      status: this.statusService.getCombobox('planStatus')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改排期';
      binding.plan = this.adPlanFactory.getById(code).then((plan) =>{
plan.startTime = new Date(plan.startTime);
plan.endTime = new Date(plan.endTime);
        return plan;
      });
    }
    
    let inputs = [
      {name: '广告资源', model: 'plan.resourceCode', type: 'select',
        source: 'resources', m2: 'plan.resourceName', def: '请选择广告资源'},
      {name: '广告开始时间', model: 'plan.startTime', type: 'datepicker'},
      {name: '广告结束时间', model: 'plan.endTime', type: 'datepicker'},
      {name: '广告状态', model: 'plan.status', type: 'select',
        source: 'status', def: '请选择广告状态'},
      {name: '启用状态', model: 'plan.enableFlag', type: 'select',
        source: 'enables', def: '请选择启用状态'},
      {name: '售货机', model: 'plan.machineCodes', type: 'checkbox',
        source: 'machines', def: '请选择广告资源'}
    ];

    super.openEditDialog(title, inputs, binding).then(({plan}) => {
plan.startTime = plan.startTime.format('yyyy-MM-dd');
plan.endTime = plan.endTime.format('yyyy-MM-dd');
delete plan.createDate;
delete plan.updateDate;
delete plan.createBy;
delete plan.updateBy;
      if (typeof(plan.adUserPlanCode) !== 'undefined') {
        super.update(plan);
      } else {
        super.add(plan);
      }
    });
  }

  // 删除在封装
  del(code, name) {
    let title = '删除资源(' + name + ')';
    let content = '<p>确认删除该排期吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(code);
    });
  }
}

let dataTableCloum = [
  {data: 'adUserPlanCode', title: '资源code'},
  {data: 'resourceName', title: '广告名称'},
  {data: 'startTime', title: '广告开始时间'},
  {data: 'endTime', title: '广告结束时间'},
  {data: 'status', title: '广告状态'},
  {data: 'enableFlag', title: '启用状态'}
];