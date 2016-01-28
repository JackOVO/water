export function SlimscrollDriective() {
  let directive = {
    link: function(sope, ele, attrs) {
      $(ele).slimScroll({
        height: attrs.slimscroll ? attrs.slimscroll + 'px' : '450px'
      });
    }
  };
  return directive;
}

// (function() {
// 'use strict';

// angular
//   .module('wito.directive')
//   .directive('slimscroll', slimscroll);

//   function slimscroll() {
//     return {
//       link: function(sope, ele, attrs) {
//         $(ele).slimScroll({
//           height: attrs.slimscroll ? attrs.slimscroll + 'px' : '500px'
//         });
//         // $(selector).slimScroll({
//         // width: '300px',
//         // height: '500px',
//         // size: '10px',
//         // position: 'left',
//         // color: '#ffcc00',
//         // alwaysVisible: true,
//         // distance: '20px',
//         // start: $('#child_image_element'),
//         // railVisible: true,
//         // railColor: '#222',
//         // railOpacity: 0.3,
//         // wheelStep: 10,
//         // allowPageScroll: false,
//         // disableFadeOut: false
//         // });
//       }
//     };
//   }

// })();