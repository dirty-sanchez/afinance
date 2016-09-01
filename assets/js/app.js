'use strict';

/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app', [,
  'ui.router',
  'core',
  'app.contragents',
  'app.contragentgroups',
]);

angular.module('app').config(function($stateProvider,$httpProvider){
  $stateProvider
      .state('contragents-list',{
        url:'/contragents',
        templateUrl:'/js/contragents/partials/list.html',
        controller:'ContragentListController'
      })
      .state('contragents-edit',{
        url:'/contragents/:id/edit',
        templateUrl:'/js/contragents/partials/edit.html',
        controller:'ContragentEditController'
      })
      .state('contragents-new',{
        url:'/contragents/new',
        templateUrl:'/js/contragents/partials/new.html',
        controller:'ContragentAddController'
      })
      /// contragent groups routes
      .state('contragentgroups-list',{
          url:'/contragentgroups',
          templateUrl:'/js/contragentgroups/partials/list.html',
          controller:'ContragentGroupListController'
      })
      .state('contragentgroups-edit',{
          url:'/contragentgroups/:id/edit',
          templateUrl:'/js/contragentgroups/partials/edit.html',
          controller:'ContragentGroupEditController'
      })
      .state('contragentgroups-new',{
          url:'/contragentgroups/new',
          templateUrl:'/js/contragentgroups/partials/new.html',
          controller:'ContragentGroupAddController'
      })
})
    .run(function($state){
      $state.go('contragentgroups-list');
    })
;


