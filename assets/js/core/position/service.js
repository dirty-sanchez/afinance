'use strict';

angular.
  module('core.position')
  .factory('Position', ['$resource',
    function($resource) {
      return $resource(
        '/position/:id',
        { id: '@id', isDeleted: '@isDeleted' },
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
        { id: '@id', isDeleted: '@isDeleted' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }
  ])
;
