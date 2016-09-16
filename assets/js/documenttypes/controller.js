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
  .controller('DocumentTypeEditController', function($scope, $state, $stateParams, DocumentType) {

    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('documenttypes-list');
      });
    };

    $scope.load = function() {
      $scope.item = DocumentType.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('DocumentTypeAddController', function ($scope, $state, DocumentType) {
    $scope.item = new DocumentType();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('documenttypes-list');
      });
    }
  })
;
