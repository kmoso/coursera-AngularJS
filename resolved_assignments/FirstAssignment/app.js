(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.title = "Welcome to the Lunch Checker";
  $scope.lunchMenu = "";
  $scope.messageText = "";

  function checkValidDish(dish) {
    if (dish.length < 3) {
      return false;
    }
    else {
      return true;
    }
  }

  $scope.clickedButton = function () {
    var tmpMsg = "";
    var tmpWrdCnt = 0;
    var tmpValDish = false;
    var tmpList = $scope.lunchMenu;
    if (tmpList) {
      tmpWrdCnt = tmpList.split(',').length;
      tmpValDish = tmpList.split(',').every(checkValidDish); 
      // Just checking number of words and valid length in the console
      console.log(tmpWrdCnt);
      console.log(tmpValDish);
      if (tmpValDish) {
        if (tmpWrdCnt < 4) {
          tmpMsg = "Enjoy!"
        }
        else {
          tmpMsg = "Too much!";
        }
      }
      else {
        tmpMsg = "Valid dishes should have more than 3 letter, right? Please try again";
      }
    }
    else {
      tmpMsg = "Please enter data first"
    }
    $scope.messageText = tmpMsg;
  };

}

})();
