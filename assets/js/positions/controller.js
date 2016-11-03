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
  .controller('PositionAddEditController', function($scope, $state, $stateParams, Position, PositionGroup) {
    var isEditing = ($state.current.name === 'positions-edit')
    $scope.groups = PositionGroup.query();
    if (isEditing) {
      $scope.item = Position.get({id: $stateParams.id});
      $scope.submit = function update() {
        $scope.item.$update(function () {
          $state.go('positions-list');
        });
      };
    } else {
      $scope.item = new Position();
      $scope.submit = function() {
        $scope.item.$save(function() {
          $state.go('positions-list');
        });
      }
    }
  })
;
