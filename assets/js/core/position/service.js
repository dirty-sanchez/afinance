'use strict';

angular.
  module('core.position')
  .factory('DocumentPosition')
  .factory('Position', ['$resource',
    function($resource) {
      return $resource(
        '/position/:id',
        { id: '@id', idDeleted: '@isDeleted' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }
  ])
  .factory('PositionGroup', ['$resource',
    function($resource) {
      return $resource(
        '/positiongroup/:id',
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
