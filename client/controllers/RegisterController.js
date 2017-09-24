angular.module('myApp').controller('RegisterController', function($scope, $http, $location) {
    $scope.RegisterUser = function() {
    	$scope.User.UserType= 'Customer';
        $http.post('/api/signup', $scope.User).then(function(response) {
            alert('User Registration Successful');
        });
    }
});
 	

