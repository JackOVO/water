/**
 * 机器分组服务
 */

import { BusinessFactory } from '../main/business.factory';

export class MachineGroupService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    statusService,
    subjectService,
    machineGroupFactory,
    dataTableService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, machineGroupFactory);
    this.statusService = statusService;
    this.subjectService = subjectService;
    this.dataTableColumns = dataTableColumns;
    this.dataTableService = dataTableService;
    this.machineGroupFactory = machineGroupFactory;
  }

  // 附加列处理
  columns() {
    this.dataTableColumns[2].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 初始化
  init() {
    return super.search(1);
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加分组';

    let binding = {
      subjects: this.subjectService.getCombobox(),
      enables: this.statusService.getCombobox('flag'),
      machinegroup: this.machineGroupFactory.create()
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改分组';
      binding.machinegroup = this.machineGroupFactory.getById(code);
    }

    let inputs = [
      {name: '分组名称', model: 'machinegroup.name', required: true },
      {name: '所属主体', model: 'machinegroup.subjectCode', type: 'select',
       source: 'subjects', m2: 'machinegroup.subjectName', def: '请选择所属主体'},
      {name: '状态标识', model: 'machinegroup.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'},
      {name: '备注', model: 'machinegroup.remark', type: 'textarea'}];

    super.openEditDialog(title, inputs, binding).then(({machinegroup}) => {
      if (typeof(machinegroup.code) !== 'undefined') {
        super.update(machinegroup);
      } else {
        super.add(machinegroup);
      }
    });
  }

  // 删除在封装
  del(code, name) {
    let title = '删除分组(' + name + ')';
    let content = '<p>确认删除该分组吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(code);
    });
  }

  // 获取机器树
  getMachinesTree(code) {
    let _this = this;
    return this.machineGroupFactory.getMachineTreeByGroupCode(code).then((tree) => {
      return _this.globalNotice('getMachineTree', tree);
    });
  }

  // 修改机器树
  updMachineTree(code, codes) {
    return this.machineGroupFactory.updMachineTree(code, codes).then((msg) => {
      let o = msg.success === true ? 'success' : 'error';
      super.showToastr(msg.content, o);
      return msg.success;
    });
  }
}

// 显示列定义
let dataTableColumns = [
  {data:'code', title: '编号'},
  {data:'name', title: '名称'},
  {data:'enableFlag', title: '启用状态'}
];