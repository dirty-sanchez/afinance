"use strict";
/**
 * Created by sas on 10/20/2016.
 */

module.exports = {
  makeFilter: (req) => {
    var now = new Date();
    var filter = {
      dateFrom: null,
      dateTo: null,
      groupBy: 'day',
      groupByAsQueryParam: () => {
        switch (this.groupBy) {
          case 'year':
            return '%Y';
          case 'month':
            return '%Y-%m';
          default:
            return '%Y-%m-%d';
        }
      }
    };
    var dateFrom, dateTo, groupBy;
    if (req.query != undefined) {
      if (!isNaN(Date.parse(req.query.dateFrom))) {
        dateFrom = new Date(req.query.dateFrom)
      }

      if (!isNaN(Date.parse(req.query.dateTo))) {
        dateTo = new Date(req.query.dateTo);
      }

      if (req.query.groupBy != undefined && ['day', 'month', 'year'].indexOf(req.query.groupBy) != -1) {
        groupBy = req.query.groupBy;
      }
    }

    if (dateFrom !== undefined && dateTo != undefined && dateFrom > dateTo) {
      filter.dateFrom = dateFrom;
      filter.dateTo = dateTo;
    } else {
      filter.dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      filter.dateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    filter.dateTo.setDate(filter.dateTo.getDate() + 1);
    if (groupBy !== undefined) {
      filter.groupBy = groupBy;
    }

    return filter;
  },
};
