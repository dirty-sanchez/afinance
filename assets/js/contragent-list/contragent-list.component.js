'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('contragentList').
  component('contragentList', {
    templateUrl: 'js/contragent-list/contragent-list.template.html',
    controller: ['Contragent',
      function ContragentListController(Contragent) {
        this.items = Contragent.query();
        // this.orderProp = 'age';
      }
    ]
  });
