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
    this.dataTableColumns[6].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 切换树
  toggleTree(userCode) {
    let _this = this;
    return this.machineFactory.getTreeByUserCode(userCode).then((children) => {
      return _this.globalNotice('toggleTree', children);
    });
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加机器';

    let binding = {
      machine: this.machineFactory.create(),
      stores: this.storeService.getCombobox(),
      subjects: this.subjectService.getCombobox(),
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
       source: 'subjects', m2: 'machine.operateSubjectName', def: '请选择运营主体'}
    ];

    super.openEditDialog(title, inputs, binding).then(({machine}) => {
      if (typeof(machine.code) !== 'undefined') {
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
  {data:'code', title: '编号'},
  {data:'name', title: '名称'},
  {data:'address', title: '地址'},
  {data:'latitude', title: '纬度'},
  {data:'longitude', title: '经度'},
  {data:'operateSubjectName', title: '经营主体'},
  {data:'enableFlag', title: '启用状态'}
];
// serNum: "0100010002"
// deliverySubjectName: "北京慧通达商贸有限公司"
