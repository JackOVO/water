/**
 * 公司模块
 */

import { SubjectFactory } from './subject.factory';
import { SubjectService } from './subject.service';


angular
  .module('water.subject', [])
  .service('subjectFactory', SubjectFactory)
  .service('subjectService', SubjectService);