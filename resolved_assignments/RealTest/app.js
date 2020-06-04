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

var alreadyBoughtList = [];

angular.module('LaYecaShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('LaYecaShoppingListCheckOffService', LaYecaShoppingListCheckOffService);
;

ToBuyController.$inject = ['LaYecaShoppingListCheckOffService'];
// ** Controller As syntax
function ToBuyController(LaYecaShoppingListCheckOffService) {
  var itemToBuy = this;
  itemToBuy.toBuyList = LaYecaShoppingListCheckOffService.getListItems();
  // console.log("In TOBUYCONTROLLER ", itemToBuy.toBuyList);

  itemToBuy.addItem = function (itemIndex) {
    LaYecaShoppingListCheckOffService.addItem(itemToBuy.toBuyList[itemIndex].name, itemToBuy.toBuyList[itemIndex].quantity, itemToBuy.toBuyList[itemIndex].image, itemIndex);
    LaYecaShoppingListCheckOffService.removeItem(itemIndex);
    // console.log("Adding/Removing", LaYecaShoppingListCheckOffService.getItems());
  }
}

AlreadyBoughtController.$inject = ['LaYecaShoppingListCheckOffService'];
// ** Controller As syntax
function AlreadyBoughtController(LaYecaShoppingListCheckOffService) {
  var itemBought = this;
  itemBought.itemsBought = [];
  // console.log("In ALREADYBOUGHTCONTROLLER ", itemBought);

  itemBought.itemsBought = LaYecaShoppingListCheckOffService.getItems();
  // console.log("Completed list", itemBought);
}

function LaYecaShoppingListCheckOffService() {
  var firstService = this;

  // List of shopping items
  var toBuyList = gtoBuyList;

  // List of shopping items bought
  var itemsBought = [];

  firstService.addItem = function (iName, iQuantity, iImage, iIndex) {
    var itemBought = {
      name: iName,
      quantity: iQuantity,
      image: iImage
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
