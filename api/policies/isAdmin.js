/**
 * Created by sas on 11/3/2016.
 */

module.exports = function isAdmin(req, res, next) {
  "use strict";

  User.findOne({authKey: authKey})
    .exec((err, user) => {
      if (err) {
        return res.serverError(err);
      }

      if (user == undefined) {
        return res.send(401);
      }

      if (user.role != 'admin') {
        return res.send(403);
      }

      return next();
    });
}
