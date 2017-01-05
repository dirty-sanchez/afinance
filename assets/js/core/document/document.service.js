'use strict';

angular.
  module('core.document')
  .factory('Document', ['$resource',
    function($resource) {
      return $resource(
        '/document/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          },
          pagedQuery: {
            method: 'GET',
            isArray: true,
            url: '/document/pagedQuery'
          }
        }
      );
    }
  ])
  .factory('DocumentType', ['$resource',
    function($resource) {
      return $resource(
        '/documenttype/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          },
          pagedQuery: {
            method: 'GET',
            isArray: true,
            url: '/documenttype/pagedQuery'
          }
        }
      );
    }
  ])
;
