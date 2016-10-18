/**
 * DivisionDetailsReportController
 *
 * @description :: Server-side logic for managing Divisiondetailsreports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: (req, res) => {
    Document.query('select doc.id, pos.name, posgroup.name, doc.createdAt, sum(posdoc.price) \
    from document as doc \
      inner join positiondocument as posdoc on (doc.id = posdoc.document) \
      inner join position as pos on (posdoc.position = pos.id) \
      inner join positiongroup as posgroup on (posgroup.id = pos.group) \
      where doc.id in (1,34) \
      group by pos.name',
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

