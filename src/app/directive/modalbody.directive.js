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

          content.scope.setName = (obj, keys, selText) => {
            if (angular.isObject(obj)) {
              obj[keys] = selText;
            }
          };

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

function getMaxSize(array) {
  let size = 0;
  for (let index in array) {
    if (array[index].name.length > size) {
      size = array[index].name.length;
    }
  }
  return size;
}

// 根据配置生成input
function createInputsHtml(inputs) {
  let html = '<form name="form" novalidate>';
// class="form-horizontal" verification:[]
  let lw = 2, cw = 10;
  if (getMaxSize(inputs) > 4) {
    lw = 3, cw = 9;
  }

  for (let i in inputs) {
    let type = inputs[i].type,
        name = inputs[i].name,
        model = inputs[i].model,
        def = inputs[i].def || '', // 组合框默认提示值
        verification = inputs[i].verification || [], // 验证
        inputHtml = '';

    if (inputs[i].required === true) { verification.push('required'); }

    switch(type) {
      case 'select':
        let source = inputs[i].source;
// {{${m2?m2+'=':''}$select.selected.text}} XXX 绑定名称的位置在元素属性上第一次会有无法选中的问题
        let m1 = 'xxx', m2 = inputs[i].m2, m3 = 'xxx';
        if (m2) {
          let ary = m2.split('.');
          m1 = ary[0]; m3 = ary[1];
        }
        inputHtml = `<div class="form-group">
          <label class="col-sm-${lw} control-label">${name}</label>
          <div class="col-sm-${cw}">
            <ui-select theme="bootstrap" ng-model="${model}"
              search-enabled="true"
              on-select="setName(${m1}, '${m3}', $select.selected.text)">
              <ui-select-match placeholder="{{$select.selected.text || '${def}'}}">{{$select.selected.text}}
              </ui-select-match>
              <ui-select-choices repeat="o.value as o in (${source} | filter: $select.search) track by $index">
                <div ng-bind="o.text || 'null'"></div>
              </ui-select-choices>
            </ui-select>
          </div>
        </div>`;
        break;
      case 'checkbox':
        source = inputs[i].source;
        inputHtml = `<div class="form-group">
              <label class="col-sm-${lw} control-label">${name}</label>
              <div class="col-sm-${cw}">
                <checkgroup source="${source}" checked="${model}"></checkgroup>
              </div>
            </div>`;
        break;
      case 'textarea':
        inputHtml = `<div class="form-group">
          <label class="col-sm-${lw} control-label">${name}</label>
          <div class="col-sm-${cw}">
            <textarea class="form-control" ng-model="${model}" rows="2" placeholder="..." style="resize: none;"/>
          </div>
        </div>`;
        break;
      case 'datepicker':
        def = inputs[i].def || '';
        inputHtml = `<div class="form-group">
          <label class="col-sm-${lw} control-label">${name}</label>
          <div class="col-sm-${cw}">
            <p class="input-group" ng-init="dt${i}" style="margin-bottom:0;">
              <input type="text" class="form-control" placeholder="${def}"
                ng-model="${model}"
                uib-datepicker-popup
                format-day-title="yyyy - MM"
                alt-input-formats="yyyy-MM-dd"
                is-open="dt${i}.isOpen"/>
              <span class="input-group-btn">
                <button type="button" class="btn btn-default"
                  ng-click="dt${i}.isOpen = !dt${i}.isOpen">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </span>
            </p>
          </div>
        </div>`;
        break;
      case 'upload':
        let upName = inputs[i].upName;
        let gstr = inputs[i].group?'group='+inputs[i].group:'';
        inputHtml = `<div class="form-group">
          <label class="col-sm-${lw} control-label">${name}</label>
          <div class="col-sm-${cw}">
            <upload files="files" val="${model}" name="${upName}" set-upload-fn="setUploadFn" ${gstr}></upload>
          </div>
        </div>`;
        break;
      case 'text':
      case 'number':
      case 'passwrod':
      default:
        inputHtml = `<div class="form-group">
          <label class="col-sm-${lw} control-label">${name}</label>
          <div class="col-sm-${cw}">
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
      case 'selectGroup':
        let addFnName = inputs[i].addFnName,
            delFnName = inputs[i].delFnName;
        source = inputs[i].source;
        inputHtml = `<div class="form-group" ng-repeat="item in ${model} track by $index">
          <label class="col-sm-${lw} control-label">${name}
            {{$index+1}}</label>
          <div class="col-sm-${cw - 1}">
            <ui-select theme="bootstrap" ng-model="${model}[$index]"
              search-enabled="true">
              <ui-select-match placeholder="{{$select.selected.text || '${def}'}}">
                {{${m2?m2+'=':''}$select.selected.text}}
              </ui-select-match>
              <ui-select-choices repeat="o.value as o in (${source} | filter: $select.search) track by o.value">
                <div ng-bind="o.text || 'null'"></div>
              </ui-select-choices>
            </ui-select>
          </div>
          <div class="col-sm-1">
            <i class="fa fa-plus-square" style="font-size:32px;color:#3c8dbc;cursor: pointer;margin-left:-13px;" ng-click="${addFnName}()" ng-if="$index == 0"></i>
            <i class="fa fa-minus-square" style="font-size:32px;color:#d73925;cursor: pointer;margin-left:-13px;" ng-click="${delFnName}($index)" ng-if="$index != 0"></i>
          </div>
        </div>`;
        break;
      case 'uploadGroup':
        let addFnName2 = inputs[i].addFnName,
            delFnName2 = inputs[i].delFnName;
        let gstr2 = inputs[i].group?'group='+inputs[i].group:'';
        upName = inputs[i].upName;
// console.info(upName, gstr2);
          inputHtml = `<div class="form-group" ng-repeat="item in ${model} track by $index">
            <label class="col-sm-${lw} control-label">${name} {{$index+1}}</label>
            <div class="col-sm-${cw - 1}">
              <upload files="files" val="${model}" name="{{'${upName}'+($index-0)+1}}" set-upload-fn="setUploadFn" ${gstr2}></upload>
            </div>
            <div class="col-sm-1">
              <i class="fa fa-plus-square" style="font-size:32px;color:#3c8dbc;cursor: pointer;margin-left:-13px;" ng-click="${addFnName2}()" ng-if="$index == 0"></i>
              <i class="fa fa-minus-square" style="font-size:32px;color:#d73925;cursor: pointer;margin-left:-13px;" ng-click="${delFnName2}($index)" ng-if="$index != 0"></i>
            </div>
          </div>`;
        break;
    }
    html += inputHtml;
  }
  return html + '</form>';
}