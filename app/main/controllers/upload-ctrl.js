'use strict';
angular.module('main')
.controller('UploadCtrl', function ($log, $http, FlashService, Backand) {

  $log.log('Hello from your Controller: UploadCtrl in module main:. This is your controller:', this);
  var bind = this;
  // Create a server side action in backand
  // Go to any object's actions tab
  // and click on the Backand Storage icon.
  // Backand consts:
  var baseUrl = '/1/objects/';
  var baseActionUrl = baseUrl + 'files/';
  var objectName = 'files';
  var filesActionName = 'files';

  // Store the file name after upload to be used for delete
  bind.filename = null;
  function loadImages () {
    FlashService.Loading(true, 'load images...');
    $http({
      method: 'GET',
      url: Backand.getApiUrl() + baseActionUrl,
      params: {
        'pageSize': 20,
        'pageNumber': 1,
        'filter': null,
        'sort': ''
      }
    }).then(function (res) {
      bind.imagens = [];
      bind.totalRows = res.data.totalRows;
      for (var i = 0; i < res.data.totalRows; i++) {
        bind.imagens.push({
          dataURL: res.data.data[i].filedata,
          id: res.data.data[i].id
        });
        $log.log('image: ', res.data.data[i].filename);
      }
      FlashService.Loading(false);
    });

  }
  // input file onchange callback
  function imageChanged (fileInput) {
    $log.log('imageChanged');
    //read file content
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      upload(file.name, e.currentTarget.result).then(function (res) {
        bind.file = file;
        bind.filename = file.name;
//add img in canvas
        bind.imagens.push({
          dataURL: res.data.filedata,
          id: res.data.id
        });
        bind.totalRows++;
      }, function (err) {
        $log.debug('erro ao alterar imagem...', err);
      });
    };

    reader.readAsDataURL(file);
  }

  // register to change event on input file
  function initUpload () {
    $log.log('initUpload');
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function () {
      imageChanged(fileInput);
    });
  }

   // call to Backand action with the file name and file data
  function upload (filename, filedata) {
    $log.log('upload');

    // By calling the files action with POST method in will perform
    // an upload of the file into Backand Storage
    return $http({
      method: 'POST',
      url: Backand.getApiUrl() + baseActionUrl +  objectName,
      params: {
        'name': filesActionName,
        'returnObject': true
      },
      headers: {
        'Content-Type': 'application/json'
      },
      // you need to provide the file name and the file data
      data: {
        'filename': filename,
        'filedata': filedata//need to remove the file prefix type
      }
    });
  }

  bind.deleteFile = function (image) {
    $log.log('deleteFile');
    if (!image.id) {
      alert('Please choose a file');
      return;
    }
    // By calling the files action with DELETE method in will perform
    // a deletion of the file from Backand Storage
    $http({
      method: 'DELETE',
      url: Backand.getApiUrl() + baseActionUrl + image.id,
      params: {
        'name': filesActionName
      },
      headers: {
        'Content-Type': 'application/json'
      },
      // you need to provide the file name
      data: {
        //'filename': bind.filename
      }
    }).then(function () {
      // Reset the form
      bind.imageUrl = null;
      document.getElementById('fileInput').value = '';
      bind.imagens.splice(bind.imagens.indexOf(image), 1);
      bind.totalRows = bind.totalRows - 1;
    });
  };

  bind.initCtrl = function () {
    loadImages();
    $log.log(initUpload());
  };
});
