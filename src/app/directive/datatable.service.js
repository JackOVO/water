/**
 * 数据表格指令服务
 */

export class DataTableService {
  constructor() {

  }

  // 启用状态渲染
  flagRender(data) {
    return (data === 'Enable' ? '启用' : '禁用');
  }
}