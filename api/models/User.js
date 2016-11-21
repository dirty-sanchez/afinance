
module.exports = {

  attributes: {
    id : { type: 'integer', autoIncrement: true, unique: true, primaryKey: true },

    username: { type: 'string' },

    password: { type: 'string' },

    role: { type: 'string' }
  }
};

