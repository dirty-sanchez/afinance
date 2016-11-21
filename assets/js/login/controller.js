"use strict";

angular.module('app.login', [])
  .controller('LoginController', function ($scope, $state, $stateParams, $window, $http) {
    $scope.username = '';
    $scope.password = '';
    if ($stateParams.do === 'logout') {
      $http.post('login/logout');
    }

    $scope.login = function () {
      $http.post('login/login', {username: $scope.username, password: $scope.password})
        .then(() => {
            $state.go('documents-list');
          },
          (responseObj) => {
            if (responseObj.status == 401) {
              console.log('Failed to login: bad username or password');
            } else if (responseObj.status == 400) {
              console.log('Username and password are required!!');
            } else {
              console.log('Something went wrong! try again later');
            }
          }
        );
    }
  })
  .controller('LogoutController', function ($scope, $state) {
    $scope.logout = function () {
      $state.go('login');
    };
  })
;
