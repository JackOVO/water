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
      let value = attrs.value;
      let input = element.find('input');

      input.iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });

      input.on('ifChecked', () => {
        scope[attrs.vk] = value;
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

      // 数据监听
      scope.$watch('source', (array) => {
        element.empty();
        for (let index in array) {
          let item = array[index];
          element.append('<label class="checkbox"><input type="checkbox" > '+ item.text +'</label>');
        }
      });
    }
  };

  return directive;
}

