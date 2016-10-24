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
    var filter = FilterService.makeFilter(req);
    ReportService.fetchData(filter)
      .then((queryData) => {
        res.json(queryData);
      })
      .catch((err) => {
        return res.status(422).send(err);
      });

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

