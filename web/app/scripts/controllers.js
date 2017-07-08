'use strict';

/**
 * @ngdoc function
 * @name webDevelopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webDevelopApp
 */
 angular.module('starter.controllers', ['angularUtils.directives.dirPagination','ui.bootstrap'])

.controller('MainCtrl',['$scope','$rootScope','$uibModal','SendFactory', function ($scope,$rootScope,$uibModal,SendFactory) {
$scope.remove={};
$scope.query="";
$scope.itemsperpage=4;
$rootScope.heading="";
$rootScope.buttonname="";
$rootScope.getproducts=function()
{
SendFactory.seturl('products/displayproducts','GET','');
SendFactory.send()
.then(function success(response){
    $scope.product=response.data;
  },function failure(response){
      console.log("failuressss");
  });
};

$rootScope.getproducts();

$scope.editproduct = function (data) {
    $rootScope.heading="Edit Details";
    $rootScope.buttonname="Edit Details";
    var uibModalInstance = $uibModal.open({
      backdrop: 'static',
      keyboard: false,
      templateUrl: './views/admin/modal.html',
      controller: [
          '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
              $scope.pdt={product_id:data.product_id,product_name:data.product_name,product_description:data.product_description,price:data.price,quantity:data.quantity};
              $scope.editdetails = function() {
                SendFactory.seturl('products/editproduct','POST',$scope.pdt);
                SendFactory.send()
                .then(function success(response){
                  $rootScope.getproducts();
                      $uibModalInstance.close(false);
                  },function failure(response){
                      console.log("failuressss");
                  });

              };

              $scope.close = function() {
                  $uibModalInstance.close(false);
              };
          }
      ]
    });
 };
/********************************************************************/
$scope.deleteproduct=function(data,action)
{
   $scope.product1={};
   $scope.product1.status=action;
   if(action=='single')
    {
      $scope.product1.data=data;

    }
   else if(action=='bulk')
    {

      var productids = [];
      angular.forEach($scope.product, function(object) {
      if (object.selected) {
        productids.push(object.product_id);
        }
      });
      console.log(productids);
      $scope.product1.data=productids;
    }

    if(action=='single' || action=='bulk')
    {
      console.log($scope.product1);
      SendFactory.seturl('products/deleteproduct','POST',$scope.product1);
      SendFactory.send()
      .then(function success(response){
        $rootScope.getproducts();
       },function failure(response){
            console.log("failuressss");
        });
    }

};
$scope.countChecked = function(){
    var count = 0;
    angular.forEach($scope.product, function(value){
        if (value.selected) count++;
    });

    return count;
};
/*******************************************************************************************************************/
$scope.addproduct = function (data) {
    $rootScope.heading="Add a new product";
    $rootScope.buttonname="Add Details";
    var uibModalInstance = $uibModal.open({
      backdrop: 'static',
      keyboard: false,
      templateUrl: './views/admin/modal.html',
      controller: [
          '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
              $scope.pdt={};

              $scope.close = function() {
                  $uibModalInstance.close(false);
              };
          }
      ]
    });
 };

/*
$scope.deleteall=function()
{
  console.log($scope.remove);
};

$scope.deleteall = function() {
    var modelNames = [];
    angular.forEach($scope.data, function(object) {
        if (object.selected) {
        modelNames.push(object.product_id);
      }
    });
console.log(modelNames)
 };
 /*
 SendFactory.seturl('products/displaycategory','GET','');
   SendFactory.send()
   .then(function success(response){

       //$scope.data=response.data;
       $scope.category=response.data;
       console.log(response);
   },function failure(response){
       console.log("failuressss");
   });

  */


  }]);
