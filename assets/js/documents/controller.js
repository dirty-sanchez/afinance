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
  .controller('DocumentEditController', function($scope, $state, $stateParams, Document, DocumentType, Division, Position) {
    var me = this;
    $scope.update = function() {
      debugger;
      $scope.item.$update(function() {
        $state.go('documents-list');
      });
    };

    $scope.load = function() {
      //$scope.new_position = {name: '', value: '', position_type: 'cost'};
      //$scope.new_position_name = '';
      //$scope.new_position_value = '0';
      //$scope.new_position_position_type = 'cost';
      $scope.item = Document.get({ id: $stateParams.id });
       $scope.available_doctypes = DocumentType.query();
      $scope.available_divisions = Division.query();
    };

    $scope.add_position = function() {
      var newPosition = new Position();
      //var scope  = this;
      newPosition.name = $scope.new_position_name;
      newPosition.value = $scope.new_position_value;
      newPosition.position_type = $scope.new_position_position_type;
      debugger;
      newPosition.$save(() => {
        $scope.new_position_name = '';
        $scope.new_position_value = '0';
        $scope.new_position_position_type = 'cost';
        $scope.item.positions.push({id: newPosition.id, name: newPosition.name, position_type: newPosition.position_type, value: newPosition.value});
        $scope.item.$save(() => {
          debugger;
        });
      })
    };

    $scope.delete_position = (positionToDelete) => {
      Position.delete({id: positionToDelete.id}, () => {
        var idx = $scope.item.positions.indexOf(positionToDelete);
        if (idx > -1) {
          $scope.item.positions.splice(idx, 1);
       }
      });
    };

    $scope.load();
  })
  .controller('DocumentAddController', function ($scope, $state, $stateParams, $rootScope, Document, DocumentType, Division) {
    $scope.available_doctypes = DocumentType.query();
    $scope.available_divisions = Division.query();
    $scope.item = new Document();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('documents-list');
      });
    }
  })
;
