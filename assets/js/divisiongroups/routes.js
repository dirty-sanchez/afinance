'use strict';

angular.module('app.divisiongroups').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('divisiongroups-list', {
        parent: 'layout',
        url: '/divisiongroups',
        templateUrl: '/js/divisiongroups/partials/list.html',
        controller: 'DivisionGroupListController'
      })
      .state('divisiongroups-edit', {
        parent: 'layout',
        url: '/divisiongroups/:id/edit',
        templateUrl: '/js/divisiongroups/partials/edit.html',
        controller: 'DivisionGroupEditController'
      })
      .state('divisiongroups-new', {
        parent: 'layout',
        url: '/divisiongroups/new',
        templateUrl: '/js/divisiongroups/partials/new.html',
        controller: 'DivisionGroupAddController'
      })
    }
);
