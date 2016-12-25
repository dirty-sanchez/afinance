"use strict";

angular.module('app.contragentgroups', [])
  .controller('ContragentGroupListController', function($scope, $state, $window, ContragentGroup) {
    var vm = this;

    vm.items = [];
    vm.safeItemsCollection = [];
    vm.loadItems = (tableState) => {
      let pagination = {
        limit: tableState.pagination.number || 10,
        skip: tableState.pagination.start || 0
      };
      debugger;
      ContragentGroup
        .query(angular.extend(pagination, {isDeleted: false}))
        .$promise
        .then((pagedResponse) => {
          vm.items = pagedResponse.data;
          angular.copy(pagedResponse.data, vm.safeItemsCollection);
          tableState.pagination.numberOfPages = Math.ceil(pagedResponse.count / tableState.pagination.number) || 1;
        })
        .finally(() => {
          vm.isLoading = false;
        });
    };
    vm.isLoading = true;
    vm.delete = function(item) {
      item.$delete(vm.loadItems);
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
