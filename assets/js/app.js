'use strict';

/**
 * Created by Sandeep on 01/06/14.
 */

angular
  .module('app', [,
    'ui.router',
    'checklist-model',
    'isteven-multi-select',
    'core',
    'app.contragents',
    'app.contragentgroups',
    'app.divisions',
    'app.divisiongroups',
    'app.documenttypes',
    'app.documents',
    'app.positions',
    'app.positiongroups',
    'app.reports',
    'app.login'
  ])
  .filter('costTypeFilter', () => {
    return (items, documentType) => {
      if (documentType != undefined && documentType.costType != undefined) {
        return items.filter((el) => el.group != undefined && el.group.costType != undefined && el.group.costType == documentType.costType)
      }

      return items.slice();
    };
  })
  .filter('rusCostTypeFilter', () => {
    return (costType) => {
      switch (costType) {
        case 'cost':
          return 'Расход';
        case 'income':
          return 'Доход';
        default:
          return costType;
      }
    };
  })
;

angular.module('app').config(function($stateProvider,$httpProvider) {
  $stateProvider
    ///login
    .state('login',{
      url:'/login?do=:logout',
      templateUrl:'/js/login/login.html',
      controller:'LoginController',
      params: {do: 'login'}
    })
    .state('layout', {
      abstract: true,
      templateUrl:'/js/layout.html',
    })
    //region DocumentsController
    .state('documents-list', {
      parent: 'layout',
      url: '/documents',
      templateUrl: '/js/documents/partials/list.html',
      controller: 'DocumentListController'
    })
    .state('documents-edit', {
      parent: 'layout',
      url: '/documents/:id/edit',
      templateUrl: '/js/documents/partials/edit.html',
      controller: 'DocumentAddEditController'
    })
    .state('documents-new', {
      parent: 'layout',
      url: '/documents/new',
      templateUrl: '/js/documents/partials/edit.html',
      controller: 'DocumentAddEditController'
    })
    //#endregion routes
    //region ContragentController
    .state('contragents-list',{
      parent: 'layout',
      url:'/contragents',
      templateUrl:'/js/contragents/partials/list.html',
      controller:'ContragentListController'
    })
    .state('contragents-edit',{
      parent: 'layout',
      url:'/contragents/:id/edit',
      templateUrl:'/js/contragents/partials/edit.html',
      controller:'ContragentEditController'
    })
    .state('contragents-new',{
      parent: 'layout',
      url:'/contragents/new',
      templateUrl:'/js/contragents/partials/new.html',
      controller:'ContragentAddController'
    })
    //endregion  routes
    //region ContragentGroups routes
    .state('contragentgroups-list',{
        parent: 'layout',
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
        parent: 'layout',
        url:'/contragentgroups/new',
        templateUrl:'/js/contragentgroups/partials/new.html',
        controller:'ContragentGroupAddController'
    })
    //endregion
})
  .run(function($state){
    $state.go('login');
  })

;


