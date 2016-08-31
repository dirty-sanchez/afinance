"use strict";

angular.module('app.contragents', [])
  .controller('ContragentListController', function($scope, $state, $window, Contragent) {
    $scope.items = Contragent.query();
    $scope.delete = function(contragent) {
       contragent.$delete(function() {
          $scope.items = Contragent.query();
       });
    };
  })
  .controller('ContragentEditController', function($scope, $state, $stateParams, Contragent) {
    $scope.update = function() {
      $scope.item.$update(function() {
        $state.go('contragents');
      });
    };

    $scope.load = function() {
      $scope.item = Contragent.get({ id: $stateParams.id });
    };

    $scope.load();
  })
  .controller('ContragentAddController', function ($scope, $state, Contragent) {
    $scope.item = new Contragent();
    $scope.add = function() {
      $scope.item.$save(function() {
        $state.go('contragents');
      });
    }
  });
  // .controller('MovieViewController', function($scope, $stateParams, Movie) {
  // // $scope.movie = Movie.get({ id: $stateParams.id }); //Get a single movie.Issues a GET to /api/movies/:id
  // })
  // .controller('MovieCreateController', function($scope, $state, $stateParams, Movie) {
  // // $scope.movie = new Movie();  //create new movie instance. Properties will be set via ng-model on UI
  // //
  // // $scope.addMovie = function() { //create a new movie. Issues a POST to /api/movies
  // //   $scope.movie.$save(function() {
  // //     $state.go('movies'); // on success go back to home i.e. movies state.
  // //   });
  // // };
  // })
  // .controller('MovieEditController', function($scope, $state, $stateParams, Movie) {
  // // $scope.updateMovie = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
  // //   $scope.movie.$update(function() {
  // //     $state.go('movies'); // on success go back to home i.e. movies state.
  // //   });
  // // };
  // //
  // // $scope.loadMovie = function() { //Issues a GET request to /api/movies/:id to get a movie to update
  // //   $scope.movie = Movie.get({ id: $stateParams.id });
  // // };
  // //
  // // $scope.loadMovie(); // Load a movie which can be edited on UI
  // });
