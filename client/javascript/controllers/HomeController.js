angular.module('App', [])

app.controller('HomeController', function($scope, activitiesFactory) {
  
  $scope.results = [{txt: 'Loading..'}];
  activitiesFactory.all().then(
    function(res){
      $scope.activities = res;
    },
    function(err){
      console.error(err);
    }
  );
})