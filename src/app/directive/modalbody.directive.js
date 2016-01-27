/**
 * 弹出内容指令
 */

export function ModalbodyDriective($compile) {
  'ngInject';

  let directive = {
    scope: {
      content: '=',
      formValid: '='
    },
    replace: true,
    template: '<div></div>',
    link: function(scope, element) {

      scope.$watch('content', (content) => {
        if (!content) { return; }

        if (angular.isObject(content)) {

          // 监听验证
          content.scope.$watch('form.$valid', (valid) => {
            scope.formValid = valid;
          });

          content.scope.test = (name = '此项', error) => {
            let errorKey = null;
            for (let key in error) {errorKey = key;}
            return {
              required: name + '为必填项.',
              minlength: name + '不能少于多少字.'
            }[errorKey];
          }

          let html = createInputsHtml(content.inputs);
          content.scope.setUploadFn = (uploadFn) => {
            content.scope.uploadFn = uploadFn;
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
  let html = '<form name="form" novalidate>';
// class="form-horizontal" verification:[]
  for (let i in inputs) {
    let type = inputs[i].type,
        name = inputs[i].name,
        model = inputs[i].model,
        m2 = inputs[i].m2,
        def = inputs[i].def || '', // 组合框默认提示值
        verification = inputs[i].verification || [], // 验证
        inputHtml = '';

    if (inputs[i].required === true) { verification.push('required'); }

    switch(type) {
      case 'select':
        let source = inputs[i].source;
// {{${m2?m2+'=':''}$select.selected.text}} XXX 绑定名称的位置在元素属性上第一次会有无法选中的问题
        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <ui-select theme="bootstrap" ng-model="${model}"
              search-enabled="true">
              <ui-select-match placeholder="{{$select.selected.text || '${def}'}}">
                {{${m2?m2+'=':''}$select.selected.text}}
              </ui-select-match>
              <ui-select-choices repeat="o.value as o in (${source} | filter: $select.search) track by o.value">
                <div ng-bind="o.text || 'null'"></div>
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
      case 'upload':
        let upName = inputs[i].upName;
        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <upload files="files" val="${model}" name="${upName}" set-upload-fn="setUploadFn"></upload>
          </div>
        </div>`;
        break;
      case 'text':
      case 'number':
      case 'passwrod':
      default:
        inputHtml = `<div class="form-group">
          <label class="col-sm-2 control-label">${name}</label>
          <div class="col-sm-10">
            <input name="${model}" type="${type||'text'}" class="form-control" autocomplete="off"
              ng-model="${model}"

              ${verification.join(' ')}
              tooltip-trigger="focus"
              tooltip-class="error-tooltip"
              tooltip-placement="auto bottom-left"
              uib-tooltip="{{test('${name}', form['${model}'].$error)}}"
              tooltip-is-open="form['${model}'].$dirty && form['${model}'].$invalid"/>
          </div>
        </div>`;
        break;
    }
//tooltip-enable="form['${model}'].$invalid" tooltip-is-open="true" {{test(form['${model}'].$error)}}
    html += inputHtml;
  }
  return html + '</form>';
}