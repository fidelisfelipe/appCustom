'use strict';
angular.module('main').factory('Movies', function ($http, $log) {
  var cachedData;

  function getData (moviename, apiKey, callback) {

    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=' + apiKey;

    $http.get(url + mode + key + name).success(function (data) {

      cachedData = data.results;
      callback(data.results);
    });
  }

  return {
    list: getData,
    find: function (name, callback) {
      $log.log(name);
      var movie = cachedData.filter(function (entry) {
        return entry.id === name;
      })[0];
      callback(movie);
    }
  };

});
angular.module('main')
.controller('SearchCtrl', function ($log, $scope, $ionicSideMenuDelegate, Movies) {

  $log.log('Hello from your Controller: SearchCtrl in module main:. This is your controller:', this);
  $scope.selected = {
    movieName: 'Batman'
  };

  $scope.settings = {
    apiKey: '5fbddf6b517048e25bc3ac1bbeafb919',
    itemsPerPage: 5,
    minimumScore: 5
  };

  $scope.greaterThan = function (fieldName) {
    return function (item) {
      return item[fieldName] > $scope.settings.minimumScore;
    };
  };

  $scope.searchMovieDB = function () {

    Movies.list($scope.selected.movieName, $scope.settings.apiKey, function (movies) {
      $scope.movies = movies;
    });

  };

  $scope.searchMovieDB();
});
