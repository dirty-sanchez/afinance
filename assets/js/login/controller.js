"use strict";

angular.module('app.login', ['ui-notification'])
  .controller('LoginController', function ($scope, $state, $stateParams, $window, AuthService, Notification) {
    $scope.username = '';
    $scope.password = '';
    if ($stateParams.do === 'logout') {
      AuthService.logout()
    }

    $scope.login = function () {
      AuthService.login($scope.username, $scope.password).then((userData) => {
        $scope.setCurrentUsername($scope.username);
        $scope.setCurrentUserInfo(userData);
        $state.go('documents-list');
      }, () => {
        Notification.error('Неправильный логин или пароль.')
      });
    }
  })
  .controller('LogoutController', function ($scope, $state) {
    $scope.logout = function () {
      $state.go('login');
    };
  })
;
