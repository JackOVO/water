/**
 * 广告资源服务
 */

import { BusinessFactory } from '../main/business.factory';

export class AdresourceService extends BusinessFactory {
  constructor(toastr, $rootScope, dialogService, dataTableService, statusService, adresourceFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, adresourceFactory);
    this.statusService = statusService;
    this.dataTableCloum = dataTableCloum;
    this.dataTableService = dataTableService;
    this.adresourceFactory = adresourceFactory;
  }

  columns() {
    this.dataTableCloum[3].render = this.dataTableService.imgLinkRender;
    this.dataTableCloum[5].render = this.dataTableService.enableflagRender;
    this.dataTableCloum[2].render = this.dataTableService.mediaTypesRender;
    return this.dataTableCloum;
  }

    // 打开编辑页添加依赖数据
    openEditPage(code) {
      let _this = this;
      let title = '增加资源';

      let binding = {
        resource: this.adresourceFactory.create(),
        enables: this.statusService.getCombobox('flag'),
        mediaTypes: this.statusService.getCombobox('media'),
        uploadAddVerification: (files, countSize) => {

          if (binding.resource.type === 'PICTURE') {
            return countSize < 10000000 || '资源类型为图片时, 文件大小不能大于10!';
          } else if(binding.resource.type === 'VIDEO') {
            return countSize < 50000000 || '资源类型为视频时, 文件大小不能大于50!';
          } else {
            return '请先选择资源类型, 在添加文件!';
          }
        }
      };

      // 存在code即识别为编辑状态
      if (code) {
        title = '修改资源';
        binding.resource = this.adresourceFactory.getById(code).then((resource) =>{
          return resource;
        });
      }
      
      let inputs = [
        {name: '资源名称', model: 'resource.name', required: true},
        {name: '是否启用', model: 'resource.enableFlag', type: 'select',
         source: 'enables', def: '请选择启用状态'},
        {name: '资源类型', model: 'resource.type', type: 'select',
         source: 'mediaTypes', def: '请选择资源类型'},
        {name: '上传文件', model: 'resource.resourceUrl', type: 'upload',
         upName: 'img', verification: 'uploadAddVerification'},
        {name: '备注', model: 'resource.remark', type: 'textarea'}
      ];

      super.openEditDialog(title, inputs, binding)
        .then(({resource, uploadFn, files}) => {
          let key = resource.code ? 'upd' : 'add';
          if (files && files.length) { // 上传
            _this[key](resource, uploadFn);
          } else {
            _this[key](resource);
          }
      });
    }

    // 上传添加封装
    add(entity, uploadFn) {
      let _this = this;
      return this.adresourceFactory.add(entity, uploadFn).then((msg) => {
        _this.refreshList(msg);
        return msg;
      });
    }

    // 修改添加封装
    upd(entity, uploadFn) {
      let _this = this;
      return this.adresourceFactory.upd(entity, uploadFn).then((msg) => {
        _this.refreshList(msg);
        return msg;
      });
    }

    // 删除在封装
    del(adResourceCode, name) {
      let title = '删除资源(' + name + ')';
      let content = '<p>确认删除该资源吗?</p>';

      super.confirmDialog(title, content).then(() => {
        return super.del(adResourceCode);
      });
    }
}

let dataTableCloum = [
  {data: 'code', title: '广告Code'},
  {data: 'name', title: '资源名称'},
  {data: 'type', title: '资源类型'},
  {data: 'resourceUrl', title: '资源储存'},
  {data: 'remark', title: '备注信息'},
  {data: 'enableFlag', title: '是否启用'},
  // {data: 'subjectCode', title: '公司Code'},
  {data: 'subjectName', title: '公司名称'}
];




