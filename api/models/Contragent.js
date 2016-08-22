/**
 * Contragent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id : { type: 'integer', autoIncrement: true, unique: true },

    name : { type: 'string' },

    inn: { type: 'string', defaultTo: '' },

    ogrn: { type: 'string', defaultTo: '' },

    okpo: { type: 'string', defaultTo: '' },

    address: { type: 'string', defaultTo: '' },

    kpp: { type: 'string', defaultTo: '' },

    phone: { type: 'string', defaultTo: '' },

    email: { type: 'string', defaultTo: '' },

    bank_account_nr: { type: 'string', defaultTo: '' },

    bank_name: { type: 'string', defaultTo: '' },

    bank_bik: { type: 'string', defaultTo: '' },

    bank_corr_account_nr: { type: 'string', defaultTo: '' },

  }
};

