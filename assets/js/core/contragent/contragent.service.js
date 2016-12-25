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
          },
          query: {
            url: '/contragent/count',
            isArray: false
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
            },
            query: {
              url: '/contragentgroup/count',
              isArray: false
            }
          }
        );
      }
    ])
;
