"use strict";

angular.module('app.contragentgroups', [])
  .controller('ContragentGroupListController', function($scope, $state, $window, ContragentGroup) {
    $scope.items = ContragentGroup.query();
    $scope.delete = function(contragent) {
       contragent.$delete(function() {
          $scope.items = ContragentGroup.query();
       });
    };
  })
  .controller('ContragentGroupEditController', function($scope, $state, $stateParams, ContragentGroup) {

    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('contragentgroups-list');
      });
    };

    $scope.load = function() {
      $scope.item = ContragentGroup.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('ContragentGroupAddController', function ($scope, $state, ContragentGroup) {
    $scope.item = new ContragentGroup();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('contragentgroups-list');
      });
    }
  })
;
