"use strict";

angular.module('app.documents', [])
  .controller('DocumentListController', function($scope, $state, $window, Document) {
    $scope.items = Document.query();
    $scope.delete = function(division) {
       division.$delete(function() {
          $scope.items = Document.query();
       });
    };
  })
  .controller('DocumentEditController', function($scope, $state, $stateParams, Document, DocumentType, Division) {
    var me = this;
    $scope.update = function() {
      if ($scope.new_position.name !== '' && $scope.new_position.value !== '') {
        $scope.item.positions.push({id: $scope.new_position.id, name: $scope.new_position.name, position_type: $scope.new_position.position_type, value: $scope.new_position.value});
      }

      $scope.item.$update(function() {
        $state.go('documents-list');
      });
    };

    function initNewPosition() {
      $scope.new_position = {id:'new_position', name: '', value: '', position_type: 'cost'};
    }

    $scope.load = function() {
      initNewPosition();
      $scope.item = Document.get({ id: $stateParams.id });
      $scope.available_doctypes = DocumentType.query();
      $scope.available_divisions = Division.query();
    };

    $scope.add_position = function(newPosition) {
        initNewPosition();
        $scope.item.positions.push({id: newPosition.id, name: newPosition.name, position_type: newPosition.position_type, value: newPosition.value});
    };

    $scope.delete_position = (positionToDelete) => {
      var idx = $scope.item.positions.indexOf(positionToDelete);
      if (idx > -1) {
        $scope.item.positions.splice(idx, 1);
      }
    };

    $scope.load();
  })
  .controller('DocumentAddController', function ($scope, $state, $stateParams, $rootScope, Document, DocumentType, Division) {
    $scope.available_doctypes = DocumentType.query();
    $scope.available_divisions = Division.query();
    $scope.item = new Document({positions: []});
    function initNewPosition() {
      $scope.new_position = {id:'new_position', name: '', value: '', position_type: 'cost'};
    }

    $scope.add_position = function(newPosition) {
      initNewPosition();
      $scope.item.positions.push({id: newPosition.id, name: newPosition.name, position_type: newPosition.position_type, value: newPosition.value});
    };

    $scope.delete_position = (positionToDelete) => {
      var idx = $scope.item.positions.indexOf(positionToDelete);
      if (idx > -1) {
        $scope.item.positions.splice(idx, 1);
      }
    };

    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('documents-list');
      });
    };

    initNewPosition();
  })
;
