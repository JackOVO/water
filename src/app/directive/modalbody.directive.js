/**
 * 弹出内容指令
 */

export function ModalbodyDriective($compile) {
  'ngInject';

  let directive = {
    scope: {
      content: '='
    },
    replace: true,
    template: '<div></div>',
    link: function(scope, element) {

      scope.$watch('content', (content) => {
        if (!content) { return; }

        if (angular.isObject(content)) {
          let html = createInputsHtml(content.inputs);
content.scope.xxx = function(text) {
  console.info(text);
};
          content = $compile(html)(content.scope);
        }

        element.append(content);
      });
    }
  };

  return directive;
}

// 根据配置生成input
function createInputsHtml(inputs) {
  let html = '';
// class="form-horizontal"
  for (let i in inputs) {
    let type = inputs[i].type,
        name = inputs[i].name,
        model = inputs[i].model,
        m2 = inputs[i].m2,
        inputHtml = '';

    switch(type) {
      case 'select':
        let source = inputs[i].source;

        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <ui-select theme="bootstrap" ng-model="${model}"
              search-enabled="true">
              <ui-select-match placeholder="{{${m2?m2+'=':''}$select.selected.text}}">
                {{$select.selected.text}}
              </ui-select-match>
              <ui-select-choices repeat="o.value as o in (${source} | filter: $select.search) track by o.value">
                <div ng-bind="o.text"></div>
              </ui-select-choices>
            </ui-select>
          </div>
        </div>`;
        break;
      case 'textarea':
        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <textarea class="form-control" ng-model="${model}" rows="4" placeholder="..." style="resize: none;"/>
          </div>
        </div>`;
        break;
      case 'text':
      case 'passwrod':
      default:
        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <input type="${type||'text'}" class="form-control" ng-model="${model}"/>
          </div>
        </div>`;
        break;
    }

    html += inputHtml;
  }
  return html;
}