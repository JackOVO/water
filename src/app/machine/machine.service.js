/**
 * 机器服务
 */

import { BusinessFactory } from '../main/business.factory';

export class MachineService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    machineFactory,
    storeService,
    subjectService,
    statusService,
    dataTableService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, machineFactory);
    this.machineFactory = machineFactory;
    this.storeService = storeService;
    this.statusService = statusService;
    this.subjectService = subjectService;
    this.dataTableColumns = dataTableColumns;
    this.dataTableService = dataTableService;
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[6].render = this.dataTableService.machineType;
    this.dataTableColumns[7].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 切换树
  toggleTree(userCode) {
    let _this = this;
    return this.machineFactory.getTreeByUserCode(userCode).then((children) => {
      return _this.globalNotice('toggleTree', children);
    });
  }

  // 获取广告计划选中
  getCheckByAd(code) {
    return this.machineFactory.getCheckByAd(code);
  }

  // 打开详情页
  openInfoPage(code) {
    let _this = this;
    let title = '机器详情';
    let binding = {
      machine: this.machineFactory.getById(code).then((machine) => {
machine.createDate = _this.dataTableService.timeRender(machine.createDate);
machine.updateDate = _this.dataTableService.timeRender(machine.updateDate);
machine.enableFlag = _this.dataTableService.enableflagRender(machine.enableFlag);
        return machine;
      })
    };

    let inputs = [
      {name: '售货机Code', model: 'machine.machineCode'},
      {name: '售货机序列号', model: 'machine.serNum'},
      {name: '售货机名称', model: 'machine.name'},
      {name: '经度', model: 'machine.latitude'},
      {name: '纬度', model: 'machine.longitude'},
      {name: '地址', model: 'machine.address'},
      {name: '商铺名称', model: 'machine.storeName'},
      {name: '投放主体', model: 'machine.deliverySubjectName'},
      {name: '运营主体', model: 'machine.operateSubjectName'},
      {name: '验证token', model: 'machine.token'},
      {name: '备注', model: 'machine.remark', type: 'textarea'},
      {name: '是否启用', model: 'machine.enableFlag'},
      {name: '创建人', model: 'machine.createBy'},
      {name: '创建日期', model: 'machine.createDate'},
      {name: '更新人', model: 'machine.updateBy'},
      {name: '更新时间', model: 'machine.updateDate'},
      {name: '标识位置信息', model: 'machine.locationType'}
    ];

    super.openEditDialog(title, inputs, binding, null, true)
      .then(({machine}) => {
// console.info(machine);
    });
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加机器';

    let binding = {
      machine: this.machineFactory.create(),
      stores: this.storeService.getCombobox().then((stores) => {
        binding.machine.storeCode = stores[0].value;
        return stores;
      }),
      subjects: this.subjectService.getCombobox().then((subjects) => {
        binding.machine.deliverySubjectCode = subjects[0].value;
        binding.machine.operateSubjectCode = subjects[0].value;
        return subjects;
      }),
      types: this.statusService.getCombobox('mType'),
      enables: this.statusService.getCombobox('flag')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改机器';
      binding.machine = this.machineFactory.getById(code).then((machine) =>{
        return machine;
      });
    }
    
    let inputs = [
      {name: '出厂编号', model: 'machine.serNum', required: true},
      {name: '机器名称', model: 'machine.name', required: true},
      {name: '点位主体', model: 'machine.storeCode', type: 'select',
       source: 'stores', def: '请选择点位主体'},
      {name: '启用状态', model: 'machine.enableFlag', type: 'select',
       source: 'enables', def: '请选择启用状态'},
      {name: '投放主体', model: 'machine.deliverySubjectCode', type: 'select',
       source: 'subjects', def: '请选择投放主体'},
      {name: '运营主体', model: 'machine.operateSubjectCode', type: 'select',
       source: 'subjects', m2: 'machine.operateSubjectName', def: '请选择运营主体'},
      {name: '类型', model: 'machine.type', type: 'select',
       source: 'types', def: '请选择类型'}
    ];

    super.openEditDialog(title, inputs, binding).then(({machine}) => {
      if (typeof(machine.machineCode) !== 'undefined') {
delete machine.address;
delete machine.createBy;
delete machine.createDate;
delete machine.latitude;
delete machine.locationType;
delete machine.longitude;
delete machine.token;
delete machine.updateBy;
delete machine.updateDate;
        super.update(machine);
      } else {
        super.add(machine);
      }
    });
  }

  // 删除在封装
  del(machineCode, name) {
    let title = '删除机器(' + name + ')';
    let content = '<p>确认删除该机器吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(machineCode);
    });
  }
}

// 显示列定义
let dataTableColumns = [
  {data:'serNum', title: '编号'},
  {data:'name', title: '名称'},
  {data:'address', title: '地址'},
  {data:'latitude', title: '纬度'},
  {data:'longitude', title: '经度'},
  {data:'operateSubjectName', title: '经营主体'},
  {data:'type', title: '类型'},
  {data:'enableFlag', title: '启用状态'}
];
// serNum: "0100010002"
// deliverySubjectName: "北京慧通达商贸有限公司"
