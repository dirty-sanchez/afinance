'use strict';

angular.module('app.layout').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('applayout', {
          abstract: true,
          templateUrl: '/js/layout/app.layout.html',
          controller: 'LayoutController'
      })
    }
);
