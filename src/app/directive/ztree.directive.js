/**
 * ztree指令封装
 */

export function zTreeDirective() {
  let directive = {
    replace: true,
    scope: {
      data: '=',
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
              // console.info(treeId, node);
              // if (scope.nclick) { scope.nclick()(node); }
              ztree.checkNode(node, null, false, true);
            },
            onCheck: createOnCheckCallBack(attrs.name, idKey, scope)
          }
        };

        ztree = $.fn.zTree.init(element, setting, data);
        ztree.expandAll(true);
      });
    }
  };

  // 根据配置, 创建响应的选中hui'diao
  function createOnCheckCallBack(ztreeId, idKey, scope) {

    if (typeof(scope.checkeds) !== 'undefined') {
      return () => { //e, treeId, node
        let ztree = $.fn.zTree.getZTreeObj(ztreeId);
        let checkeds = [];
        let nodes = ztree.getCheckedNodes(true);

        for (let index in nodes) { checkeds.push(nodes[index][idKey]); }
        scope.checkeds = checkeds;
        scope.$apply();
      };
    }
    return () => {};
  }

  return directive;
}