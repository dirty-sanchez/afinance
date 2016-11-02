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
          }
        }
      );
    }
  ])
;
