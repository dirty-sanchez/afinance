'use strict';

angular.module('app.documenttypes').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('documenttypes-list', {
        parent: 'layout',
        url: '/documenttypes',
        templateUrl: '/js/documenttypes/partials/list.html',
        controller: 'DocumentTypeListController'
      })
      .state('documenttypes-edit', {
        parent: 'layout',
        url: '/documenttypes/:id/edit',
        templateUrl: '/js/documenttypes/partials/edit.html',
        controller: 'DocumentTypeAddEditController'
      })
      .state('documenttypes-new', {
        parent: 'layout',
        url: '/documenttypes/new',
        templateUrl: '/js/documenttypes/partials/edit.html',
        controller: 'DocumentTypeAddEditController'
      })
    }
);
