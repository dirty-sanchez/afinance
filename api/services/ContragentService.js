/**
 * Created by asv on 25.08.2016.
 */
module.exports = {
  getContragents: function (next) {
    Contragent.find({sort: 'name ASC'})
      .exec(function(err, contragents) {
        if (err) throw err;
        next(contragents);
      });
  },
  getContragent: function (id, next) {
    Contragent.find({ where: { id: id }})
      .exec(function (err, contragents) {
        if (err) throw err;
        if (contragents.length > 0) {
          next(contragents[0]);
        } else {
          next();
        }
      })
  },
  addContragent: function(itemToAdd, next) {
    Contragent.create({value: itemToAdd})
      .exec(function(err, addedItem) {
        if(err) throw err;
        next(addedItem);
      });
  },
  removeContragent: function(itemToRemove, next) {
    Contragent.destroy({value: itemToRemove})
      .exec(function(err, removedItem) {
        if(err) throw err;
        next(removedItem);
      });
  }
}
