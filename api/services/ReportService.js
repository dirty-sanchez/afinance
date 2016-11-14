"use strict";
/**
 * Created by sas on 10/20/2016.
 */

var ReportService = {
  preapareEmptyData: (filter) => {
    var data = [];
    var dateCntr;
    var cycleLimit = 500;

    dateCntr = new Date(filter.dateFrom);
    while (dateCntr <= filter.dateTo) {
      data.push(dateCntr);
      dateCntr = filter.incDate(dateCntr);
      if (--cycleLimit === 0) {
        throw Error('cycleLimit reached 0. halting');
      }
    }

    return data;
  },

  fetchData: (filter) => {
    return new Promise((resolve, reject) => {
      var filterByDivisions = filter.divisionsOnly.length > 0;
      var filterByDivisionGroups = filter.divisionGroupsOnly.length > 0;
      var sql = 'select date_format(doc.createdAt, "' + filter.groupByAsQueryParam() + '") as date, \
        posgroup.costType as costType, \
        pos.id as positionId, \
        pos.name as positionName, \
        posgroup.id as groupId, \
        posgroup.name as groupName, \
        sum(posdoc.price) as value, \
        count(posdoc.id) as cnt \
        from document as doc \
          inner join positiondocument as posdoc on (doc.id = posdoc.document) \
          inner join position as pos on (posdoc.position = pos.id) \
          inner join positiongroup as posgroup on (posgroup.id = pos.group) ';

      if (filterByDivisions || filterByDivisionGroups) {
        sql += ' inner join division on (doc.division = division.id) ';
        if (filterByDivisionGroups) {
          sql += ' inner join division_groups__divisiongroup_divisions as divisions_in_groups on (divisions_in_groups.division_groups = division.id) '
        }
      }

      sql += ' where doc.createdAt between "' + filter.dateFrom.toISOString() + '" and "' + filter.dateTo.toISOString() + '" ';
      if (filterByDivisions) {
        sql += ' and division.id in (' + filter.divisionsOnly.join(',') + ') ';
      }

      if (filterByDivisionGroups) {
        sql += ' and divisions_in_groups.divisiongroup_divisions in (' + filter.divisionGroupsOnly.join(',') + ') ';
      }

      sql += 'group by date, costType, pos.id';
      console.log(sql);
      Document.query(sql, (err, queryData) => {
          // var res = {
          //   columns: [],
          //   rowsInfo: {},
          //   data: {}
          // };
          // res.columns = ReportService.preapareEmptyData(filter);
          if (err != undefined) {
            return reject(err);
          }

          // var positionGroupsMap = {};
          // var data = [];
          // queryData.forEach((rowData) => {
          //   if (positionGroupsMap[rowData.groupId] == undefined) {
          //     positionGroupsMap[rowData.groupId] = {id: rowData.groupId, name: rowData.groupName, costType: rowData.costType, positions: []};
          //   }
          //
          //   positionGroupsMap[rowData.groupId].positions.push({id: rowData.positionId, name: rowData.positionName});
          //   data.push({
          //     positionId: rowData.positionId,
          //     date: new Date(rowData.date).toISOString(),
          //     value: rowData.value
          //   });
          // });


          return resolve(queryData);
        })
    });
  }
};

module.exports = ReportService;