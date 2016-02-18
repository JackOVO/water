/**
 * 选中指令
 */

export function iCheckDirective() {
  let directive = {
    replace: true,
    transclude: true,
    /*<div class="checkbox icheck"></div>外层必须*/
    template: `<label class="radio" style="display:inline-block;"><input type="radio" name="rd"> <ng-transclude></ng-transclude></label>`,
    link: function(scope, element, attrs) {
      let vk = attrs.vk;
      let value = attrs.value;
      let input = element.find('input');

      input.iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });

console.info(vk);

      scope.$watch(vk, (vk) => {
console.info(vk);
      });

      input.on('ifChecked', () => {
        scope['$search']['promotionStatsType'] = value;
console.info('--', scope[attrs.vk]);
        scope.$apply();
      });

    }
  };

  return directive;
}

export function iCheckGroupDirective() {
  let directive = {
    replace: true,
    transclude: true,
    scope: {
      source: '=',
      checked: '='
    },
    template: `<div>1<div>`,
    link: function(scope, element, attrs) {
      let inputs = [];

      // 数据监听, 数据初始化
      scope.$watch('source', (array) => {
        element.empty().append('<table style="width:100%;"><tbody></tbody></table>');
        let tbody = element.find('tbody');
        let tr = $('<tr>').appendTo(tbody);

        for (let index in array) {
          let item = array[index];
          let td = $('<td><label class="checkbox"><input type="checkbox" value="'+ item.value +'"> '+ item.text +'</label></td>');
          tr.append(td);
          if (index !== 0 && index % 2 === 0) {
            tr = $('<tr>').appendTo(tbody);
          }
        }

        element.find('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });
        inputs = element.find('input');
        inputs.on('ifChecked', (e) => {
          let input = $(e.target);
          let value = input.val();

          if(scope.checked.indexOf(value) === -1) {
            scope.checked.push(value);
            scope.$apply();
          }
        }).on('ifUnchecked', (e) => {
          let input = $(e.target);
          let value = input.val();
          let index = scope.checked.indexOf(value);

          if(index !== -1) {
            scope.checked.splice(index, 1);
          }

          scope.$apply();
        });

        scope.$watch('checked', (checked) => {
          if (!checked || !checked.length) { return; }
          inputs.each((index, input) => {
            if (checked.indexOf($(input).val()) !== -1) {
              $(input).iCheck('check');
            }
          });
        });
      });
    }
  };

  return directive;
}

