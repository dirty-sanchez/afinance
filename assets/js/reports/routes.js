'use strict';

angular.module('app.reports').config(
  function($stateProvider,$httpProvider) {
    $stateProvider
      .state('detailed-report', {
        url: '/reports/detailed',
        templateUrl: '/js/reports/partials/detailed.html',
        controller: 'DetailedReportController'
      })
      .state('summary-report', {
        url: '/report/common',
        templateUrl: '/js/reports/partials/summary.html',
        controller: 'SummaryReportController'
      })
    }
);
