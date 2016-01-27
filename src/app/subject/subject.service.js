/**
 * 公司服务模块
 */

import { BusinessFactory } from '../main/business.factory';

export class SubjectService extends BusinessFactory {
  constructor(toastr, $rootScope,  dialogService, subjectFactory, statusService, dataTableService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, subjectFactory);
    this.dataTableColumns = dataTableColumns;
    this.statusService = statusService;
    this.subjectFactory = subjectFactory;
    this.dataTableService = dataTableService;
  }

  columns() {
    this.dataTableColumns[4].render = this.dataTableService.enableflagRender;
    return this.dataTableColumns;
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加公司';

    let binding = {
      subject: this.subjectFactory.create(),
      enables: this.statusService.getCombobox('flag')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改公司';
      binding.subject = this.subjectFactory.getById(code).then((subject) =>{
        return subject;
      });
    }
    
    let inputs = [
      {name: '公司名称', model: 'subject.name', required: true},
      {name: '公司地址', model: 'subject.address', required: true},
      {name: '主营业务', model: 'subject.business', required: true},
      {name: '备注', model: 'subject.remark', type: 'textarea'},
      {name: '管理员姓名', model: 'subject.linkmanName', required: true},
      {name: '管理员电话', model: 'subject.linkmanTel', required: true},
      {name: '管理员QQ', model: 'subject.linkmanQq', required: true},
      {name: '管理员账号', model: 'subject.loginName', required: true},
      {name: '管理员密码', model: 'subject.password', type:'password', required: true},
      {name: '是否启用', model: 'subject.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'}
    ];

    super.openEditDialog(title, inputs, binding).then(({subject}) => {
      console.info(subject);
      super.add(subject);
      // if (typeof(user.userCode) !== 'undefined') {
      //   if (pwd === user.password) { delete user.password; }
      //   super.update(user);
      // } else {
      //   super.add(user);
      // }
    });
  }

  // 删除在封装
  del(subjectCode, name) {
    let title = '删除公司(' + name + ')';
    let content = '<p>确认删除该公司吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(subjectCode);
    });
  }
}

// 显示列定义
let dataTableColumns = [
  {data:'name', title: '公司名称'},
  {data:'address', title: '公司地址'},
  {data:'linkmanName', title: '联系人名称'},
  {data:'linkmanTel', title: '联系人电话'},
  {data:'enableFlag', title: '状态'}
];





