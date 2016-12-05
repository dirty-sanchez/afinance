'use strict';

angular.
  module('core.log')
  .factory('Log', ['$resource',
    function($resource) {
      return $resource(
        '/worklog/'
      );
    }
  ])
;
