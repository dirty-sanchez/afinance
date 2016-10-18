"use strict";

angular.module('app.reports', [])
  .controller('DetailedReportController', function($scope, $state, DetailsReport) {
    var now = new Date();
    $scope.filter = {
      dateFrom: new Date(now.getFullYear(), now.getMonth(), 1),
      dateTo: now,
      groupBy: 'day'
    };
    $scope.availableGrouping = [
      {id: 'day', name: 'по дням'},
      {id:'week', name:'по неделям'},
      {id: 'month', name: 'по месяцам'},
      {id: 'year', name: 'по годам'}
    ];
    $scope.data = [];

    $scope.fetchData = (filter) => {
      $scope.data = DetailsReport.query(filter);
    }
  })
  .controller('SummaryReportController', function($scope, $state) {
  })
;
