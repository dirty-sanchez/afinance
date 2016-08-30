"use strict";

app.service('ContragentGroupService', function($http, $q) {
  return {
    'list': function() {
      var defer = $q.defer();
      $http.get('/contragentgroup/').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'add': function(todo) {
      var defer = $q.defer();
      $http.post('/contragentgroup/', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'delete': function(todo) {
      var defer = $q.defer();
      $http.delete('/contragentgroup/', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }
});
