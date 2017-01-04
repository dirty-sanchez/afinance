

angular
  .module('core')
  .factory('ItemsPagedLoaderMixin', function() {
    "use strict";

    return {
      extendScope: function($scope, $resourceQuery, queryOptions) {
        var vm = $scope;

        if ($resourceQuery == undefined) {
          throw Error('$resourceQuery is required');
        }

        vm.items = [];
        vm.isLoading = true;
        queryOptions = queryOptions || {};
        vm.loadItems = function(tableState) {
          let pagination = {
            limit: tableState.pagination.number || 10,
            skip: tableState.pagination.start || 0
          };

          vm.isLoading = true;
          $resourceQuery
            .pagedQuery(
              angular.extend(pagination, queryOptions),
              function (itemsList, headers) {
                vm.items = itemsList;
                tableState.pagination.numberOfPages = Math.ceil((headers('X-Total-Count') || itemsList.length()) / tableState.pagination.number) || 1;
              },
              function (error) {
                console.error('Something went wrong: ', error);
              }
            )
            .$promise
            .finally(() => {
              vm.isLoading = false;
            });
        };
      }
    };
  })
;