'use strict';

angular.module('app.login').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/js/login/login.html',
        controller: 'LoginController'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: '/js/login/logout.html',
        controller: 'LogoutController'
      })
    }
);
