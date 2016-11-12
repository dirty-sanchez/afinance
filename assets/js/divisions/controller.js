"use strict";

angular.module('app.divisions', [])
  .controller('DivisionListController', function($scope, $state, $window, Division) {
    $scope.items = Division.query();
    $scope.delete = function(division) {
       division.$delete(function() {
          $scope.items = Division.query();
       });
    };
  })
  .controller('DivisionAddEditController', function($scope, $state, $stateParams, Division, DivisionGroup) {
    var isEditing = $state.current.name === 'divisions-edit';

    $scope.groups = DivisionGroup.query();
    if (isEditing) {
      $scope.submit = function () {
        $scope.item.$update(function () {
          $state.go('divisions-list');
        });
      };

      $scope.item = Division.get({ id: $stateParams.id }, (obj) => { obj.groups = obj.groups.map((group) => group.id)});
    } else {
      $scope.submit = function () {
        $scope.item.$save(function () {
          $state.go('divisions-list');
        });
      };
      $scope.item = new Division();
    }
  })
  .filter('divisionGroupsFormatter', () => {
    return (division) => {
      var notSelected = '<не выбраны>';

      if (division.groups == undefined || division.groups.length == 0) {
        return notSelected;
      }

      return division.groups.map((group) => group.name || '<без имени>').join(', ');
    };
  })
;
