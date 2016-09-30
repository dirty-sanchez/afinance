/**
 * Divisions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id : { type: 'integer', autoIncrement: true, unique: true,  primaryKey: true },

    name : { type: 'string', required: true},

    mileage: { type: 'integer', defaultsTo: 0},

    isDeleted: { type: 'boolean', defaultsTo: false},

    // many-to-many group association
    groups : {
      collection: 'divisiongroup',
      via: 'divisions',
      dominant: true
    }
  }
};
