(function(){
  'use strict';
  angular
    .module('MenuApp')
    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$stateParams', 'MenuDataService'];

    function ItemsController($stateParams, MenuDataService){
      var itemsCtrl = this;
      itemsCtrl.category = $stateParams.category;
      MenuDataService.getItemsForCategory($stateParams.item).then(function(response) {
        itemsCtrl.items = response.data;
        console.log("PAram",$stateParams.item);
        console.log("response",response.data);
        return itemsCtrl.items;
      });
    }
})();