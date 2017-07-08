'use strict';

/**
 * @ngdoc function
 * @name webDevelopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webDevelopApp
 */
 angular.module('starter.controllers', ['angularUtils.directives.dirPagination'])

.controller('MainCtrl',['$scope','SendFactory', function ($scope,SendFactory) {
$scope.remove={};
$scope.query="";
$scope.itemsperpage=4;
SendFactory.seturl('products/displayproducts','GET','');
  SendFactory.send()
  .then(function success(response){

    $scope.product=response.data;
      //console.log(response);
  },function failure(response){
      console.log("failuressss");
  });
/*
$scope.edit=function(data)
{
  console.log(data);
};

$scope.delete=function(data)
{
  console.log(data);
};

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
 */
 SendFactory.seturl('products/displaycategory','GET','');
   SendFactory.send()
   .then(function success(response){

       //$scope.data=response.data;
       $scope.category=response.data;
       console.log(response);
   },function failure(response){
       console.log("failuressss");
   });

  


  }]);
