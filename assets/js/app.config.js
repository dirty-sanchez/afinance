'use strict';

angular.
  module('app').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/contragents', {
          template: '<contragent-list></contragent-list>'
        }).
        when('/contragents/:id', {
          template: '<contragent-detail></contragent-detail>'
        }).
        otherwise('/contragents');
    }
  ]);
