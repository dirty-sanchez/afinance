"use strict";

module.exports = {
  findAll: (req, res) => {
    res.json([{createdAt: new Date(), id: 1, name: '123'}]);
  }
};
