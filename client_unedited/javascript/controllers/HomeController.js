app.controller('HomeController', ['$scope', 'activities', function ($scope, activities) {
    //  activities.success(function(data){
    //     data = data.activities;
    //    $scope.activities = data;
    //  });
    activities.success(function (data) {
        console.log(data);
        console.log($scope.activities);
        $scope.activities = data.activities;
        console.log($scope.activities);
    })
}]);