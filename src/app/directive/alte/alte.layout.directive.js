/**
 * AdminLTE布局指令
 */

// 布局不同指令之间协调用控制器
class AlteLayoutController {
  constructor() {
   this.getHeaderHeight = null;
   this.getFooterHeight = null;
   this.getSidebarHeight = null;
  }

  // 设置获取各个部分高的方法
  setHeightFn(fname, fn) {
   if (typeof this[fname] !== 'undefined') {
     this[fname] = fn;
   } else {
     throw new Error('未初始化获取高方法');
   }
  }

  // 计算高度
  fix() {
    let $this = this;
    let window_height = $(window).height();
    let sidebar_height = $this.getSidebarHeight();
    let neg = $this.getHeaderHeight() + ($this.getFooterHeight && $this.getFooterHeight());

    let eles = $('.content-wrapper, .right-side');
    let minHeight = sidebar_height;

    if ($('body').hasClass('fixed')) {
      minHeight = window_height - $('.main-footer').outerHeight();
    } else if (window_height >= sidebar_height) {
      minHeight = window_height - neg;
    }

    eles.css('min-height', minHeight);
  }
}

// 布局容器
export function WrapperDriective() {
  let directive = {
    replace: true,
    transclude: true,
    controller: AlteLayoutController,
    template: '<div class="wrapper" ng-transclude></div>',
    link: function(scope, element, attrs, ctrl) {
      ctrl.fix();
      $(window, '.wrapper').resize(() => {
        ctrl.fix();
      });
    }
  }
  return directive;
}

// 布局头
export function HeaderDriective() {
  let directive = {
    replace: true,
    transclude: true,
    require: '^alteLayout',
    template: '<header class="main-header" ng-transclude></header>',
    link: function(scope, element, attrs, ctrl) {
      ctrl.setHeightFn('getHeaderHeight', () => {
        return element.outerHeight();
      });
    }
  };
  return directive;
}
// 切换按钮声明, 切换侧边栏按钮
export function ToggleBtnDriective() {
  let directive = {
    link: function(scope, element, attrs) {
      let body = $('body');
      let openClass = 'sidebar-open',
          collapseClass = 'sidebar-collapse';
      let screenSize = attrs.screenSize || 768;

      element.on('click', function() {
        //Enable sidebar push menu
        if ($(window).width() > (screenSize - 1)) {
          if (body.hasClass(collapseClass)) {
            body.removeClass(collapseClass);
          } else {
            body.addClass(collapseClass);
          }
        } 
        //Handle sidebar push menu for small screens
        else {
          if (body.hasClass(openClass)) {
            body.removeClass(openClass).removeClass(collapseClass);
          } else {
            body.addClass(openClass);
          }
        }
      });
    }
  };

  return directive;
}


// 布局侧边栏
export function SidebarDriective() {
  let directive = {
    replace: true,
    transclude: true,
    require: '^alteLayout',
    template: '<aside class="main-sidebar">'+
                '<section class="sidebar" ng-transclude></section>'+
              '</aside>',
    link: function(scope, element, attrs, ctrl) {
      ctrl.setHeightFn('getSidebarHeight', () => {
        var sidebar = element.children('.sidebar')
        return sidebar.height();
      });
    }
  };

  return directive;
}

// 布局内容底
export function FooterDriective() {
 let directive = {
   replace: true,
   transclude: true,
   require: '^alteLayout',
   template: '<footer class="main-footer" ng-transclude></footer>',
   link: function(scope, element, attrs, ctrl) {
     ctrl.setHeightFn('getFooterHeight', () => {
       return element.outerHeight();
     });
   }
 };

 return directive;
}