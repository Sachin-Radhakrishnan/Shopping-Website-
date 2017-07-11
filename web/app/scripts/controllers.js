'use strict';

/**
 * @ngdoc function
 * @name webDevelopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webDevelopApp
 */
 angular.module('starter.controllers', ['angularUtils.directives.dirPagination','ui.bootstrap','ngDialog','chart.js'])

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
    if(response.data!='error')
    {
      $scope.user=response.data;
    }
    else
    {
      $scope.user=[];
    }
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
    if(response.data!='error')
    {
      $scope.employee=response.data;
    }
    else
    {
      $scope.employee=[];
    }
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
$scope.addexecutive = function (data) {

 var uibModalInstance = $uibModal.open({
   backdrop: 'static',
   keyboard: false,
   templateUrl: './views/admin/addemployee.html',
   controller: [
       '$scope', '$uibModalInstance',function($scope, $uibModalInstance) {
           $scope.executive={};
           $scope.addemployeedetails = function() {
             console.log( $scope.executive);

           SendFactory.seturl('users/addemployee','POST',$scope.executive);
           SendFactory.send()
           .then(function success(response){
                 if(response.data=='success')
                 {
                    $rootScope.getemployee();
                    $uibModalInstance.close(false);
                 }
                 else
                 {
                   ngDialog.openConfirm({
                   template: '<p>'+response.data+'</p>',
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
/***********************************************************/
}])
/************************************************************************************************************************************/
.controller('ExecCtrl',['socket','$scope','$rootScope','$state','$uibModal','SendFactory','ngDialog',function (socket,$scope,$rootScope,$state,$uibModal,SendFactory,ngDialog) {

  $scope.filterdata={};



  $scope.getorders=function()
  {
  SendFactory.seturl('products/displayorders','GET','');
  SendFactory.send()
  .then(function success(response){
    if(response.data!='error')
    {
      $scope.orders=response.data;
      console.log(response.data);
      $scope.pending=0;
      $scope.shipped=0;
      $scope.d = new Date();
      $scope.curr_date = $scope.d.getDate();
      $scope.curr_month = $scope.d.getMonth() + 1;
      $scope.curr_year = $scope.d.getFullYear();
      $scope.date=$scope.curr_month + "-" + $scope.curr_date +"-" + $scope.curr_year;
      console.log($scope.date);
      for(var i=0;i<$scope.orders.length;i++)
      {

        if($scope.orders[i].status=="pending" && $scope.orders[i].date_added==$scope.date )
        {
          console.log($scope.orders[i].status);
          $scope.pending++;
        }
        else
        {
          $scope.shipped++;
        }

      }

      $scope.labels = ["Shipped", "Pending"];
      $scope.data = [$scope.shipped, $scope.pending];
      console.log($scope.data);
    }
    else
    {
      $scope.orders=[];
    }
    },function failure(response){
        console.log("failuressss");
    });
  };

    $scope.getorders();

    socket.on("Placedordersuccessfully",function(data){
    $scope.getorders();
    });

}])
/***************************************************************************************************************************/
.controller('LoginController',['$scope','$state','SendFactory','$window',function($scope,$state,SendFactory,$window){

  $scope.login={};
  $scope.Form={};
  $scope.showAlert = function() {

  var alertPopup = $ionicPopup.alert({
  title: 'Instructions',
  template: 'Username must contain only alphanumeric characters or <br> single hyphen/underscore,<br> & must begin or end with an alphabet',

  });
  alertPopup.then(function(res) {
  });

  };
  //on form submission
  $scope.OnSubmission=function(){
        //for showing the server delay
        $ionicLoading.show({
                 content: 'Loading',
                 animation: 'fade-in',
                 showBackdrop: true,
                 maxWidth: 200,
                 showDelay: 0
               });

        SendFactory.seturl('login','POST',$scope.login);
        SendFactory.send()
        .then(function success(response)
        {
          console.log(response);
          $window.localStorage['token']=response.data.token;
          console.log($window.localStorage['token']);

          $ionicLoading.hide();
          //clear the form
          $scope.login={};
          $scope.Form.LoginForm.$setPristine();
          $scope.Form.LoginForm.$setUntouched();
          $state.transitionTo('app.products', {}, { reload: true, inherit: true, notify: true });


        },function failure(response)
        {

          $window.localStorage.removeItem('token');
          $ionicLoading.hide();
          $ionicLoading.show({
              template: 'Unauthorized User',
              scope: $scope
            });
           $timeout(function() {
               $ionicLoading.hide();
           }, 2000);
        });
  };

}])
