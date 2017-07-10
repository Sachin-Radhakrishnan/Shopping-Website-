'use strict';

/**
 * @ngdoc function
 * @name webDevelopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webDevelopApp
 */
 angular.module('starter.controllers', ['angularUtils.directives.dirPagination','ui.bootstrap','ngDialog'])

.controller('MainCtrl',['$scope','$rootScope','$uibModal','SendFactory','ngDialog', function ($scope,$rootScope,$uibModal,SendFactory,ngDialog) {
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
    $rootScope.submitname="editdetails();";
    var uibModalInstance = $uibModal.open({
      backdrop: 'static',
      keyboard: false,
      templateUrl: './views/admin/editproducts.html',
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
/*****************************************************************************/
   $scope.addproduct = function (data) {
    $rootScope.heading="Add a new product";
    $rootScope.buttonname="Add Details";
    $rootScope.submitname="addproduct()";
    //sub category subcategory_id
    $rootScope.subcategory={subcategory_id:0};
    SendFactory.seturl('category/displaysubcategory','GET','');
    //sub category
    SendFactory.send()
    .then(function success(response){
        $rootScope.subcategory=response.data;
        console.log($rootScope.subcategory);
      },function failure(response){
          console.log("failuressss");
      });
    //
    var uibModalInstance = $uibModal.open({
      backdrop: 'static',
      keyboard: false,
      templateUrl: './views/admin/addproducts.html',
      controller: [
          '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
              $scope.pdt={};
              $scope.addproductdetails = function() {
                console.log($scope.pdt);
              SendFactory.seturl('products/addproduct','POST',$scope.pdt);
              SendFactory.send()
              .then(function success(response){

                if(response.data!='error')
                {
                  $rootScope.getproducts();
                  $uibModalInstance.close(false);
                }
                else
                {
                  ngDialog.openConfirm({
                  template: '<p>Product already exists..</p>',
                  plain: true,
                  className: 'ngdialog-theme-default ngdialog-cart-theme',
                  showClose: true,
                  appendTo: 'div[ui-view]',
                  closeByDocument: false

                  }).then(function (success) {
                      // Success logic here
                  }, function (error) {
                      // Error logic here
                  });
                }


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
/*****************************************************************************/
$scope.updatestatus=function(status,data)
{
  $scope.data3={status:status,product_id:data};
  SendFactory.seturl('products/editstatus','POST',$scope.data3);
  SendFactory.send()
  .then(function success(response){
    $rootScope.getproducts();
   },function failure(response){
        console.log("failuressss");
    });

};

  }])
/*************************************************category management*****************************************************************************/
  .controller('CategoryCtrl',['$scope','$rootScope','$state','$uibModal','SendFactory','ngDialog',function ($scope,$rootScope,$state,$uibModal,SendFactory,ngDialog) {
      $scope.remove={};
      $scope.query="";
      $scope.itemsperpage=4;
      $rootScope.heading="";
      $rootScope.buttonname="";
      $rootScope.getcategory=function()
      {
          SendFactory.seturl('category/displaycategory','GET','');
          SendFactory.send()
          .then(function success(response){

              //$scope.data=response.data;
              $scope.category=response.data;
              console.log(response);
          },function failure(response){
              console.log("failuressss");
          });
      };


      $rootScope.getsubcategory=function()
      {
      //sub category subcategory_id
      SendFactory.seturl('category/displaysubcategory','GET','');
      //sub category
      SendFactory.send()
      .then(function success(response){
          $rootScope.subcategory=response.data;
          console.log($rootScope.subcategory);
        },function failure(response){
            console.log("failuressss");
        });
      //
     };


      $rootScope.getcategory();

      $scope.editcategory = function (data) {

            console.log(data);
            $rootScope.subdata={category_id:data.category_id};
            console.log("hiii");
            console.log($rootScope.subdata);
            //
            SendFactory.seturl('category/displayParticularsubcategory','POST',$rootScope.subdata);
            SendFactory.send()
            .then(function success(response){
               if(response.data!="error")
                $rootScope.subcategory=response.data;
                else
                {
                  $rootScope.subcategory=[];
                }
                console.log($rootScope.subcategory);
              },function failure(response){
                  console.log("failuressss");
              });
            //
              console.log(data);
              $rootScope.heading="Edit Details";
              $rootScope.buttonname="Edit Details";
              $rootScope.submitname="editdetails();";
              $rootScope.button=true;
              var uibModalInstance = $uibModal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: './views/admin/edit_category.html',
                controller: [
                    '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
                            $scope.pdt={category_id:data.category_id,category_name:data.category_name};

                            $scope.editdetails = function() {
                              SendFactory.seturl('category/editcategory','POST',$scope.pdt);
                              SendFactory.send()
                              .then(function success(response){
                                    $rootScope.getcategory();
                                    $uibModalInstance.close(false);
                                },function failure(response){
                                    console.log("failuressss");
                                });

                            };

                            //for opening input lock

                            $scope.editsubcategory=function(subcat){

                               console.log('subcat');
                               console.log(subcat);

                               $rootScope.button=true;
                               $scope.subdata3={category_id:subcat.category_id};
                               //edit subcategory
                               SendFactory.seturl('category/editsubcategory','POST',subcat);
                               SendFactory.send()
                               .then(function success(response){
                                //reload page
                                   $scope.subdata3={category_id:subcat.category_id};
                                   SendFactory.seturl('category/displayParticularsubcategory','POST',$scope.subdata3);
                                   SendFactory.send()
                                   .then(function success(response){
                                       if(response.data!="error")
                                        $rootScope.subcategory=response.data;
                                        else
                                        {
                                          $rootScope.subcategory=[];
                                        }
                                     },function failure(response){
                                         console.log("failuressss");
                                     });


                                 },function failure(response){
                                     console.log("failuressss");
                                 });
                            };

                            //delete subcategory
                            $scope.deletesubcategory=function(data)
                            {
                              $scope.deletid={id:data};
                              console.log("heyyyyyyyyyyyy");
                              console.log($rootScope.subdata);
                              SendFactory.seturl('category/deletesubcategory','POST',$scope.deletid);
                              SendFactory.send()
                              .then(function success(response){

                                SendFactory.seturl('category/displayParticularsubcategory','POST',$rootScope.subdata);
                                SendFactory.send()
                                .then(function success(response){
                                      if(response.data!="error")
                                       $rootScope.subcategory=response.data;
                                       else
                                       {
                                         $rootScope.subcategory=[];
                                       }
                                  },function failure(response){
                                      console.log("failuressss");
                                  });

                               },function failure(response){
                                    console.log("failuressss");
                                });

                            };  //update_subcat_status


                            $scope.update_subcat_status=function(status,data)
                            {
                              $scope.data3={status:status,subcategory_id:data};
                              SendFactory.seturl('category/editsubcategorystatus','POST',$scope.data3);
                              SendFactory.send()
                              .then(function success(response){

                                SendFactory.seturl('category/displayParticularsubcategory','POST',$rootScope.subdata);
                                SendFactory.send()
                                .then(function success(response){
                                      if(response.data!="error")
                                       $rootScope.subcategory=response.data;
                                       else
                                       {
                                         $rootScope.subcategory=[];
                                       }
                                  },function failure(response){
                                      console.log("failuressss");
                                  });



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
  $scope.deletecategory=function(data,action)
  {
     $scope.category1={};
     $scope.category1.status=action;
     if(action=='single')
      {
        $scope.category1.data=data;

      }
     else if(action=='bulk')
      {

        var categoryids = [];
        angular.forEach($scope.category, function(object) {
        if (object.selected) {
          categoryids.push(object.category_id);
          }
        });
        console.log(categoryids);
        $scope.category1.data=categoryids;
      }

      if(action=='single' || action=='bulk')
      {
        console.log($scope.category1);
        SendFactory.seturl('category/deletecategory','POST',$scope.category1);
        SendFactory.send()
        .then(function success(response){
          $state.transitionTo('admin.category', {}, { reload: true, inherit: true, notify: true });
          $rootScope.getcategory();
         },function failure(response){
              console.log("failuressss");
          });
      }

  };
  $scope.countChecked = function(){
      var count = 0;
      angular.forEach($scope.category, function(value){
          if (value.selected) count++;
      });

      return count;
  };
  /*****************************************************************************/
     $scope.addcategory = function (data) {
      $rootScope.heading="Add a new category";
      $rootScope.buttonname="Add Details";
      $rootScope.submitname="addcategory()";
      var uibModalInstance = $uibModal.open({
        backdrop: 'static',
        keyboard: false,
        templateUrl: './views/admin/addcategory.html',
        controller: [
            '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
                $scope.pdt={};
                $scope.addcategorydetails = function() {
                SendFactory.seturl('category/addcategory','POST',$scope.pdt);
                SendFactory.send()
                .then(function success(response){
                      if(response.data!='error')
                      {
                       $rootScope.getcategory();
                       $uibModalInstance.close(false);
                      }
                      else
                      {
                        ngDialog.openConfirm({
                        template: '<p>Category already exists..</p>',
                        plain: true,
                        className: 'ngdialog-theme-default ngdialog-cart-theme',
                        showClose: true,
                        appendTo: 'div[ui-view]',
                        closeByDocument: false

                        }).then(function (success) {
                            // Success logic here
                        }, function (error) {
                            // Error logic here
                        });
                      }
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
  /*****************************************************************************/
  $scope.updatestatus=function(status,data)
  {
    $scope.data3={status:status,category_id:data};
    SendFactory.seturl('category/editstatus','POST',$scope.data3);
    SendFactory.send()
    .then(function success(response){
      $rootScope.getcategory();
     },function failure(response){
          console.log("failuressss");
      });

  };

/*****************************************************************************/
   $scope.addsubcategory = function (data) {
    $rootScope.heading="Add a new subcategory";
    $rootScope.buttonname="Add Details";
    //select category

    SendFactory.seturl('category/displaycategory','GET','');
    SendFactory.send()
    .then(function success(response){

        //$scope.data=response.data;
        $rootScope.category=response.data;
        console.log(response);
    },function failure(response){
        console.log("failuressss");
    });

    //
    var uibModalInstance = $uibModal.open({
      backdrop: 'static',
      keyboard: false,
      templateUrl: './views/admin/addsubcategory.html',
      controller: [
          '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
              $scope.pdt={};
              $scope.addsubcategorydetails = function() {
              SendFactory.seturl('category/addsubcategory','POST',$scope.pdt);
              SendFactory.send()
              .then(function success(response){

                  if(response.data!='error')
                  {
                    $rootScope.getsubcategory();
                    $uibModalInstance.close(false);
                  }
                  else
                  {
                    ngDialog.openConfirm({
                    template: '<p>Sub-Category already exists..</p>',
                    plain: true,
                    className: 'ngdialog-theme-default ngdialog-cart-theme',
                    showClose: true,
                    appendTo: 'div[ui-view]',
                    closeByDocument: false

                    }).then(function (success) {
                        // Success logic here
                    }, function (error) {
                        // Error logic here
                    });
                  }

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
/**********************************************/
}])
/******************************************************User management*************************************************************************/
.controller('UserCtrl',['$scope','$rootScope','$uibModal','SendFactory', 'ngDialog',function ($scope,$rootScope,$uibModal,SendFactory,ngDialog) {

  $rootScope.getusers=function()
  {
  SendFactory.seturl('users/displayusers','GET','');
  SendFactory.send()
  .then(function success(response){
      $scope.user=response.data;
    },function failure(response){
        console.log("failuressss");
    });
  };

  $rootScope.getusers();

/************************************************************************/

  $rootScope.getemployee=function()
  {
  SendFactory.seturl('users/displayemployee','GET','');
  SendFactory.send()
  .then(function success(response){
      $scope.employee=response.data;
    },function failure(response){
        console.log("failuressss");
    });
  };

  $rootScope.getemployee();

/************************************************************************/

  $scope.updateuserstatus=function(status,data)
  {
    $scope.data3={status:status,user_id:data};
    SendFactory.seturl('users/editstatus','POST',$scope.data3);
    SendFactory.send()
    .then(function success(response){
      $rootScope.getusers();
     },function failure(response){

          console.log("failuressss");
      });

  };

/*****************************************************************/
$scope.editemployee = function (data) {

$rootScope.heading="Edit Details";
$rootScope.buttonname="Edit Details";
$rootScope.submitname="editdetails();";
var uibModalInstance = $uibModal.open({
  backdrop: 'static',
  keyboard: false,
  templateUrl: './views/admin/editemployee.html',
  controller: [
      '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
          $scope.executive={employee_id:data.employee_id,fname:data.fname,lname:data.lname,gender:data.gender,salary:data.salary};
          $scope.editemployeedetails = function() {
            SendFactory.seturl('users/editemployee','POST',$scope.executive);
            SendFactory.send()
            .then(function success(response){
              $rootScope.getemployee();
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
/************************************************************************/

}])
