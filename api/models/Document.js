/**
 * Document.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id : { type: 'integer', autoIncrement: true, unique: true, primaryKey: true },

    number: { type: 'integer' },

    division: {
      model: 'division',
    },

    // one-to-many group association
    positions: {
      collection: 'positiondocument',
      via: 'document'
    },

    // one-to-many group association
    documentType: {
      model: 'documenttype',
      defaultsTo: 1
    }
  }
};

