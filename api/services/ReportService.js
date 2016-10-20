"use strict";
/**
 * Created by sas on 10/20/2016.
 */

var ReportService = {
  _preapareEmptyData: (filter) => {
    var data = {};
    var dtDiffResolverFn;
    var dateCntr;
    switch (filter.groupBy) {
      case 'year':
        dtDiffResolverFn = (currentDate) => {
          return new Date(currentDate.getFullYear() + 1);
        };
        break;
      case 'month':
        dtDiffResolverFn = (currentDate) => {
          var res = new Date(currentDate);
          res.setMonth(currentDate.getMonth() + 1);
          return res;
        }
        break;
      default:
        dtDiffResolverFn = (currentDate) => {
          var res = new Date(currentDate);
          res.setDate(currentDate.getDate() + 1);
          return res;
        }
    }

    dateCntr = new Date(filter.dateFrom);
    var cycleLimit = 50;
    while (dateCntr <= filter.dateTo) {
      data[dateCntr] = [];
      dateCntr = dtDiffResolverFn(dateCntr);
      if (--cycleLimit === 0) {
        throw Error('cycleLimit reached 0. halting');
      }
    }

    return data;
  },

  fetchData: (filter) => {
    var data = ReportService._preapareEmptyData(filter);
    return data;
  }
};

module.exports = ReportService;