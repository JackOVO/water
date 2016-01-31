/**
 * 权限(资源)服务
 */

import { BusinessFactory } from '../main/business.factory';

export class ResourceService extends BusinessFactory {
  constructor(toastr,
    $rootScope,
    dialogService,
    resourceFactory,
    statusService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, resourceFactory);
    this.statusService = statusService;
    this.resourceFactory = resourceFactory;
  }

  // 路由初始化
  init() {
    let _this = this;
    this.resourceFactory.getTree().then((tree) => {
      return _this.globalNotice('tree', tree);
    });
  }

  // 打开编辑页添加依赖数据
  openEditPage(code, pcode) {
    let title = '增加权限';

    let binding = {
      resource: this.resourceFactory.create(),
      types: this.statusService.getCombobox('menu'),
      enables: this.statusService.getCombobox('flag')
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改权限';
      binding.resource = this.resourceFactory.getById(code).then((resource) =>{
        return resource;
      });
    }

    let inputs = [
      {name: '权限名称', model: 'resource.name', required: true},
      {name: '资源控制的url', model: 'resource.url', required: true},
      {name: '权限代码', model: 'resource.permission', required: true},
      {name: '资源权限类型', model: 'resource.type', type: 'select',
       source: 'types', def: '请选择权限类型'},
      {name: '排序字段', model: 'resource.orderBy', type:'number', required: true},
      {name: '是否启用', model: 'resource.enableFlag', type: 'select',
       source: 'enables', def: '请选择状态标识'},
      {name: '备注', model: 'resource.remark', type: 'textarea'}
    ];

    return super.openEditDialog(title, inputs, binding).then(({resource}) => {
      if (typeof(resource.code) !== 'undefined') {
        // 无法修改url
        super.update(resource);
      } else {
        if (pcode) { resource['parentCode'] = pcode; }
        super.add(resource);
      }
    });
  }

  /**
   * 刷新列表
   * @param  {Object} msg  应该是消息对象
   * @param  {Number} page 刷新的页码
   */
  refreshList(msg) {
    let oper = msg.success === true ? 'success' : 'error';
    this.init();
    this.showToastr(msg.content, oper);
  }

  // 删除在封装
  del(code, name) {
    let title = '删除权限('+ name +')';
    let content = '<p>确认删除该权限吗?</p>';

    return super.confirmDialog(title, content).then(() => {
      return super.del(code);
    });
  }
}

