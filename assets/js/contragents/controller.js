"use strict";

angular.module('app.contragents', [])
  .controller('ContragentListController', function($scope, $state, $window, Contragent) {
    var vm = this;

    vm.items = [];
    vm.safeItemsCollection = [];
    vm.loadItems = (tableState) => {
      let pagination = {
        limit: tableState.pagination.number || 10,
        skip: tableState.pagination.start || 0
      };

      Contragent
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
  .controller('ContragentEditController', function($scope, $state, $stateParams, Contragent, ContragentGroup) {
    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('contragents-list');
      });
    };

    $scope.load = function() {
      $scope.item = Contragent.get({ id: $stateParams.id });
      $scope.availableGroups = ContragentGroup.query();
    };

    $scope.load();
  })
  .controller('ContragentAddController', function ($scope, $state, $stateParams, $rootScope, Contragent, ContragentGroup) {
      $scope.item = new Contragent();
      $scope.availableGroups = ContragentGroup.query();
      $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('contragents-list');
      });
    }
  })
;
