/**
 * ztree指令封装
 */

export function zTreeDirective() {
  let directive = {
    replace: true,
    scope: {
      data: '=',
      click: '&',
      checkeds: '='
    },
    template: '<div class="ztree"></div>',
    link: function(scope, element, attrs) {
      let ztree = null,
          idKey = attrs.idkey || 'id', // 数据唯一的判断key, 选中后也将添加该属性进入选中数组
          nameKey = attrs.namekey || 'text',
          checkedKey = attrs.checkedkey || 'checked',
          childrenKey = attrs.childrenkey || 'children',
          checkEnable = true;
          if(attrs.checkEnable === 'false') { checkEnable = false; }

      element.attr('id', attrs.name);

      scope.$watch('data', function(data) {
        if (!data) { return; }

        let setting = {
          view: {
            showTitle: false,
            expandSpeed: ''
          },
          check: {
            enable: checkEnable
            // chkboxType: { 'Y': '', 'N': '' }
          },
          data: {
            key: {
              name: nameKey,
              checked: checkedKey,
              children: childrenKey
            }
          },
          callback: {
            onClick: (e, treeId, node) => {
              ztree.checkNode(node, null, false, true);
              if (scope.click()) { scope.click()(node); };
            },
            onCheck: createOnCheckCallBack(attrs.name, idKey, scope)
          }
        };

        ztree = $.fn.zTree.init(element, setting, data);
        ztree.expandAll(true);

        // 第一次, 就将选中的返回
        if (typeof(scope.checkeds) !== 'undefined') {
          scope.checkeds = fillCheckedData(ztree, idKey);
        }
      });
    }
  };

  // 根据配置, 创建响应的选中hui'diao
  function createOnCheckCallBack(ztreeId, idKey, scope) {

    if (typeof(scope.checkeds) !== 'undefined') {
      return (e, treeId, node) => { //e, treeId, node
        let ztree = $.fn.zTree.getZTreeObj(ztreeId);
        scope.checkeds = fillCheckedData(ztree, idKey);
        scope.$apply();
      };
    }
    return () => {};
  }

  // 填充选中数据
  function fillCheckedData(ztree, idKey) {
    let checkeds = [];
    let nodes = ztree.getCheckedNodes(true);
    for (let index in nodes) { checkeds.push(nodes[index][idKey]); }
    return checkeds;
  }

  return directive;
}