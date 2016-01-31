/**
 * 侧边栏菜单
 */

export function AlteSideMenuDirective() {
  let directive = {
    replace: true,
    template: '<ul class="sidebar-menu">sideMenu</ul>',
    scope: {
      'data': '=',
      'search': '=',
      'callback': '&'
    },
//     controller: function() {
//       // 转接事件方法 节点数据, 父key数组, 子节点, 是否打开
//       this.nodeClickCallBack = function(node, pary, isChildren, isVisible) {
// console.log(node, pary, isChildren, isVisible);
//       };
//     },
    link: function(scope, element) {

      // 监听指令数据
      scope.$watch('data', function(data) {
        if (!data) { return; }

        sideMenu.create(element, data);
        sideMenu.bindingToggleFn(element);
        sideMenu.onClickCallback = function(node, pary, isc, isv) {
          if (scope.callback()) { scope.callback()(node, pary, isc, isv);}
        };
      });

      // 搜索, 烂代码XXX
      scope.$watch('search', (value) => {
        // 所有显示
        let showAry = [];
        for (let id in sideMenu.nodeStructure) {
          let node = sideMenu.nodeStructure[id];
          if (node.text.indexOf(value) !== -1) {
            showAry.push(node);
          }
        }

        let s = getDad(sideMenu.nodeStructure, showAry);
        for (let id in sideMenu.nodeStructure) {
          sideMenu.nodeStructure[id]._jq.hide();
        }
        for (let index in s) { s[index]._jq.slideDown(); }
      });
    }
  };

  function getDad(map, showAry) {
    let allShow = [];
    for (let i = 0,l = showAry.length; i < l; i++) {
      let node = showAry[i];

      if (map[node.pid]) {
        let z = showAry.splice(i, 1, map[node.pid]);
        allShow.push(z[0]);
        i = -1; l = showAry.length;
      } else {
        allShow.push(node);
      }
    }

    return allShow;
  }

  return directive;
}

let sideMenu = {
  nodeStructure: {},
  onClickCallback(){},
  // 创建
  create(sidebarmenu, data) {
    this.nodeStructure = {};
    sidebarmenu.empty();

    angular.forEach(data, function(node) {
      var elem = null;
      switch(node.type) {
        case 'header':
          elem = sideMenu.createHeader(node.text);
        break;
        default:
          elem = sideMenu.createNode(node);
        break;
      }
      sidebarmenu.append(elem);
    });
  },

  // 创建头
  createHeader(text) {
    return $('<li class="header">'+ text +'</li>');
  },
  // 创建图标
  createIcon(icon) {
    //let ary = icon.split(' ');
    return $('<i class="fa fa-'+ icon +'"></i>');
  },
  // 创建标题
  createTitle({text, icon}) {
    let span = '<span>'+ text +'</span>';
    let title = $('<a href="javascript:;">').html(span);
    if (icon) {
      title.prepend(this.createIcon(icon));
    }
    return title;
  },
  // 创建节点
  createNode(node, pid) {
    let {id, children} = node;
    let title = this.createTitle(node),
        controller = $('<li class="treeview">');

    // 重要: 绑定id, 使元素和数据相关联
    title.appendTo(controller).data('data-Id', id);
    // 添加节点id和数据的映射
    this.addNodeMappingItem(node, controller, pid);

    if (children && children.length !== 0) {
      var icon = this.createIcon('angle-left').addClass('pull-right');
      title.append(icon);
      controller.append(this.createChildren(node));
    }
    return controller;
  },
  // 创建子项
  createChildren({id, children}) {
    let _this = this;
    let controller = $('<ul class="treeview-menu">');

    angular.forEach(children, function(node) {
      let elem = _this.createNode(node, id);
      controller.append(elem);
    });

    return controller;
  },

  // 添加一个节点的层级映射关系
  addNodeMappingItem(node, elem, pid) {
    if (!node.id) { return; }

    var nodeAttr = this.nodeStructure[node.id];
    if (nodeAttr) {
      throw new Error('菜单映射存在相同的Id!');
    } else {
      this.nodeStructure[node.id] = {
        'id': node.id,
        'key': node.key,
        'text': node.text,
        '_jq': elem
      };
      if (pid) { this.nodeStructure[node.id].pid = pid; }
    }
  },

  // 获取父路径key并拼装
  getParentPath(id, ary = []) {
    var node = this.nodeStructure[id];
    if (node && node.pid) {
      ary.push(this.nodeStructure[node.pid].key);
      return this.getParentPath(node.pid, ary);
    }
    return ary;
  },

  // 绑定切换事件
  bindingToggleFn(parent) {
    let _animationSpeed = 100;

    parent.on('click', 'li a', (e) => {
      let $this = $(e.target);
      if ($this.is('span')) { $this = $this.parent(); }

      let checkElement = $this.next();
      let isChildren = checkElement.is('.treeview-menu');
      let isVisible = checkElement.is(':visible');

      // 关闭子项菜单
      if (isChildren && isVisible) {
        checkElement.slideUp(_animationSpeed, () => {
          checkElement.removeClass('menu-open');
        });
        $this.parent('li').removeClass('active');
        //_this.layout.fix();
      // 打开子项菜单
      } else if (isChildren && !isVisible) {

        // 关闭其他同级节点菜单
        let ul = $this.parent('li').siblings().children('ul:visible');
        ul.slideUp(_animationSpeed).removeClass('menu-open');

        // 打开子项菜单
        checkElement.slideDown(_animationSpeed, () => {
          checkElement.addClass('menu-open');
          parent.children('li.active').removeClass('active'); //?
          $this.parent('li').addClass('active');
          //_this.layout.fix();
        });
      }

      let aid = $this.data('data-Id');
      let node = this.nodeStructure[aid];
      let pary = this.getParentPath(aid);

      // 节点数据, 是否有子项, 子项是否打开
      this.onClickCallback(node, pary, isChildren, isVisible);
    });
  }
};