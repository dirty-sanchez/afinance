'use strict';

angular.module('app.divisions').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('divisions-list', {
        url: '/divisions',
        templateUrl: '/js/divisions/partials/list.html',
        controller: 'DivisionListController'
      })
      .state('divisions-edit', {
        url: '/divisions/:id/edit',
        templateUrl: '/js/divisions/partials/edit.html',
        controller: 'DivisionEditController'
      })
      .state('divisions-new', {
        url: '/divisions/new',
        templateUrl: '/js/divisions/partials/new.html',
        controller: 'DivisionAddController'
      })
    }
);
