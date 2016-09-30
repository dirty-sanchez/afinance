'use strict';

angular.
  module('core.report')
  .factory('DetailsReport', ['$resource',
    function($resource) {
    return $resource(
      '/report/1/data'
    );
  }
  ])
;
