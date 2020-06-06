(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowObj',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var narrowObj = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowObj = this;
  narrowObj.found = [];
  
  narrowObj.getMatchedMenuItems = function (searchTerm) {
    var completeList;
    var promise = MenuSearchService.getMenuCategories();
    narrowObj.notFound = false;

//    console.log('Entering narrowObj.found');

    promise.then(function (response) {
      completeList = response.data;
      if (searchTerm === undefined) {
        console.log("Getting the complete list");
        narrowObj.found = completeList;
      }
      else {
        console.log("Searching for " + searchTerm);
        narrowObj.found = MenuSearchService.findString(completeList.menu_items, searchTerm);
        if (narrowObj.found.length==0) {
          narrowObj.notFound = true;
        }
        else {
            narrowObj.notFound = false;
        }
      }
      console.log("Not Found ", narrowObj.notFound);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong =P");
    });

  }
  
  narrowObj.removeItem = function (itemIndex) {
    console.log("Deleting index " + itemIndex);
    //console.log(narrowObj.found);
    MenuSearchService.removeItem(itemIndex);
  };

  
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];

  service.getMenuCategories = function () {
    var foundItemsx = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return foundItemsx;
  };

  service.findString = function (arrayList, searchString) {
//    var newList = [];
    
    angular.forEach(arrayList, function(value, key){
        var dish = angular.lowercase(value.description);
        var sstring = angular.lowercase(searchString);
        if (dish.includes(sstring)) {
          found.push(value);
/*           console.log(key + ".-" + value.description);
          console.log(searchString);
 */        }
        else {
          console.log(sstring," not found");
        }
    });
    //console.log(found.length);
      
    return found;
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };


}

})();
