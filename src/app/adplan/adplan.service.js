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
    machineGroupService,
    adPlanFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adPlanFactory);
    this.adPlanFactory = adPlanFactory;
    this.dataTableCloum = dataTableCloum;

    this.statusService = statusService;
    this.machineService = machineService;
    this.dataTableService = dataTableService;
    this.adresourceService = adresourceService;
    this.machineGroupService = machineGroupService;
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
      types: this.statusService.getCombobox('adplanType'),
      machines: this.machineService.getCombobox(), // checkbox
      machineGroups: this.machineGroupService.getCombobox(),
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
plan.codes = [];
        return plan;
      });
    }
    
    let inputs = [
      {name: '广告资源', model: 'plan.resourceCode', type: 'select',
        source: 'resources', m2: 'plan.resourceName', def: '请选择广告资源'},
      {name: '开始时间', model: 'plan.startTime', type: 'datepicker'},
      {name: '结束时间', model: 'plan.endTime', type: 'datepicker'},
      {name: '广告状态', model: 'plan.status', type: 'select',
        source: 'status', def: '请选择广告状态'},
      {name: '启用状态', model: 'plan.enableFlag', type: 'select',
        source: 'enables', def: '请选择启用状态'},
      // {name: '售货机', model: 'plan.machineCodes', type: 'checkbox',
      //   source: 'machines', def: '请选择广告资源'},
      {name: '售货机', type: 'tabs', inputs: [
        {name: '机器关联', model: 'plan.machineCodes', type: 'checkbox',
          source: 'machines'},
        {name: '分组关联', model: 'plan.codes', type: 'checkbox',
          source: 'machineGroups'}
      ]}
    ];

    super.openEditDialog(title, inputs, binding).then(({plan}) => {
plan.startTime = plan.startTime.format('yyyy-MM-dd');
plan.endTime = plan.endTime.format('yyyy-MM-dd');
delete plan.createDate;
delete plan.updateDate;
delete plan.createBy;
delete plan.updateBy;
if (plan.codes && plan.codes.length) {
  plan.type = 1; // 分组提交- -
} else {
  plan.type = 0;
}
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

  getMachines(code) {
    let _this = this;
    let data = [{"address":"北京市海淀区苏州街鼎钧大厦D座220","code":"20151222163135374","createBy":"慧通达管理员","createDate":1450773095000,"deliverySubjectCode":"20151013133607654","deliverySubjectName":"北京慧通达商贸有限公司","enableFlag":"Enable","latitude":"39.9735537680","locationType":1,"longitude":"116.3050357885","name":"苏州街测试机2","operateSubjectCode":"20151013133607654","operateSubjectName":"北京慧通达商贸有限公司","remark":"","serNum":"0000000002","storeCode":"20151222162547531","storeName":"苏州街","token":"7ef2740cb29345d3b4960b76e4ee6b0e","type":1,"updateBy":"慧通达管理员","updateDate":1450953742000},{"address":"北京市交道口新华文化大厦","code":"20151222164124738","createBy":"超级管理员","createDate":1450773684000,"deliverySubjectCode":"20151013133607654","deliverySubjectName":"北京慧通达商贸有限公司","enableFlag":"Enable","latitude":"39.9402042705","locationType":1,"longitude":"116.4082787542","name":"新华文化大厦大厅","operateSubjectCode":"20151013133607654","operateSubjectName":"北京慧通达商贸有限公司","remark":"","serNum":"0100010001","storeCode":"20151222163637806","storeName":"新华文化大厦大厅","token":"6cacb5cb16ba45cfafbaae9a2be67bdf","type":1,"updateBy":"超级管理员","updateDate":1450953615000},{"address":"北京市海淀区海淀大街34号海置创投大厦7层","code":"20151222164218300","createBy":"超级管理员","createDate":1450773738000,"deliverySubjectCode":"20160104150400944","deliverySubjectName":"北京慧通达商贸有限公司","enableFlag":"Enable","latitude":"39.9821458489","locationType":1,"longitude":"116.3076639822","name":"创业邦","operateSubjectCode":"20151013133607654","operateSubjectName":"北京慧通达商贸有限公司","remark":"","serNum":"0100010002","storeCode":"20151222164006680","storeName":"创业邦","token":"6b10275f28c843bfb6645a8460707bc8","type":1,"updateBy":"超级管理员","updateDate":1450953461000}];
    return _this.globalNotice('toggleMachines', data);
    // return this.adPlanFactory.getMachines(code).then((children) => {
    //   return _this.globalNotice('machines', children);
    // });
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