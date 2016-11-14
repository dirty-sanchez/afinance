"use strict";

function makeValueKeyFromDateStr(date) {
  var res = new Date(date);
  res.setHours(0, 0, 0, 0);
  return res;
}

angular.module('app.reports', [])
  .controller('DetailedReportController', function($scope, $state, DetailsReport, DivisionGroup) {
    var now = new Date();

    $scope.filter = {
      dateFrom: new Date(now.getFullYear(), now.getMonth(), 1),
      dateTo: now,
      groupBy: 'day',
      divisionGroups: [],
      divisions: []
    };
    $scope.availableGrouping = [
      {id: 'day', name: 'по дням'},
      // {id:'week', name:'по неделям'},
      {id: 'month', name: 'по месяцам'},
      {id: 'year', name: 'по годам'}
    ];
    $scope.data = [];
    $scope.availableFilterDivisions = [];
    $scope.availableFilterDivisionGroups = DivisionGroup.query(() => {
      var divisonsMap = [];
      $scope.availableFilterDivisionGroups = $scope.availableFilterDivisionGroups
        .map((divisonGroup) => {
          divisonGroup.divisions.forEach((divison) => {
            divisonsMap[divison.id] = divison;
          });

          return {id: divisonGroup.id, 'name': divisonGroup.name, ticked: !divisonGroup.isDeleted};
        });

      for (var field in divisonsMap) {
        $scope.availableFilterDivisions.push(divisonsMap[field]);
      }
    });

    $scope.fetchData = (filter) => {
      var queryFilter = {
        dateFrom: filter.dateFrom,
        dateTo: filter.dateTo,
        groupBy: filter.groupBy,
        'divisionGroupsOnly[]': filter.divisionGroups.map((divisonGroupFilterObj) => divisonGroupFilterObj.id),
        'divisionsOnly[]': filter.divisions.map((divisonFilterObj) => divisonFilterObj.id)
      };

      DetailsReport.query(queryFilter, (queryData) => {
        var columnsInfo;
        var rangeInfo = {
          _data: {},
          collectValue: (rangeId, label, valueKey, value) => {
            var range;
            if (rangeInfo._data[rangeId] == undefined) {
              rangeInfo._data[rangeId] = {id: rangeId, label: label, values: {}};
            }

            range = rangeInfo._data[rangeId];
            if (range.values[valueKey] == undefined) {
              range.values[valueKey] = value;
            } else {
              range.values[valueKey] += value;
            }
          }
        };

        var rowOrderInfo = { items: [{id: 'cost', label: 'Расходы', items: []}, {id: 'income', label: 'Доходы', items: []}] };

        function addPositionInfo (hierarchyList) {
          var hierarchyElement = rowOrderInfo;
          for (var idx in hierarchyList) {
            var foundEl = hierarchyElement.items.find((el) => {
              if (el.id === hierarchyList[idx].id) {
                return el;
              }
            });

            if (foundEl == undefined) {
              foundEl = {id: hierarchyList[idx].id, label: hierarchyList[idx].label, items: []};
              hierarchyElement.items.push(foundEl);
            }

            hierarchyElement = foundEl;
          }
        }

        queryData.forEach((dataItem) => {
          var positionRangeId = 'position:' + dataItem.positionId;
          var posGroupRangeId = 'group:' + dataItem.groupId;
          var costTypeRangeLabel = (dataItem.costType === 'income') ? 'Доходы' : 'Расходы';
          var valueKey = makeValueKeyFromDateStr(dataItem.date).toISOString();
          rangeInfo.collectValue(positionRangeId, dataItem.positionName, valueKey, dataItem.value);
          rangeInfo.collectValue(posGroupRangeId, dataItem.groupName, valueKey, dataItem.value);
          rangeInfo.collectValue(dataItem.costType , costTypeRangeLabel, valueKey, dataItem.value);
          addPositionInfo([
            {id: dataItem.costType, label: costTypeRangeLabel},
            {id: posGroupRangeId, label: dataItem.groupName},
            {id: positionRangeId, label: dataItem.positionName}
          ]);
        });

        var orderedRowsInfo = [];
        rowOrderInfo.items.forEach((costType) => {
          var values = (rangeInfo._data[costType.id] != null) ? rangeInfo._data[costType.id].values : [];

          orderedRowsInfo.push({ id: costType.id, label: costType.label, values: values, offset: 0 });
          costType.items.sort((el1, el2) => {
            return el1.label.localeCompare(el2.label);
          });

          costType.items.forEach((positionGroup) => {
            var values = (rangeInfo._data[positionGroup.id] != null) ? rangeInfo._data[positionGroup.id].values : [];

            orderedRowsInfo.push({ id: positionGroup.id, label: positionGroup.label, values: values, offset: 1 });
            positionGroup.items.sort((el1, el2) => {
              return el1.label.localeCompare(el2.label);
            }).forEach((position) => {
              var values = (rangeInfo._data[position.id] != null) ? rangeInfo._data[position.id].values : [];

              orderedRowsInfo.push({ id: position.id, label: position.label, values: values, offset: 2 });
              });
          });
        });

        columnsInfo = prepareColumnHeaders($scope.filter);
        $scope.report = {
          columnsInfo: columnsInfo,
          rowsInfo: orderedRowsInfo
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
      return new Date(currentDate.getFullYear() + 1, currentDate.getMonth());
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
      lbl = monthMap[date.getMonth()] + ' - ' + date.getFullYear();
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
    dateCntr = incDate(dateCntr, f.groupBy);
    if (--cycleLimit === 0) {
      throw Error('cycleLimit reached 0. halting');
    }
  }

  return data;
}
