'use strict';

angular.module('app.reports').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('detailed-report', {
        parent: 'layout',
        url: '/reports/detailed',
        templateUrl: '/js/reports/partials/detailed.html',
        controller: 'DetailedReportController'
      })
      .state('summary-report', {
        parent: 'layout',
        url: '/report/common',
        templateUrl: '/js/reports/partials/summary.html',
        controller: 'SummaryReportController'
      })
    }
);
