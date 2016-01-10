// 多层
var user = {
    id: '101',
    name: 'Jack',
    role: {
        id: '109',
        name: '管理员'
    }
}

// 单层
var user = {
    id: '101',
    name: 'Jack',
    roleId: '109',
    roleName: '管理员'
}

// 数据结构解析屏蔽
// 先解决单层与多层结构的互相转换