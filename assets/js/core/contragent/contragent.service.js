'use strict';

angular.
  module('core.contragent').
  factory('Contragent', ['$resource',
    function($resource) {
      return $resource(
        '/contragent/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }
  ])
    .factory('ContragentGroup', ['$resource',
      function($resource) {
        return $resource(
          '/contragentgroup/:id',
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
