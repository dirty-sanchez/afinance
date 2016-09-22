/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //create: function(request, response) {
  //  "use strict";
  //  return response.toJson({id: 'test', name: 'aasdfadsfadf'});
  //},

  _makeDocumentDtoForUpdate: (oldInstance, userInput) => {
    "use strict";
    var res = {};
    if (oldInstance.name !== userInput.name) {
      res.name = userInput.name;
    }

    if (oldInstance.number !== userInput.number) {
      res.number = userInput.number;
    }

    if (oldInstance.division !== userInput.division.id) {
      res.division = userInput.division.id;
    }

    if (oldInstance.documenttype !== userInput.documenttype.id) {
      res.documenttype = userInput.documenttype.id;
    }

    return res;
  },

  _makePositionsAddDeleteUpdateInfo: (oldInstance, userInput) => {
    "use strict";
    const NEW_ID = 'new_position';
    var positionsToUpdate = [];
    var positionsIdToDelete = [];
    var positionsToAdd = userInput.positions
      .filter((position) => position.id === NEW_ID)
      .map((positionUsersInput) => {
        return {name: positionUsersInput.name, position_type: positionUsersInput.position_type, value: positionUsersInput.value}
      });
    oldInstance.positions.forEach((oldPosition) => {
      var positionToUpdate = userInput.positions.find((positionToFind) => positionToFind.id === oldPosition.id);
      if (positionToUpdate !== undefined) {
        positionsToUpdate.push({
          id: oldPosition.id,
          dtoForUpdate: {name: positionToUpdate.name, position_type: positionToUpdate.position_type, value: positionToUpdate.value}
        });
      } else {
        positionsIdToDelete.push(oldPosition.id);
      }
    });

    return {
      positionsToAdd: positionsToAdd,
      positionsIdToDelete: positionsIdToDelete,
      positionsToUpdate: positionsToUpdate
    };
  },

  update: function(req, res) {
    "use strict";
    var me = this;
    Document.findOne(req.param('id')).populate('positions')
      .then((oldInstance) => {
        var userInput = req.body;
        var promisesList = [];
        var dtoForUpdate = me._makeDocumentDtoForUpdate(oldInstance, userInput);
        var positionsToAdd;
        var positionsIdToDelete;
        var positionsToUpdate;
        var positionsDtoInfo = me._makePositionsAddDeleteUpdateInfo(oldInstance, userInput);

        if (positionsDtoInfo.positionsIdToDelete.length > 0) {
          promisesList.push(Position.destroy({id: positionsDtoInfo.positionsIdToDelete}));
        }

        if (positionsDtoInfo.positionsToUpdate.length > 0) {
          positionsDtoInfo.positionsToUpdate.forEach((positionDtoToUpdate) => {
            promisesList.push(Position.update(positionDtoToUpdate.id, positionDtoToUpdate.dtoForUpdate));
          });
        }

        if (positionsDtoInfo.positionsToAdd.length > 0) {
          oldInstance.positions.add(positionsDtoInfo.positionsToAdd);
          promisesList.push(oldInstance.save());
        }

        Promise.all(promisesList).then(() => {
          Document.update({id: oldInstance.id}, dtoForUpdate).then(() => {
            return res.ok('updated');
          });
        })
    });
  }
};
