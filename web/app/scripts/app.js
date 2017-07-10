'use strict';

/**
 * @ngdoc overview
 * @name webDevelopApp
 * @description
 * # webDevelopApp
 *
 * Main module of the application.
 */
 var MyApp = angular.module('WebApp', ['service','starter.controllers','ui.router','angularUtils.directives.dirPagination','ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider) {



 $stateProvider

        .state('admin', {
             url: '/admin',
             abstract: true,
             templateUrl: './views/admin/admin_home.html'
         })

         .state('admin.products', {
              url: '/pdt_management',
              templateUrl:'./views/admin/pdt_management.html',
            controller:'MainCtrl'
          })

          .state('admin.category', {
               url: '/pdt_category',
               templateUrl:'./views/admin/category_mgmt.html',
             controller:'CategoryCtrl'
           })

           .state('admin.user', {
                url: '/user',
                templateUrl:'./views/admin/user_mgmt.html',
              controller:'UserCtrl'
            })


         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
         .state('about', {
             // we'll get to this in a bit
         });

$urlRouterProvider.otherwise('admin/pdt_management');

});
