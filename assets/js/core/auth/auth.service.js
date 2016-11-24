/**
 * Created by sas on 11/23/2016.
 */


angular.module('core.auth')
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);

        return $q.reject(response);
      }
    };
  })
  .factory('AuthService', function($q, $http, USER_ROLES) {
    const TOKEN_SEPARATOR = '.';
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      const tokenSplitted = token.split(TOKEN_SEPARATOR);
      username = tokenSplitted[0];
      role = tokenSplitted[1];
      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var login = function(name, pw) {
      return $q(function(resolve, reject) {
        $http.post('login/login', {username: name, password: pw})
          .then((response) => {
              if (response && response.data && response.data.username) {
                storeUserCredentials([name, response.role || USER_ROLES.operator, 'yourServerToken'].join(TOKEN_SEPARATOR));
                return resolve('Login success.');
              }

              console.warn('strange response from the server', response);
              reject('Something went wrong on the server, ask for support');
            },
            reject
          );
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      isAuthorized: isAuthorized,
      isAuthenticated: function() {return isAuthenticated;},
      username: function() {return username;},
      role: function() {return role;}
    };
  });
