"use strict";

angular.module('app.positions', [])
  .controller('PositionListController', function($scope, $state, $window, Position) {
    $scope.items = Position.query({isDeleted: false});
    $scope.delete = function(item) {
       item.$delete(function() {
          $scope.items = Position.query();
       });
    };
  })
  .controller('PositionEditController', function($scope, $state, $stateParams, Position, PositionGroup) {
    $scope.groups = PositionGroup.query();
    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('positions-list');
      });
    };

    $scope.load = function() {
      $scope.item = Position.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('PositionAddController', function ($scope, $state, $stateParams, $rootScope, Position, PositionGroup) {
    $scope.groups = PositionGroup.query();
    $scope.item = new Position();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('positions-list');
      });
    }
  })
;
