"use strict";

angular.module('app.users', [])
  .controller('UserListController', function($scope, $state, $window, User, ItemsPagedLoaderMixin) {
    var vm = this;

    ItemsPagedLoaderMixin.extendScope(vm, User, {isDeleted: false});
    vm.availableRoles = {
      'operator': 'Оператор',
      'admin': 'Администратор',
    };
    vm.delete = function(item) {
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
