/**
 * 上传指令
 */

export function UploadDirective ($q, dialogService, toastr) {
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
      val: '=',
      files: '=',
      group: '=',
      setUploadFn: '&',
      verification: '&'
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


        let countSize = 0;
        for (var index = 0, ilen = file[0].files.length; index < ilen; index++) {
          let fileObject = file[0].files[index];
          countSize += fileObject.size;
        }

        if (scope.verification()) {
          let msg = scope.verification()(file[0].files, countSize);
          if (msg !== true) {
            toastr.error(msg, '验证提示');
            return;
          }
        }

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
          // maxFileSize: 50000000,
          // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      });

      if (scope.setUploadFn()) {
        scope.setUploadFn()((url, formData) => {
            let deferred = $q.defer();

let title = '上传中请稍后';
let html = `<div class="progress progress-sm active">
  <div class="progress-bar progress-bar-success progress-bar-striped">
    <span class="sr-only"></span>
  </div>
</div>`;
var msg = toastr.info(html, title, {timeOut: 0, closeButton: false});


            // 初始化
            file.fileupload({utoUpload: false});
            file.fileupload('option', {
              progressall: function (e, data) {

                  var speed = parseInt(data.bitrate / 1024, 10);
                  var progress = parseInt(data.loaded / data.total * 100, 10);
                  msg.el.find('.progress-bar-striped').width(progress + '%');
                  msg.el.find('.toast-title').html(title + '&nbsp;' + speed + 'kb/s');

                  if (progress) { msg.el.mouseout(); }
              }
            });

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

//             file.bind('fileuploadprogress', function (e, data) {
//     // Log the current bitrate for this upload:
//     console.log(data, data.total);
//     console.log(data.bitrate);
// });

          return deferred.promise;
        })
      }
    }
  };

  return directive;
}