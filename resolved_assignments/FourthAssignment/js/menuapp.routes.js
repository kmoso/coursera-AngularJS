(function(){
  'use strict';
  angular
    .module('MenuApp')
    .config(RoutesConfiguration);

    RoutesConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfiguration($stateProvider, $urlRouterProvider) {
      // Redirect to home if no other URL matches
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'states/home.html'
        })
        .state('categories', {
          url: '/categories',
          templateUrl: 'states/categories.html',
          controller: 'CategoriesController',
          controllerAs: 'categoriesCtrl'
        })
        .state('categories.item', {
          url: '/{item}',
          templateUrl: 'states/itemslist.html',
          controller: 'ItemsController',
          controllerAs: 'itemsCtrl'
        });

    }
})();