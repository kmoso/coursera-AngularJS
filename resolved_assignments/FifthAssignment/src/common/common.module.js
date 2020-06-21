(function() {
"use strict";

// Couldn't create my own server, not enough time nowadays sorry!
angular.module('common', [])
.constant('ApiPath', 'https://enigmatic-dawn-47212.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
