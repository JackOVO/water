/**
 * 表格工具栏指令
 */


export function TableBoolsDirective($compile) {
  'ngInject';

  let directive = {
    replace: true,
    template: '<div class="box-tools row"></div>',
    link: (scope, element, attrs) => {
      let confName = attrs.confName;

      // 配置监听
      scope.$watch(confName, (conf) => {
        if (!conf) { return; }

        // 搜索对象
        scope.$search = scope.search || {};
        // 搜索组回车执行
        scope.$keyup = (sfn, kcode) => {
          if (kcode === 13) { sfn(scope.$search); }
        };
        // 重置执行
        scope.$reset = (fn) => {
          if (angular.isFunction(fn)) { fn(scope.$search); }
          scope.$search = {};
        };

        let html = createInputsHtml(conf.inputs);
        html = $compile(html)(scope);
        element.append(html);
      });
    }
  };

  // 创建input
  function createInputsHtml(inputs) {
    let html = '';

    for (let index in inputs) {
      let item = inputs[index], input = '';
      let type = item.type,
          clas = item.clas,
          valKey = item.valKey,
          pholder = item.placeholder || '';

      switch(type) {
        case 'select':
          let source = item.source;

          input = `<ui-select theme="bootstrap" ng-model="$search.${valKey}"
                  search-enabled="true">
              <ui-select-match placeholder="{{$select.selected.text || '${pholder}'}}">
                {{$select.selected.text}}
              </ui-select-match>
              <ui-select-choices repeat="o.value as o in (${source} | filter: $select.search) track by o.value">
                <div ng-bind="o.text || 'null'"></div>
              </ui-select-choices>
            </ui-select>`;
          break;
        case 'search':
          let reset = item.reset,
              search = item.search;

          input = `<div class="input-group">
            <input type="text" class="form-control" placeholder="${pholder}"
              ng-model="$search.${valKey}"
              ng-keyup="$keyup(${search}, $event.keyCode)">
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button"
                ng-click="${search}($search)">搜索</button>
              <button class="btn btn-danger" type="button"
                ng-click="$reset(${reset})">清空</button>
            </span>
          </div>`;
        break;
        case 'datepicker':
          input = `<p class="input-group" ng-init="dt${index}">
              <input type="text" class="form-control" placeholder="${pholder}"
                ng-model="$search.${valKey}"
                uib-datepicker-popup
                format-day-title="yyyy - MM"
                alt-input-formats="yyyy-MM-dd"
                is-open="dt${index}.isOpen"/>
              <span class="input-group-btn">
                <button type="button" class="btn btn-default"
                  ng-click="dt${index}.isOpen = !dt${index}.isOpen">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </span>
            </p>`;
          break;
      }
      if (clas) { input = '<div class="'+ clas +'">' + input + '</div>';}
      html += input;
    }

    return html;
  }

  return directive;
}