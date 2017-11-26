'use strict';

/**
 * @ngdoc overview
 * @name demineurApp
 * @description
 * # demineurApp
 *
 * Main module of the application.
 */
angular
  .module('demineurApp', [
    'ngRoute'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mine.html',
        controller: 'MineCtrl',
        controllerAs: 'mine'
      })
      .when('/mine', {
        templateUrl: 'views/mine.html',
        controller: 'MineCtrl',
        controllerAs: 'mine'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
