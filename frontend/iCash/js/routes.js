angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.pay', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/pay.html',
        controller: 'payCtrl'
      }
    }
  })

  .state('tabsController.accountInfo', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/accountInfo.html',
        controller: 'accountInfoCtrl'
      }
    }
  })

  .state('tabsController.kYCYourInfo', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/kYCYourInfo.html',
        controller: 'kYCYourInfoCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('payments', {
    url: '/page8',
    templateUrl: 'templates/payments.html',
    controller: 'paymentsCtrl'
  })

$urlRouterProvider.otherwise('/page1/page2')


});