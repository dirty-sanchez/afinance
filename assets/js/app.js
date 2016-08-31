'use strict';

/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app', [,
  'ui.router',
  'core',
  'app.contragents'
]);

angular.module('app').config(function($stateProvider,$httpProvider){
  $stateProvider.state('contragents',{
    url:'/contragents',
    templateUrl:'js/contragents/partials/list.html',
    controller:'ContragentListController'
  })
  .state('contragents-edit',{
    url:'/contragents/:id/edit',
    templateUrl:'js/contragents/partials/edit.html',
    controller:'ContragentEditController'
  })
  .state('contragents-new',{
    url:'/contragents/new',
    templateUrl:'js/contragents/partials/new.html',
    controller:'ContragentAddController'
  })
}).run(function($state){
  $state.go('contragents');
});


