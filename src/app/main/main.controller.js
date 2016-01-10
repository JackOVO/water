/**
 * 主控制器
 */

export class MainController {
  constructor(dataService) {
    'ngInject';

    let params = {page: '你好', array: [1, 2, 3]};
    // dataService.get('user', 'list', params).then();
    // dataService.post('user', 'list', params).then();
    // dataService.download('user', 'list', params);
  }
}

// export class MainController {
//   constructor ($timeout, webDevTec, toastr) {
//     'ngInject';

//     this.awesomeThings = [];
//     this.classAnimation = '';
//     this.creationDate = 1451577885748;
//     this.toastr = toastr;

//     this.activate($timeout, webDevTec);

//     // 数据结构解析或屏蔽

//   }

//   activate($timeout, webDevTec) {
//     this.getWebDevTec(webDevTec);
//     $timeout(() => {
//       this.classAnimation = 'rubberBand';
//     }, 4000);
//   }

//   getWebDevTec(webDevTec) {
//     this.awesomeThings = webDevTec.getTec();

//     angular.forEach(this.awesomeThings, (awesomeThing) => {
//       awesomeThing.rank = Math.random();
//     });
//   }

//   showToastr() {
//     this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
//     this.classAnimation = '';
//   }
// }
