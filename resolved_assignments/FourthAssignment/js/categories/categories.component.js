(function(){
  // 6. Create categories.component.js file and create component called categories that shows all available categories in the menu to the user.
  'use strict';
  angular
    .module('MenuApp')
    .component('categories', {
      templateUrl: './js/categories/categories.template.html',
        bindings: {
          items: '<'
        }
    });
})();