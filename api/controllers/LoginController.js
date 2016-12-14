"use strict";
/**
 * DocumentGroupController
 *
 * @description :: Server-side logic for managing Documentgroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');


module.exports = {
	login: (req, res) => {
    var key;
    var authKey;

    if (req.param('username', '').length > 0
      && req.param('password', '').length > 0) {
      User.findOne({username: req.param('username', '')})
        .then((user) => {
          if (user == undefined || user.password !== req.param('password', '')) {
            return res.send(401);
          }

          key = (new Date()).valueOf().toString() + Math.random().toString();
          user.authKey = crypto.createHash('sha1').update(key).digest('hex');
          user.save((error) => {
            if (error) {
              throw error;
            }

            req.session.authenticated = true;
            req.session.userId = user.id;
            req.session.username = req.param('username', '<UNNAMED>');
            return res.send(200, {
              username: req.param('username', ''),
              role: user.role,
            });
          })
        })
        .catch((error) => {
          return res.serverError(error);
        });
    } else {
      return res.badRequest();
    }
  },

  check: (req, res) => {
    return res.json({authenticated: req.session.authenticated});
  },

  logout: (req, res) => {
    // if (authorized && userId == req.id)
    req.session.authenticated = false;
    return res.ok();
  }
};
