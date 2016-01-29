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

      // scope.$watch(attrs.ngModel, (tv) => {
      //   if (tv === value) {
      //     input.iCheck('check');
      //   } else {
      //     input.iCheck('uncheck');
      //   }
      // });

    }
  };

  return directive;
}