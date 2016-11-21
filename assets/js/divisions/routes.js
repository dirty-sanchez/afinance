'use strict';

angular.module('app.divisions').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('divisions-list', {
        parent: 'layout',
        url: '/divisions',
        templateUrl: '/js/divisions/partials/list.html',
        controller: 'DivisionListController'
      })
      .state('divisions-edit', {
        parent: 'layout',
        url: '/divisions/:id/edit',
        templateUrl: '/js/divisions/partials/edit.html',
        controller: 'DivisionAddEditController'
      })
      .state('divisions-new', {
        parent: 'layout',
        url: '/divisions/new',
        templateUrl: '/js/divisions/partials/edit.html',
        controller: 'DivisionAddEditController'
      })
    }
);
