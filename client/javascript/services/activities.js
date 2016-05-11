
app.factory('activitiesFactory', function($http, $timeout, $q) { 
  var results = {};  
  
  function updateCoordinate(callback) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var returnValue = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
        console.log("Latitude : " + returnValue.lat + " Longitude : " + returnValue.long);

        callback(returnValue);
      }
    )
  }

  function _all(){
    var d = $q.defer();
    var url;
    updateCoordinate(function(object) {
        url = '/api/activities/findByCoordinates?lat=' + object.lat + '&lng=' + object.long;
        //url = '/activities.json'
        var activities = $http.get(url).success(function(response) {
            d.resolve(response.activities);
            //return response.activities;
        });
//      d.resolve(activities);
    })
     // just for test
     //  $timeout(function(){
     //        d.resolve([{txt:'one'},{txt:'two'},{txt:'three'}]);
     // }, 2000); 
  
    return d.promise;       
  }
  
  results.all = _all;
  console.log(results);
  return results;
});
