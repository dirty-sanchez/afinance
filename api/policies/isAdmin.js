/**
 * Created by sas on 11/3/2016.
 */

module.exports = function isAdmin(req, res, next) {
  "use strict";
  var userId = req.session.userId;

  if (userId == undefined) {
    return res.send(401);
  }

  User.findOne({id: userId})
    .exec((err, user) => {
      if (err) {
        return res.serverError(err);
      }

      if (user == undefined) {
        return res.send(401);
      }

      if (user.role != 'admin') {
        return res.send(403, 'You dont have a sufficient permissions to perform this action');
      }

      return next();
    });
}
