'use strict';

angular.module('app.divisiongroups').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('divisiongroups-list', {
        url: '/divisiongroups',
        templateUrl: '/js/divisiongroups/partials/list.html',
        controller: 'DivisionGroupListController'
      })
      .state('divisiongroups-edit', {
        url: '/divisiongroups/:id/edit',
        templateUrl: '/js/divisiongroups/partials/edit.html',
        controller: 'DivisionGroupEditController'
      })
      .state('divisiongroups-new', {
        url: '/divisiongroups/new',
        templateUrl: '/js/divisiongroups/partials/new.html',
        controller: 'DivisionGroupAddController'
      })
    }
);
