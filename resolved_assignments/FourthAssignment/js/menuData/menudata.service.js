(function(){
  // 5. Create menudata.service.js file and create a service called MenuDataService in it. This service should be declared on the data module, not on the MenuApp module. The MenuDataService should have 2 methods: getAllCategories & getItemsForCategory
  'use strict';
  angular
    .module('data')
    .constant('MenuAPI', 'https://davids-restaurant.herokuapp.com/')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['MenuAPI', '$http'];

    function MenuDataService(MenuAPI, $http) {
      var service = {};

      service.getAllCategories = function() {
        var response = $http({
          method: 'GET',
          url: MenuAPI + 'categories.json'
        });
        return response;
      };

      service.getItemsForCategory = function(categoryShortName) {
        var response = $http({
          medhod: 'GET',
          url: MenuAPI + 'menu_items.json?category=' + categoryShortName
        });
        return response;
      };

      return service;
    }
})();