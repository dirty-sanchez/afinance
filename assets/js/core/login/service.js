'use strict';

angular.
  module('core.login')
  .service('Login', ['$http',
    function($http) {
      return {
        login: (user, password) => {
          return $http.post('login', {user, password});
        },
        logout: () => {
          return $http.post('logout');
        }
      };
    }
  ])
;
