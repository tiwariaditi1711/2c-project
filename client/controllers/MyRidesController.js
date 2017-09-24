
angular.module('myApp').controller('MyRidesController', function($scope, $http, $rootScope, $sessionStorage, $cookies) {
 var user = $cookies.getObject('authUser');
 var loggedInUser = user.currentUser.userInfo;
 //console.log(loggedInUser);
 $scope.Email = '';
 myride();

console.log(loggedInUser);
// $http.get('/bookcab/getbooking').success(function(response){
//   console.log(response);
// })
 function myride(){
   if(loggedInUser.usertype == 'Customer'){
    console.log('Hello');
     $scope.Email = loggedInUser.email;
     console.log($scope.Email);
     $http.get('/bookcab/getcust/' + $scope.Email).success(function(response){
        console.log(response);
       $scope.datalist = response.docs;

     })
   }else {
     $scope.Email = loggedInUser.email;
     $http.get('/bookcab/getdriver/' + $scope.Email).success(function(response){
       console.log(response);
       $scope.datalist = response.docs;
     })
   }
 }

})
