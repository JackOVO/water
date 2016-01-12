/**
 * 登录页控制器
 */

export class LoginController {
  constructor(adminService) {
    'ngInject';

    this.adminService = adminService;
    this.name = 'name';
    this.password = 'password';
  }

  signIn() {
    let name = this.name;
    let password = this.password;

    this.adminService.login(name, password);
  }
}

