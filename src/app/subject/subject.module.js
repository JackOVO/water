/**
 * 公司模块
 */

import { SubjectFactory } from './subject.factory';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

angular
  .module('water.subject', [])
  .service('subjectFactory', SubjectFactory)
  .service('subjectService', SubjectService)
  .controller('SubjectController', SubjectController);