/**
 * 上传指令
 */

export function UploadDirective ($q) {
  'ngInject';

  let directive = {
    replace: true,
    template: `<div class="input-group">
                <input type="text" class="form-control">
                <span class="input-group-btn">
                  <span class="btn btn-default btn-file btn-flat"
                      style="line-height:20px;">选择文件 <input type="file" >
                  </span>
                </span>
              </div>`,
    scope: {
      'val': '=',
      'files': '=',
      'group': '=',
      'setUploadFn': '&'
    },
    link: function(scope, element, attrs) {
      let input = element.find('.form-control');
      let file = element.find('.btn-file :file');
      file.attr('name', attrs.name);
      // input.val(attrs.val || '');

      scope.$watch('val', function(val) {
        if (val) { input.val(val || ''); }
      });

      // 文件变更监听
      file.on('change', function(e) {
        let data = file[0];
        let numFiles = file[0].files ? file[0].files.length : 1;
        let label = file.val().replace(/\\/g, '/').replace(/.*\//, '');

        file.trigger('fileselect', [numFiles, label]);
        input.val(label);

        let name = e.target.name;
        scope.files = scope.files || [];

        // 必选存在名字,多文件上传 paramNames
        scope.group = scope.group || [];
        var nameIndex = scope.group.indexOf(name);

        if (nameIndex !== -1) {
          scope.files[nameIndex] = data.files[0];
        } else {
          scope.group.push(name);
          scope.files.push(data.files[0]);
        }

        scope.$apply();
        // console.info(scope.group);
        // console.info(scope.files);
      });

      if (scope.setUploadFn()) {
        scope.setUploadFn()((url, formData) => {
            let deferred = $q.defer();

            // 初始化
            file.fileupload({autoUpload: false});
            file.fileupload('send', {
              url: url,
              type: 'POST',
              dataType: 'json',
              formData: formData,
              files: scope.files,
              paramName: scope.group,
              singleFileUploads: false
            }).success((result) => {
              deferred.resolve(result);
            });

          return deferred.promise;
        })
      }
    }
  };

  return directive;
}