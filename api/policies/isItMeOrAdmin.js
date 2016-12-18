/**
 * Created by sas on 11/3/2016.
 */

module.exports = function isItMeOrAdmin(req, res, next) {
  "use strict";
  var myUserId = req.session.userId;
  var myRole = req.session.userRole;
  var requestedUserId = req.params.id;

  if (myUserId == undefined) {
    return res.send(401);
  }

  if (myUserId !== requestedUserId && myRole !== 'admin') {
    return res.send(403);
  }

  return next();
}
