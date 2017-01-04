/**
 * Adds support for count blueprint and binds :model/count route for each RESTful model.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
// import pluralize from 'pluralize';
var pluralize = require('pluralize').pluralize;

const defaultCountBlueprint = function(req, res) {
  var Model = actionUtil.parseModel(req);
  var countReqCopy = Object.assign(req);
  var countQuery = Model.count(actionUtil.parseCriteria(countReqCopy));
  var query;
  var fetchQuery;

  req.query.limit = req.query.limit || 5;
  req.query.skip = req.query.skip || 0;
  query = Model.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
  fetchQuery = actionUtil.populateRequest(query, req);
  Promise.all([countQuery, fetchQuery])
    .then(function(results) {
      res.set('X-Total-Count', results[0]);
      return res.ok(results[1]);
    })
    .catch(function(errorData) {
      throw Error(errorData);
    });
};

module.exports = function (sails) {
  return {
    initialize: function(cb) {
      var config = sails.config.blueprints;
      var countFn = _.get(sails.middleware, 'blueprints.count') || defaultCountBlueprint;

      sails.on('router:before', function() {
        _.forEach(sails.models, function(model) {
          var controller = sails.middleware.controllers[model.identity];

          if (!controller) return;

          var baseRoute = [config.prefix, model.identity].join('/');

          if (config.pluralize && _.get(controller, '_config.pluralize', true)) {
            baseRoute = pluralize(baseRoute);
          }

          var route = baseRoute + '/pagedQuery';

          sails.router.bind(route, countFn, null, {controller: model.identity});
        });
      });

      cb();
    }
  }
};
