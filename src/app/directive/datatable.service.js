/**
 * 数据表格指令服务
 */

export class DataTableService {
  constructor() {}

  // 启用状态渲染(用户)
  enableflagRender(data) {
    return (data === 'Enable' ? '启用' : '禁用');
  }

  // 删除状态渲染(商品)
  delFlagRender(data) {
    return (data == 1 ? '已删除' : '未删除');
  }
}