'use strict';

angular.
  module('core.division').
  factory('Division', ['$resource',
    function($resource) {
      return $resource(
        'http://127.0.0.1:1337/division/:id',
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
          'http://127.0.0.1:1337/divisiongroup/:id',
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
