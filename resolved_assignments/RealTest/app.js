(function () {
'use strict';

var gtoBuyList = [
  {
    name: "Sorpresa",
    quantity: "5",
    price: "100",
    image: "imgs/Sorpresa.jpg",
    image_alt: "Sorpresa"
  },
  {
    name: "Sopecitos de chorizo",
    quantity: "3",
    price: "200",
    image: "imgs/SopecitosDeChorizo.jpg",
    image_alt: "Sopecitos de chorizo"
  },
  {
    name: "Pay de manzana light",
    quantity: "1",
    price: "200",
    image: "imgs/PayDeManzanaLight.jpg",
    image_alt: "Pay de manzana light"
  },
  {
    name: "Mojarras fritas",
    quantity: "1",
    price: "200",
    image: "imgs/MojarraFrita.jpg",
    image_alt: "Mojarra Frita"
  },
  {
    name: "Ensaladas saludables",
    quantity: "1",
    price: "120",
    image: "imgs/EnsaladaSaludable.jpg",
    image_alt: "Ensalada Saludable"
  },
  {
    name: "Platillos rancheros",
    quantity: "1",
    price: "150",
    image: "imgs/PlatoRanchero.jpg",
    image_alt: "Plato Ranchero"
  },
  {
    name: "Pasta con Verduras",
    quantity: "1",
    price: "100",
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

  itemToBuy.cantidad = 1;

  // This will have the complete list of products
  itemToBuy.toBuyList = LaYecaShoppingListCheckOffService.getToBuyList();

  itemToBuy.addItem = function (itemIndex) {
    console.log("Checking addItem",itemToBuy.toBuyList[itemIndex].name);
    //console.log(itemToBuy.toBuyList[itemIndex].quantity," units");
    LaYecaShoppingListCheckOffService.addItemBought(itemToBuy.toBuyList[itemIndex].name, itemToBuy.toBuyList[itemIndex].quantity, itemToBuy.toBuyList[itemIndex].image, itemToBuy.toBuyList[itemIndex].price, itemIndex);
    //itemsBought is not defined here
    //console.log("itemsBought after:",itemsBought);
    LaYecaShoppingListCheckOffService.removeItemToBuy(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['LaYecaShoppingListCheckOffService'];
// ** Controller As syntax
function AlreadyBoughtController(LaYecaShoppingListCheckOffService) {
  var itemBought = this;
  
  itemBought.GrandTotal = 0;

  // This will have no elements when loading the page
  itemBought.itemsBought = LaYecaShoppingListCheckOffService.getItemsBought();

  itemBought.removeItem = function (itemIndex) {
    console.log("Checking removeItem",itemBought.itemsBought[itemIndex].name);
    LaYecaShoppingListCheckOffService.addItemToBuy(itemBought.itemsBought[itemIndex].name, itemBought.itemsBought[itemIndex].quantity, itemBought.itemsBought[itemIndex].image, itemIndex);
    //toBuyList is not defined here
    LaYecaShoppingListCheckOffService.removeItemBought(itemIndex);
  }
  
  itemBought.callPaypal = function (paymentAmount) {
    var x = LaYecaShoppingListCheckOffService.callPaypal(paymentAmount);
  }
}

function LaYecaShoppingListCheckOffService() {
  var firstService = this;

  // List of shopping items
  var s_toBuyList = gtoBuyList;

  // List of shopping items bought
  var s_itemsBought = [];

  firstService.addItemBought = function (iName, iQuantity, iImage, iPrice, iIndex) {
    var l_itemBought = {
      name: iName,
      quantity: iQuantity,
      image: iImage,
      price: iPrice
    };
    console.log("Adding item",l_itemBought);
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
  
  firstService.callPaypal = function (paymentAmount) {
    console.log("Calling payment for",paymentAmount);
    return paymentAmount;
  }
  
}

})();
