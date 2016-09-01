'use strict';

angular.
  module('core.contragent').
  factory('Contragent', ['$resource',
    function($resource) {
      return $resource(
        'http://127.0.0.1:1337/contragent/:id',
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
          'http://127.0.0.1:1337/contragentgroup/:id',
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
