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
    'app.login',
    'app.logs',
    'app.users',
    'smart-table',
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
  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    admin: 'admin',
    operator: 'operator'
  })
  .controller('AppController', function($scope, $state, AuthService, AUTH_EVENTS, Notification) {
    $scope.username = AuthService.username();
    $scope.role = AuthService.role();

    $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
      Notification.error('Доступ закрыт. Пожалуйста, войдите в систему под учетной записью администратора.');
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      if ($state.current.name === 'login') {
        /// processed in the login/controller.js
        return;
      }

      if (AuthService.isAuthenticated()) {
        Notification.error('Время сеанса истекло. Пожалуйста, войдите в систему заново.');
      } else {
        Notification.error('Нет доступа. Пожалуйста, представьтесь системе.');
      }

      $state.go('login');
    });

    $scope.setCurrentUsername = function(name) {
      $scope.username = name;
    };

    $scope.setCurrentUserInfo = (userData) => {
      $scope.username = userData.username;
      $scope.role = userData.role;
    };
  })
;

angular.module('app').config(function($stateProvider,$httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  $stateProvider
    ///login
    .state('login',{
      url:'/login',
      templateUrl:'/js/login/login.html',
      controller:'LoginController'
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
