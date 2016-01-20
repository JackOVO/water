/**
 * ngDialog封装服务
 */

export class DialogService {
  constructor($q, ngDialog) {
    'ngInject';

    this.$q = $q;
    this.ngDialog = ngDialog;
  }

  /**
   * 打开对话框, 内容用指令封装<modal-body> 
   * @param  {Object} conf    窗口配置项
   * @param  {Object} content 内容或modalBody配置
   * @return {Promise}        确定及取消的承诺
   */
  open(conf = {}, content) {
    let dialog = null;
    let defer = this.$q.defer();

    let data = {
      content: content || '',
      title: conf.title || '标题',
      button: conf.button || true,
      cancel: () => { defer.reject(); dialog.close(); },
      confirm: () => { defer.resolve(); dialog.close(); }
    };
    if (conf.width) { data.width = conf.width; }
    if (typeof(conf.button) !== 'undefined') { data.button = conf.button; }

    let options = {
      data: data,
      className: 'my-ngdialog',
      template: 'app/template/dialog.html',
      closeByDocument: conf.closeByDocument || true
    };
    // 存在内容配置的话, 添加独立作用域
    if (angular.isObject(data.content)) {
      options.controller = ($scope) => {
        'ngInject';
        data.content.ctrlScope = $scope;
      }
    }

    dialog = this.ngDialog.open(options);
    return defer.promise;
  }

  /**
   * 打开确认对话框
   * @param  {String} title   标题
   * @param  {String} content 内容
   * @return {Promise}        确定及取消的承诺
   */
  confirm(title, content) {
    let conf = {
      title: title,
      width: '400px',
      closeByDocument: true
    };
    return this.open(conf, content);
  }
}