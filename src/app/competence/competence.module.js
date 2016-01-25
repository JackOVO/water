/**
 * 权限模块
 */

import { CompetenceFactory } from './competence.factory';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';

angular
  .module('water.competence', [])
  .service('competenceFactory', CompetenceFactory)
  .service('competenceService', CompetenceService)
  .controller('competenceController', CompetenceController);