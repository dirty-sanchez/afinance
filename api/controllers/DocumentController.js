"use strict";
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

    if (oldInstance.documentType !== userInput.documentType.id) {
      res.documentType = userInput.documentType.id;
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
        return {
          position: positionUsersInput.position,
          piecesCount: positionUsersInput.piecesCount,
          pricePerPiece: positionUsersInput.pricePerPiece,
          price: positionUsersInput.price
        }
      });
    oldInstance.positions.forEach((oldPosition) => {
      var positionToUpdate = userInput.positions.find((positionToFind) => positionToFind.id === oldPosition.id);
      if (positionToUpdate !== undefined) {
        positionsToUpdate.push({
          id: oldPosition.id,
          dtoForUpdate: {
            position: positionToUpdate.position,
            piecesCount: positionToUpdate.piecesCount,
            pricePerPiece: positionToUpdate.pricePerPiece,
            price: positionToUpdate.price
          }
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
    var me = this;
    Document.findOne(req.param('id')).populate('positions')
      .then((oldInstance) => {
        var userInput = req.body;
        var promisesList = [];
        var dtoForUpdate = me._makeDocumentDtoForUpdate(oldInstance, userInput);
        var positionsDtoInfo = me._makePositionsAddDeleteUpdateInfo(oldInstance, userInput);

        if (positionsDtoInfo.positionsIdToDelete.length > 0) {
          promisesList.push(PositionDocument.destroy({id: positionsDtoInfo.positionsIdToDelete}));
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

        Promise.all(promisesList)
          .then(() => {
            return Document.update({id: oldInstance.id}, dtoForUpdate).then(() => {
              return res.ok('updated');
            });
          })
          .catch((err) => {
            return res.status(422).send(err);
          });
    });
  },

  create: function(req, res) {
    var me = this;
    Document.create({
      division: req.body.division.id,
      documentType: req.body.documentType.id
    })
      .then((doc) => {
        var positions = req.body.positions.map((posData) => {
          return {
            position: posData.position,
            piecesCount: posData.piecesCount,
            pricePerPiece: posData.pricePerPiece,
            price: posData.price,
            document: doc.id
          };
        });

        PositionDocument.create(positions)
          .then((positionsDoc) => {
            return res.created(doc);
          })
          .catch((err) => {
            return res.status(422).send(err);
          });
      })
      .catch((err) => {
        return res.status(422).send(err);
      });
  }
};
