'use strict';

angular.
  module('core.position_document').
  factory('PositionDocument', ['$resource',
    function($resource) {
      return $resource(
        '/positiondocument/:id',
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
