"use strict";

angular.module('app.positiongroups', [])
  .controller('PositionGroupListController', function($scope, $state, $window, PositionGroup) {
    var availableCostTypes = {
      'cost': 'Расход',
      'income': 'Доход',
    };

    var loadList = () => {
      PositionGroup.query({isDeleted: false}).$promise.then((items) => {
        angular.forEach(items, (item) => {
          item.costType = availableCostTypes[item.costType] || 'Расход';
        });

        $scope.items = items;
      });
    };

    $scope.delete = function(item) {
      item.$delete(loadList);
    };

    loadList();
  })
  .controller('PositionGroupEditController', function($scope, $state, $stateParams, PositionGroup) {
    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('positiongroups-list');
      });
    };
    $scope.load = function() {
      $scope.item = PositionGroup.get({ id: $stateParams.id });
      $scope.availableCostTypes = [
        {id: 'cost', name: 'Расход'},
        {id: 'income', name: 'Доход'},
      ];
    };

    $scope.load();
  })
  .controller('PositionGroupAddController', function ($scope, $state, PositionGroup) {
    $scope.item = new PositionGroup();
    $scope.availableCostTypes = [
      {id: 'cost', name: 'Расход'},
      {id: 'income', name: 'Доход'},
    ]

    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('positiongroups-list');
      });
    }
  })
;
