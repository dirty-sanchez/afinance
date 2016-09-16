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

  //update: function(req, res) {
  //  "use strict";
  //  //console.dir(req);
  //  Document.findOne(req.param('id')).then((err, oldInstance) => {
  //    var newInstance = req.body;
  //    var newPositions = newInstance.positions;
  //    var positionsToAdd = newPositions.filter((position) => position.id === 'new_id');
  //    var positionsIdToDelete = [];
  //    var positionsToUpdate = [];
  //    for (var oldPosition in oldInstance.positions) {
  //      var updatedPositionList = newPositions.find((positionToFind) => positionToFind.id === oldPosition.id);
  //      if (updatedPositionList.length > 0) {
  //        oldPosition.name = updatedPositionList[0].name;
  //        oldPosition.position_type = updatedPositionList[0].position_type;
  //        positionsToUpdate.push(oldPosition);
  //      } else {
  //        positionsIdToDelete.push(oldPosition.id);
  //      }
  //    }
  //
  //    if (positionsIdToDelete.length > 0) {
  //      Position.destroy({id: positionsIdToDelete});
  //    }
  //
  //    if (positionsToAdd.length > 0) {
  //      Position.create(positionsToAdd).then((addedPositions) => {
  //        var addedIds = addedPositions.map((position) => position.id);
  //
  //      });
  //    }
  //
  //    if (positionsToUpdate.length > 0) {
  //      Position.update(positionsToUpdate)
  //    }
  //
  //    newInstance.createdAt = oldInstance.createdAt;
  //    newInstance.positions = newInstance.positions.map((position) => position.id );
  //    Document.update
  //    //console.dir(newItem);
  //    return res.ok({still: 'ok'});
  //  });
  //}
};
