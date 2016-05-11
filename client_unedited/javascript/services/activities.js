app.factory('activities', ['$http', function ($http) {
    var lat, lng;
//    return new Promise(function (resolve, reject) {
        
//    });
    setTimeout(function(){}, 10000);
    var url = '/api/activities/findByCoordinates?lat=40.6249614&lng=-74.0017677';
    return $http.get(url).success(function(data) { 
        navigator.geolocation.getCurrentPosition(
            function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                console.log("Latitude : " + lat + " Longitude : " + lng);
                url = '/api/activities/findByCoordinates?lat=' + lat + '&lng=' + lng
                console.log(url);
//                return $http.get(url).success(function(data) {
//                    resolve(data);
//                })
            }); 
        return data;
    }).error(function(err) { 
        return err; 
    }); 
}]);



//app.factory('activities', ['$http', function ($http) {
//    var lat, lng;
//    return new Promise(function (resolve, reject) {
//        navigator.geolocation.getCurrentPosition(
//            function (position) {
//                lat = position.coords.latitude;
//                lng = position.coords.longitude;
//                console.log(position);
//                var url = '/api/activities/findByCoordinates?lat=' + lat + '&lng=' + lng
//                console.log(url);
//                $http.get(url).success(function(data) {
//                    resolve(data);
//                })
//            })
//    })
//
//
//            }]);