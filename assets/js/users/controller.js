"use strict";

angular.module('app.users', [])
  .controller('UserListController', function($scope, $state, $window, User) {
    var vm = this;
    vm.items = [];
    vm.loadItems = (tableState) => {
      let pagination = {
        limit: tableState.pagination.number || 5,
        skip: tableState.pagination.start || 0
      };

      User.query(angular.extend(pagination, {isDeleted: false})).$promise
        .then((items) => {
          vm.items = items;
          angular.copy(items, vm.safeItemsCollection);
          tableState.pagination.numberOfPages = 2;
        })
        .finally(() => {
          $scope.isLoading = false;
        });
    };
    $scope.safeItemsCollection = [];
    $scope.availableRoles = {
      'operator': 'Оператор',
      'admin': 'Администратор',
    };
    $scope.isLoading = true;
    $scope.delete = function(item) {
      item.$delete(vm.loadItems);
    };
  })
  .controller('UserAddEditController', function($scope, $state, $stateParams, User) {
    var isEditing = ($state.current.name === 'users-edit')
    $scope.availableRoles = [
      {id: 'operator', name: 'Оператор'},
      {id: 'admin', name: 'Администратор'},
    ];
    if (isEditing) {
      $scope.item = User.get({ id: $stateParams.id });
      $scope.submit = function () {
        $scope.item.$update(function () {
          $state.go('users-list');
        });
      };
    } else {
      $scope.item = new User({'role': 'operator'});
      $scope.submit = function () {
        $scope.item.$save(function () {
          $state.go('users-list');
        });
      };
    }
  })
;
