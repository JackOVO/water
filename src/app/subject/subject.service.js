/**
 * 公司服务模块
 */

import { BusinessFactory } from '../main/business.factory';

export class SubjectService extends BusinessFactory {
  constructor(toastr, $rootScope,  dialogService, subjectFactory) {
    'ngInject';

    super(toastr, $rootScope, dialogService, subjectFactory);
  }
}