"use strict";

function makeValueKeyFromDateStr(date) {
  var res = new Date(date);
  res.setHours(0, 0, 0, 0);
  return res;
}

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
      // {id:'week', name:'по неделям'},
      {id: 'month', name: 'по месяцам'},
      {id: 'year', name: 'по годам'}
    ];
    $scope.data = [];

    $scope.fetchData = (filter) => {
      DetailsReport.query(filter, (queryData) => {
        var columnsInfo;
        var report = {
          columnsInfo: {},
          rowsInfo: {},
          data: {}
        };

        var rowsInfo = {};
        queryData.forEach((dataItem) => {
          var recordId = 'position:' + dataItem.positionId;
          if (rowsInfo[recordId] === undefined) {
            rowsInfo[recordId] = {
              id: recordId,
              label: dataItem.positionName,
              values: {}
            };
          }

          var valueKey = makeValueKeyFromDateStr(dataItem.date).toISOString();
          rowsInfo[recordId].values[valueKey] = dataItem.value;
        });
        columnsInfo = prepareColumnHeaders($scope.filter);
        $scope.report = {
          columnsInfo: columnsInfo,
          rowsInfo: rowsInfo,
          // data: positionDataMap
        };
      });
    }
  })
  .controller('SummaryReportController', function($scope, $state) {
  })
;


function incDate(currentDate, groupBy) {
  var res = new Date(currentDate);
  switch (groupBy) {
    case 'year':
      return new Date(currentDate.getFullYear() + 1);
    case 'month':
      res.setMonth(currentDate.getMonth() + 1);
      return res;
  }

  res.setDate(currentDate.getDate() + 1);
  return res;
}

var monthMap = [
  'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
];

function formatDateLabel(date, groupBy) {
  var lbl;
  switch (groupBy) {
    case 'month':
      lbl = monthMap[date.getMonth()] + ' - ' + date.getYear();
      break;
    case 'year':
      lbl = date.getFullYear();
      break;
    default:
      lbl = date.getDate() + ' ' + monthMap[date.getMonth()];
  }

  return lbl;
}

function prepareColumnHeaders(f) {
  var cycleLimit = 500;
  var data = [];
  var dateCntr = new Date(f.dateFrom);
  while (dateCntr <= f.dateTo) {
    data.push({
      id: dateCntr.toISOString(),
      label: formatDateLabel(dateCntr, f.groupBy),
    });
    dateCntr = incDate(dateCntr);
    if (--cycleLimit === 0) {
      throw Error('cycleLimit reached 0. halting');
    }
  }

  return data;
}
