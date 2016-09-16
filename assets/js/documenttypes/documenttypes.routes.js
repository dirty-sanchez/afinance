'use strict';

angular.module('app.documenttypes').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('documenttypes-list', {
        url: '/documenttypes',
        templateUrl: '/js/documenttypes/partials/list.html',
        controller: 'DocumentTypeListController'
      })
      .state('documenttypes-edit', {
        url: '/documenttypes/:id/edit',
        templateUrl: '/js/documenttypes/partials/edit.html',
        controller: 'DocumentTypeEditController'
      })
      .state('documenttypes-new', {
        url: '/documenttypes/new',
        templateUrl: '/js/documenttypes/partials/new.html',
        controller: 'DocumentTypeAddController'
      })
    }
);
