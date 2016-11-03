'use strict';

angular.module('app.positions').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('positions-list', {
        url: '/positions',
        templateUrl: '/js/positions/partials/list.html',
        controller: 'PositionListController'
      })
      .state('positions-edit', {
        url: '/positions/:id/edit',
        templateUrl: '/js/positions/partials/edit.html',
        controller: 'PositionAddEditController'
      })
      .state('positions-new', {
        url: '/positions/new',
        templateUrl: '/js/positions/partials/edit.html',
        controller: 'PositionAddEditController'
      })
    }
);
