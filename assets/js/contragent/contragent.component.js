'use strict';

angular.
  module('contragent').
  component('contragent', {
    templateUrl: 'js/contragent/contragent.template.html',
    controller: ['ContragentList', function (ContragentList) {
	console.log('heelo, finaly');
return;
      var vm = this;
      vm.query = 'linux';

      this.doSearch = function() {
        if (vm.query.length > 0) {
            location.href = '#search-results'
      //    vm.questions  = StackoverflowSearch.query({inTitle: this.query});
        }
      }
    }]
  });
