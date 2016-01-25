/**
 * 角色服务
 */

import { BusinessFactory } from '../main/business.factory';

export class RoleService extends BusinessFactory {
  constructor(
    toastr,
    $rootScope,
    dialogService,
    roleFactory,
    statusService,
    subjectService) {
    'ngInject'

    super(toastr, $rootScope, dialogService, roleFactory);
    this.roleFactory = roleFactory;
    this.statusService = statusService;
    this.subjectService = subjectService;

    this.dataTableColumns = dataTableColumns;
  }

  // 初始化
  init() {
    this.search(1);
  }

  //封装, 需要subjectCode
  getCombobox(code) {
    return this.roleFactory.getCombobox(code);
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加角色';

    let binding = {
      role: this.roleFactory.create(),
      enables: this.statusService.getCombobox('flag'),
      subjects: this.subjectService.getCombobox()
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改角色';
      binding.role = this.roleFactory.getById(code);
    }

    let inputs = [
      {name: '角色名称', model: 'role.roleName', required: true },
      {name: '所属公司', model: 'role.subjectCode', type: 'select',
       source: 'subjects', m2: 'role.subjectName', def: '请选择所属公司'},
      {name: '状态标识', model: 'role.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'},
      {name: '备注', model: 'role.remark', type: 'textarea'}];

    super.openEditDialog(title, inputs, binding).then(({role}) => {
      if (typeof(role.roleCode) !== 'undefined') {
        super.update(role);
      } else {
        super.add(role);
      }
    });
  }

  // 更新权限
  updCompetence(roleCode, checkeds) {
    return this.roleFactory.updCompetence(roleCode, checkeds).
      then((msg) => {
        let o = msg.success === true ? 'success' : 'error';
        super.showToastr(msg.content, o);
        return msg.success;
    });
  }

  // 删除在封装
  del(roleCode, roleName) {
    let title = '删除角色(' + roleName + ')';
    let content = '<p>确认删除该角色吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(roleCode);
    });
  }

}

// 列定义
let dataTableColumns = [
  {data: 'roleName', 'title': '角色名称'},
  {data: 'subjectName', 'title': '所属公司'}
];