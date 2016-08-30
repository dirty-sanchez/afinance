'use strict';

// Register component, along with its associated controller and template
angular.
  module('contragentDetail').
  component('contragentDetail', {
    templateUrl: 'js/contragent-detail/contragent-detail.template.html',
    controller: ['$routeParams', 'Contragent',
      function ContragentDetailController($routeParams, Contragent) {
        var self = this;
        self.item = Contragent.get({id: $routeParams.id});
        self.update = function(newData) {
          console.log('save...');
        }

        self.delete = function() {

        }
      }
    ]
  });
