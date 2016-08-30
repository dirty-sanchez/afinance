'use strict';

angular.
  module('core.contragent').
  factory('Contragent', ['$resource',
    function($resource) {
      return $resource('http://127.0.0.1:1337/contragent/:id');
    }
  ]);
