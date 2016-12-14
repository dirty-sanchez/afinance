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
      }, (response) => {
        if (response.status === 401) {
          Notification.error('Неправильный логин или пароль.');
        } else {
          Notification.warning('Что то пошло не так на сервере, обратитесь в техподдержку.');
        }
      });
    }
  })
  .controller('LogoutController', function ($scope, $state) {
    $scope.logout = function () {
      $state.go('login');
    };
  })
;
