var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngStorage']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/Home.html',
        controller: 'HomeController'
    }).when('/Login', {
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
    }).when('/Register', {
        templateUrl: 'views/Register.html',
        controller: 'RegisterController'
    }).when('/Profile', {
        templateUrl: 'views/Profile.html',
        controller: 'MapController'
    }).when('/Driver', {
        templateUrl: 'views/DriverMap.html',
        controller: 'DriverMapController'
    }).when('/CabDriver', {
        templateUrl: 'views/CabDriver.html',
        controller: 'CabDriverController'
    }).when('/modal-container-839749',{
        templateUrl: 'views/TarrifPlan.html',
        controller: 'TarrifController'
    }).when('/Tarrif', {
        templateUrl: 'views/TarrifPlan.html',
        controller: 'TarrifController'
    }).when('/Rides', {
        templateUrl: 'views/MyRides.html',
        controller: 'MyRidesController'
    }).when('/Unauth', {
        templateUrl: 'views/Unauth.html',
    }).when('/Password', {
        templateUrl: 'views/ChangePassword.html',
        controller: 'ChangePasswordController'
    }).when('/modal-container-948386', {
        templateUrl: 'views/DriverMap.html',
        controller: 'DriverMapController'
    }).otherwise({
       redirectTo : '/',
    });
});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/Login', '/Register'];
        var AdminPages = [ '/', '/CabDriver', '/Tarrif', '/modal-container-839749'];
        var CustomerPages = ['/Profile', '/Rides' , '/'];
        var DriverPages = ['/Driver' , '/Rides', '/', '/modal-container-948386', '/Password'];


        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/Login');
        }else {
          if(authUser != undefined) {
            if(authUser.currentUser.userInfo.usertype == 'Admin'){
              var Admin  = AdminPages.indexOf($location.path()) === -1;
              if(Admin) {
                $location.path('/Unauth');
              }
            }
            if (authUser.currentUser.userInfo.usertype == 'Customer'){
              var Customer = CustomerPages.indexOf($location.path()) === -1;
              if(Customer){
                $location.path('/Unauth');
              }
            }
            if (authUser.currentUser.userInfo.usertype == 'Driver'){
              var Driver = DriverPages.indexOf($location.path()) === -1;
              if(Driver){
                $location.path('/Unauth');
                }
            }
          }
        }

        // console.log(restrictedPage);
        // console.log($sessionStorage.tokenDetails);
    });
});
