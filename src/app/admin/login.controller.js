/**
 * 登录页控制器
 */

export class LoginController {
  constructor($state, adminService) {
    'ngInject';

    this.$state = $state;
    this.loginName = '';
    this.password = '';
    this.adminService = adminService;
  }

  signIn() {
    let that = this;
    let password = this.password;
    let loginName = this.loginName;

    this.adminService.login(loginName, password).then((admin) => {
      that.adminService.admin = admin;
      that.$state.go('home');
    }, (msg) => {
      that.adminService.showToastr(msg, 'error', '登录失败');
    });
  }
}

