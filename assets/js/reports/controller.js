"use strict";

angular.module('app.reports', [])
  .controller('DetailedReportController', function($scope, $state, DetailsReport) {
    $scope.filter = {
      dateFrom: '2016-09-01',
      dateTo: '2016-09-30'
    };
    $scope.data = [];

    $scope.fetchData = (filter) => {
      $scope.data = DetailsReport.query(filter);
    }
  })
  .controller('SummaryReportController', function($scope, $state) {
  })
;
