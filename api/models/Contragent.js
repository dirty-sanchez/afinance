/**
 * Contragent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id : { type: 'integer', autoIncrement: true, unique: true, primaryKey: true },

    name : { type: 'string' },

    inn: { type: 'string', defaultsTo: '' },

    ogrn: { type: 'string', defaultsTo: '' },

    okpo: { type: 'string', defaultsTo: '' },

    address: { type: 'string', defaultsTo: '' },

    kpp: { type: 'string', defaultsTo: '' },

    phone: { type: 'string', defaultsTo: '' },

    email: { type: 'string', defaultsTo: '' },

    bank_account_nr: { type: 'string', defaultsTo: '' },

    bank_name: { type: 'string', defaultsTo: '' },

    bank_bik: { type: 'string', defaultsTo: '' },

    bank_corr_account_nr: { type: 'string', defaultsTo: '' },

    group: {
      model: 'contragentgroup',
      defaultsTo: 1
    }
  }
};

