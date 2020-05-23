(function () {
'use strict';

var gtoBuyList = [
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolates",
    quantity: "5"
  },
  {
    name: "Pepto Bismol bottles",
    quantity: "10"
  },
  {
    name: "Paper towels",
    quantity: "7"
  }
];

var alreadyBoughtList = [];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
// ** Controller As syntax
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;
  itemToBuy.toBuyList = ShoppingListCheckOffService.getListItems();
  // console.log("In TOBUYCONTROLLER ", itemToBuy.toBuyList);

  itemToBuy.addItem = function (itemIndex) {
    ShoppingListCheckOffService.addItem(itemToBuy.toBuyList[itemIndex].name, itemToBuy.toBuyList[itemIndex].quantity, itemIndex);
    ShoppingListCheckOffService.removeItem(itemIndex);
    // console.log("Adding/Removing", ShoppingListCheckOffService.getItems());
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
// ** Controller As syntax
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;
  itemBought.itemsBought = [];
  itemBought.itemName = "";
  itemBought.itemQuantity = "";
  // console.log("In ALREADYBOUGHTCONTROLLER ", itemBought);

  itemBought.itemsBought = ShoppingListCheckOffService.getItems();
  // console.log("Completed list", itemBought);
}

function ShoppingListCheckOffService() {
  var firstService = this;

  // List of shopping items
  var toBuyList = gtoBuyList;

  // List of shopping items bought
  var itemsBought = [];

  firstService.addItem = function (iName, iQuantity, iIndex) {
    var itemBought = {
      name: iName,
      quantity: iQuantity
    };
    itemsBought.push(itemBought);
    // console.log("Items bought",itemsBought);
    // console.log("Items in list",toBuyList);
  };
  
  firstService.getListItems = function () {
    return toBuyList;
  };

  firstService.getItems = function () {
    return itemsBought;
  };

  firstService.removeItem = function (iIndex) {
    // console.log("Index", iIndex);
    // console.log("Item", itemsBought);
    toBuyList.splice(iIndex, 1);
  };
}

})();
