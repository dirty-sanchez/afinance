"use strict";

angular.module('app.documents', [])
  .controller('DocumentListController', function($scope, $state, $window, Document, ItemsPagedLoaderMixin) {
    var vm = this;
    ItemsPagedLoaderMixin.extendScope(vm, Document, {sort: 'createdAt DESC'});
    vm.delete = function(item) {
       item.$delete(vm.loadItems);
    };
  })
  .controller('DocumentAddEditController', function($scope, $state, $stateParams, Document, DocumentType, Division, Position) {
    var me = this;
    var isEditing = ($state.current.name !== 'documents-new');

    $scope.item = isEditing ?
      Document.get({
        id: $stateParams.id
      }) :
      new Document({positions: [], createdAt: new Date()});

    $scope.available_doctypes = DocumentType.query({isDeleted: false});
    $scope.available_divisions = Division.query({isDeleted: false});
    $scope.available_positions = Position.query({isDeleted: false});

    function initNewPosition() {
      $scope.new_position = {
        positionId: 0,
        piecesCount: 0,
        pricePerPiece: 0,
        price: 0
      };
    }

    $scope.add_position = function(newPosition) {
      if (tryAddNewIfNotEmpty($scope.item.positions, newPosition)) {

      }
    };

    $scope.delete_position = (positionToDelete) => {
      var idx = $scope.item.positions.indexOf(positionToDelete);
      if (idx > -1) {
        $scope.item.positions.splice(idx, 1);
      }
    };

    $scope.recountByQuantity = (position) => {
      position.price = parseFloat(position.pricePerPiece) * position.piecesCount;
    };

    $scope.recountByPiecePrice = (position) => {
      position.price = Math.round(parseFloat(position.pricePerPiece) * position.piecesCount * 100) / 100;
    };

    $scope.recountByPrice = (position) => {
      if (parseInt(position.piecesCount, 10) > 0) {
        position.pricePerPiece =  Math.round(parseFloat(position.price)  / position.piecesCount * 100) / 100;
      }
    };

    function tryAddNewIfNotEmpty(positions, newPosition) {
      if (newPosition.id !== 0 && parseInt(newPosition.piecesCount, 10) !== 0
        && parseInt(newPosition.pricePerPiece, 10) !== 0
        && parseFloat(newPosition.pricePerPiece) > 0) {
        positions.push({
          id: 'new_position',
          position: newPosition.positionId,
          piecesCount: newPosition.piecesCount,
          pricePerPiece: newPosition.pricePerPiece,
          price: newPosition.price
        });
        initNewPosition();

        return true;
      }

      return false;
    }

    function update() {
      tryAddNewIfNotEmpty($scope.item.positions, $scope.new_position);

      $scope.item.$update(function() {
        $state.go('documents-list');
      });
    };

    function add() {
      tryAddNewIfNotEmpty($scope.item.positions, $scope.new_position);
      $scope.item.positions = $scope.item.positions.map((item) => {
        return {position: item.position, piecesCount: item.piecesCount, pricePerPiece: item.pricePerPiece, price: item.price};
      });
      $scope.item.$save(function() {
        $state.go('documents-list');
      });
    };

    $scope.submit =  $state.current.name === 'documents-new' ? add : update;

    initNewPosition();
  })
;
