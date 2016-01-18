/**
 * 数据表格指令
 */

export function DataTableDirective($compile) {
  'ngInject';

  let rowCallbackEventArray = [];

  let directive = {
    replace: true,
    scope: {
      'paging': '=',
      'columns': '=',
      'checkeds': '=', // 多选选中关联
      'draughtRequest': '&', // 渲染请求
      'rowClickNotice': '&'
    },
    template: '<div>' +
                '<table class="table table-bordered table-hover"></table>'+
              '</div>',
    link: function(scope, element, attrs) {

      let isFirst = true; // 是否为第一加载
      let table = element.children('.table');
      let columns = scope.columns || [{'data': null, 'title': '囧rz'}];
      let tableChangeCallBack = null; // 从ajax方法中得出的变更表格回调

      // 监听数据变化, 通过ajax回调改变数据, 额.
      scope.$watch('paging', (paging) => {
        if (!paging) { return; }

        // scope.checkeds = [];
        let wdata = [], wtotal = 0;

        // 根据结构遍历实体
        if (angular.isArray(paging)) {
          wdata = paging;
          wtotal = paging.length;
        } else if (angular.isObject(paging)) {
          let {page, size, data, total} = paging;
          let start = (page == 1 ? 0 : size * (page - 1));
          wdata = data;
          wtotal = total;

          // 变相改变页码, 需要扩展方法fnDisplayStart
          otable.fnDisplayStart(start, false);
          otable.fnLengthChange(size, false);
        } else {
          window.alert('?x?');
        }

        tableChangeCallBack({
          data: wdata,
          recordsTotal: wtotal,
          recordsFiltered: wtotal
        });
      });

      // 定义配置
      let setting = {
        serverSide: true,
        columns: columns,
        searching: false,
        language: language,
        lengthChange: false,
        info: attrs.info !== 'false',
        paging: attrs.paging !== 'false',
        pagingType: 'full_numbers',

        rowCallback: rowCallback,
        ajax: (data, callback) => {
          tableChangeCallBack = callback;
          if(!isFirst && typeof scope.draughtRequest() !== 'undefined') {
            // 求页码
            let count = data.start + 1;
            let page = parseInt(count / data.length) + (count % data.length);
            data.page = page;
            scope.draughtRequest()(data); // 绘制请求
          }
        }
      };

      let lastIndex = setting.columns.length - 1;
      let myrender = setting.columns[lastIndex].myrender;
      setting.order = setting.order || [];
      setting.columnDefs = setting.columnDefs || [];

      // 如果关联了选中数据的话, 就添加多选框, 并添加关联数据
      if (typeof(scope.checkeds) !== 'undefined') {
        let copy = setting.columns.concat();
        copy.splice(0, 0, {data: null, title: '选'});
        setting.columns = copy;

        setting.order.push([0, null]); // 去掉排序默认
        setting.columnDefs.push({
          targets: 0,
          width: '12px',
          orderable: false,
          className: 'dt-body-center',

          createdCell: (td, cellData, rowData) => {
            let cbox = $(`<input type="checkbox" value="${rowData.id || ''}">`);
            cbox.appendTo($(td).empty()).click(function(e) {

              if ($(this).is(':checked') === true) {
                scope.checkeds.push(rowData);
              } else {
                let index = scope.checkeds.indexOf(rowData);
                scope.checkeds.splice(index, 1);
              }
              e.stopPropagation();
            });
          }
        });
      }

      // 添加事件方法
      rowCallbackEventArray.push((row, data, index) => {
        let $row = $(row);
        let checkbox = $row.find('td > input');
        if (checkbox.length) { checkbox.data('rowIndex', index); }

        $row.click(function() {
          if (checkbox.length) { checkbox.click(); }
          if (scope.rowClickNotice()) { scope.rowClickNotice()(data); }
          scope.$apply();
        });
      });

      // 初始化操作
      let otable = table.dataTable(setting);
      isFirst = false;
      return otable;
    }
  };

  // 默认行回调
  function rowCallback(row, data, index) {
    var that = this;
    angular.forEach(rowCallbackEventArray, (callback) => {
      callback.call(that, row, data, index);
    });
  }

  return directive;
}

let language = {
  'processing': '处理中...',
  'lengthMenu': '显示 _MENU_ 项结果',
  'zeroRecords': '没有匹配结果',
  'info': '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
  'infoEmpty': '显示第 0 至 0 项结果，共 0 项',
  'infoFiltered': '(由 _MAX_ 项结果过滤)',
  'infoPostFix': '',
  'search': '搜索:',
  'emptyTable': '表中数据为空',
  'loadingRecords': '载入中...',
  'infoThousands': ',',
  'paginate': {
    'first': '首页',
    'previous': '上页',
    'next': '下页',
    'last': '末页'
  },
  'aria': {
    'sortAscending': ': 以升序排列此列',
    'sortDescending': ': 以降序排列此列'
  }
};