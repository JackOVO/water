/**
 * 响应类封装定义
 */

// 常用方法抽取, 在实体工厂类中的提供创建对象的方法
export function createObjectFn(Proto) {
  return function(...args) {
    // 过滤属性
    Proto.futility = Proto.futility || [];

    if (angular.isObject(args[0])) {
      var obj = new Proto();
      for (let key in args[0]) {
        if (Proto.futility.indexOf(key) === -1) {
          obj[key] = args[0][key];
        }
      }
      return obj;
    } else {
      return new Proto();
    }
  };
}

// 组合框选项
export class Options {
  constructor(value, text) {
    this.text = text;
    this.value = value;
  }
}

// 树节点
export class Tree {
  constructor(id, name, childs = []) {
    this.id = id;
    this.name = name;
    this.childs = childs;
  }
}
Tree.traversal = (data, hole, childKey = 'children') => {
  if (angular.isFunction(hole)) {
    for (let index in data) {
      let node = data[index];
      hole(node);
      if (node[childKey].length) {
        Tree.traversal(node[childKey], hole, childKey);
      }
    }
  }
  return data;
}

// 消息模型
export class Message {
  constructor(success, content, data) {
    this.data = data;
    this.success = success;
    this.content = content;
  }
}

// 分页模型
export class Paging {
  constructor(data = [], page = 0, size = 0, total = 0) {
    this.data = data;
    this.page = page;
    this.size = size;
    this.total = total;
  }
}