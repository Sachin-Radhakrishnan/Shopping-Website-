'use strict';

/**
 * @ngdoc overview
 * @name webDevelopApp
 * @description
 * # webDevelopApp
 *
 * Main module of the application.
 */
 var MyApp = angular.module('WebApp', ['service','starter.controllers','ui.router','angularUtils.directives.dirPagination','ui.bootstrap','chart.js'])

.config(function($stateProvider, $urlRouterProvider) {

 $stateProvider

         .state('home', {
              url: '/home',
              templateUrl: './views/homepage.html',
              controller: "LoginController"
          })


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

            .state('executive', {
                 url: '/executive',
                 abstract: true,
                 templateUrl: './views/executive/executive_home.html'
             })

             .state('executive.dashboard', {
                  url: '/dashboard',
                  templateUrl:'./views/executive/dashboard.html',
                controller:'ExecCtrl'
              })

              .state('executive.orders', {
                   url: '/manageorders',
                   templateUrl:'./views/executive/order_mgmt.html',
                 controller:'ExecCtrl'
               })

               .state('user', {
                    url: '/use',
                    abstract: true,
                    templateUrl: './views/user/home.html'
                })

                .state('user.orders', {
                     url: '/vieworders',
                     templateUrl:'./views/user/orders.html',
                     controller:'UserCtrl'
                 })

                 .state('user.history', {
                      url: '/history',
                      templateUrl:'./views/user/history.html',
                      controller:'UserCtrl'
                  })

            /*      .state('user.history', {
                       url: '/history',
                       templateUrl:'../views/fileupload.html',
                       controller:'uploadCtrl'
                   })*/



                  .state('user.pwd', {
                       url: '/history',
                       templateUrl:'./views/changepwd.html',
                       controller:'Password-controller'
                   })


         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
         .state('about', {
             // we'll get to this in a bit
         });

$urlRouterProvider.otherwise('/home');

});
