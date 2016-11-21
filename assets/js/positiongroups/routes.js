'use strict';

angular.module('app.positiongroups').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('positiongroups-list', {
        parent: 'layout',
        url: '/positiongroups',
        templateUrl: '/js/positiongroups/partials/list.html',
        controller: 'PositionGroupListController'
      })
      .state('positiongroups-edit', {
        parent: 'layout',
        url: '/positiongroups/:id/edit',
        templateUrl: '/js/positiongroups/partials/edit.html',
        controller: 'PositionGroupEditController'
      })
      .state('positiongroups-new', {
        parent: 'layout',
        url: '/positiongroups/new',
        templateUrl: '/js/positiongroups/partials/new.html',
        controller: 'PositionGroupAddController'
      })
    }
);
