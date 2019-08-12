var app = angular.module('myApp', []);

app.controller('userCtrl', function($scope, TwitterGetUserService){
	$scope.getUser = function(username){
		//console.log("username entered ", username);
		TwitterGetUserService.getUser(username)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
	        	$scope.results = JSON.parse(data.result.userData);
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
	}
});

app.controller('tweetCtrl', function($scope, TwitterGetTweetsService){
	$scope.getTweets = function(username){
		//console.log("username entered ", username);
		TwitterGetTweetsService.getTweets(username)
		    .then(function(data){
				$scope.twitterErrors = undefined;
	        	$scope.tweets = JSON.parse(data.result.tweetData);
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
	}
});

app.factory('TwitterGetUserService', function($http, $q){
  
  var getUser = function(username){
    var d = $q.defer();
    $http.post('/twitter/user', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }
});

app.factory('TwitterGetTweetsService', function($http, $q){
  
  var getTweets = function(username){
    var d = $q.defer();
    $http.post('/twitter/gettweets', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getTweets : getTweets
  }
});