/**
 * PositionDocument.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    positionId: {
      model: 'position'
    },

    piecesCount: {type: 'integer', required: true, defaultsTo: 1},

    pricePerPiece: { type: 'string', required: true},

    price: { type: 'string', required: true },

    document: {
      model: 'document'
    },
  }
};

