'use strict';

angular.module('app.documents').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('documents-list', {
        url: '/documents',
        templateUrl: '/js/documents/partials/list.html',
        controller: 'DocumentListController'
      })
      .state('documents-edit', {
        url: '/documents/:id/edit',
        templateUrl: '/js/documents/partials/edit.html',
        controller: 'DocumentEditController'
      })
      .state('documents-new', {
        url: '/documents/new',
        templateUrl: '/js/documents/partials/new.html',
        controller: 'DocumentAddController'
      })
    }
);
