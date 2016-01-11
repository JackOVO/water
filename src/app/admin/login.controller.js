/**
 * 登录页控制器
 */

export class LoginController {
  constructor() {

    this.user = {
      loginName: 'admin',
      password: 'xxxxxx'
    };
  }

  signIn() {
    console.log(this.user);
  }
}

