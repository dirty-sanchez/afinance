'use strict';

angular.
  module('core.division').
  factory('Division', ['$resource',
    function($resource) {
      return $resource(
        '/division/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }
  ])
    .factory('DivisionGroup', ['$resource',
      function($resource) {
        return $resource(
          '/divisiongroup/:id',
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
