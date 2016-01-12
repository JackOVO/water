/**
 * 实体工厂基类
 */

let _aim = Symbol();
let _object = Symbol();
let _primaryKey = Symbol();
let _dataService = Symbol();

class BaseModel {
  constructor(create) {

    this.create = create;
    this.mapping = {

    };
  }
}

export class EntityFactory {
  constructor(aim, object, primaryKey, dataService) {

    this[_aim] = aim;
    this[_object] = object;
    this[_primaryKey] = primaryKey;
    this[_dataService] = dataService;
  }

  pack(source) {
    for (let mkey in this[_object].mapping) {
      let mval = this[_object].mapping[mkey];

      if (typeof(source[mval]) !== 'undefined') {
        source[mkey] = source[mval];
        delete source[mval];
      }
    }
  }

  /**
   * 根据主键获取数据
   * @param  {String} id  主键值
   * @return {Promise}    根据配置打包为对象的承诺
   */
  getById(id) {
    let params = {},
        aim = this[_aim],
        pkey = this[_primaryKey];

    params[pkey] = id;

    return this[_dataService].get(aim, 'get', params).then(function(source) {
      return source;
    });
  }
}