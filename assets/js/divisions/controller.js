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
  .controller('DivisionEditController', function($scope, $state, $stateParams, Division, DivisionGroup) {
    $scope.groups = DivisionGroup.query();
    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('divisions.list');
      });
    };

    $scope.load = function() {
      $scope.item = Division.get({ id: $stateParams.id }, (obj) => { obj.groups = obj.groups.map((group) => group.id)});
    };

    $scope.load();
  })
  .controller('DivisionAddController', function ($scope, $state, $stateParams, $rootScope, Division) {
      $scope.item = new Division();
      $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('divisions-list');
      });
    }
  })
;
