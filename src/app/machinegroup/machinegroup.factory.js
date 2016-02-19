/**
 * 机器分组实体工厂
 */

 import { createObjectFn } from '../main/model';
 import { EntityFactory } from '../main/entity.factory';

 class MachineGroup {
   constructor() {}
 }
 MachineGroup.mapping = {};
 MachineGroup.futility = [];
 MachineGroup.create =  createObjectFn(MachineGroup);

 export class MachineGroupFactory extends EntityFactory {
   constructor(dataService) {
     'ngInject';

     super('machinegroup', MachineGroup, 'id', dataService);
   }

   // 封装一下映射关系
   getCombobox() {
     return super.getCombobox('code', 'name');
   }
}