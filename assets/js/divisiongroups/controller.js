"use strict";

angular.module('app.divisiongroups', [])
  .controller('DivisionGroupListController', function($scope, $state, $window, DivisionGroup) {
    $scope.items = DivisionGroup.query();
    $scope.delete = function(division_group) {
      division_group.$delete(function() {
          $scope.items = DivisionGroup.query();
       });
    };
  })
  .controller('DivisionGroupEditController', function($scope, $state, $stateParams, DivisionGroup) {

    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('divisiongroups-list');
      });
    };

    $scope.load = function() {
      $scope.item = DivisionGroup.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('DivisionGroupAddController', function ($scope, $state, DivisionGroup) {
    $scope.item = new DivisionGroup();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('divisiongroups-list');
      });
    }
  })
;
