(function(){
  // 7. Create items.component.js file and create a component called items that shows all of the menu items for a particular category.
  'use strict';
  angular
    .module('MenuApp')
    .component('itemsList', {
      templateUrl: './js/itemsList/itemList.template.html',
        bindings: {
          itemsX: '<'
        }
    });
})();