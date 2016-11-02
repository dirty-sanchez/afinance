"use strict";

angular.module('app.documenttypes', [])
  .controller('DocumentTypeListController', function($scope, $state, $window, DocumentType) {
    $scope.items = DocumentType.query();
    $scope.delete = function(division_group) {
      division_group.$delete(function() {
          $scope.items = DocumentType.query();
       });
    };
  })
  .controller('DocumentTypeAddEditController', function($scope, $state, $stateParams, DocumentType) {
    var isEditing = ($state.current.name !== 'documenttypes-new');
    $scope.availableCostTypes = [
      {id: 'cost', name: 'Расход'},
      {id: 'income', name: 'Доход'},
    ];

    if (isEditing) {
      $scope.item = DocumentType.get({ id: $stateParams.id });
      $scope.submit = () => {
        $scope.item.$update(function () {
          $state.go('documenttypes-list');
        });
      };
    } else {
      $scope.item = new DocumentType();
      $scope.submit = () => {
        $scope.item.$save(function () {
          $state.go('documenttypes-list');
        });
      };
    }
  })
;
