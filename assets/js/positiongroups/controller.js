"use strict";

angular.module('app.positiongroups', [])
  .controller('PositionGroupListController', function($scope, $state, $window, PositionGroup) {
    $scope.items = PositionGroup.query();
    $scope.delete = function(item) {
      item.$delete(function() {
          $scope.items = PositionGroup.query();
       });
    };
  })
  .controller('PositionGroupEditController', function($scope, $state, $stateParams, PositionGroup) {

    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('positiongroups-list');
      });
    };

    $scope.load = function() {
      $scope.item = PositionGroup.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('PositionGroupAddController', function ($scope, $state, PositionGroup) {
    $scope.item = new PositionGroup();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('positiongroups-list');
      });
    }
  })
;
