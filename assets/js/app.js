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
    'app.reports'
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
      /////////////////////////////////////
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
    ////////////////////////////////////////////
    ///
    ////////////////////////////////////////////
    ///  documents
    //.state('documents-list',{
    //  url:'/documents',
    //  templateUrl:'/js/documents/partials/list.html',
    //  controller:'DocumentListController'
    //})
    //.state('documents-edit',{
    //  url:'/documents/:id/edit',
    //  templateUrl:'/js/documents/partials/edit.html',
    //  controller:'DocumentEditController'
    //})
    //.state('documents-new',{
    //  url:'/documents/new',
    //  templateUrl:'/js/documents/partials/new.html',
    //  controller:'DocumentAddController'
    //})
    //////////////////////////////////////////////
    ///// reports
    //.state('reports',{
    //  url:'/contragentgroups',
    //  templateUrl:'/js/contragentgroups/partials/list.html',
    //  controller:'ContragentGroupListController'
    //})
  })
    .run(function($state){
      $state.go('documents-list');
    })
;


