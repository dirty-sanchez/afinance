"use strict";
/**
 * DivisionDetailsReportController
 *
 * @description :: Server-side logic for managing Divisiondetailsreports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    var now = new Date();
    var filter = FilterService._makeFilter(req);

    console.dir(filter);

    Document.query('select date_format(doc.createdAt, $3) as date, \
      posgroup.costType as costType, \
      pos.name, \
      posgroup.name as gr, \
      sum(posdoc.price) as value, \
      count(posdoc.id) as cnt \
    from document as doc \
      inner join positiondocument as posdoc on (doc.id = posdoc.document) \
      inner join position as pos on (posdoc.position = pos.id) \
      inner join positiongroup as posgroup on (posgroup.id = pos.group) \
      where doc.createdAt between $1 and $2 \
    group by date, costType, pos.id \
    order by date',
      [filter.dateFrom.toISOString(), filter.dateTo.toISOString(), filter.groupByAsQueryParam()],
      function (err, queryData) {
        console.dir(queryData);
        res.json(queryData);
      }
    );
    // var reportData = [{
    //   divisionInfo: {id: 1, name: 'ГАЗЕЛЬ 521'},
    //   positions: [
    //     {id: 'mileage', name: 'Пробег (км)', value: 10215, type: 'cost'},
    //     {id: 'fuelConsumption', name: 'ГСМ (руб)', value: 268126, type: 'cost'},
    //     {id: 1, name: 'Оплата труда (руб)', value: 10215, type: 'cost'},
    //     {id: 2, name: 'Ремонт (руб)', value: 10215, type: 'cost'},
    //     {id: 3, name: 'Оплата по договору (руб)', value: 300000, type: 'income'}
    //   ]}, {
    //   divisionInfo: {id: 2, name: 'Volvo 595'},
    //   positions: [
    //     {id: 'mileage', name: 'Пробег (км)', value: 1021, type: 'cost'},
    //     {id: 'fuelConsumption', name: 'ГСМ (руб)', value: 68126, type: 'cost'},
    //     {id: 1, name: 'Оплата труда (руб)', value: 215, type: 'cost'},
    //     {id: 2, name: 'Ремонт (руб)', value: 1015, type: 'cost'},
    //     {id: 3, name: 'Оплата по договору (руб)', value: 30000, type: 'income'}
    //   ]
    // }];
    //
    // res.json(reportData);
  }
	
};

