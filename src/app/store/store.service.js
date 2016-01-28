/**
 * 点位服务
 */

import { BusinessFactory } from '../main/business.factory';

export class StoreService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, storeFactory, subjectService) {
    'ngInject';

    super(toastr, $rootScope, dialogService, storeFactory);
    this.storeFactory = storeFactory;
    this.dataTableColumns = dataTableColumns;

    this.subjectService = subjectService;
  }

  // 打开编辑页添加依赖数据
  openEditPage(code) {
    let title = '增加点位';

    let binding = {
      store: this.storeFactory.create(),
      subjects: this.subjectService.getCombobox()
    };

    // 存在code即识别为编辑状态
    if (code) {
      title = '修改点位';
      binding.store = this.storeFactory.getById(code).then((store) =>{
        return store;
      });
    }name
    
    let inputs = [
      {name: '名称', model: 'store.name', required: true},
      {name: '地址', model: 'store.address', required: true},
      {name: '纬度', model: 'store.latitude', required: true},
      {name: '经度', model: 'store.longitude', required: true},
      {name: '经营主体', model: 'store.subjectCode', type: 'select',
       source: 'subjects', m2: 'store.subjectName', def: '请选择点位主体'},
      {name: '备注', model: 'store.remark', type: 'textarea'}];

    super.openEditDialog(title, inputs, binding).then(({store}) => {
      if (typeof(store.code) !== 'undefined') {
        super.update(store);
      } else {
        super.add(store);
      }
    });
  }

  // 删除在封装
  del(storeCode, name) {
    let title = '删除点位(' + name + ')';
    let content = '<p>确认删除该点位吗?</p>';

    super.confirmDialog(title, content).then(() => {
      return super.del(storeCode);
    });
  }
}

// 列定义
let dataTableColumns = [
  {data: 'code', title: 'ID'},
  {data: 'name', title: '名称'},
  {data: 'address', title: '地址'},
  {data: 'latitude', title: '纬度'},
  {data: 'longitude', title: '经度'},
  {data: 'subjectName', title: '经营主体名称'}
];