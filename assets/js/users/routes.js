'use strict';

angular.module('app.users').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('users-list', {
        parent: 'layout',
        url: '/users',
        templateUrl: '/js/users/partials/list.html',
        controller: 'UserListController as vm'
      })
      .state('users-edit', {
        parent: 'layout',
        url: '/users/:id/edit',
        templateUrl: '/js/users/partials/edit.html',
        controller: 'UserAddEditController'
      })
      .state('users-new', {
        parent: 'layout',
        url: '/users/new',
        templateUrl: '/js/users/partials/new.html',
        controller: 'UserAddEditController'
      })
    }
);
