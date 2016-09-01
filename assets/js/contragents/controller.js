"use strict";

angular.module('app.contragents', [])
  .controller('ContragentListController', function($scope, $state, $window, Contragent) {
    $scope.items = Contragent.query();
    $scope.delete = function(contragent) {
       contragent.$delete(function() {
          $scope.items = Contragent.query();
       });
    };
  })
  .controller('ContragentEditController', function($scope, $state, $stateParams, Contragent) {

    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('contragents.list');
      });
    };

    $scope.load = function() {
      $scope.item = Contragent.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('ContragentAddController', function ($scope, $state, $stateParams, $rootScope, Contragent) {
      $scope.item = new Contragent();
      $scope.add = function() {
      $scope.item.$save(function() {
        $state.go(RETURN_TO_STATE);
      });
    }
  })
;
