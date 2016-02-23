/**
 * 机器分组实体工厂
 */

 import { createObjectFn, Message } from '../main/model';
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

      super('machinegroup', MachineGroup, 'groupCode', dataService);
      this.dataService = dataService;
   }

   // 封装一下映射关系
   getCombobox() {
      return super.getCombobox('code', 'name');
   }

   // 根据指定分组的机器树
   getMachineTreeByGroupCode(code) {
      let entity = {groupCode: code};
      return super.query(entity, 'machineTree', 'packTree');
   }

   // 更新权限树
   updMachineTree(code, codes) {
     let params = {groupCode: code, machineCodes: codes};
     let mcIndex = codes.indexOf('machineCode');
     if (mcIndex !== -1) { codes.splice(mcIndex, 1); }

     return this.dataService.post(this.aim, 'updMachineTree', params).
       then(({success, message}) => {
       return new Message(success, message);
     });
   }
}