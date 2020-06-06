(function () {
'use strict';

var gtoBuyList = [
  {
    name: "Mojarras fritas",
    quantity: "2",
    image: "imgs/MojarraFrita.jpg",
    image_alt: "Mojarra Frita"
  },
  {
    name: "Ensaladas saludables",
    quantity: "2",
    image: "imgs/EnsaladaSaludable.jpg",
    image_alt: "Ensalada Saludable"
  },
  {
    name: "Platillos rancheros",
    quantity: "2",
    image: "imgs/PlatoRanchero.jpg",
    image_alt: "Plato Ranchero"
  },
  {
    name: "Pasta con Verduras",
    quantity: "2",
    image: "imgs/PastaConVerduras.jpg",
    image_alt: "Pasta con Verduras"
  }
];

angular.module('LaYecaShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('LaYecaShoppingListCheckOffService', LaYecaShoppingListCheckOffService);
;

ToBuyController.$inject = ['LaYecaShoppingListCheckOffService'];
// ** Controller As syntax
function ToBuyController(LaYecaShoppingListCheckOffService) {
  var itemToBuy = this;

  // This will have the complete list of products
  itemToBuy.toBuyList = LaYecaShoppingListCheckOffService.getToBuyList();

  itemToBuy.addItem = function (itemIndex) {
    console.log("Checking addItem",itemToBuy.toBuyList[itemIndex].name);
    LaYecaShoppingListCheckOffService.addItemBought(itemToBuy.toBuyList[itemIndex].name, itemToBuy.toBuyList[itemIndex].quantity, itemToBuy.toBuyList[itemIndex].image, itemIndex);
    //itemsBought is not defined here
    //console.log("itemsBought after:",itemsBought);
    LaYecaShoppingListCheckOffService.removeItemToBuy(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['LaYecaShoppingListCheckOffService'];
// ** Controller As syntax
function AlreadyBoughtController(LaYecaShoppingListCheckOffService) {
  var itemBought = this;

  // This will have no elements when loading the page
  itemBought.itemsBought = LaYecaShoppingListCheckOffService.getItemsBought();

  itemBought.removeItem = function (itemIndex) {
    console.log("Checking removeItem",itemBought.itemsBought[itemIndex].name);
    LaYecaShoppingListCheckOffService.addItemToBuy(itemBought.itemsBought[itemIndex].name, itemBought.itemsBought[itemIndex].quantity, itemBought.itemsBought[itemIndex].image, itemIndex);
    //toBuyList is not defined here
    //console.log("toBuyList after:",toBuyList);
    LaYecaShoppingListCheckOffService.removeItemBought(itemIndex);
  }
}

function LaYecaShoppingListCheckOffService() {
  var firstService = this;

  // List of shopping items
  var s_toBuyList = gtoBuyList;

  // List of shopping items bought
  var s_itemsBought = [];

  firstService.addItemBought = function (iName, iQuantity, iImage, iIndex) {
    var l_itemBought = {
      name: iName,
      quantity: iQuantity,
      image: iImage
    };
    s_itemsBought.push(l_itemBought);
    //console.log("Items bought",s_itemsBought);
    //console.log("Items in list",s_toBuyList);
  };
  
  firstService.addItemToBuy = function (iName, iQuantity, iImage, iIndex) {
    var l_toBuyList = {
      name: iName,
      quantity: iQuantity,
      image: iImage
    };
    s_toBuyList.push(l_toBuyList);
    //console.log("Items in list",s_toBuyList);
    //console.log("Items bought",s_itemsBought);
  };
  
  firstService.getToBuyList = function () {
    return s_toBuyList;
  };

  firstService.getItemsBought = function () {
    return s_itemsBought;
  };

  firstService.removeItemToBuy = function (iIndex) {
    //console.log("Index", iIndex);
    //console.log("s_toBuyList", s_toBuyList);
    //console.log("s_itemsBought", s_itemsBought);
    s_toBuyList.splice(iIndex, 1);
  };

  firstService.removeItemBought = function (iIndex) {
    console.log("Index", iIndex);
    console.log("s_toBuyList", s_toBuyList);
    console.log("s_itemsBought", s_itemsBought);
    s_itemsBought.splice(iIndex, 1);
  };
}

})();
