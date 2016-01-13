/**
 * 响应类封装定义
 */

// 消息模型
export class Message {
  constructor(succes, content, data) {
    this.data = data;
    this.succes = succes;
    this.content = content;
  }
}

// 分页模型
export class Paging {
  constructor() {

  }
}