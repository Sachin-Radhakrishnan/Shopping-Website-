// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



  });



})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('start', {
  url: '/start',
   cache: false,
  templateUrl: 'templates/start.html',
  controller: 'StartCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      },
      'sideContent':{
        templateUrl: 'templates/mainmenu.html'
      }
    }
  })

  .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller:'SignupController'
        },
        'sideContent':{
          templateUrl: 'templates/mainmenu.html'
        }
      }
    })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller:'LoginController'
        },
        'sideContent':{
          templateUrl: 'templates/mainmenu.html'
        }
      }
    })

  .state('app.products', {
    url: '/products',
    params:{'productId':0},
    views: {
      'menuContent': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl'
      },
      'sideContent':{
        templateUrl: 'templates/productcategories.html',
        controller: 'CategoryCtrl'
      }
    }
  })

.state('app.cart', {
  url: '/cart',
  views: {
    'menuContent': {
      templateUrl: 'templates/cart.html',
      controller: 'ProductsCtrl'
    },
    'sideContent':{
      templateUrl: 'templates/productcategories.html',
      controller: 'CategoryCtrl'
    }
  }
})

.state('app.failure', {

  views: {
    'menuContent': {
      templateUrl: 'templates/failure.html',
      controller: 'ProductsCtrl'
    },
  }
})

.state('app.checkout', {
  url: '/checkout',
  views: {
    'menuContent': {
      templateUrl: 'templates/checkout.html',
      controller: 'ProductsCtrl'
    },
    'sideContent':{
      templateUrl: 'templates/productcategories.html',
      controller: 'CategoryCtrl'
    }
  }
});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
});
