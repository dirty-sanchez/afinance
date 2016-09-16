'use strict';

angular.
  module('core.position').
  factory('Position', ['$resource',
    function($resource) {
      return $resource(
        '/position/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }
  ])
;
