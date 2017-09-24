angular.module('myApp').controller('ChangePasswordController', function($scope, $http, $rootScope, $cookies) {

var DriverRefresh = function () {
        $http.get('/pass/getPass').success(function (response) {
          //  console.log('READ IS SUCCESSFUL');
            $scope.DriverData = response;
            $scope.driv = "";
        });
    };

    DriverRefresh();

 $scope.editPass = function (pass) {
         $http.get('/pass/getPass/' + pass._id).success(function (response) {
            //$scope.driv = response[0];
        });
         DriverRefresh();
    };

})
