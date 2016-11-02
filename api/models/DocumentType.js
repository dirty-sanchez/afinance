"use strict";

module.exports = {

  attributes: {
    id : { type: 'integer', autoIncrement: true, unique: true, primaryKey: true },

    name : { type: 'string' },

    isDeleted: { type: 'boolean', defaultsTo: false},

    documents: {
      collection: 'document',
      via: 'documentType'
    },

    // расходный или приходный документ
    costType: { type: 'string', enum: ['income', 'cost' ]},
  }
};

